let gameSeq=[];
let userSeq=[];
let gameStarted=false;
let level=0;
let high=0;
let h3=document.querySelector("h3");
let h2=document.querySelector("h2");
let color=["red","blue","purple","orange"];
let btns=document.querySelectorAll(".box");
let start=document.querySelector("#startBtn");
let resetBtn=document.querySelector("#resetBtn");

start.addEventListener("click",function(){
    if(gameStarted == false){
        gameStarted = true;
        levelup();
    }
});

resetBtn.addEventListener("click",function(){
    reset();
    h3.innerText=`Press Start button to start the game`;
});

function levelup(){
    level++;
    userSeq=[];
    h3.innerText=`Game started 
    Level ${level}`;

    let randomIndex=Math.floor(Math.random()*3);
    let randomColor=color[randomIndex];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randomBtn);
}

function btnFlash(btn){
    if(gameStarted == true){
        btn.classList.add("flash");
        setTimeout(function(){
            btn.classList.remove("flash");
        },300);
    }
}

for(btn of btns){
    btn.addEventListener("click",btnPressed);
}

function btnPressed(){
    let btn = this;
    btnFlash(btn);
    btnId=btn.getAttribute("id");
    userSeq.push(btnId);
    check(userSeq.length-1);
}

function check(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else
    {
        h3.innerHTML=`Game Over!! <br> Your score is ${level-1} <br> Press start to play the game`;
        highScore(level-1);
        reset();
    }
}

function reset(){
    gameStarted=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}

function highScore(score){
    if(score>high){
        high=score;
        h2.innerText=`Highest Score: ${high}`;
    }
}