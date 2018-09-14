function Mound(posx, posy) {
	
	this.x = posx
	this.y = posy
	this.radius = 30
	this.pBody = Bodies.circle(this.x, this.y, this.radius, {isSensor: true})
	
	World.add(world, this.pBody);

	this.show = function() {

		push();
		noStroke();
		fill(0);
		ellipseMode(CENTER)
		ellipse(this.pBody.position.x, this.pBody.position.y, this.radius)
		pop();
	}

}