var questions = [
    {
        prompt: "Question 1",
        options: ["a", "b", "c", "d", "e"],
        answer: "a"
    },

    {
        prompt: "Question 2",
        options: ["a", "b", "c", "d", "e"],
        answer: "b"
    },

    {
        prompt: "Question 3",
        options: ["a", "b", "c", "d", "e"],
        answer: "c"
    },

    {
        prompt: "Question 4",
        options: ["a", "b", "c", "d", "e"],
        answer: "d" 
    },

    {
        prompt: "Question 5",
        options: ["a", "b", "c", "d", "e"],
        answer: "e"
    }];

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


startBtn.onclick = quizStart;