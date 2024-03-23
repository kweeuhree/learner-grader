// Define a class Learner that will store leaner id, assingments and course id,
//  as well as relevant getters
class Learner {
    static instances = [];

    constructor(id) {
        this.id = id;
        this.allScores = populateAllScores(this.id, LearnerSubmissions);
        this.averageScore = populateAverageScore(this.allScores, maxScore);
        this.allAssignments = populateAssignments(this.allScores);
        Learner.instances.push(this);
    }
    getLearnerId() {
        return this.id;
    }
    getAverageScore() {
        return this.averageScore;
    }
    getLearnerAssignments() {
        return this.allAssignments;
    }
    static getAllInstances() {
        return Learner.instances;
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
        // console.log(learner);
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
    let maxScore = 0; // initialize maxScore that will store current maximum score
    let i = 0; // index

     //loop through all assignments
    while (i < AssignmentGroup.assignments.length) {
        const assignment = AssignmentGroup.assignments[i];
        
          // if an assignment is due in the future, dont use it
        if (!isDueInTheFuture(assignment.id)) {
            maxScore += assignment.points_possible;
        }
        i++; // move onto the next index
    }
    // console.log(maxScore);
    return maxScore;
}


function populateAverageScore(allScores, maxScore) {
    //initialize total score that will store sum of all scores
    let totalScore = 0;
    let allScoresCopy = [...allScores]; 

    //get sum of all learners scores
    for(let score of allScoresCopy) {
        totalScore += score;
    }

    // calculate average, round to 2 and convert back to a number
    const averageScore = parseFloat((totalScore / maxScore).toFixed(2)); // result given in the sandbox is inconsistent, i use 2

    return averageScore;
  }

function populateAssignments(allScores) {
    //should return an object of assignments
    // each assignment object should have id:learner score average


    let allScoresCopy = [...allScores];
    const assignments = {};
    let id = 1;

    for(let score of allScoresCopy) {
        score = calculateAvgAssignmentScore(score, id);
        assignments[id] = score;
        id +=1;
    }

    return assignments;
}

function calculateAvgAssignmentScore(score, id) {
    //get best possible points by slicing an object by id
    let AssignmentGroupCopy = [...AssignmentGroup.assignments];

    const maxPointsPossible = AssignmentGroupCopy.filter(assignment => assignment.id === id)
    .map(assignment => assignment.points_possible);

    const result = score / maxPointsPossible;

    // console.log(`Average score is ${result}, learner score: ${score}, and id of assignment: ${id}`);

    return result;
}

function validInput() {
    createLearner();
    console.log(Learner.getAllInstances());
}

function isCourseInputValid(course) {
    const courseInfoName = ([...CourseInfo.name]).join('');

    if(course===courseInfoName){
        return true;
    } else {
        console.log(`Entered course '${course}' is not a valid input.`);
        return false;
    }
}

function isAssignmentGroupValid(ags) {
    const AssignmentGroupId = AssignmentGroup.id;

    if(ags===AssignmentGroupId){
        return true;
    } else {
        console.log(`Entered Assignment Group Id '${ags}' is not a valid input.`);
        return false;
    }
}

function isLearnerSubmissionsValid(submissions) {
    const LearnerIdArray = getLearnerIdArray(LearnerSubmissions);

    if(LearnerIdArray.includes(submissions)){
        return true;
    } else {
        console.log(`Entered Learner Id '${submissions}' is not a valid input.`);
        return false;
    }
}
  
function getLearnerData(course, ags, submissions) {
    try {
        if (isCourseInputValid(course) && isAssignmentGroupValid(ags) && isLearnerSubmissionsValid(submissions)) {
            validInput();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log('There was an error with one of the inputs.');
    }
}


let maxScore = getMaxScore();
const result = getLearnerData("Introduction to JavaScript", 12345, 125);
  
console.log(result);
