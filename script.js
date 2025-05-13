const board = document.getElementById('game-board');
// numeri e simboli abbinare di 8 coppie
const symbols = ['fa-camera-retro', 'fa-adjust', 'fa-book', 'fa-id-card-o', 'fa-diamond', 'fa-sun-o', 'fa-film', 'fa-tty'];
let cards = [...symbols, ...symbols];

// mischiare le carte
cards = cards.sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// costruzione carte 
cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card', 'hidden');
  card.dataset.symbol = symbol;

  const tagI = document.createElement('i');
  tagI.classList.add('fa',symbol);
  card.appendChild(tagI);

  //card.style.visibility = 'hidden'; 
  board.appendChild(card);
  card.addEventListener('click', () => {

   if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.classList.remove('hidden');
    tagI.style.visibility = 'visible'
    card.style.visibility = 'visible';

    if (!firstCard) {
      firstCard = card;
      firstTagI = card.getElementsByTagName('i')[0];
     } else {
      secondCard = card;
      secondTagI = card.getElementsByTagName('i')[0];
      lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();

      } else {
         setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');

         firstTagI.style.visibility = 'hidden';
         secondTagI.style.visibility = 'hidden';
        tagI.style.visibility = 'hidden';

          resetTurn();

        }, 1000);

      }
   }
  });
});

function resetTurn() {

  [firstCard, secondCard] = [null, null];

  lockBoard = false;
}
let attempts = 0;
let score = 0;

const attemptsDisplay = document.getElementById('attempts');
const scoreDisplay = document.getElementById('score');

let startTime = null;
let timerInterval = null;
let totalPairs = symbols.length;

const timerDisplay = document.getElementById('timer');

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
  }
  if (!firstCard) {


    if (!startTime) startTimer();
    //gestire il punteggio:
    score++;
    scoreDisplay.textContent = score;
    
    if (score === totalPairs) {     
    clearInterval(timerInterval);
    setTimeout(() => {
    alert(`Hai vinto in ${attempts} tentativi e ${timerDisplay.textContent} minuti!`);
    }, 300);
    }
  }
function flipCard(card) {
  card.classList.toggle('flipped');
}

const card = document.querySelectorAll('.memory-card');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));