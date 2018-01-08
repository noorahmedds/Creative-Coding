
function Block(ex, ey, eside){
	//initially setting each block to have origin position
	this.x = ex;
	this.y = ey;
	this.side = eside;
	this.fillColor = random(200, 255);
	
	
	//function to create the next generation of blocks
	this.generateNext = function(){
		var arr = [];
		var shiftFactor = (this.side) / 3;
		//creating the next 9 blocks here
		for (var i = -1; i < 2; i++){
			for (var j = -1; j < 2; j++){
				//make new generation blocks and push them to an empty array
				
				//check to skip the central block
				if(!(i == 0 && j == 0)){
					arr.push(new Block(this.x + (i*shiftFactor), this.y + (j*shiftFactor), shiftFactor));
				}
				
			}
		}
		return arr;
	}
	
	this.show = function(){
		rectMode(CENTER);
		fill(this.fillColor);
		strokeWeight(0.01);
		rect(this.x, this.y, this.side, this.side);
	}
}





var g = 100;
var carpet = [];
var steps = 0;
var cnv;

function setup() {
	cnv = createCanvas(600, 600);
	
	//base block
	background(g);
	carpet.push(new Block(0, 0, width - width/4));
}


function mouseClicked(){
	var x = []
	for(var i = 0; i < carpet.length; i++){
		x = x.concat(carpet[i].generateNext());
	}
	carpet = x;
	console.log(carpet);
	steps++;
}

function draw() {
	background(g, 0, 0);
	translate(width/2, height/2);

	fill(255);
	textSize(32);	
	textFont('Georgia');
	textAlign(CENTER);

	text("Step count: " + String(steps), 0, -250);
	
	// //creating some cool boundary #ignore
	// rectMode(RADIUS);
	// strokeWeight(5);
	// stroke(255);
	// noFill();
	// rect(0, 0, width/2, width/2);
	
	//draw the carpet
	
	for (var i =0; i < carpet.length;i++){
		carpet[i].show();
	}
}
