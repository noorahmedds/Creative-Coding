class Block{
	constructor(x, y, size, rows){
		this.x = x;
		this.y = y;
		this.flag = false;
		this.walls = {
			left: true,
			right: true,
			top: true,
			bottom: true
		}
		this.size = size;
		this.row_count = rows;

		this.neighbours = [
			{x:0, y:0, exists: false}, {x:0, y:0, exists: false}, {x:0, y:0, exists: false}, {x:0, y:0, exists: false}
		]

		this.visitColor;
		this.initNeighbours();
	}

	chooseRandomNeighbour(randNumber){
		return this.neighbours[randNumber];
	}

	initNeighbours(){
		var rc = this.row_count;

		if(this.y != 0){
			this.neighbours[0].x = this.x;
			this.neighbours[0].y = this.y-1;
			this.neighbours[0].exists = true;
		}

		if (this.x != 0){
			this.neighbours[3].x = this.x-1;
			this.neighbours[3].y = this.y;
			this.neighbours[3].exists = true;	
		}

		if (this.x != rc-1){
			this.neighbours[1].x = this.x+1;
			this.neighbours[1].y = this.y;
			this.neighbours[1].exists = true;
		}

		if (this.y != rc-1){
			this.neighbours[2].x = this.x;
			this.neighbours[2].y = this.y+1;
			this.neighbours[2].exists = true;
		}
	}

	update(){

	}

	setFlag(visitColor){
		this.flag = true;
		this.visitColor = visitColor;
	}

	draw(){
		var ex = this.x * this.size;
		var ey = this.y * this.size;
		let w = this.size;

		if (this.flag == true){
			//this block has been visited
			colorMode(HSB, 100);
			fill(this.visitColor, this.visitColor, 100);
			colorMode(RGB, 100);
			noStroke();
			rect(ex, ey, w, w);
		}

		strokeWeight(1);
		stroke(255);
		// rect(this.x * this.size, this.y * this.size, this.size, this.size);
		if (this.walls.top){
			line(ex, ey, ex+w, ey);
		}
		if (this.walls.right){
			line(ex + w, ey, ex + w, ey + w);
		}
		if (this.walls.bottom){
			line(ex, ey+w, ex+w, ey+w)
		}
		if (this.walls.left){
			line(ex, ey, ex, ey+w);
		}

	}

	

}