class Point {
        constructor(x, y, radius) {
        var options = {
            'restitution': 0.3,
            'friction': 0.5,
            'isStatic': true
        }
        this.radius = radius
        this.body = Bodies.circle(x, y, radius, options);
	    World.add(world, this.body);    
    }
    display() {
        fill("black");
        ellipseMode(RADIUS);
        ellipse(this.body.position.x, this.body.position.y, this.radius, this.radius);
    }
}
