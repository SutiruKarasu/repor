/* =========================================================
   CLOCK INN QUIZ X
   FULL FINAL SCRIPT
========================================================= */

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
   SOUNDS
========================================================= */

const tickSound =
document.getElementById("tick-sound");

/* =========================================================
   QUESTIONS
========================================================= */

const quizData = [

/* =========================================================
   CATEGORY 1
   CELEBRITY SECRETS
========================================================= */

{
topic:"Celebrity Secrets",
q:"Which actor played The Rock before Hollywood?",
a:["John Cena","Dwayne Johnson","Vin Diesel","Jason Statham"],
c:1
},

{
topic:"Celebrity Secrets",
q:"Which singer had a chimpanzee named Bubbles?",
a:["Prince","Michael Jackson","Bowie","Freddie Mercury"],
c:1
},

{
topic:"Celebrity Secrets",
q:"Real name of Lady Gaga?",
a:["Stefani Germanotta","Katy Hudson","Ariana Grande","Madonna Louise"],
c:0
},

{
topic:"Celebrity Secrets",
q:"Which billionaire appeared in Iron Man 2?",
a:["Elon Musk","Bill Gates","Jeff Bezos","Mark Cuban"],
c:0
},

{
topic:"Celebrity Secrets",
q:"Which actor injured his hand filming Django Unchained?",
a:["Jamie Foxx","Brad Pitt","Leonardo DiCaprio","Tom Cruise"],
c:2
},

{
topic:"Celebrity Secrets",
q:"Who is Miley Cyrus' godmother?",
a:["Madonna","Dolly Parton","Cher","Pink"],
c:1
},

{
topic:"Celebrity Secrets",
q:"Which actor started as a wrestler?",
a:["Jason Momoa","Dwayne Johnson","Chris Hemsworth","Ryan Reynolds"],
c:1
},

{
topic:"Celebrity Secrets",
q:"Which actor bought a dinosaur skull?",
a:["Johnny Depp","Nicolas Cage","Tom Hanks","Brad Pitt"],
c:1
},

{
topic:"Celebrity Secrets",
q:"Which singer fears indoor plants?",
a:["Britney Spears","Taylor Swift","Adele","Sia"],
c:0
},

{
topic:"Celebrity Secrets",
q:"Which actress insured her smile?",
a:["Julia Roberts","Scarlett Johansson","Emma Stone","Margot Robbie"],
c:0
},

/* =========================================================
   CATEGORY 2
   NATURE
========================================================= */

{
topic:"Nature",
q:"Which animal has blue blood?",
a:["Octopus","Seal","Whale","Shark"],
c:0
},

{
topic:"Nature",
q:"Fastest bird while diving?",
a:["Falcon","Eagle","Hawk","Owl"],
c:0
},

{
topic:"Nature",
q:"Largest living structure on Earth?",
a:["Amazon","Great Barrier Reef","Everest","Sahara"],
c:1
},

{
topic:"Nature",
q:"Which mammal can truly fly?",
a:["Bat","Flying Squirrel","Fox","Otter"],
c:0
},

{
topic:"Nature",
q:"How many bones does a shark have?",
a:["206","120","0","15"],
c:2
},

{
topic:"Nature",
q:"Tallest tree species?",
a:["Pine","Redwood","Oak","Birch"],
c:1
},

{
topic:"Nature",
q:"Earth covered by water?",
a:["60%","71%","80%","90%"],
c:1
},

{
topic:"Nature",
q:"Which butterfly migrates thousands of miles?",
a:["Monarch","Blue","Tiger","Swallowtail"],
c:0
},

{
topic:"Nature",
q:"Main gas in Earth's atmosphere?",
a:["Oxygen","Hydrogen","Nitrogen","CO2"],
c:2
},

{
topic:"Nature",
q:"Which mammal has thickest fur?",
a:["Wolf","Polar Bear","Sea Otter","Fox"],
c:2
},

/* =========================================================
   CATEGORY 3
   DISNEY
========================================================= */

{
topic:"Disney",
q:"What is Mickey Mouse's dog called?",
a:["Bolt","Goofy","Pluto","Donald"],
c:2
},

{
topic:"Disney",
q:"What does Hakuna Matata mean?",
a:["Forever","Stay strong","No worries","Magic"],
c:2
},

{
topic:"Disney",
q:"Which princess loses a glass slipper?",
a:["Belle","Cinderella","Ariel","Jasmine"],
c:1
},

{
topic:"Disney",
q:"What animal is Rajah?",
a:["Monkey","Tiger","Horse","Lion"],
c:1
},

{
topic:"Disney",
q:"Movie with Let It Go?",
a:["Brave","Frozen","Moana","Tangled"],
c:1
},

{
topic:"Disney",
q:"Who accompanies Peter Pan?",
a:["Maleficent","Tinker Bell","Blue Fairy","Elsa"],
c:1
},

{
topic:"Disney",
q:"What fish is Nemo?",
a:["Goldfish","Clownfish","Blue Tang","Pufferfish"],
c:1
},

{
topic:"Disney",
q:"First animated Disney movie?",
a:["Pinocchio","Snow White","Bambi","Dumbo"],
c:1
},

{
topic:"Disney",
q:"What is Simba's father called?",
a:["Scar","Mufasa","Rafiki","Zazu"],
c:1
},

{
topic:"Disney",
q:"How long was Genie trapped?",
a:["100","1000","10000","50000"],
c:2
},

/* =========================================================
   CATEGORY 4
   MEDIA
========================================================= */

{
topic:"Media",
q:"Which show includes Stark family?",
a:["Breaking Bad","Game of Thrones","Vikings","The Witcher"],
c:1
},

{
topic:"Media",
q:"Highest grossing movie?",
a:["Avatar","Titanic","Endgame","Star Wars"],
c:0
},

{
topic:"Media",
q:"Which sitcom has Central Perk?",
a:["Friends","The Office","HIMYM","Brooklyn 99"],
c:0
},

{
topic:"Media",
q:"Who directed Oppenheimer?",
a:["Nolan","Cameron","Spielberg","Scott"],
c:0
},

{
topic:"Media",
q:"Netflix hit from Korea?",
a:["Dark","Money Heist","Squid Game","Lost"],
c:2
},

{
topic:"Media",
q:"Prison in Harry Potter?",
a:["Azkaban","Hogwarts","Narnia","Mordor"],
c:0
},

{
topic:"Media",
q:"Which app popularized For You feed?",
a:["Instagram","TikTok","Snapchat","Facebook"],
c:1
},

{
topic:"Media",
q:"James Bond codename?",
a:["005","006","007","008"],
c:2
},

{
topic:"Media",
q:"Town in Stranger Things?",
a:["Hill Valley","Hawkins","Riverdale","Sunnydale"],
c:1
},

{
topic:"Media",
q:"First non-English Oscar Best Picture winner?",
a:["Parasite","Roma","Joker","1917"],
c:0
},

/* =========================================================
   CATEGORY 5
   ALL OR NOTHING
========================================================= */

{
topic:"ALL OR NOTHING",
q:"Which country celebrates Holi?",
a:["India","Japan","Brazil","China"],
c:0
},

{
topic:"ALL OR NOTHING",
q:"Traditional Japanese robe?",
a:["Kimono","Kilt","Hanbok","Sari"],
c:0
},

{
topic:"ALL OR NOTHING",
q:"Which country celebrates Oktoberfest?",
a:["Austria","Germany","Belgium","France"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Who built Machu Picchu?",
a:["Romans","Aztecs","Incas","Mayans"],
c:2
},

{
topic:"ALL OR NOTHING",
q:"Where does Day of the Dead originate?",
a:["Spain","Mexico","Brazil","Peru"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Traditional Scottish skirt?",
a:["Sarong","Kilt","Kimono","Poncho"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Martial art from Korea?",
a:["Karate","Judo","Taekwondo","Kung Fu"],
c:2
},

{
topic:"ALL OR NOTHING",
q:"Birthplace of Pizza?",
a:["Rome","Naples","Milan","Venice"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Country famous for sauna culture?",
a:["Norway","Finland","Denmark","Sweden"],
c:1
},

{
topic:"ALL OR NOTHING",
q:"Structure protecting ancient China?",
a:["Forbidden City","Great Wall","Terracotta Army","Temple"],
c:1
},

/* =========================================================
   CATEGORY 6
   GAMING
========================================================= */

{
topic:"Gaming",
q:"Which yellow character eats dots?",
a:["Pac-Man","Mario","Sonic","Pikachu"],
c:0
},

{
topic:"Gaming",
q:"Best selling game ever?",
a:["Minecraft","Tetris","Fortnite","GTA V"],
c:0
},

{
topic:"Gaming",
q:"Nintendo mascot?",
a:["Luigi","Mario","Yoshi","Kirby"],
c:1
},

{
topic:"Gaming",
q:"Game with falling blocks?",
a:["Pong","Tetris","Asteroids","Snake"],
c:1
},

{
topic:"Gaming",
q:"1989 Nintendo handheld?",
a:["Switch","Game Boy","DS","PSP"],
c:1
},

{
topic:"Gaming",
q:"Hero in Zelda?",
a:["Link","Zelda","Ganon","Mario"],
c:0
},

{
topic:"Gaming",
q:"Blue Sega mascot?",
a:["Crash","Sonic","Spyro","Mega Man"],
c:1
},

{
topic:"Gaming",
q:"Pokemon #025?",
a:["Charmander","Pikachu","Bulbasaur","Squirtle"],
c:1
},

{
topic:"Gaming",
q:"Battle Royale with building?",
a:["PUBG","Fortnite","Warzone","Apex"],
c:1
},

{
topic:"Gaming",
q:"First arcade tennis game?",
a:["Pong","Pac-Man","Galaga","Space Invaders"],
c:0
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
   START GAME
========================================================= */

startBtn.onclick = ()=>{

const name =
document.getElementById("player-name")
.value.trim();

if(!name){

alert("Enter your name!");
return;

}

startScreen.classList.remove("active");
quizScreen.classList.add("active");

loadQuestion();

};

/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion(){

isAnswered = false;

const q = quizData[currentQuestionIndex];

topicDisplay.innerText =
q.topic.toUpperCase();

questionCounter.innerText =
`${currentQuestionIndex + 1}
/
${quizData.length}`;

questionText.innerText = q.q;

answersContainer.innerHTML = "";

const allOrNothing =
document.getElementById("all-or-nothing");

if(q.topic === "ALL OR NOTHING"){

allOrNothing.classList.add("active");

}else{

allOrNothing.classList.remove("active");

}

q.a.forEach((answer,index)=>{

const btn =
document.createElement("button");

btn.className = "answer-btn";

btn.innerText =
answer.toUpperCase();

btn.onclick = ()=>{

selectAnswer(index,btn);

};

answersContainer.appendChild(btn);

});

updateStreakUI();

startTimer();

}

/* =========================================================
   TIMER
========================================================= */

function startTimer(){

clearInterval(timerInterval);

timeLeft = 10;

let previousSecond = 10;

updateClockUI();

timerInterval = setInterval(()=>{

timeLeft -= 0.05;

const currentSecond =
Math.ceil(timeLeft);

if(currentSecond !== previousSecond){

previousSecond = currentSecond;

tickSound.currentTime = 0;

tickSound.play();

}

if(timeLeft <= 3){

document.querySelector(".timer-ring")
.style.boxShadow =
"0 0 40px rgba(255,0,0,0.8)";

}

if(timeLeft <= 0){

timeLeft = 0;

clearInterval(timerInterval);

selectAnswer(-1);

}

updateClockUI();

},50);

}

/* =========================================================
   CLOCK UI
========================================================= */

function updateClockUI(){

document.getElementById("time-display")
.innerText = Math.ceil(timeLeft);

const rotation =
(10 - timeLeft) * 36;

document.getElementById("clock-hand")
.style.transform =
`translateX(-50%)
rotate(${rotation}deg)`;

}

/* =========================================================
   STREAK UI
========================================================= */

function updateStreakUI(){

if(streak >= 5){

streakBadge.innerText =
`🔥 STREAK ${streak}`;

}else if(streak >= 3){

streakBadge.innerText =
`✨ STREAK ${streak}`;

}else{

streakBadge.innerText = "";

}

}

/* =========================================================
   ANSWER
========================================================= */

function selectAnswer(index,btn){

if(isAnswered) return;

isAnswered = true;

clearInterval(timerInterval);

const q =
quizData[currentQuestionIndex];

const buttons =
document.querySelectorAll(".answer-btn");

const correctIndex = q.c;

if(index === correctIndex){

if(btn){

btn.classList.add("correct");

}

streak++;

if(streak > maxStreak){

maxStreak = streak;

}

let multiplier = 1;

if(q.topic === "ALL OR NOTHING"){

multiplier = 2;

}

if(streak >= 5){

multiplier += 0.5;

}

score += Math.round(
timeLeft * 100 * multiplier
);

}else{

streak = 0;

if(btn){

btn.classList.add("wrong");

}

}

buttons[correctIndex]
.classList.add("correct");

scoreDisplay.innerText = score;

updateStreakUI();

setTimeout(()=>{

currentQuestionIndex++;

if(currentQuestionIndex >=
quizData.length){

showResults();

}else{

loadQuestion();

}

},1500);

}

/* =========================================================
   RESULTS
========================================================= */

function showResults(){

localStorage.setItem(
"quiz_completed",
"true"
);

quizScreen.classList.remove("active");

resultScreen.classList.add("active");

document.getElementById("result-name")
.innerText =
document.getElementById("player-name")
.value;

document.getElementById("final-score")
.innerText = score;

document.getElementById("final-streak")
.innerText = maxStreak;

}
