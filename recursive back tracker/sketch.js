var rows = 20;
var columns = rows;
var block_size;
var field;
var count = rows*rows;
var stack = [];

var visitColor = 0;

//Make a stack here
//Make a pointer that takes the position of the current block


//==========HELPER FUNCTIONS=============
// function colorTheStack(){
// 	stack.forEach(val=>{
// 		fill(220, 100, 110);
// 		noStroke();
// 		var ex = val.x*block_size;
// 		var ey = val.y*block_size;
// 		rect(ex,ey,block_size, block_size);
// 	});
// }

function convertNumberFromCartesian(x, y){
	//return the array index from cartesiam
	return (y*rows)+x
}

function hasUnvisitedNeighbours(currentBlock){

	var current_block_index = convertNumberFromCartesian(currentBlock.x, currentBlock.y);
	var foo = false;
	var neighbours = field[current_block_index].neighbours;

	for (var i =0; i < 4; i++){
		if (neighbours[i].exists == true){
			var neigh = field[convertNumberFromCartesian(neighbours[i].x, neighbours[i].y)];
			if (!neigh.flag){
				//has been visited?
				foo = true;
			}
		}
	}
	return foo;
}

function removeWall(nextRoom_direction, nextRoom_index, current_room_index){

	if (nextRoom_direction == 0) { //remove top wall
		field[current_room_index].walls.top = false;
		field[nextRoom_index].walls.bottom = false;
	}
	else if (nextRoom_direction == 1){ //remove right wall
		field[current_room_index].walls.right = false;
		field[nextRoom_index].walls.left = false;	
	}
	else if (nextRoom_direction == 2){//remove bottom wall
		field[current_room_index].walls.bottom = false;
		field[nextRoom_index].walls.top = false;	
	}
	else if (nextRoom_direction == 3){//remove left wall
		field[current_room_index].walls.left = false;
		field[nextRoom_index].walls.right = false;	
	}
}


class Pointer{
	constructor(_x, _y){
		this.currentBlock = {
			x: _x,
			y: _y
		};
	}

	chooseRandomUnvisitiedNeighbour(){
		var current_block_index = convertNumberFromCartesian(this.currentBlock.x, this.currentBlock.y);
		var direction = Math.floor(Math.random()*4);
		var random_neighbour_coord = field[current_block_index].chooseRandomNeighbour(direction);
		var random_neighbour_index = convertNumberFromCartesian(random_neighbour_coord.x, random_neighbour_coord.y);
		while(random_neighbour_coord.exists == false || field[random_neighbour_index].flag){
			direction = Math.floor(Math.random()*4);
			random_neighbour_coord = field[current_block_index].chooseRandomNeighbour(direction);
			random_neighbour_index = convertNumberFromCartesian(random_neighbour_coord.x, random_neighbour_coord.y);
		}
		return [random_neighbour_coord, random_neighbour_index, direction];
	}

	goToNextBlock(){
		//chose randomly one of the neighbours
		//push current cell to stack
		//remove wall between the chose cell and the current cell
		//make chosen cell current cell

		//set current block as visited
		var currentBlock_index = convertNumberFromCartesian(this.currentBlock.x, this.currentBlock.y);

		//choosing random neighbour
		var x = this.chooseRandomUnvisitiedNeighbour();

		//push current cell to the stack
		var o = {x:this.currentBlock.x, y:this.currentBlock.y};
		stack.push(o);
		console.log('pushed the val: ', stack)

		//make the randomly chosen block the current block
		this.currentBlock.x = x[0].x;
		this.currentBlock.y = x[0].y;

		removeWall(x[2], x[1], currentBlock_index);
	}

	draw(){
		fill(10, 90, 190);
		noStroke();
		var ex = this.currentBlock.x*block_size;
		var ey = this.currentBlock.y*block_size;
		rect(ex,ey,block_size, block_size);
	}

	update(){
		if (count > 0){
			var currentBlock_index = convertNumberFromCartesian(this.currentBlock.x, this.currentBlock.y);
			field[currentBlock_index].setFlag(visitColor);
			visitColor += 1;
			if (visitColor > 100){
				visitColor = 20;
			}
			
			//while there are unvisited neighbour
			// console.log(this.currentBlock)
			
			if(hasUnvisitedNeighbours(this.currentBlock)){
				this.goToNextBlock();
				// console.log('yo yo ');
			}
			else if (stack.length > 0){
				//make the current block the block first on the stack
				console.log(stack);
				var block = stack.pop();
				this.currentBlock.x = block.x;
				this.currentBlock.y = block.y;
			}
		}
	}
}


var pointer;

function setup() {
  // put setup code here
  createCanvas(600, 600);

  // frameRate(5);

  //setting up our environment
  block_size = floor(width/rows); // so our blocks are relative to our width and the number of rows we offer
  background(50);


  //setting up our maze
  field = [];
  for (var i = 0; i < rows; i++){
  	for (var j = 0; j < columns; j++){
  		field[(i*columns)+j] = new Block(j, i, block_size, rows); 
  	}
  }

  // field[1].walls.left = false;

  pointer = new Pointer(5, 5);
 
}

function draw(){
	// pointer.draw();
	pointer.update();
	//drawing the maze
	pointer.draw();
	field.forEach(val => {
		val.draw();
	});
}

