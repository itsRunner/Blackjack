/*
    Blackjack made by theRealRunner
*/

'use strict';

const
    cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "A", "K", "J"],
    cardTypes = ["s", "h", "c", "d"];

const
    mainMenu = document.querySelector('.gameStart'),
    startButton = document.getElementById("btnStart"),
    behindCard = document.getElementById('behindCard'),
    frontCard = document.getElementById('frontCard'),
    mainGame = document.querySelector('.pokerTable'),
    dealerCards = document.querySelector('.dealerCards'),
    playerCards = document.querySelector('.playerCards'),
    dealerScore = document.querySelector('.dealerScore'),
    playerScore = document.querySelector('.playerScore'),
    btnRestart = document.querySelector('.btnRestart'),
    btnHit = document.querySelector('.btnHit'),
    btnHold = document.querySelector('.btnHold'),
    btnDouble = document.querySelector('.btnDouble');

let
    pCards = [],
    dCards = [],
    started,
    pPoints,
    dPoints,
    dealCount;

let
    tempTimeout,
    dealTimer;

const init = () =>
{
    pCards.length = 0;
    dCards.length = 0;

    started = 0;
    pPoints = 0;
    dPoints = 0;
    dealCount = 0;

    mainGame.classList.add('hidden');

    randomLogoCards();
}
init();

function randomLogoCards()
{
    let 
        c = randomEx(cards.length),
        t = randomEx(cardTypes.length);

    behindCard.src = `assets/cards/${cards[c]+cardTypes[t]}.png`;

    c = randomEx(cards.length);
    t = randomEx(cardTypes.length);

    frontCard.src = `assets/cards/${cards[c]+cardTypes[t]}.png`;
}

function randomEx(maxNum)
{
    return Math.floor(Math.random() * maxNum);
}

startButton.addEventListener("click", function() // starts the game..
    {
        mainGame.classList.remove('hidden');
        mainMenu.classList.add('hidden');

        dealCards();
    }
);

function dealCards()
{
    dealTimer = setInterval(() =>
        {
            let 
                c = randomEx(cards.length),
                t = randomEx(cardTypes.length);
            
            switch(dealCount)
            {
                case 0: // Dealer
                {
                    dealerCards.insertAdjacentHTML("beforeend", `<img src="assets/cards/${cards[c]+cardTypes[t]}.png">`);
                    dCards.push(c);
                    addPoints(false, c);
                    break;
                }
                case 2: // Dealer
                {
                    dealerCards.insertAdjacentHTML("beforeend", '<img src="assets/cards/fd.png" id="face-down">');
                    dCards.push(c);
                    addPoints(false, c);
                    break;
                }
                case 1:
                case 3:
                {
                    playerCards.insertAdjacentHTML("beforeend", `<img src="assets/cards/${cards[c]+cardTypes[t]}.png">`);
                    pCards.push(c);
                    addPoints(true, c);
                    break;
                }
                default:
                    clearInterval(dealTimer);
            }
            ++ dealCount;
        },
        1000
    );
}

function addPoints(player = true, c)
{
    let 
        temp = 0;
    
        // Calculate the points..
    switch(cards[c])
    {
        case 'A':
        {
            temp = 11;
        }
        case 'Q':
        case 'K':
        case 'J':
        {
            temp = 10;
            break;
        }
        default:
        {
            temp = Number(cards[c]);
            break;
        }
    }

    if(player)
    {
        pPoints += temp;
    }
    else
        dPoints += temp;

    console.log(temp);

    
    //console.log(pPoints);
    //console.log(dPoints);
}