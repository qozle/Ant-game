function Ant(posx, posy){
	//ants.push(this)
	const partbodywidth = 4
	const partbodyheight = 7
	const partheadradius = 2



	// ant physics body
	this.partbody = Bodies.rectangle(posx, posy, partbodywidth, partbodyheight, {chamfer: {radius: [2,2,2,2]}})
	
	// ant physics head
	this.parthead = Bodies.circle(posx, posy - 7, partheadradius)
	
	var options = {
		frictionAir: .1,
		friction: .1,
		parts: [this.partbody, this.parthead]
	}
	
	// ant body is a compound of all the parts, see options above
	this.body = Body.create(options);
	// these couldn't be declared until the body object was created
	this.forceMag = this.body.mass * -.0007
	this.maxspeed = .000008;
	this.maxforce = 2;
	this.moveDesired = this.body.position;
	
	World.add(world, this.body);
	
	
	this.show = function(){
		// I suspect there are extra variables here
		var bodypos = this.partbody.position;
		var bodyangle = this.partbody.angle;
		var headpos = this.parthead.position;
		var headangle = this.body.parts[2].angle;
		var bodyheading = Math.atan2(this.body.velocity.y, this.body.velocity.x)
		
		
		push();
		translate(bodypos.x, bodypos.y);
		rotate(bodyheading);
		imageMode(CENTER)
		//rotate(-HALF_PI)
		image(antImg, 0, 0, partbodyheight + 4, partbodywidth )
		pop();

	}
	
	// make a random vector that's not too far from the ant
	this.pickVector = function() {
		this.randomVector = Vector.add(this.body.position, Vector.create(
			Math.random() * 200 - 100, 
			Math.random() * 200 - 100));
		return this.randomVector
	}

	
	// this.checkFood = function(){
	// 	for (item in foods){
	// 		var d = Vector.sub(foods[item].body.position, this.body.position)
	// 		if (mag(d.x, d.y) <= 35){
	// 			this.foodDesired = 
	// 		}
	// 	}
	// }


	this.move = function(){
		// steering = desired - velocity
		// move, update, show
		// create vector from dest to obj
		// normalize
		// mult by scalar maxspeed
		// limit by scalar maxforce
		// apply force



		if (Math.floor(this.body.position.x) == Math.floor(this.moveDesired.x) && 
			Math.floor(this.body.position.y) == Math.floor(this.moveDesired.y)){
			this.moveDesired = this.pickVector();	
		} 

		var rawSteering = Vector.sub(this.moveDesired, this.body.position)
		var normSteering = Vector.normalise(rawSteering)
		this.moveSteering = Vector.mult(normSteering, this.maxspeed)

		
		//Body.applyForce(this.body, this.body.position, this.steering)
		return this.moveSteering
	}
}

		



