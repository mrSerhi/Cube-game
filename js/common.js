'use strict';
/*
scores - is the array with two positions for two players [0,0]
roundScore - is the sum score on the round
activePlayer - is a number player which active, 0 or 1
dice - is a random integer from 1 to 6
*/
var scores, roundScore, activePlayer, dice, stateGame;
initGame(); // initializetion variables and ruls at the biggining game


document.getElementsByClassName('btn-new')[0].addEventListener('click', initGame);
document.getElementsByClassName('btn-roll')[0].addEventListener('click', rollGame);
document.getElementsByClassName('btn-hold')[0].addEventListener('click', hold);

function initGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    stateGame = true;
    // at the start of the game all scores = 0
    document.getElementById('scope-0').textContent = '0';
    document.getElementById('scope-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // and image block is hidden
    document.body.getElementsByClassName('btn-block__dice')[0].style.visibility = 'hidden';
    document.getElementById('name-0').textContent = 'Player №1';
    document.getElementById('name-1').textContent = 'Player №2';
    document.getElementsByClassName('player-second')[0].classList.remove('active');
    document.getElementsByClassName('player-first')[0].classList.add('active');
}

function rollGame() {
    if (stateGame) {
        // 1.random number of cube
        var dice = Math.floor((Math.random() * 6) + 1);
        // 2.set up visible the cube
        document.getElementsByClassName('btn-block__dice')[0].style.visibility = 'visible';
        var cubeImg = document.getElementsByClassName('btn-block__dice-image')[0];
        cubeImg.src = './images/dice-' + dice + '.png';
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
}

function hold() {
    if (stateGame) {
        // 1. add Roundscore from local to global scores[0,0]
        scores[activePlayer] += roundScore;
        // 2.update UI
        document.getElementById('scope-' + activePlayer).textContent = scores[activePlayer];
        // 3.who is the winner, else game continues
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).innerHTML = '<strong>Winner!</strong>';
            document.body.getElementsByClassName('btn-block__dice')[0].style.visibility = 'hidden';
            stateGame = false;
        } else {
            nextPlayer();
        }
    }
}

// check active player and define some properties
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementsByClassName('player-second')[0].classList.toggle('active');
    document.getElementsByClassName('player-first')[0].classList.toggle('active');
    document.body.getElementsByClassName('btn-block__dice')[0].style.visibility = 'hidden';
}