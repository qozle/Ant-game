function Food(posx, posy){

	this.r = Math.random() * 5
	this.pBody = Bodies.circle(posx, posy, this.r)

	World.add(world, this.pBody);

	this.show = function(){

		push();
		noStroke();
		translate(this.pBody.position.x, this.pBody.position.y);
		ellipse(0, 0, this.r);
		pop();
	}

}