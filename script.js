const board = document.getElementById('game-board');
// numeri e simboli abbinare di 8 coppie
const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
  card.textContent = symbol;
  //card.style.visibility = 'hidden'; 
  board.appendChild(card);
  card.addEventListener('click', () => {

   if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.classList.remove('hidden');
    card.style.visibility = 'visible';

   if (!firstCard) {
     firstCard = card;
     } else {
     secondCard = card;
     lockBoard = true;

   if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
     firstCard.classList.add('matched');
     secondCard.classList.add('matched');
     resetTurn();
     } else {
     setTimeout(() => {

          firstCard.classList.remove('flipped');

          secondCard.classList.remove('flipped');

          //firstCard.style.visibility = 'hidden';

          //secondCard.style.visibility = 'hidden';

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
