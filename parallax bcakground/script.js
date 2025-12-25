const canvas= document.getElementById('canvas1')
const ctx= canvas.getContext('2d');
const CANVAS_WIDTH= canvas.width = 800;
const CANVAS_HEIGHT= canvas.height = 700;

let gameSpeed= 5;
//let gameFrame = 0;
 
const backgroundLayer1 = new Image();   //document.createElement('img');
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2= new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3= new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4= new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5= new Image();
backgroundLayer5.src = 'layer-5.png';

const slider= document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
    gameSpeed= e.target.value;
    showGameSpeed.innerHTML = e.target.value;
})

//animate function explained at the end
//Parellax Effect is when the foreground layer moves faster than the background layer

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        //this.x2= this.width;
        this.image= image;
        this.speedModifier = speedModifier;
        this.speed= gameSpeed * this.speedModifier; //each layer will move at ta different speed, but still tied to the global gameSpeed
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        // if (this.x2 <= -this.width){
        //     this.x2 = this.width + this.x - this.speed;
        // }
        this.x = Math.floor( this.x - this.speed);
        //this.x2 = Math.floor(this.x2- this.speed);
        //this.x= gameFrame * this.speed % this.width;  //has a disadvantage- when changing the speed 
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

const layer4= new Layer(backgroundLayer4, 0.5);  //move at half of game speed
const layer1= new Layer(backgroundLayer1, 0.5);
const layer2= new Layer(backgroundLayer2, 0.5);
const layer3= new Layer(backgroundLayer3, 0.5);
const layer5= new Layer(backgroundLayer5, 1);

const gameObjects = [ layer1, layer2, layer3 , layer4 , layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH , CANVAS_HEIGHT);
    gameObjects.forEach(object =>{
        object.draw();
        object.update();
    })
    //gameFrame--; 
    requestAnimationFrame(animate);
}
animate()






















// function animate(){
//     ctx.clearRect(0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT)
//     ctx.drawImage(backgroundLayer4, x, 0);
//     ctx.drawImage(backgroundLayer4, x2, 0);  //draw same image at end of width at x2 
//     /*
//     if (x<-2400) x=2400; //for first image
//     else x-= gameSpeed;  //at x=800,799,... the first image starts appearing from the the right
//     if (x2<-2400) x2=2400; //x2 becomes 0 when x=-2400, so the second image is shown on the canvas
//     else x2-= gameSpeed;
//     requestAnimationFrame(animate);  //animate function called 

//     */
//     //This creates a gap between images because:
//     //  The gaps occur because x and x2 do NOT reset on the same frame.
//     //  That one-frame mismatch breaks the 2400px spacing, and canvas shows the empty space.
//     //     eg: x values … -2395 → -2400 → -2405(reset to 2400 happens after crossing, not on -2400 )
//     //         x2          5    →  0    →  -5   (2400-(-5) = 2405, so second image is formed 5px after the first image ) the extra 5px gap= black gap) 

//     //for gaps to not occur, x2= x+ imagewidth should be always true

//     //using 2 variables - edit the code
//     if (x<-2400) x=2400 + x2- gameSpeed;
//     else x-= gameSpeed;
//     if (x2<-2400) x2=2400 + x -gameSpeed;
//     else x2-= gameSpeed;

//     //using 1 variable  //works cause The second image is always exactly 2400px(width) after the first
//     // if (x<-2400) x=0;
//     // else x-=gameSpeed;
//     requestAnimationFrame(animate);
// }
// animate()  //animate function is called- making the inside animate function be called again and again