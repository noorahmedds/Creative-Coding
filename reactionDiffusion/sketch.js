var grid = [];
var delta_t = 1.0;
var diff_a = 1.0;
var diff_b = 0.5;
var feed_rate = 0.055;
var kill_rate = 0.062;
var dummy_cell = new Cell(-1, -1, 1, 0);

//_dA, _dB, _f, _k, _t
instantiateCell(diff_a, diff_b, feed_rate, kill_rate, delta_t);

function setup() {
  // put setup code here
  createCanvas(200, 200);
  background(20);
  pixelDensity(1);
  // pixelDensity(1);

  //here we set our diffusion parameters:
  // Some typical values used, for those interested, 
  //are: DA=1.0, DB=.5, f=.055, k=.062 
  //(f and k vary for different behaviors), 
  //and Δt=1.0. 

  for (var y = 0; y < height; y++){
  	grid.push([]);
  	for (var x = 0; x < width; x++){
  		//push a new row into our grid;
  		// _x, _y, _a, _b, _dA, _dB, _f, _k, _t
  		grid[y].push(new Cell(x, y, 1, 0.5));
  	}
  }

  // //seeding a small area as B = 1
  rand_b_x = random(0, width-50);
  rand_b_y = random(0, height-50);

  // console.log(rand_b_y, rand_b_x);

  for (var i = 10; i < 20; i++){
  	for (var j = 10; j < 20; j++){
  		grid[i][j].b = 1;
  	}
  }

  setNeighbours();

}

function setNeighbours(){
	console.log(dummy_cell);

	for (var y = 0; y < height; y++){
	  	for (var x = 0; x < width; x++){
	  		for (var n = 0; n < 3; n++){
  				grid[y][x].neighbours[n].push(dummy_cell);
  				grid[y][x].neighbours[n].push(dummy_cell);
  				grid[y][x].neighbours[n].push(dummy_cell);
	  		}
  		}
  	}

	for (var y = 0; y < height; y++){
	  	for (var x = 0; x < width; x++){
	  		
	  		if (y != 0){
	  			grid[y][x].neighbours[0][1] = grid[y-1][x];
	  			if (x != width - 1){
	  				grid[y][x].neighbours[0][2] = grid[y-1][x+1];
	  			}
	  			
	  			if (x != 0){
	  				grid[y][x].neighbours[0][0] = grid[y-1][x-1];
	  			}
	  		}

	  		if (y != height-1){
	  			grid[y][x].neighbours[2][1] = grid[y+1][x];
	  			if (x != width - 1){
	  				grid[y][x].neighbours[2][2] = grid[y+1][x+1];
	  			}
	  			if (x != 0){
	  				grid[y][x].neighbours[2][0] = grid[y+1][x-1];
	  			}
	  		}

	  		if (x != 0){
	  			grid[y][x].neighbours[1][0] = grid[y][x-1];
	  		}
	  		if (x != width - 1){
				grid[y][x].neighbours[1][2] = grid[y][x+1];
	  		}

	  		grid[y][x].neighbours[1][1] = grid[y][x];
  		}

	}
}



function draw(){

	// console.log(grid[0][0].neighbours)

	background(0);

	for (var y = 0; y < 50; y++){
	  	for (var x = 0; x < 50; x++){
	  		grid[y][x].draw();
	  		grid[y][x].updateCell();
  		}
  	}
}

