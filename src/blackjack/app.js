let blackjackGame = {
    'player': { 'scoreSpan': '#player-blackjack-result', 'div': '#player-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isHit': false,
    'isStand': false,
    'turnsOver': false,
    'dealOver': false
};

setTimeout(function () {
    var playerName = prompt('Enter Player Name:');
    if (playerName) {
        document.querySelector('#player-name-score').innerHTML = playerName + ': <span id="player-blackjack-result">0</span>';
        document.querySelector('#player-name-result').innerHTML = playerName;
    }
}, 1000);

const PLAYER = blackjackGame['player'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (!blackjackGame['isStand']) {
        let card = randomCard();
        showCard(PLAYER, card);
        updateScore(PLAYER, card);
        showScore(PLAYER);
        blackjackGame['isHit'] = true;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    if (blackjackGame['isHit'] && !blackjackGame['dealOver']) {
        blackjackGame['isStand'] = true;

        //check the condition with rule
        while (DEALER['score'] < 16) {
            let card = randomCard();
            showCard(DEALER, card);
            updateScore(DEALER, card);
            showScore(DEALER);
            await sleep(1000);
        }
        blackjackGame['turnsOver'] = true;
        blackjackGame['dealOver'] = true;
        showResult(computeWinner());
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver']) {
        let playerImg = document.querySelector('#player-box').querySelectorAll('img');
        let dealerImg = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < playerImg.length; i++) {
            playerImg[i].remove();
        }
        for (let i = 0; i < dealerImg.length; i++) {
            dealerImg[i].remove();
        }

        PLAYER['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(PLAYER['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
        document.querySelector(PLAYER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;

        document.querySelector('#blackjack-result').textContent = 'Lets Play';
        document.querySelector('#blackjack-result').style.color = 'white';
        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
        blackjackGame['isHit'] = false;
        blackjackGame['dealOver'] = false;
    }
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImg = document.createElement('img');
        cardImg.src = './images/' + card + '.png';
        console.log(cardImg);
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        hitSound.play();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(activePlayer, card) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function computeWinner() {
    let winner;

    if (PLAYER['score'] <= 21) {
        if (PLAYER['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = PLAYER;
        }
        else if (PLAYER['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (PLAYER['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if (PLAYER['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (winner === PLAYER) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    }
    else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
    }
    else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'Match Draw!';
        messageColor = 'blue';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}