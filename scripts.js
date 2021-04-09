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
    fillerCard=["img/cc.PNG","img/cc1.PNG","img/cc2.PNG","img/cc3.PNG",
    "img/cc4.PNG","img/cc5.PNG","img/cc6.PNG","img/cc7.PNG","img/cc8.PNG"];
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
    charG0=new Character ("Asuna","img/asuna.PNG");
    charG1=new Character ("Guts","img/berserk.PNG");
    charG2=new Character ("Black Goku","img/bGoku.PNG");
    charG3=new Character ("Ein","img/ein.PNG");
    charG4=new Character ("Eren","img/eren.PNG");
    charG5=new Character ("Hisoka","img/hisoka.PNG");
    charG6=new Character ("Kikyo","img/kikyo.PNG");
    charG7=new Character ("Rem","img/rem.PNG");
    charG8=new Character ("Saber","img/saber.PNG");

    //set an Arr of Class Objects
    charG=[charG0,charG1,charG2,charG3,charG4,charG5,charG6,charG7,charG8];

    //grab image boxes and divs to be used as vars
    fillerImg = document.getElementsByClassName('img');
    scoreBoard= document.getElementById('score');
    reactionBoard= document.getElementById('reac');

    //Game start button creation
    playButton = document.createElement('button');
    playButton.className = 'playButton';
    playButton.innerHTML = "PLAY";
    document.getElementById('play').appendChild(playButton);
    playButton.addEventListener('click', start);

    //hidden link to scratch game
    scratch = document.getElementById('clrD1');
    scratch.addEventListener('click', scratchPage)
})

// links to scratch game
function scratchPage()
{
    location.href = "https://scratch.mit.edu/projects/421936681/";
}
//triggers value in order to start game 
// removes start play button
function start()
{
    startGame=true;
    playButton.remove();
}

//func sets up filler images taken from Arr
//while cycling them through the game board
//.random method used to generate random int's 0-8
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

    //sets var timer to current time
    timer = Date.now();
}

//switch statement used in order to randomly display buttons
//in 3 button positions
//Note: the element id's order from case 0-2
//rng var used to enter the case's
//rng vars used to populate objects name
function btnPop()
{   
    randomCounter=Math.floor(Math.random() * 3);
    randomIndex3=Math.floor(Math.random() * 9);
    randomIndex4=Math.floor(Math.random() * 9);
    switch(randomCounter)
    {
        case 0:
            buttonAssignment()
            //grab a random class object from the charG arr
            button.innerHTML = charG[randomIndex2].name;
            //populate the button within selected div
            document.getElementById('btn').appendChild(button);
            //adds EL with a click event pointing to a func
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

//creates 3 buttons with a specified class name
function buttonAssignment()
{
    button = document.createElement('button');
    button.className = 'answerButton';
    button1 = document.createElement('button');
    button1.className = 'answerButton';   
    button2 = document.createElement('button');
    button2.className = 'answerButton';
}

//removes buttons after 1s of population
function removeButton(){
    setTimeout(function(){
        button.remove();
        button1.remove();
        button2.remove();
    },1000)
}

//on a right answer
//will cal reaction time, score + the bonus
//display updated score and reaction time
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

//display updated score on a wrong answer
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


