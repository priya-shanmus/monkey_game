var play = 1;
var end = 0;
var monkey, monkey_running, ground;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, gamestate = play;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(100, 300, 20, 20);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);

  ground = createSprite(300, 340, 600, 10);
  ground.shapeColor = ("green");
  ground.velocityX = -2;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("lightblue");

text("score: "+score,300,50);
  if (gamestate === play) {
    monkey.visible = true;
    ground.visible = true;

    if (keyDown("space") && monkey.y >= 304) {
      monkey.velocityY = -9;
    }

    monkey.velocityY = monkey.velocityY + 0.4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    Obstacles();
    Bananas();

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gamestate = end;
    }
  }

  if (gamestate === end) {
    background("white");
    monkey.visible = false;
    ground.visible = false;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    text("game over... press down arrow to restart",50,100);
    if (keyDown("down")) {
      gamestate = play;
      score=0;
    }


  }

  monkey.collide(ground);

  drawSprites();
}

function Bananas() {

  if (frameCount % 50 === 0) {
    banana = createSprite(400, 230, 10, 10);
    banana.scale = 0.1;
    banana.addAnimation("banana", bananaImage);
    banana.y = Math.round(random(230, 320));
    banana.velocityX = -3.5;
    banana.lifetime = -1;

    FoodGroup.add(banana);




  }

}

function Obstacles() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 316, 10, 10);
    obstacle.scale = 0.1;
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = -1;

    obstacleGroup.add(obstacle);

  }




}