class Block {
    constructor(x, y, width, height) {
        var options = {
            restitution: 0,
            friction: 1.0,
            isStatic: false,
            Density: 1.0
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("sprites/bottle.png");
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;

        if (this.body.speed > 10) {
         

            World.remove(world, this.body);
        } else {
            imageMode(CENTER);
            image(this.image, pos.x, pos.y, this.width, this.height);
        }
    }
}