// Define a class Learner that will store learner id, assignments and course id,
//  as well as relevant getters
class Learner {
    static instances = []; // keep a static array of all Learner instances

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
    // Copy LearnerSubmissions array to avoid modifying the  original array
    let LearnerSubmissionsCopy = LearnerSubmissions.slice();
    let LearnerIdArray = []; // initialize an array that will store IDs of all Learners

    // loop through LearnerSubmissions array
    for(let learnerObject of LearnerSubmissionsCopy) {
        if(!LearnerIdArray.includes(learnerObject.learner_id)) {
            LearnerIdArray.push(learnerObject.learner_id); // push IDs that aren't already in the array
        }
    }
    // console.log(LearnerIdArray);
    return LearnerIdArray;
  }

function createLearner() { // creates Learners based off their ID
    // get array of all Learner IDs
    const learnerIdArray = getLearnerIdArray(LearnerSubmissions); 

    for(let learner of learnerIdArray) {
        learner = new Learner(learner); // instantiate new Learner based off ID
        // console.log(learner);
    }
  }

function populateAllScores(learnerId, LearnerSubmissions) { // populates Learner scores

    // copy the array in order to keep it unchanged
    let LearnerSubmissionsCopy = LearnerSubmissions.slice();
    let scoresArray = []; // initialize an array that will store all scores

    // filter out all assignments that are due in the future
    const notDueInTheFuture = LearnerSubmissionsCopy.filter(object => isDueInTheFuture(object.assignment_id) === false);
    // console.log(notDueInTheFuture);

    for(let object of notDueInTheFuture) {
        if(learnerId!==object.learner_id) {
            continue;
        //if ids match,  pass learner id, assignment id and submission date into a function that will return 
        // whether the submission was on time
        } else if(learnerId === object.learner_id && isSubmittedOntime(object.assignment_id, object.submission.submitted_at)) {
            //if on time push regular score
            scoresArray.push(object.submission.score);
            // console.log('This score hasnt been adjusted: ', object.submission.score);
        } else {
            // if submitted late, deduct 10% and push adjusted score
            let deductedScore = calculatePenalty(object.submission.score); 
            scoresArray.push(deductedScore);
            // console.log('This score has been adjusted: ', object.submission.score, ', Deducted score is: ',deductedScore);
        }
      }

    // console.log(`Assignments array after for loop: ${scoresArray}`);
    return scoresArray;
  }

function calculatePenalty(score) { // returns adjusted score if assignment was submitted late
    // deduct 10% from original score
    const adjustedScore = Math.floor(score - (score*0.1));

    return adjustedScore;
}

function isDueInTheFuture(assignmentId) { //checks date based on assignment ID
    let isTrue; // initialize a variable that will store result boolean

    const today = new Date(); // get todays date
    const dueDate = new Date(AssignmentGroup.assignments[assignmentId - 1].due_at); // gue assignment due date

    // if due in the future return true
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
    let isOnTime; // initialize a variable that will store result boolean

    //get assignment due date
    const dueDate = new Date(AssignmentGroup.assignments[assignmentId - 1].due_at);
    // console.log(`Due date for ${assignmentId} is ${dueDate}`)

    //get submission date
    const submittedDate = new Date(submitted_at);
    // console.log(`It was submitted at ${submittedDate}, by a learner with id ${learnerId}`);

    //if submitted on time return true
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
            //add best possible points
            maxScore += assignment.points_possible;
        }
        i++; // move onto the next index
    }

    //warn if maxScore is zero
    if(maxScore === 0) {
        console.log(`Error. Maximum possible score for one of the assignments equals zero.`)
    }
    // console.log(maxScore);
    return maxScore;
}

function populateAverageScore(allScores, maxScore) { // returns Learner total average score
    //initialize total score that will store sum of all scores
    let totalScore = 0;
    let allScoresCopy = [...allScores]; // copy scores array to avoid modifying it

    //get sum of all learners scores
    for(let score of allScoresCopy) {
        totalScore += score;
    }

    // calculate average, round to 2 and convert back to a number
    const averageScore = parseFloat((totalScore / maxScore).toFixed(2)); 

    return averageScore;
  }

function populateAssignments(allScores) {// returns key:value pairs of Learner assignments and relevant average scores

    // copy all scores array to avoid modifying it
    let allScoresCopy = [...allScores];
    const assignments = {}; // initialize object that will store key value pairs
    let id = 1; // initialize id counter

    //loop through scores
    for(let score of allScoresCopy) {
        score = calculateAvgAssignmentScore(score, id); // pass score and its id to calculate average score
        assignments[id] = score; // assign a key:value pair
        id +=1; // increment id
    }

    return assignments;
}

function calculateAvgAssignmentScore(score, id) { // returns Learner average assignment score
    //copy assignment group array to avoid modifying it
    let AssignmentGroupCopy = [...AssignmentGroup.assignments];

    //to get maximum of possible points filter assignment group by assignment id and map possible points
    const maxPointsPossible = AssignmentGroupCopy.filter(assignment => assignment.id === id)
    .map(assignment => assignment.points_possible)[0];

    // console.log(maxPointsPossible);

    if (maxPointsPossible===0) {
        console.log(`Error. Assignment with ${id} ID has 0 maximum possible points.`);
        throw new Error();
    } else if (maxPointsPossible!==0){
        const result = score / maxPointsPossible;
        return result;
    }    
}

function validInput() { // calls createLearner() and prints all Learner instances to console
    createLearner();
    let unformattedData = Learner.getAllInstances();
    let formattedData = []

    for(let object of unformattedData) {
        const formattedObject = {
            LearnerID: object.id,
            AvgScore: object.averageScore,
            AllAssignments: object.allAssignments
        };
        formattedData.push(formattedObject);
        // console.log(formattedObject)
    }

    console.log(formattedData);
}

function isCourseInputValid(course) { // checks if entered course equals valid course name
    // get course name
    const courseInfoName = ([...CourseInfo.name]).join('');

    // if entered input equals course name return true
    if(course===courseInfoName){
        return true;
    } else {
        console.log(`Entered course '${course}' is not a valid input.`); // warn of invalid input
        return false;
    }
}

function isAssignmentGroupValid(ags) { // checks if entered Assignment Group ID equals valid Assignment Group ID
    // get valid id
    const AssignmentGroupId = AssignmentGroup.id;

    //compare entered id to the valid id, return true if equal
    if(ags===AssignmentGroupId){
        return true;
    } else {
        console.log(`Entered Assignment Group Id '${ags}' is not a valid input.`); // warn of invalid input
        return false;
    }
}

function isLearnerSubmissionsValid(submissions) { // checks if entered Learner Submissions has needed properties
    for(let object of submissions) {
        if(!object.hasOwnProperty('learner_id')) {
            console.log(`Error. Learner Submissions is missing learner ID.\n`, object);
            throw new Error();
        } else if(!object.hasOwnProperty('assignment_id')) {
            console.log(`Error. Learner Submissions is missing assignment ID.\n`, object);
            throw new Error();
        } else if(!object.submission.hasOwnProperty('submitted_at')) {
            console.log(`Error. Learner Submissions is missing assignment submission date.\n`, object);
            throw new Error();
        } else if(!object.submission.hasOwnProperty('score')) {
            console.log(`Error. Learner Submissions is missing assignment submission score.\n`, object);
            throw new Error();
        } 
    }
    return true;
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
const result = getLearnerData("Introduction to JavaScript", 12345, LearnerSubmissions);
  
// console.log(result); // <--- uncommenting this leads to 'undefined' being printed to the console

