
function Star(sp, foo){
	//spawn code
	this.x = random(-width, width);
	this.y = random(-height, height);
	this.z = random(width);
	this.sz = 0;
	this.speed = sp;
	this.flicker = foo;

	this.update = function(){
		//updating the z value to transform the star
		this.z -= this.speed;
		this.sz = map(this.z, 0, width, 5, 0);
		
		//resetting the star
		if(this.z < 1){
			this.x = random(-width, width);
			this.y = random(-height, height);
			
			//set the star back to farthest point
			this.z = width;
			this.sz = 0;
		}
	}
	
	this.draw = function(){
		fill(255);
		if (foo){
			fill(random(100, 255));
		}
		
		noStroke();
		
		
		//this code  the star
		var sx = map((this.x/this.z), 0, 1, 0, width);
		var sy = map((this.y/this.z), 0, 1, 0, height);
		ellipse(sx, sy, this.sz, this.sz);
	}
}



var stars = [];
var starAmount = 100;
var slowerStarAmount = 400;

function setup() {
	console.log(map(-0.5, 0,1, 0, 600));
	
  createCanvas(600, 600);
	// frameRate(10);
	for(var i =0; i < starAmount; i++){
		stars.push(new Star(5, false));
		stars.push(new Star(15, false));
	}
	
	for(var j =0; j < slowerStarAmount; j++){
		stars.push(new Star(1, true));
	}
} 

function draw() { 
	// console.log(random(0, 255));
	// updateBackground();
	// background(red, green, blue);
	background(0);
	
	translate(width / 2, height / 2);
  for(var i =0; i < starAmount+slowerStarAmount; i++){
		stars[i].update();
		stars[i].draw();
	}
}