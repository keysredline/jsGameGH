//DEV Notes: btn inner html able to see charG item src
//need to assign a dict or way to attach 3 values to the charG item
// link up charG index to a var that points to a key
//map keys in ES6 cannot hold multiple values...wtf
//on page load, call anonymous func
window.addEventListener('load',function(){
    var timerThread = setInterval(imageShuffle,1000)
    //setting global vars, Arrays, Map
    counter = 0;
    fillerCard=["img/cc.png","img/cc1.png","img/cc2.png","img/cc3.png",
    "img/cc4.png","img/cc5.png","img/cc6.png","img/cc7.png","img/cc8.png"];
    charG=['img/asuna.png','img/berserk.png','img/bGoku.png','img/ein.png',
    'img/eren.png','img/hisoka.png','img/kikyo.png','img/rem.png','img/saber.png'];
    wrongChoice=["Goku","Izuka","Levi","Killua","Hinata","Ichigo","Kirito","Ryuk","Mikasa"];
    
    coll = new Map();
    coll.set(charG[0], "Asuna");
    coll.set(charG[1], "Guts");
    coll.set(charG[2], "Black Goku");
    coll.set(charG[3], "Ein");
    coll.set(charG[4], "Eren");
    coll.set(charG[5], "Hisoka");
    coll.set(charG[6], "Kikyo");
    coll.set(charG[7], "Rem");
    coll.set(charG[8], "Saber");

    fillerImg = document.getElementsByClassName('img');
    imageShuffle()
    scoreBoard= document.getElementById('score');
    score=0;
    
})

//func sets up filler images taken from Arr
//while cycling them through the game board
//timeout method was used to delay changes
//.random method used to generate random int's
function imageShuffle()
{
    setTimeout(function(){
    //queuedImg.removeEventListener('click',btnPop);
    for(let i =0; i < fillerCard.length; i++)
    {
        randomIndex=Math.floor(Math.random() * 9);
        fillerImg[i].src=fillerCard[randomIndex];
        counter++
        //console.log(fillerImg[i]);        
    }
    //limiter: enter below function every 4 sec
    if (counter % 4 ==0)
    {
        guessChar()
    }
    },500);//time out param
}
//func sets up 2 random ints
//assigns an image from charG Arr to one img block
//create var that will trigger button population
function guessChar()
{   
    randomIndex1=Math.floor(Math.random() * 9);
    randomIndex2=Math.floor(Math.random() * 9);
    fillerImg[randomIndex1].src=charG[randomIndex2];
    queuedImg=fillerImg[randomIndex1];
    
    //alert('1')
    setTimeout(function(){
        queuedImg.removeEventListener('click',btnPop);
        
        //alert('2')
    },1000)
    //alert('3')
    queuedImg.addEventListener('click', btnPop)
    
    console.log(queuedImg)
    //console.log(randomIndex1)
    //console.log(randomIndex2)
}

function btnPop()
{   
    //queuedImg.removeEventListener('click',btnPop);
    randomCounter=Math.floor(Math.random() * 3);
    randomIndex3=Math.floor(Math.random() * 9);
    randomIndex4=Math.floor(Math.random() * 9);
    switch(randomCounter)
    {
        case 0:
            button = document.createElement('button');
            button.innerHTML = coll.get(charG[randomIndex2]);
            document.getElementById('btn').appendChild(button);
            button.addEventListener('click', answerRight);
            
            button1 = document.createElement('button');            
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn1').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2 = document.createElement('button');
            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn2').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            console.log(randomCounter)
            break;
        case 1:
            button = document.createElement('button');
            button.innerHTML = coll.get(charG[randomIndex2]);
            document.getElementById('btn1').appendChild(button);
            button.addEventListener('click', answerRight);
            
            button1 = document.createElement('button');            
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2 = document.createElement('button');
            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn2').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            console.log(randomCounter)
            break;
        case 2:
            button = document.createElement('button');
            button.innerHTML = coll.get(charG[randomIndex2]);
            document.getElementById('btn2').appendChild(button);
            button.addEventListener('click', answerRight);
            
            button1 = document.createElement('button');            
            button1.innerHTML = wrongChoice[randomIndex3];
            document.getElementById('btn1').appendChild(button1);
            button1.addEventListener('click', answerWrong);

            button2 = document.createElement('button');
            button2.innerHTML = wrongChoice[randomIndex4];
            document.getElementById('btn').appendChild(button2);
            button2.addEventListener('click', answerWrong);
            console.log(randomCounter)
            break;         
    }
}

function answerRight()
{
    button.removeEventListener('click',answerRight)
    button1.removeEventListener('click',answerWrong)
    button2.removeEventListener('click',answerWrong)
    button.remove();
    button1.remove();
    button2.remove();
    score+=500;
    scoreBoard.innerHTML= score;
}

function answerWrong()
{
    button.removeEventListener('click',answerRight)
    button1.removeEventListener('click',answerWrong)
    button2.removeEventListener('click',answerWrong)
    button.remove();
    button1.remove();
    button2.remove();
    score-=400;
    scoreBoard.innerHTML= score;
}


