const questions = [
  {
    question: `What's the output?
        <br />
        function sayHi() {
        <br />
          console.log(name);
        <br />
          console.log(age);
        <br />
          var name = 'Lydia';
        <br />
          let age = 21;
        <br />
        }
        <br />
        <br />
        sayHi();`,
    option1: `Lydia and undefined`,
    option2: `Lydia and ReferenceError`,
    option3: `undefined and ReferenceError`,
    option4: `ReferenceError and 21`,
    correct: 2,
  },
  {
    question: `What's the output?
        for (var i = 0; i < 3; i++) {
          setTimeout(() => console.log(i), 1);
        }
        
        for (let i = 0; i < 3; i++) {
          setTimeout(() => console.log(i), 1);
        }`,
    option1: `0 1 2 and 0 1 2`,
    option2: `0 1 2 and 3 3 3`,
    option3: `3 3 3 and 0 1 2`,
    option4: `None of these`,
    correct: 2,
  },
  {
    question: `What's the output?
        const shape = {
          radius: 10,
          diameter() {
            return this.radius * 2;
          },
          perimeter: () => 2 * Math.PI * this.radius,
        };
        
        console.log(shape.diameter());
        console.log(shape.perimeter());`,
    option1: `20 and 62.83185307179586`,
    option2: `20 and NaN`,
    option3: `20 and 63`,
    option4: `NaN and 63`,
    correct: 1,
  },
];
let submittedAnswers = [];
const quizContainer = document.querySelector(".quiz-body");
const startQuizModal = document.querySelector(".startQuiz");
const palletteContainer = document.querySelector(".pallette-container");
const answerBtns = document.querySelectorAll(".answerBtn");
const showQuestionPalette = document.getElementById("showQuestionPalette");
const scoreElement = document.getElementById("score");
const timeContainer = document.querySelectorAll(".timeContainer");
const progressIndicator = document.querySelector(".progressIndicator");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#previousBtn");
const totalScoreElem = document.querySelector(".totalScore");
let inputs = document.querySelectorAll(".input");
const startBtn = document.querySelector("#start");
let questionButton = document.querySelectorAll(".btn");

let totalQuestions = 5;
let remainingHour, remainingMin, remainingSec;
let setTime, timer;
let questionPalletteHidden = true;
let currentQuestionSelected = 0;
let score = 0;
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    showTimeinTimer(inputs[0].value, inputs[1].value, inputs[2].value);
  });
});
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputs = document.querySelectorAll(".input");
  let setHour = inputs[0].value ? parseInt(inputs[0].value) : 0;
  let setMin = inputs[1].value ? parseInt(inputs[1].value) : 0;
  let setSec = inputs[2].value ? parseInt(inputs[2].value) : 59;
  totalQuestions = inputs[3].value ? parseInt(inputs[3].value) : 5;
  startQuizModal.classList.add("hide");
  quizContainer.classList.remove("hide");
  generateQuestionPallette(totalQuestions);
  showFirstQuestionAtStart();
  questionButton = document.querySelectorAll(".btn");
  addEventListenertoQuestionsBtns(questionButton);
  timerStart(setHour, setMin, setSec);
  console.log(questionButton);
});

function generateQuestionPallette(numberOfQuestions) {
  palletteContainer.innerHTML = "";
  for (i = 1; i <= numberOfQuestions; i++) {
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.classList.add("btn");
    btn.innerHTML = i;
    palletteContainer.appendChild(btn);
  }
}
function showFirstQuestionAtStart() {
  showCurrentQuestion(questions[0], currentQuestionSelected + 1);
  const firstQuestion = document.querySelector(".btn");
  firstQuestion.classList.add("active");
}

showQuestionPalette.addEventListener("click", (e) => {
  if (questionPalletteHidden) {
    palletteContainer.classList.remove("hide");
    questionPalletteHidden = false;
    e.currentTarget.innerHTML = "Hide Question Pallette";
    e.currentTarget.style.backgroundColor = "green";
    e.currentTarget.style.color = "white";
  } else if (!questionPalletteHidden) {
    palletteContainer.classList.add("hide");
    questionPalletteHidden = true;
    e.currentTarget.innerHTML = "Show Question Pallette";
    e.currentTarget.style.backgroundColor = "hsl(58, 82%, 56%)";
    e.currentTarget.style.color = "hsl(0, 0%, 20%)";
  }
});

function removeClass(buttons, classname) {
  buttons.forEach((btn) => {
    btn.classList.remove(classname);
  });
}
function showCurrentQuestion(object, questionNo) {
  try {
    if (object === undefined) {
      throw new Error("exceeded maximum question No");
    }
    removeClass(questionButton, "active");
    removeClass(answerBtns, "correct");
    removeClass(answerBtns, "wrong");
    const currentQuestion = document.querySelector(".question");
    currentQuestion.innerHTML = `Question - ${questionNo} - ${object.question}`;
    const option1 = document.querySelector("#A-answer");
    const option2 = document.querySelector("#B-answer");
    const option3 = document.querySelector("#C-answer");
    const option4 = document.querySelector("#D-answer");
    option1.innerHTML = object.option1;
    option2.innerHTML = object.option2;
    option3.innerHTML = object.option3;
    option4.innerHTML = object.option4;
  } catch (error) {
    console.log(error.message);
  }
}
function addEventListenertoQuestionsBtns(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const questionNumber = Number(e.currentTarget.innerHTML);
      currentQuestionSelected = questionNumber - 1;
      showCurrentQuestion(questions[questionNumber - 1], questionNumber);
      e.currentTarget.classList.add("active");
    });
  });
}

answerBtns.forEach((answerBtn, index) => {
  answerBtn.addEventListener("click", (e) => {
    let correctAnsIndex = questions[currentQuestionSelected].correct;
    if (
      correctAnsIndex === index &&
      !submittedAnswers.includes(currentQuestionSelected)
    ) {
      e.currentTarget.classList.add("correct");
      scoreElement.innerHTML = parseInt(scoreElement.innerHTML) + 1;
      score++;
      console.log(score);
    } else if (!submittedAnswers.includes(currentQuestionSelected)) {
      e.currentTarget.classList.add("wrong");
      answerBtns[correctAnsIndex].classList.add("correct");
    }
    submittedAnswers.push(currentQuestionSelected);
  });
});
function makeRandomNumber(lowest, highest) {
  return Math.floor(Math.random() * highest) + lowest;
}
function makeRandomIndexArray(array) {
  while (array.length < 100) {
    let number = makeRandomNumber(1, 100);
    if (!array.includes(number)) array.push(number);
  }
  return array;
}
let indexArray = [];
indexArray = makeRandomIndexArray(indexArray);
function timerStart(setHour, setMin, setSec) {
  let timeDuration = setHour * 3600 + setMin * 60 + setSec;
  setTime = Date.now() + timeDuration * 1000;
  timer = setInterval(() => {
    countDownTime(timeDuration);
  }, 1000);
}
function reset() {
  clearInterval(timer);
  showTimeinTimer(0, 0, 0);
  setProgressIndicatorWidth(0);
  quizContainer.classList.add("hide");
  startQuizModal.classList.remove("hide");
  inputs.forEach((input) => (input.value = 0));
  showScore(score);
  scoreElement.innerHTML = "0";
  score = 0;
  currentQuestionSelected = 0;
  submittedAnswers.length = 0;
}

function countDownTime(timeDuration) {
  let currentTime = Date.now();
  let remainingTime = setTime - currentTime;
  if (remainingTime > 0) {
    remainingHour = Math.floor(remainingTime / 3600000);
    remainingMin = Math.floor(remainingTime / 60000) - remainingHour * 60;
    remainingSec = Math.floor(remainingTime / 1000) % 60;
    showTimeinTimer(remainingHour, remainingMin, remainingSec);
    let progressIndicatorWidth = 1 - remainingTime / (timeDuration * 1000);
    setProgressIndicatorWidth(progressIndicatorWidth.toFixed(2));
  } else {
    timerStop();
  }
}
function timerStop() {
  reset();
}

function showTimeinTimer(remainingHour, remainingMin, remainingSec) {
  timeContainer[0].innerHTML =
    9 - remainingHour >= 0
      ? `0${remainingHour}&nbsp;:`
      : `${remainingHour}&nbsp;:`;
  timeContainer[1].innerHTML =
    9 - remainingMin >= 0
      ? `&nbsp;0${remainingMin}&nbsp;:`
      : `&nbsp;${remainingMin}&nbsp;:`;
  timeContainer[2].innerHTML =
    9 - remainingSec >= 0 ? `&nbsp;0${remainingSec}` : `&nbsp;${remainingSec}`;
}

function setProgressIndicatorWidth(currentWidth) {
  progressIndicator.style.setProperty("--progressWidth", currentWidth * 25);
  let selectedColor = "hsla(120, 100%, 25%, 0.4)";
  if (currentWidth >= 0.9) selectedColor = "hsla(0, 100%, 50%, 0.4)";
  else if (currentWidth >= 0.8) selectedColor = "hsla(39, 100%, 50%, 0.4)";

  progressIndicator.style.backgroundColor = selectedColor;
}
nextBtn.addEventListener("click", changeQuestion);
prevBtn.addEventListener("click", changeQuestion);
function changeQuestion(event) {
  console.log(event.currentTarget.id);
  if (
    event.currentTarget.id === "nextBtn" &&
    currentQuestionSelected < totalQuestions - 1
  ) {
    currentQuestionSelected++; //nextBtn is clicked => go to next question
    console.log("nextBtn is clicked");
  } else if (
    event.currentTarget.id === "previousBtn" &&
    currentQuestionSelected > 0
  ) {
    currentQuestionSelected--; //previousBtn is clicked => go to previous question
    console.log("prev btn is clicked");
  } else {
    console.log("returned");
    return;
  }
  showCurrentQuestion(
    questions[currentQuestionSelected],
    currentQuestionSelected + 1
  );
  questionButton[currentQuestionSelected].classList.add("active");
}
function showScore(score) {
  totalScoreElem.classList.remove("hide");
  totalScoreElem.innerHTML = `Your score is ${score}`;
}
