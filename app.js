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



