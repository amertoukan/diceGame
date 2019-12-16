let dice, previousRoll, activePlayer, currentRound, score, finalScore, input;


previousRoll = [0, 0]; 
score = [0,0]
activePlayer = 0; 
currentRound = 0;
dice = new Array();
diceDOM = new Array();


getFinalScore = () => {
    input = document.querySelector('.final-score').value;
    input ? finalScore = input : finalScore = 100; 
}
//Roll 
roll = () => { 
    //Random roll;
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;
    
    for (var i = 0; i < previousRoll.length; i++){

    //Assign previous Roll values
        previousRoll[i] = dice[i] 
        console.log(`Roll${i}: ${previousRoll[i]}`)

    }

    //Set current score to the sum of dice 1 + dice 2
    currentRound += dice[0]  + dice[1];
    score[activePlayer] += dice[0] + dice[1]
    //call show Dice function
    showDice();
}
addScore = () => {
    //add dice roll to current round score; 
    document.getElementById (`current-${activePlayer}`).textContent = currentRound;
    //console.log(currentRound)
    //add current round score to overall score 
    //console.log('Addition: ' + score[activePlayer] + currentRound)
    //console.log(score[activePlayer])
    //Show UI 
    document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer]
}
checkSix = () => {
    for (var i = 0; i < previousRoll.length; i++){
        //player loses entire score if rolls 6 twice 
        if (previousRoll[i] == 6 && dice == 6){
            document.getElementById(`score-${activePlayer}`).textContent = 0;
            document.getElementById(`current-${activePlayer}`).textContent = 0;
            nextPlayer();
        }
        }
}
showDice = () => {
    for (var i = 0; i < dice.length; i++){
        diceDOM[i] =  document.querySelector(`#dice-${i + 1}`);
        diceDOM[i].style.display = "block";
        diceDOM[i].src = `../img/dice-${dice[i]}.png`;
    }
};
hideDice = () => {
    for (var i = 0; i < dice.length; i++){
        diceDOM[i] =  document.querySelector(`#dice-${i + 1}`);
        diceDOM[i].style.display = "none";
    }
}
showButtons = () => {
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.final-score').style.display = 'none';
}
hideButtons = () => { 
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.final-score').style.display = 'block';
}
displayWinner = () => {
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        hideButtons();
}
reset = () => { 
    hideDice();
    document.querySelector(`#score-0`).textContent = 0;
    document.querySelector(`#score-1`).textContent = 0;
    document.querySelector(`#current-0`).textContent = 0;
    document.querySelector(`#current-1`).textContent = 0;
    document.querySelector('.final-score').display = 'block';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
}
clearScores = () => {
    previousRoll = 0;
    currentRound = 0;
    document.querySelector(`#current-0`).textContent = 0
    document.querySelector(`#current-1`).textContent = 0
}
//nextplayer
nextPlayer = () => { 
    hideDice();
    clearScores();

    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', () => {
    hideButtons();
    reset();
    showButtons();
    clearScores();
    nextPlayer();
});
document.querySelector('.btn-roll').addEventListener('click', () => {
    getFinalScore();
    
    if(score[activePlayer] <= finalScore){
        roll();
        checkSix();
        addScore();
    } else {
        setTimeout(()=> {
            displayWinner();
        }, 500)
        reset() 
    }
}); 
document.querySelector('.btn-hold').addEventListener('click', () => {
    getFinalScore();
    if(score[activePlayer] <= finalScore){
        nextPlayer();
    } else {
        setTimeout(()=> {
            displayWinner();
        }, 500)
        reset() 
    }
});