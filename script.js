const cats=[
"https://i.ibb.co/Y7DCJJQd/1.png",
"https://i.ibb.co/1YjY105H/2.png",
"https://i.ibb.co/fG1tcNfK/3.png",
"https://i.ibb.co/tMSLNJsw/4.png",
"https://i.ibb.co/BHkJDVkN/5.png",
"https://i.ibb.co/CpnRSZ9P/6.png",
"https://i.ibb.co/xKf1cJRs/7.png",
"https://i.ibb.co/pvcFK3PX/8.png",
"https://i.ibb.co/35JdCRfc/9.png"
];

let firstCard=null, secondCard=null, lock=false;
let score=0, timeLeft, timer, pairs;
const grid=document.getElementById("grid");

function startGame(level){
  document.getElementById("menu").style.display="none";
  document.getElementById("game").style.display="flex";

  if(level==="easy"){pairs=4;timeLeft=15;grid.style.gridTemplateColumns="repeat(4,1fr)";}
  if(level==="medium"){pairs=6;timeLeft=30;grid.style.gridTemplateColumns="repeat(4,1fr)";}
  if(level==="hard"){pairs=9;timeLeft=50;grid.style.gridTemplateColumns="repeat(6,1fr)";}

  score=0;
  document.getElementById("score").textContent=score;
  document.getElementById("time").textContent=timeLeft;

  createBoard();
  startTimer();
}

function createBoard(){
  grid.innerHTML="";
  let selected=cats.slice(0,pairs);
  let gameCats=[...selected,...selected].sort(()=>0.5-Math.random());

  gameCats.forEach(cat=>{
    let card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="${cat}"></div>
      </div>`;
    card.onclick=()=>flipCard(card,cat);
    grid.appendChild(card);
  });
}

function flipCard(card,cat){
  if(lock||card===firstCard) return;
  card.classList.add("flip");
  if(!firstCard){firstCard=card;firstCard.dataset.cat=cat;}
  else{secondCard=card;secondCard.dataset.cat=cat;checkMatch();}
}

function checkMatch(){
  lock=true;
  if(firstCard.dataset.cat===secondCard.dataset.cat){
    score++;
    document.getElementById("score").textContent=score;
    if(score===pairs){winGame();}
    reset();
  }else{
    setTimeout(()=>{
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      reset();
    },800);
  }
}

function reset(){firstCard=null;secondCard=null;lock=false;}

function startTimer(){
  clearInterval(timer);
  timer=setInterval(()=>{
    timeLeft--;
    document.getElementById("time").textContent=timeLeft;
    if(timeLeft<=0){loseGame();}
  },1000);
}

function winGame(){
  clearInterval(timer);
  showPopup("You matched all the cats!");
}

function loseGame(){
  clearInterval(timer);
  showPopup("Time's up! Try again!");
}

function showPopup(msg){
  document.getElementById("popupMessage").textContent=msg;
  document.getElementById("popup").style.display="flex";
}

function closePopup(){
  document.getElementById("popup").style.display="none";
  goMenu();
}

function goMenu(){
  clearInterval(timer);
  document.getElementById("game").style.display="none";
  document.getElementById("menu").style.display="flex";
}
