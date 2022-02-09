const startBtn = document.getElementById("start_game");
const information = document.getElementById("card_information");
const question_container = document.getElementById("question_container");

let shuffleQuestions, currentQuestion;
const questionText = document.getElementById("question");
const answerBtn = document.getElementById("answer_buttons");

const correctOrIncorrect = document.getElementById("question_checker");
const allDone = document.getElementById("all_done");
const highScore = document.getElementById("high_score");

const score = document.getElementById("score");
const goBack = document.getElementById("go_back");
const clearHighScore = document.getElementById("clear_high_score");

const line = document.getElementsByClassName("line");
const submitScore = document.getElementById("submit_score");
const initials = document.getElementById("initials");

const score_list = document.getElementById("score_list");
const countDown = document.getElementById("timer");

let history = [];

const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
    correctAnswer: (index) => {
      if (index === 2) {
        correctOrIncorrect.innerText = "Correct!";
        setTimeout(() => {
          nextQuestion();
        } , 400);
      } else {
        correctOrIncorrect.innerText = "Incorrect!";
        setTimeout(() => {
          nextQuestion();
          timeLeft-=10;
        } , 400);
      }
    }
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
    correctAnswer: (index) => {
      if (index === 3) {
        correctOrIncorrect.innerText = "Correct!";
        setTimeout(() => {
          nextQuestion();
        } , 400);
      } else {
        correctOrIncorrect.innerText = "Incorrect!";
        setTimeout(() => {
          nextQuestion();
          timeLeft-=10;
        } , 400);
      }
    }
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
    correctAnswer: (index) => {
      if (index === 2) {
        correctOrIncorrect.innerText = "Correct!";
        setTimeout(() => {
          nextQuestion();
        } , 400);
      } else {
        correctOrIncorrect.innerText = "Incorrect!";
        setTimeout(() => {
          nextQuestion();
          timeLeft-=10;
        } , 400);
      }
    }
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
    correctAnswer: (index) => {
      if (index === 3) {
        correctOrIncorrect.innerText = "Correct!";
        setTimeout(() => {
          nextQuestion();
        } , 400);
      } else {
        correctOrIncorrect.innerText = "Incorrect!";
        setTimeout(() => {
          nextQuestion();
          timeLeft-=10;
        } , 400);
      }
    }
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
    correctAnswer: (index) => {
      if (index === 0) {
        correctOrIncorrect.innerText = "Correct!";
        setTimeout(() => {
          nextQuestion();
        } , 400);
      } else {
        correctOrIncorrect.innerText = "Incorrect!";
        setTimeout(() => {
          nextQuestion();
          timeLeft-=10;
        } , 400);
      }
    }
  },
];

function generateQuestion(index = 0) { // index is the current question
  for(i = 0; i <= 3 ; i++) {
    answerBtn.innerHTML += `
      <button class="btn" onClick="questions[${index}].correctAnswer(${i})">${questions[index].options[i]}</button>
    `;
  }
}

function clearDom() {
  questionText.innerHTML = "";
  answerBtn.innerHTML = "";
  correctOrIncorrect.innerHTML = "";
}

// create a count down timer

let timeLeft = 60;

const timer = () => {
  let timerInterval = setInterval(function() {
    if(timeLeft > 0) {
      timeLeft--;
      countDown.innerText = timeLeft;
    } else {
      clearInterval(timerInterval);
      question_container.classList.add("hide");
      allDone.classList.remove("hide");
    }
  } , 1000);
}


// Start Game

function startGame(){
  clearDom();
  information.classList.add("hide");
  question_container.classList.remove("hide");
  currentQuestion = 0;

  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  questionText.innerText = questions[currentQuestion].questionText;

  generateQuestion(currentQuestion);
  timer();
};

function nextQuestion() { // next question function to be called when the answer is correct or incorrect
  clearDom();
  if(currentQuestion < questions.length - 1) {
    currentQuestion++;
    questionText.innerText = questions[currentQuestion].questionText;
    generateQuestion(currentQuestion);
  }else{
    question_container.classList.add("hide");
    allDone.classList.remove("hide");
    countDown.innerText = "Test Complete!";
  }
}

function generateScoreList() { // generate the score list when the game is over and the user wants to see the score list
  score_list.innerHTML = "";
  for(i = 0; i < history.length; i++) {
    score_list.innerHTML += `
      <ol>
        <h2 class="subScore">
          <li>
            ${history[i].initials} - ${history[i].score}
          </li>
        </h2>
      </ol>
    `;
  }
}

const emptyHightScore = () => history.length = 0; // empty the history array when the game is over

startBtn.addEventListener("click", startGame);

submitScore.addEventListener("click", (e) => {
  e.preventDefault();
  history.push({
    score: timeLeft,
    initials: initials.value
  });
  localStorage.setItem("highScore", JSON.stringify(history));
  history = JSON.parse(localStorage.getItem("highScore")); // if there is a high score in local storage, then set the high score to the high score in local storage
  timeLeft = 0;
  allDone.classList.add("hide");
  highScore.classList.remove("hide");
  generateScoreList();

});

clearHighScore.addEventListener("click", () => {
  highScore.classList.add("hide");
  allDone.classList.add("hide");
  information.classList.remove("hide");
  localStorage.clear();
  emptyHightScore();
});

goBack.addEventListener("click", () => {
  highScore.classList.add("hide");
  allDone.classList.remove("hide");
});

console.log(history);