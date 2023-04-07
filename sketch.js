var spaceIMG, space;
var astroidIMG, astroid, astroidGroup;
var ship, shipImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  spaceIMG = loadImage("space.png");
  astroidIMG = loadImage("astroid.png");
  shipImg = loadImage("moving.png");
}

function setup(){
  createCanvas(600,300);
  space = createSprite(300,300);
  space.addImage("space", spaceIMG);
  space.velocityY = 1;
  
  astroidGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ship = createSprite(200,200,50,50);
  ship.scale = 0.3;
  ship.addImage("ship", shipImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ship.x = ship.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ship.x = ship.x + 3;
    }
    
    if(keyDown("up_arrow")){
      ship.velocityY = -10;
    }
    
    ship.velocityY = ship.velocityY + 0.8
    
    if(space.y > 100){
      space.y = 30
    }
    spawnastroid();

    
    if(astroidGroup.isTouching(ship)){
      ship.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ship) || ship.y > 600 || astroidGroup.isTouching(ship)){
      ship.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnastroid() {
  if (frameCount % 80 === 0) {
    var astroid = createSprite(200, -50);
    var invisibleBlock = createSprite(200,-50);
    invisibleBlock.width = 0.1;
    invisibleBlock.height = 0.1;
    astroid.scale = 0.2
    astroid.x = Math.round(random(0,600));
    invisibleBlock.x = astroid.x;
    
    astroid.addImage(astroidIMG);
    
    astroid.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ship.depth = astroid.depth;
    ship.depth +=1;
   
    astroid.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    astroidGroup.add(astroid);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

