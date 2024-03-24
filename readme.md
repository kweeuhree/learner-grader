<h2>SBA 308: JavaScript Fundamentals</h2>
<h3>Summary:</h3>
This repository contains a code solution to a Skills Based Assessment on JavaScript Fundamentals <code>logic.js</code>, as well as a simple application that implements that logic (https://kweeuhree.github.io/sba-308/). The data fed into the program has be formatted a certain way for the script to work, so use sample data provided on the webpage. 
<p>A special attention has been paid to make sure all variable names have relevant semantic reflection.</p>
<p><code>getLearnerData()</code> takes three arguments that have to be entered without typos, as input undergoes basic validation. The first argument must be a valid course name, which is "Introduction to JavaScript". The second argument must be a valid Assignment Group ID, or 12345. The third argument must be a Learner Submissions Array, consisting of objects with following properties: <code>learner_id</code>, <code>assignment_id</code>, <code>submission.submitted_at</code>, and <code>submission.score</code>. Any other inputs will raise an error.</p>
<p>If any of the given assignments in the Assignment Group has a maximum possible points of 0, the program will throw an error.</p>
<p>The main logic revolves around Learner class, that holds individually relevant information. All instances of class are kept in a static <code>instances</code> array. A Learner is instantiated when a new ID appears in a Learner Submissions array. The program ultimately outputs an array of all instances of class Learner.</p>
<p>The code is fragmented into functions which in turn allows for easier testing.</p>
<p><code>IsDueInTheFuture()</code> is used in two other functions: <code>populateAllScores()</code>, and <code>getMaxScore()</code>. This is a very simple function that does only one thing: based on a parameter, it checks whether due date of an assignment is in the future.</p>
<hr>
<h2>Requirements</h2>
<ul>
<li>Declared variables properly using let and const where appropriate.</li>
<li>Used different operators, such as logical operators (ex. <code>getMaxScore()</code>), comparison operators (ex. <code>isSubmittedOnTime()</code>), arithmetic operators (ex. <code>populateAverageScore()</code>).</li>
<li>Used strings, numbers, and Boolean values cached within variables.</li>
<li>Used multiple if/else statements to control program flow.</li>
<li>Used try/catch statements to manage potential invalid data being fed into the program.</li>
<li>Utilizing multiple for loops and a while loop.</li>
<li>Utilizing loop control keyword continue (ex. <code>populateAllScores()</code>).</li>
<li>Created and manipulated arrays and objects.</li>
<li>Demonstrated the retrieval, manipulation, and removal of items in an array or properties in an object.</li>
<li>Used functions to handle repeated tasks.</li>
<li>Program outputs all instances of class Learner formatted as per given example.</li>
<li>Program runs without errors.</li>
<li>Commited frequently to the git repository.</li>
<li>Included a README file that contains a description of my application.</li>
</ul>