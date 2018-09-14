
// Module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies,
	MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices
    Svg = Matter.Svg,
    Constraint = Matter.Constraint,
    Body = Matter.Body;
	

	var engine;
	var world;
	var engine;
	var obstacle;
	var ants = [];
	var rannum = Math.random();
	var obstacles = [];
	var xo;
	var yo;
	var scl;
	var randW;
	var randH;
	var obstacleDimensions = [];
	var antImg;
	var foods = [];
	var mound;
	var moundPos = Vector.create(Math.random() * 400 - 200, Math.random() * 400 - 200);
	var antPop;
	var bodyA;
	var bodyB;



// S E T U P
function setup(){
	// Create canvas and add some styling
	createCanvas(windowWidth - 50, windowHeight - 50)
	xo = width / 2
	yo = height / 2
	scl = 1
	var canvas = document.getElementById('defaultCanvas0');
	canvas.style.display = 'block';
	canvas.style.margin = 'auto';
	canvas.style.border = '1px solid black';
	canvas.style.borderRadius = '12px';
	
	
	// create an engine
	engine = Engine.create(),
	world = engine.world;
	// var badPun = 'a different perspective on gravity' 
	world.gravity.y = 0;


	antImg = loadImage('ant/ant.png')
	
	// Make one ant, then make another one every 30s
	// Also, this is my first use of arrow syntax for a function ^_^
	ants.push(new Ant(moundPos.x, moundPos.y));
	antPop = setInterval(() => {ants.push(new Ant(moundPos.x, moundPos.y))}, 30000);
	
	// Make some food
	for (var i = 0; i < 1000; i++){
		foods.push(new Food(
			(Math.random() * 4000) - 2000,
			(Math.random() * 4000) - 2000))
	}

	mound = new Mound(moundPos.x, moundPos.y);
	
	// setup collision for food and eventually pheremone trails
	Events.on(engine, 'collisionStart', function(event){

		var pairs = event.pairs;
		
		for (var i = 0, j = pairs.length; i != j; ++i){
			var pair = pairs[i];
			console.log('collision started')
			console.log(pair.bodyA)
			console.log(pair.bodyB)
			for (ant in ants){
				for (food in foods){
					if (pair.bodyA === ants[ant].pBody && pair.bodyB === foods[food].pBody){
					console.log('collision between' + pair.bodyA +  'and ' + pair.bodyB)
					Body.setParts(ants[ant].pBody, [pair.bodyA, pair.bodyB]);
					ants[ant].desired = moundPos;
					ants[ant].goingHome = true;
					ants[ant].food = pair.bodyB;
				} else if (pair.bodyB === ants[ant].pBody && pair.bodyA === foods[food].pBody){
					console.log('collision between' + pair.bodyA +  'and ' + pair.bodyB)
					Body.setParts(ants[ant].pBody, [pair.bodyB, pair.bodyA]);
					ants[ant].desired = moundPos;
					ants[ant].goingHome = true;
					ants[ant].food = pair.bodyA;
				}
			}
		}
	}
})
}


// M A I N  D R A W  L O O P
function draw(){
	clear()
	background(128,64,0);
	translate(xo, yo)
	scale(scl)
	//smooth()

	for (ant in ants){
		//ants[ant].move();
		Body.applyForce(ants[ant].pBody, ants[ant].pBody.position, ants[ant].move());
		//Body.applyForce(ants[ant].body, ants[ant].body.position, ants[ant].checkFood());
	}

	Engine.update(engine, [delta=16.666]);
	
	mound.show()

	for (ant in ants){
		ants[ant].show();
	}

	for (item in foods){
		foods[item].show();
	}
}

// Be able to move the map with the mouse
function mouseDragged(){
	xo = xo + (mouseX - pmouseX);
	yo = yo + (mouseY - pmouseY);
	return false;
}

// this can so definitely be rewritten
function mouseWheel(event){
	if (event.delta > 0){
		scl += -.03
	} else if (event.delta < 0){
		scl += .03
	} 
	
	return false
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight - 100);
}