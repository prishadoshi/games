const canvas = document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
console.log(ctx);

/*interested in the canvas drawImage() method to draw animated characters*/

const CANVAS_WIDTH = canvas.width= 600;
const CANVAS_HEIGHT = canvas.height= 600;

const playerImage= new Image();
playerImage.src= "shadow_dog.png"
const spriteWidth= 575;  //6876 % 12 (12 cols) = 573
const spriteHeight =523  // 5230 % 10 (10 rows)
let playerState= 'run'


let frameX= 0;
let frameY= 0;
let gameFrame= 0;
const staggerFrames= 5;  //higher the number, slow the animation will be
const spriteAnimations= [];
const animationStates= [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, index)=>{
    let frames= {
        loc: [],
    }
    for (let j=0; j< state.frames; j++){
        let positonX = j * spriteWidth;
        let postionY = index * spriteHeight;
        frames.loc.push({x: positonX, y: postionY});
    }
    spriteAnimations[state.name] = frames;
});

function animate(){
    ctx.clearRect(0 , 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(50, 50, 100, 100);  //by default black

    let position= Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; 
    let frameX = spriteWidth * position;
    let frameY= spriteAnimations[playerState].loc[position].y
    //ctx.drawImage(image, sx, sy, sw, sh, dx,dy, dw, dh) - accepts 9 args
    //sx, sy, sw, sh- for the source image x,y, hight width (area cut out from the source image)
    //last 4 args - destination x,y,etc for the area cut out using the first 4 args

    
    //makes the animation 5 times slower, postion variable is always between 0 and 6

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    if (gameFrame % staggerFrames==0){
        if (frameX<6) frameX++;
        else frameX=0;
    };
    
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();