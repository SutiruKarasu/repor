/* =========================================================
   CLOCK INN QUIZ X
========================================================= */

const FORMSPREE_URL =
"https://formspree.io/f/xzdojayg";

/* =========================================================
   ONE ATTEMPT RESTRICTION
========================================================= */

window.onload = function(){

const alreadyPlayed =
localStorage.getItem("quiz_completed");

if(alreadyPlayed === "true"){

document.getElementById("start-screen")
.innerHTML = `

<div class="login-card"
style="text-align:center;">

<h1 style="
color:#ff4757;
margin-bottom:20px;
">
SHIFT DENIED
</h1>

<p style="
line-height:1.6;
margin-bottom:25px;
">
You already completed this shift.
<br>
Only one attempt is allowed.
</p>

<button
id="reset-attempt"
class="primary-btn"
>
RESET SESSION
</button>

</div>

`;

document
.getElementById("reset-attempt")
.onclick = ()=>{

localStorage.clear();
location.reload();

};

}

};

/* =========================================================
   GAME STATE
========================================================= */

let currentQuestionIndex = 0;

let score = 0;

let streak = 0;

let maxStreak = 0;

let timeLeft = 10;

let timerInterval;

let isAnswered = false;

/* =========================================================
   SOUND
========================================================= */

const tickSound =
document.getElementById("tick-sound");

/* =========================================================
   QUESTIONS
========================================================= */

const quizData = [

{
topic:"Celebrity Secrets",
q:"Which actor played The Rock before Hollywood?",
a:["John Cena","Dwayne Johnson","Vin Diesel","Jason Statham"],
c:1
},

{
topic:"Nature",
q:"Which animal has blue blood?",
a:["Shark","Whale","Octopus","Seal"],
c:2
},

{
topic:"Disney",
q:"What is Mickey Mouse's dog called?",
a:["Bolt","Goofy","Pluto","Donald"],
c:2
},

{
topic:"Media",
q:"Which show includes Stark family?",
a:["Vikings","Game of Thrones","Breaking Bad","The Witcher"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Which country celebrates Holi?",
a:["India","Japan","China","Brazil"],
c:0
},

{
topic:"Gaming",
q:"Which character eats dots?",
a:["Mario","Pac-Man","Sonic","Pikachu"],
c:1
}

];

/* =========================================================
   DOM
========================================================= */

const startBtn =
document.getElementById("start-btn");

const startScreen =
document.getElementById("start-screen");

const quizScreen =
document.getElementById("quiz-screen");

const resultScreen =
document.getElementById("result-screen");

const answersContainer =
document.getElementById("answers-container");

const questionText =
document.getElementById("question-text");

const topicDisplay =
document.getElementById("topic-display");

const questionCounter =
document.getElementById("question-counter");

const scoreDisplay =
document.getElementById("score-display");

const streakBadge =
document.getElementById("streak-badge");

/* =========================================================
   START
