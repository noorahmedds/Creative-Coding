var starSize = 2.5;

function Star(sp, foo){
	//spawn code
	this.x = random(-width, width);
	this.y = random(-height, height);
	this.z = random(width);
	this.sz = 0;
	this.speed = sp;
	this.flicker = foo;
	
	this.arcLength = random(100, 700);

	this.update = function(){
		//updating the z value to transform the star
		this.z -= this.speed;
		this.sz = map(this.z, 0, width, starSize, 0);
		
		//resetting the star
		if(this.z < 1){
			this.x = random(-width, width);
			this.y = random(-height, height);
			this.arcLength = random(100, 700);
			
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
		var sx = map(abs(this.x/this.z), 0, 1, width, 0);
		var sy = 0 - Math.sqrt(Math.pow(this.arcLength, 2) - Math.pow((-1*sx), 2));
		ellipse(sx, sy, this.sz, this.sz);
	}
}



var stars = [];
var starAmount = 300;
var slowerStarAmount = 600;

function setup() {
	console.log(map(-0.5, 0,1, 0, 600));
	
  createCanvas(600, 600);
	// frameRate(10);
	for(var i =0; i < starAmount; i++){
		stars.push(new Star(0.05, false));
	}
	
	for(var j =0; j < slowerStarAmount; j++){
		stars.push(new Star(0.01, true));
	}
} 

function draw() { 
	// console.log(random(0, 255));
	// updateBackground();
	// background(red, green, blue);
	background(0);
	
	translate(width / 2, height+70);
  for(var i =0; i < starAmount+slowerStarAmount; i++){
		stars[i].update();
		stars[i].draw();
	}
}
