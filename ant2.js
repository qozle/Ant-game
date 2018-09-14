function Ant(posx, posy) {

	this.width = 20;
	this.height = 11;
	this.maxSpeed = .000006;
	this.maxForce = 3;
	this.pBody = Bodies.rectangle(posx, posy, this.width, this.height, {chamfer: {radius: [2,2,2,2]}});
	this.steering = false;
	this.desired = this.pBody.position;
	this.dFromNearestFood = Vector.create(5000,5000);
	this.goingHome = false;
	this.food = null;

	World.add(world, this.pBody);

	this.show = function() {
		this.heading = Math.atan2(this.pBody.velocity.y, this.pBody.velocity.x)
		
		push();
		translate(this.pBody.position.x, this.pBody.position.y);
		rotate(this.heading);
		imageMode(CENTER);
		image(antImg, 0, 0, this.width, this.height);
		pop();
	}

	// make a random vector that's not too far from the ant
	this.pickVector = function() {
		this.randomVector = Vector.add(this.pBody.position, Vector.create(
			Math.random() * 200 - 100, 
			Math.random() * 200 - 100));
		return this.randomVector
	}

	// Function for finding the closest food
	this.findFood = function(){
		for (food in foods){
			this.dFromFood = Vector.sub(foods[food].pBody.position, this.pBody.position);
			if (Vector.magnitude(this.dFromFood) < Vector.magnitude(this.dFromNearestFood)){
				this.dFromNearestFood = this.dFromFood;
				this.nearestFood = foods[food].pBody
			} 
		}
		return this.nearestFood
	}

	this.move = function() {
		// steering = desired - velocity
		// move, update, show
		// create vector from dest to obj
		// normalize
		// mult by scalar maxspeed
		// limit by scalar maxforce
		// apply force (retun in this case)

		this.dFromDesired = Vector.sub(this.desired, this.pBody.position)
		this.dFromNearestFood = Vector.sub(this.findFood().position, this.pBody.position)
		

		if (Vector.magnitude(this.dFromDesired) < 6 && this.goingHome == false ){
			console.log('Finding a new desired destination')
			this.desired = this.pickVector();	
		} else if (Vector.magnitude(this.dFromNearestFood) < 40 && this.goingHome == false){
			console.log('heading towards food')
			this.desired = this.findFood().position
		} else if (Vector.magnitude(this.dFromDesired) < 6 && this.goingHome == true){
			World.remove(world, [this.food]);
			foods.splice(foods.indexOf(this.food), 1)
			this.desired = this.pickVector()
		}

		var rawSteering = Vector.sub(this.desired, this.pBody.position);
		var normSteering = Vector.normalise(rawSteering);
		this.steering = Vector.mult(normSteering, this.maxSpeed);
		// var steering = new p5.Vector(this.steering.x, this.steering.y);
		// steering.limit(this.maxForce);
		// this.steering = Vector.create(steering.x, steering.y);

		return this.steering

		//Body.applyForce(this.pBody, this.pBody.position, this.steering)

	}
}

