const questions = 
[
    {
        question:`What's the output?
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
        option1:`Lydia and undefined`,
        option2:`Lydia and ReferenceError`,
        option3:`undefined and ReferenceError`,
        option4:`ReferenceError and 21`,
        correct:2
    },
    {
        question:`What's the output?
        for (var i = 0; i < 3; i++) {
          setTimeout(() => console.log(i), 1);
        }
        
        for (let i = 0; i < 3; i++) {
          setTimeout(() => console.log(i), 1);
        }`,
        option1:`0 1 2 and 0 1 2`,
        option2:`0 1 2 and 3 3 3`,
        option3:`3 3 3 and 0 1 2`,
        option4:`None of these`,
        correct:2
    },
    {
        question:`What's the output?
        const shape = {
          radius: 10,
          diameter() {
            return this.radius * 2;
          },
          perimeter: () => 2 * Math.PI * this.radius,
        };
        
        console.log(shape.diameter());
        console.log(shape.perimeter());`,
        option1:`20 and 62.83185307179586`,
        option2:`20 and NaN`,
        option3:`20 and 63`,
        option4:`NaN and 63`,
        correct:1
    }
];
const palletteContainer = document.querySelector(".pallette-container");
const answerBtns = document.querySelectorAll(".answerBtn");
let currentQuestionSelected = 0;
generateQuestionPallette(100);
function generateQuestionPallette(numberOfQuestions){
    for(i=1;i<=numberOfQuestions;i++){
        const btn = document.createElement("button");
        btn.type = "submit";
        btn.classList.add("btn");
        btn.innerHTML = i;
        palletteContainer.appendChild(btn);
    }
}
const questionButton = document.querySelectorAll(".btn");
function removeClass(buttons,classname){
    buttons.forEach(btn=>{
        btn.classList.remove(classname);
    })
}
function showCurrentQuestion(object,questionNo){
    try{
        if(object===undefined){
            throw new Error("exceeded maximum question No");
        }
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
    }
    catch(error){
        console.log(error.message);
    }
}
questionButton.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        removeClass(questionButton,"active");
        removeClass(answerBtns,"correct");
        removeClass(answerBtns,"wrong");
        const questionNumber = Number(e.currentTarget.innerHTML);
        currentQuestionSelected = questionNumber -1;
        e.currentTarget.classList.add("active");
        showCurrentQuestion(questions[questionNumber-1], questionNumber);
        // addEventListenerToAnswers(questions[questionNumber-1].correct);
        // removeClass(answerBtns,"correct");
        // removeClass(answerBtns,"wrong");
    })
})
answerBtns.forEach((answerBtn,index)=>{
    answerBtn.addEventListener("click",(e)=>{
        let correctAnsIndex = questions[currentQuestionSelected].correct 
        if(correctAnsIndex === index)
            e.currentTarget.classList.add("correct");
        else {
            e.currentTarget.classList.add("wrong");
            answerBtns[correctAnsIndex].classList.add("correct");
        }
    })
})
function makeRandomNumber(lowest,highest){
    return Math.floor(Math.random()*highest) + lowest;
}
function makeRandomIndexArray(array){
    while(array.length<100){
        let number = makeRandomNumber(1,100);
        if(!array.includes(number)) array.push(number);
    }
    return array;
}
let indexArray = [];
indexArray = makeRandomIndexArray(indexArray);





