// Define a class Learner that will store leaner id, assingments and course id,
//  as well as relevant getters
let averageScore;
class Learner {
    constructor(id) {
        this.id = id,
        this.allScoresArray = populateAllScores(this.id, LearnerSubmissions),
        this.averageScore = populateAverageScore(this.allAssignments, getMaxScore())
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

function populateAllScores(learnerId, LearnerSubmissions) { //populates assignments

    // copy the array in order to keep it unchanged
    let LearnerSubmissionsCopy = LearnerSubmissions.slice();
    let assignmentsArray = [];

    for(let object of LearnerSubmissionsCopy) {
        //continue if due date is larger than today
        if(isDueInTheFuture(object.assignment_id)) {
            continue;
        } else {
         //if ids match, pass learner id, assignment id and submission date into a function that will return 
        // whether the submission was on time
        if(learnerId!==object.learner_id) {
            continue
        } else if(learnerId === object.learner_id && isSubmittedOntime(object.assignment_id, object.submission.submitted_at)) {
            //if on time push regular score
            assignmentsArray.push(object.submission.score);
            // console.log('This score hasnt been adjusted: ', object.submission.score);
        } else {
            // deduct 10% and push adjusted score
            let deductedScore = Math.floor(object.submission.score - (object.submission.score*0.1)); 
            assignmentsArray.push(deductedScore);
            // console.log('This score has been adjusted: ', object.submission.score, ', Deducted score is: ',deductedScore);
        }
      }
    }
    // console.log(`Assignments array after for loop: ${assignmentsArray}`);
    return assignmentsArray;
  }

function isDueInTheFuture(assignmentId) { //checks date based on assignment ID
    let isTrue;

    const today = new Date();
    const dueDate = new Date(AssignmentGroup.assignments[assignmentId - 1].due_at);

    if(dueDate > today) {
        isTrue = true;
        // console.log('Returned true inside isDueIntheFuture()');
    } else {
        isTrue = false;
        // console.log('Returned false inside isDueIntheFuture()');
    }
    return isTrue;
}

function isSubmittedOntime(assignmentId, submitted_at) { //checks if assignment was submitted on time
    let isOnTime; 

    const dueDate = new Date(AssignmentGroup.assignments[assignmentId - 1].due_at);
    // console.log(`Due date for ${assignmentId} is ${dueDate}`)
    const submittedDate = new Date(submitted_at);
    // console.log(`It was submitted at ${submittedDate}, by a learner with id ${learnerId}`);

    if(submittedDate <= dueDate) {
        // console.log('returned true');
        // console.log('---------------');
        isOnTime = true;
    } else {
        // console.log('returned false');
        // console.log('---------------');
        isOnTime = false;
    }

   return isOnTime;
}

function getMaxScore() { //returns current maximum score (200)
    let maxScore = 0;// initialize maxScore that will store current maximum score

    // Copy the array of assignment objects from AssignmentGroup
    let allAssignments = [...AssignmentGroup.assignments];

     //loop through all assignments
    for(let assignment of allAssignments) {
    // if an assignment is due in the future, dont use it
        if(!isDueInTheFuture(assignment.id)) {
            // calculate maximum score of all due assignments
            maxScore += assignment.points_possible;
        } else {
            // console.log('Im inside getMaxScore() \'else\' statement');
            continue;
        }
    }
    // console.log(maxScore);
    return maxScore;
}

function populateAverageScore(allAssignmentsArray, maxScore) {
    //get sum of all learners scores

    //get maximum of possible scores

    // calculate average

    //return
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

