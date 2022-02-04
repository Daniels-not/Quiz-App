const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
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
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
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
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];


const startBtn = document.getElementById("start-game");
const information = document.getElementById("card-information");
const question_container = document.getElementById("question-container");

let shuffleQuestions, currentQuestion;
const questionText = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");

const correctOrIncorrect = document.getElementById("question-checker");

const startGame = () => {
  console.log("start game");
  information.classList.add("hide");
  question_container.classList.remove("hide");

  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;

  setNextQuestion();
};

const resetState = () => {
  setTimeout(() => {
    correctOrIncorrect.innerText = "";
    while (answerBtn.firstChild) { // remove all children from answerBtn div (answer buttons)
      answerBtn.removeChild(answerBtn.firstChild);
    }
    setNextQuestion();
  }, 1000);
};

const setNextQuestion = () => {
  resetState(); // reset state of the questions and answers
  showQuestion(); // show question and options from array of questions and options
  currentQuestion++;
};

const showQuestion = () => {
  questionText.innerHTML = shuffleQuestions[currentQuestion].questionText; // set question text from array of questions

  shuffleQuestions[currentQuestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    answerBtn.appendChild(button);
  }) // set options from array of questions and options
};

const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct === element.dataset.answer) {
    correctOrIncorrect.innerText = "Correct!";
  }
  else {
    correctOrIncorrect.innerText = "Incorrect!";
  }
}

const selectAnswer = () => {
  const correctAnswer = shuffleQuestions[currentQuestion].answer;
  setStatusClass(document.body, correctAnswer);
  Array.from(answerBtn.children).forEach((button) => {
    setStatusClass(button, button.dataset.answer);
  });
};

startBtn.addEventListener("click", startGame);


