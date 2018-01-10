const gridSize = 30;
const unitLength = 600/gridSize;

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	isPointOffScreen(){
		if (this.x > width/2 || this.x < -width/2){
			return "horizontal_overflow"
		}
		else if(this.y > height/2 || this.y < -height/2){
			return "vertical_overflow"
		}
		else{
			return "";
		}
	}
}

var eatable = function(){
	this.x = floor(random(-gridSize/2 -1 , gridSize/2 - 1))*unitLength;
	this.y = floor(random(-gridSize/2 -1 , gridSize/2 - 1))*unitLength;
	
	this.getNewItem = function(){
		this.x = floor(random(-gridSize/2 -1 , gridSize/2 - 1))*unitLength;
		this.y = floor(random(-gridSize/2 -1 , gridSize/2 - 1))*unitLength;
	}
	
	this.show = function(){
		fill(255, 0, 0);
		ellipseMode(CENTER);
		ellipse(this.x, this.y, unitLength, unitLength);
	}
}

class Snake {
	constructor(s, startingPosition) {
		this.snakeArr = [];
		this.snakeSpeed = 0.0001;
		this.snakeArr.push(startingPosition);
		this.snakeSpeed = s;
		this.direction = floor(random(37, 41));
		// console.log(floor(this.direction));
	}
	
	move(){
		var xMult;
		var yMult;
		//clockwise increment in direction
		if (this.direction == 38){
			xMult = 0;
			yMult = -1;
		}
		else if (this.direction == 39){
			xMult = 1;
			yMult = 0;
		}
		else if (this.direction == 40){
			xMult = 0;
			yMult = 1;
		}
		else{
			xMult = -1;
			yMult = 0;
		}
		
		let _x = this.snakeArr[0].x + (unitLength * xMult);
		let _y = this.snakeArr[0].y + (unitLength * yMult);

		//check whether we have oover flow. 
		let nextPoint = new Point(_x, _y);
		let overFlow = nextPoint.isPointOffScreen();
		

		if(overFlow == "horizontal_overflow" ){
			if (nextPoint.x < 0){
				nextPoint.x = (width/2)-unitLength;
				this.direction = 37;
			}
			else {
				nextPoint.x = (-width/2)+unitLength;
				this.direction = 39;
			}
		}
		else if (overFlow == "vertical_overflow"){
			if (nextPoint.y < 0){
				nextPoint.y = (height/2)-unitLength;
				this.direction = 38;
			}
			else {
				nextPoint.y = (-height/2)+unitLength;
				this.direction = 40;
			}

		}


		this.snakeArr.pop();
		this.snakeArr.unshift(nextPoint);
	}
	
	getHeadPoint(){
		return [this.snakeArr[0].x, this.snakeArr[0].y];
	}
	
	changeDir(d){
		//check if direction is not changing in the axis
		if (d>= 37 && d < 41){
			if ((this.direction == 38 && d == 40) || (this.direction == 39 && d == 37) || (this.direction == 37 && d == 39) || (this.direction == 40 && d == 38)){
				return;
			}
			this.direction = d;			
		}
	}
	
	show(){
		//draw all the points
		for (let i = 0; i < this.snakeArr.length; i++){
			fill(255);
			strokeWeight(0.1);
			stroke(0);
			rectMode(CENTER);
			rect(this.snakeArr[i].x , this.snakeArr[i].y, unitLength, unitLength);
		}
	}
	
	checkEat(food){
		if (this.snakeArr[0].x == food.x && this.snakeArr[0].y == food.y){
			this.lengthPlus();
			food.getNewItem();
		}
	}
	
	lengthPlus(){
		this.snakeArr.push(new Point(this.snakeArr[this.snakeArr.length-1].x, this.snakeArr[this.snakeArr.length-1].y));
		console.log(this.snakeArr.length);
	}
}


function keyPressed(){

	snake.changeDir(keyCode);
	if (keyCode == 65){
		snake.lengthPlus();
	}
}

var snake;
var field;
var eat;
function setup() {
	//making a square canvas/playing area
	createCanvas(600, 600);
	firstPoint = new Point(0, 0);
	
	frameRate(10);
	eat = new eatable();
	snake = new Snake(1, firstPoint);
}

function draw() {
	background(0);
	translate(width/2, height/2);
	
	snake.move();
	snake.checkEat(eat);
	eat.show();
	snake.show();
	
}