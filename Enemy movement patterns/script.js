/** @type {HTMLCanvasElement}*/
const canvas= document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies= 100;

const enemiesArray= []

let gameFrame=0;

class Enemy{
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy1.png';
        this.x= Math.random() * canvas.width;  //random no. btw 0 and canvas width
        this.y= Math.random() * canvas.width;
        // dont want all enemy obj to stack on top of each other, so start them at diff position
        //this.speed= Math.random() * 4 - 2; //random number between -2 and +2
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width= this.spriteWidth/ 2.5;
        this.height= this.spriteHeight/2.5;
        this.frame = 0;  //specific sprite frame in sprite sheet
        this.flapSpeed= Math.floor(Math.random() * 3 + 1); //random integer no. between 1 and 4 
    }
    update(){
        this.x+= Math.random() *5- 2.5;
        this.y+= Math.random() *5 -2.5;
        //animate sprites
        if (gameFrame % this.flapSpeed=== 0){  //each sprite frame is displayed twice, thrice, 4times(incremented once every 1,2, 3 or 4 game frames), so sprite animation looks slower or faster
            this.frame > 4? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image ,this.frame * this.spriteWidth , 0, this.spriteWidth , this.spriteHeight, this.x , this.y, this.width, this.height);
    }
}

//const enemy1 = new Enemy();
for (let i=0; i<numberOfEnemies ; i++){  //creating 100 enemy obj
    enemiesArray.push( new Enemy());  
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH , CANVAS_HEIGHT)
    // enemy1.update();
    // enemy1.draw();
    enemiesArray.forEach(enemy=>{
        enemy.update();
        enemy.draw()
    })
    gameFrame++;
    requestAnimationFrame(animate); 
}
animate();