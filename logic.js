// Define a class Learner that will store leaner id, assingments and course id,
//  as well as relevant getters
let averageScore;
class Learner {
    constructor(id) {
        this.id = id,
        this.allAssignments = populateAllAssignments(this.id, LearnerSubmissions),
        this.averageScore = averageScore,
        this.course_id = this.course_id
    }
    getLearnerId() {
        return this.id;
    }
    getLearnerAssignments() {
        return this.allAssignments;
    }

    getLearnerCourseId() {
        return this.course_id;
    }
}

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function getLearnerIdArray(LearnerSubmissions) { // returns [125, 132]
    let LearnerSubmissionsCopy = LearnerSubmissions.slice();
    let LearnerIdArray = []; 

    
    for(let learnerObject of LearnerSubmissionsCopy) {
        if(!LearnerIdArray.includes(learnerObject.learner_id)) {
            LearnerIdArray.push(learnerObject.learner_id);
        }
    }
    // console.log(LearnerIdArray);
    return LearnerIdArray;
  }

  function createLearner() { // creates Learners based off their ID
    const learnerIdArray = getLearnerIdArray(LearnerSubmissions); 

    for(let learner of learnerIdArray) {
        learner = new Learner(learner);
        console.log(learner);
    }
  }

  function populateAllAssignments(learnerId, LearnerSubmissions) {
    // if learnerId is the same as learner submission
    // add all their scores to an array

    //if submitted off take some scores off -------------------------------------------------------------------//
    //checkSubmission(due_date, submission_date)
    //calculatePenalty()
    //---------------------------------------------------------------------------------------------------------//
    let LearnerSubmissionsCopy = LearnerSubmissions.slice();
    let assignmentsArray = [];

    for(let object of LearnerSubmissionsCopy) {
        if(learnerId === object.learner_id && checkSubmission(due_date, object.submission[0])) {
            //if on time push regular score
            assignmentsArray.push(object.submission.score);
        } else {
            // deduct 10% and push adjusted score
            let deductedScore = object.submission.score - (object.submission.score*0.1); 
            assignmentsArray.push(deductedScore);
        }
    }
    // console.log(`Assignments array after for loop: ${assignmentsArray}`);
    return assignmentsArray;
  }

//   function populateAverageScore() {

//   }

  function getLearnerAverage(LearnerSubmissions) {
    // if learnerId is the same as learner submission
    // add all their scores to an array
    // divide the sum of the array by the number of its elements
    // return average
    const learnerIdArray = getLearnerIdArray(LearnerSubmissions); //returns [125, 132]

  }
  
  function getLearnerData(course, ag, submissions) {

    // get laerners id
    // getLearnerId()

    //get learner average

    //get assignments that are due and display the percentage 
    // that the learner scored on the assignment
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  

  console.log(createLearner());
