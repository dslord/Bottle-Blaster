const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var blocks = [];
var stopper;
var slingshot;
var ball;
var balls = 10;
var bg;

var launched = false;

var gameState = "play";

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    
    engine.positionIterations = 12;
    engine.velocityIterations = 10;
    engine.constraintIterations = 4;

    world = engine.world;

    ground0 = new Ground(windowWidth / 2, -15, windowWidth + 60, 50);
    ground1 = new Ground(windowWidth, 500, 20, windowHeight + 50);
    ground2 = new Ground(0, 500, 20, windowHeight + 50);

    platform = new Ground(windowWidth / 6, windowHeight / 1.8, 200, 10);
    platform1 = new Ground(windowWidth / 1.7, windowHeight / 3.1, 200, 10);
    platform2 = new Ground(windowWidth / 1.2, windowHeight / 1.6, 200, 10);
    platform3 = new Ground(windowWidth / 2, windowHeight / 1.2, 200, 10);

    ball = new Ball(windowWidth / 6 - 20, windowHeight - 600, 30, 30);
    bg_ball = new Text(50, 50, 40, 40);

    var bottles = 4;

    var block_y = 80;
    var block_x = 0;
    for (var i = 0; i < bottles; i++) {
        var spacing = 0;
        for (var j = bottles - i; j >= 1; j--) {
            spacing += 10;
        }

        for (var j = 0; j <= i; j++) {
            block_x += 20;
            blocks.push(new Block(windowWidth / 1.8 + block_x + spacing, windowHeight / 5 - block_y, 20, 40));
        }
        block_y -= 50;
        block_x = 0;
    }

    block_y = 80;
    block_x = 0;
    for (var i = 0; i < bottles; i++) {
        var spacing = 0;
        for (var j = bottles - i; j >= 1; j--) {
            spacing += 10;
        }

        for (var j = 0; j <= i; j++) {
            block_x += 20;
            blocks.push(new Block(windowWidth / 1.24 + block_x + spacing, windowHeight / 2 - block_y, 20, 40));
        }
        block_y -= 50;
        block_x = 0;
    }

    block_y = 80;
    block_x = 0;
    for (var i = 0; i < bottles; i++) {
        var spacing = 0;
        for (var j = bottles - i; j >= 1; j--) {
            spacing += 10;
        }

        for (var j = 0; j <= i; j++) {
            block_x += 20;
            blocks.push(new Block(windowWidth / 2.12 + block_x + spacing, windowHeight / 1.4 - block_y, 20, 40));
        }
        block_y -= 50;
        block_x = 0;
    }
    
    game_over = new Screen(-1000, -1000, windowWidth, windowHeight, "gameover.png");
    winscreen = new Screen(-1000, -1000, windowWidth, windowHeight, "youwing.png");
    slingShot = new Slingshot(ball.body, {x: windowWidth / 6 - 20, y: windowHeight - 600});

    bg = loadImage("./sprites/screen.png");
}

function draw() {
    // Game Over
    if (balls <= 0 && blocks.length > 0) {
        Matter.Body.setPosition(game_over.body, {x: windowWidth / 2, y: windowHeight / 2});
        game_over.display();  

        gameState = "end";
    }

    // Win Screen
    if (balls >= 0 && blocks.length == 0) {
        Matter.Body.setPosition(winscreen.body, {x: windowWidth / 2, y: windowHeight / 2});
        winscreen.display();

        gameState = "end";
    }

    if (gameState == "play") {
        image(bg, 0, 0, windowWidth, windowHeight);
        Engine.update(engine);
        strokeWeight(1);

        ground0.display();
        ground1.display();
        ground2.display();

        platform.display();
        platform1.display();
        platform2.display();
        platform3.display();

        for (var i = 0; i < blocks.length; i++) {
            blocks[i].display();
        }

        slingShot.display();

        ball.display();
        bg_ball.display();

        textSize(20);
        fill("black");
        text(balls - 1, 45, 57);

        if ((ball.body.speed < 0.3 || ball.body.position.y >= windowHeight) && launched) {
            Matter.Body.setVelocity(ball.body, {x: 0, y: 0});
            Matter.Body.setPosition(ball.body, {x: windowWidth / 6 - 20, y: windowHeight - 600});

            slingShot.attach(ball.body);
            launched = false;
        }

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].body.speed > 10) {
                blocks.splice(i, 1);
            }
        }
    
        drawSprites();
    }
}

function mouseDragged() {
    if (launched) return;

    const slingX = windowWidth / 6 - 20;
    const slingY = windowHeight - 600;
    const maxPull = 180;
        
    var dx = mouseX - slingX;
    var dy = mouseY - slingY;

    var distance = sqrt(dx * dx + dy * dy);

    if (distance > maxPull) {
        var angle = atan2(dy, dx);
        Matter.Body.setPosition(ball.body, {x: slingX + cos(angle) * maxPull, y: slingY + sin(angle) * maxPull });
    } else {
        Matter.Body.setPosition(ball.body, {x: mouseX, y: mouseY });
    }   
}

function mouseReleased() {
    slingShot.fly();
    launched = true;
}
