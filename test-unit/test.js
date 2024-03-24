function validateInput(e) {
    e.preventDefault();
    let LearnerSubmissionsArray = document.querySelector('#array-input').value;

    let displayData = document.querySelector('.result');

    displayData.innerHTML = isLearnerSubmissionsValid(LearnerSubmissionsArray);
}

function isLearnerSubmissionsValid(submissions) { // checks if entered Learner Submissions has needed properties
    submissions = parseInput(submissions);
    // console.log(submissions, '\n inside isLearnerSubmissionsValid()');
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

function parseInput(text) {
    // console.log(text, '\ninside parseInput()');
    // console.log(typeof text)
    // Split the text content of the textarea by newline character
    text = JSON.stringify(text);
    let lines = JSON.parse(text);
    lines = lines.split(';')
    // console.log(lines, '\nprinting lines inside parseInput()');
    // console.log(typeof lines)
    // Initialize an array to store parsed objects
    let submissions = [];
    // console.log(submissions, '\nsubmissions, inside parseInput()');

    // Iterate over each line and parse the data into objects
    lines.forEach(line => {
        // Trim any leading or trailing whitespace from the line
        line = line.trim();

        // Skip empty lines
        if (line === '') {
            return;
        }

        // Split the line by comma to extract individual fields
        const fields = line.split(',');

        // Extract values for learner_id, assignment_id, submitted_at, and score
        const learner_id = parseInt(fields[0].split(':')[1].trim());
        const assignment_id = parseInt(fields[1].split(':')[1].trim());      
        const submitted_at = fields[2].split(':')[1].trim();
        const score = parseInt(fields[3].split(':')[1].trim());

        // console.log(`learner id: ${learner_id}, assg id: ${assignment_id}, submitted at: ${submitted_at}, score: ${score}`)

        // Construct an object with the extracted values
        const data = {
            learner_id: learner_id,
            assignment_id: assignment_id,
            submission: {
                submitted_at: submitted_at,
                score: score
            }
        };
        // console.log(data, ': data')
        // Add the parsed object to the submissions array
        submissions.push(data);
    });

    return submissions;
}