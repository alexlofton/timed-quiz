var questions = [
    {
        prompt: "Question 1: What does the DOM stand for in JavaScript?",
        options: ["Document Object Model", "Data Output Mechanism", "Document Order Model", "Dynamic Object Manipulation"],
        answer: "Document Object Model"
    },

    {
        prompt: "Question 2: How do you declare a variable in JavaScript?",
        options: ["var myVariable;", "let myVariable;", "const myVariable;", "All of the above"],
        answer: "All of the above"
    },

    {
        prompt: "Question 3: Which of the following is used to comment a single line in JavaScript?",
        options: ["// Comment", "/* Comment */", "# Comment", "-- Comment --"],
        answer: "// Comment"
    },

    {
        prompt: "Question 4: What is the purpose of the alert() function in JavaScript?",
        options: ["Display an alert box with a message", "Print a message to the console", "Create a pop-up window", "Define a variable"],
        answer: "Display an alert box with a message" 
    },

    {
        prompt: "Question 5: How do you write an if statement in JavaScript?",
        options: ["if (condition) { // code }", "if {condition} then { // code }", "condition { // code } i", "{ // code } if (condition)"],
        answer: "if (condition) { // code }"
    },
        ];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
        time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Incorrect! The correct answer is ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "#FF6961";
    } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "#99EE99";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
    quizEnd();
    } else {
    getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
    quizEnd();
    }
}

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
    var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
        score: time,
        name: name
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

startBtn.onclick = quizStart;

submitBtn.onclick = saveHighscore;

nameEl.onkeyup = checkForEnter;

