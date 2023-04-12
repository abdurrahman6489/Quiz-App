const palletteContainer = document.querySelector(".pallette-container");
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
function removeActive(){
    questionButton.forEach(btn=>{
        btn.classList.remove("active");
    })
}
questionButton.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        removeActive();
        const questionNumber = Number(e.currentTarget.innerHTML);
        console.log(questionNumber);
        e.currentTarget.classList.add("active");
    })
})
function makeRandomNumber(lowest,highest){
    return Math.floor(Math.random()*highest) + lowest;
}
// console.log(makeRandomNumber(1,100));
function makeRandomIndexArray(array){
    while(array.length<100){
        let number = makeRandomNumber(1,100);
        if(!array.includes(number)) array.push(number);
    }
    return array;
}
let indexArray = [];
indexArray = makeRandomIndexArray(indexArray);
console.log(indexArray);

// indexArray.sort((a,b)=>(a-b));



