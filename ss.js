/**
 * Created by liudmilaezhova1 on 19/05/2017.
 */
/**
 * Created by liudmilaezhova1 on 16/05/2017.
 */
var stage, sun , hero, queue, bird, eggs=[],scoreText, score=0;
var image = new createjs.Bitmap("background.png");
var pause = new createjs.Bitmap("pause.png");
var sound = new createjs.Bitmap("volume.png");
var keys = {
    u: false,
    d: false,
    l: false,
    r: false
};
var settings = {
    heroSpeed: 3,
    eggsSpeed: 2,
    lives: 3,
    level: 0,
    score: 0
};

function preload(){
    "use strict";
    stage = new createjs.Stage("ss");
    queue = new createjs.LoadQueue(true);
    queue.loadManifest([
        {id: "slimeSS", src:"slim.json"},
        {id: "birdSS", src:"bird.json"},
        {id: "sunSS", src:"sun.json"}
    ]);
    queue.addEventListener('progress', function(){
        console.log(" preloading");
    });
    queue.addEventListener('complete', setup);
}

function setup(){
    "use strict";
    var slimeSS = new createjs.SpriteSheet(queue.getResult("slimeSS"));
    var birdSS = new createjs.SpriteSheet(queue.getResult("birdSS"));
    var sunSS = new createjs.SpriteSheet(queue.getResult("sunSS"));


    image.y=-150;
    stage.addChild(image);

    sun = new createjs.Sprite(sunSS, "sunny");
    sun.x=20;
    sun.y=20;
    sun.scaleX=2;
    sun.scaleY=2;
    stage.addChild(sun);


    hero = new createjs.Sprite(slimeSS, "down");
    hero.currentDirection = "down";
    hero.x=270;
    hero.y=500;
    hero.width =32;
    hero.height = 48;
    hero.scaleX=2;
    hero.scaleY=2;
    stage.addChild(hero);
    nextLevel();

    pause.x=30;
    pause.y=500;
    stage.addChild(pause);

    sound.x=100;
    sound.y=500;
    stage.addChild(sound);


    bird = new createjs.Sprite(birdSS, "flying");
    bird.x=-200;
    stage.addChild(bird);

    /*scoreText = new createjs.Text("Score: "+score,
        "30px Verdana", "#000");
    scoreText.x=30;
    scoreText.y=500;
    stage.addChild(scoreText);*/


    window.addEventListener('keyup', fingerUp);
    window.addEventListener('keydown', fingerDown);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', heartBeat)
}
function addEggs(){
    "use strict";
    for (var i=0; i < settings.Level; i++ ) {
        
    }
}
function nextLevel(){
    "use strict";
    settings.level++;
    diff+=0.1;
    //addEggs();
}
function fingerUp(e){
    "use strict";
    //console.log(e.keyCode);
    switch(e.keyCode){
        case 37:
            keys.l = false;
            break;
        case 38:
            keys.u = false;
            break;
        case 39:
            keys.r = false;
            break;
        case 40:
            keys.d = false;
            break;
    }
}
function fingerDown(e){
    "use strict";
    switch(e.keyCode){
        case 37:
            keys.l = true;
            break;
        case 38:
            keys.u = true;
            break;
        case 39:
            keys.r = true;
            break;
        case 40:
            keys.d = true;
            break;
    }
}
function moveSlime(){
    "use strict";
    if(keys.l){
        hero.x-=settings.heroSpeed;
         if (hero.x < 0){
             hero.x=0;
         }
        if(hero.currentDirection != "left"){
            hero.gotoAndPlay('left')
            hero.currentDirection="left";
        }
    }
    if(keys.r){
        hero.x+=settings.heroSpeed;
        if(hero.x>600 -  hero.width)  {
            hero.x=600 - hero.width;
        }
        if(hero.currentDirection != "right"){
            hero.gotoAndPlay('right')
            hero.currentDirection="right";
        }
    }
    if(keys.u){
        hero.y-=settings.heroSpeed;
        if (hero.y < 300){
            hero.y=300;
        }
        if(hero.currentDirection != "up"){
            hero.gotoAndPlay('up')
            hero.currentDirection="up";
        }
    }
    if(keys.d){
        hero.y+=settings.heroSpeed;
        if (hero.y > 500){
            hero.y=500;
        }
        if(hero.currentDirection != "down"){
            hero.gotoAndPlay('down')
            hero.currentDirection="down";
        }
    }
}

/*function catchEgg(){
    "use strict";
    if (egg.y>= hero.y ){
        eggs[i].y-=settings.eggsSpeed;
        if(eggs[i].y < -1){
            stage.removeChild(eggs[i]);
            eggs.splice(i,1)
        }
}*/

function dropEgg(){
    var egg = new createjs.Shape();
    egg.graphics.beginFill("yellow");
    egg.graphics.drawCircle(0,0,15);
    egg.x=bird.x+100;
    egg.y=191;
    egg.width = 30;
    egg.height=30;
    egg.regX=-15;
    egg.regY=-15;
    stage.addChild(egg);
    eggs.push(egg)
}
/*function catchEggs(){
    "use strict";
    for (var i= eggs.length-1;i>=0; i--){
        eggs[i].y-=settings.eggsSpeed;
        if(eggs[i].y < -1){
            stage.removeChild(eggs[i]);
            eggs.splice(i,1)
        }
    }
} */
function catchEggs(){
    "use strict" ;
    for(var i = eggs.length-1; i>=0; i--){
        if(hitTest(hero, eggs[i])){
            console.log("killed") ;
            stage.removeChild(eggs[i]);
            eggs.splice(i,1)
        }
    }
}
function hitTest(rect1,rect2) {
    if ( rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y )
    {
        return false;
    }
    return true;
}
var diff =0.7;
function heartBeat(e){
    "use strict";
    bird.x++;
    if(bird.x > 700){
        bird.x=-20
        nextLevel();
    }
    for(var i=0; i< eggs.length; i++){
        eggs[i].y+=2
    }
    var r = Math.random()*100;//0.0023232e5345
    if(r<diff){
        dropEgg();


    }
    moveSlime();

    // test if player touch eggs
    catchEggs ();





    stage.update(e);
}
window.addEventListener('load', preload);