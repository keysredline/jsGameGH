// <!-- 
// Dev: Justin Fredericks
// Date: 3/3/2021
// Class: CIS 131
// Script: js game
// Purpose: Practice js methods learned so far-->
// Notes: Left off with play button

window.addEventListener('load',function(){
    setInterval(imageShuffle,1000)
    //setting global vars, Arrays, and Class Objects
    score=0;
    counter = 0;
    countPoints=0;
    startGame=false;
    fillerCard=["img/cc.png","img/cc1.png","img/cc2.png","img/cc3.png",
    "img/cc4.png","img/cc5.png","img/cc6.png","img/cc7.png","img/cc8.png"];
    wrongChoice=["Goku","Izuka","Levi","Killua","Hinata","Ichigo","Kirito","Ryuk","Mikasa"];

    //set a Character Class with txt and image.src attributes
    class Character
    {
        constructor(name,pic)
        {
            this.name=name;
            this.pic=pic;
        }
    }
    //Create new class objects
    charG0=new Character ("Asuna","img/asuna.png");
    charG1=new Character ("Guts","img/berserk.png");
    charG2=new Character ("Black Goku","img/bGoku.png");
    charG3=new Character ("Ein","img/ein.png");
    charG4=new Character ("Eren","img/eren.png");
    charG5=new Character ("Hisoka","img/hisoka.png");
    charG6=new Character ("Kikyo","img/kikyo.png");
    charG7=new Character ("Rem","img/rem.png");
    charG8=new Character ("Saber","img/saber.png");

    //set an Arr of Class Objects
    charG=[charG0,charG1,charG2,charG3,charG4,charG5,charG6,charG7,charG8];

    fillerImg = document.getElementsByClassName('img');

    scoreBoard= document.getElementById('score');
    
    reactionBoard= document.getElementById('reac');

    //Game start button creation
    playButton = document.createElement('button');
    playButton.className = 'playButton';
    playButton.innerHTML = "PLAY";
    document.getElementById('play').appendChild(playButton);
    playButton.addEventListener('click', start);
})

function start()
{
    startGame=true;
    playButton.remove();
}

//func sets up filler images taken from Arr
//while cycling them through the game board
//timeout method was used to delay changes
//.random method used to generate random int's
function imageShuffle()
{
    for(let i =0; i < fillerCard.length; i++)
    {
        randomIndex=Math.floor(Math.random() * 9);
        fillerImg[i].src=fillerCard[randomIndex];
        counter++      
    }
    //limiter: enter below function every 4 sec
    if (counter % 4 == 0 && startGame == true)
    {
        guessChar()
    }
}
//func sets up 2 random ints
//assigns an image from charG Arr to one img block
//create var that will trigger button population
function guessChar()
{   
    randomIndex1=Math.floor(Math.random() * 9);
    randomIndex2=Math.floor(Math.random() * 9);
    fillerImg[randomIndex1].src=charG[randomIndex2].pic;
    queuedImg=fillerImg[randomIndex1];
    //set TO to remove EL 1s after
    setTimeout(function(){
        queuedImg.removeEventListener('click',btnPop);
    },1000)
    queuedImg.addEventListener('click', btnPop);

    timer = Date.now();
}

//switch statement used in order to randomly display buttons
//in 3 button positions
function btnPop()
{   
    randomCounter=Math.floor(Math.random() * 3);
    randomIndex3=Math.floor(Math.random() * 9);
    randomIndex4=Math.floor(Math.random() * 9);
    switch(randomCounter)
    {
        case 0:
            buttonAssignment()
            button.innerHTML = charG[randomIndex2].name;
            document.getElementById('btn').appendChild(button);
            button.addEventListener('click', answerRight);
                    
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn1').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn2').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            removeButton()
            break;
        case 1:
            buttonAssignment()
            button.innerHTML = charG[randomIndex2].name;
            document.getElementById('btn1').appendChild(button);
            button.addEventListener('click', answerRight);
                      
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn2').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            removeButton()
            break;
        case 2:
            buttonAssignment()
            button.innerHTML = charG[randomIndex2].name;
            document.getElementById('btn2').appendChild(button);
            button.addEventListener('click', answerRight);
                      
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn1').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            removeButton()
            break;         
    }  
}

function buttonAssignment()
{
    button = document.createElement('button');
    button.className = 'answerButton';
    button1 = document.createElement('button');
    button1.className = 'answerButton';   
    button2 = document.createElement('button');
    button2.className = 'answerButton';
}

function removeButton(){
    setTimeout(function(){
        button.remove();
        button1.remove();
        button2.remove();
    },1000)
}

function answerRight()
{
    reaction = Date.now() - timer;
    reCalc = reaction-1000;
    reactionBoard.innerHTML=reCalc;
    bonus=(1000 - reCalc) * 100
    score+=500+bonus;
    scoreBoard.innerHTML= score;
    removeButtonListener()
}

function answerWrong()
{
    score-=400;
    scoreBoard.innerHTML= score;
    removeButtonListener()
}

//remove buttons listeners in order to stop ability
//to score on multi clicks
function removeButtonListener()
{
    button.removeEventListener('click',answerRight)
    button1.removeEventListener('click',answerWrong)
    button2.removeEventListener('click',answerWrong)
}


