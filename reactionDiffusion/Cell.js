conv_kernel = [[0.05,0.2,0.05],[ 0.2, -1, 0.2 ],[0.05,0.2,0.05]];

var diff_rate_a = 0;
var diff_rate_b = 0;
var feed_rate = 0;
var kill_rate = 0;
var deltaT = 0;


function instantiateCell (_dA, _dB, _f, _k, _t) {
	diff_rate_a = _dA;
	diff_rate_b = _dB;
	feed_rate = _f;
	kill_rate = _k;
	deltaT = _t;
}

class Cell {
	constructor(_x, _y, _a, _b){
		//these are the local concentration of a and b
		this.x = _x;
		this.y = _y;
		this.a = _a;
		this.b = _b;

		// this array is a 3x3 array of negihbouring cell objects
		// instantiated at runtime
		this.neighbours = [[],[],[]];
	}

	// setNeighbours(){

	// }

	calcualateNabla(){
		var neighbours_a_average = 0;
		var neighbours_b_average = 0;
		//finding the average of the neighbouring cells
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < 3; j++){
				console.log(this.neighbours[i])
				if (this.neighbours[i][j].x != window.dummy_cell){
					neighbours_a_average += this.neighbours[i][j].a * conv_kernel[i][j];
					neighbours_b_average += this.neighbours[i][j].b * conv_kernel[i][j];
				}
			}
		}

		var nabla_a = this.a - neighbours_a_average;
		var nabla_b = this.b - neighbours_b_average;
		return [nabla_a, nabla_b];
	}

	updateCell(){
		//here we update the local concentration of a and b
		let a_prime = 0;
		let b_prime = 0;

		var nablas = this.calcualateNabla();

		a_prime = this.a + (((diff_rate_a * nablas[0]) - (this.a * pow(this.b, 2)) + (feed_rate * (1 - this.a)))*deltaT);
		b_prime = this.b + (((diff_rate_b * nablas[1]) + (this.a * pow(this.b, 2)) - ((kill_rate + feed_rate)*this.b))*deltaT);

		// a_prime = this.a + (((diff_rate_a * nablas[0]) - (this.a * pow(this.b, 2)) + (feed_rate * (1 - this.a))));
		// b_prime = this.b + (((diff_rate_b * nablas[1]) + (this.a * pow(this.b, 2)) - ((kill_rate + feed_rate)*this.b)));

		this.a = a_prime;
		this.b = b_prime;
	}

	draw(){
		noStroke();
		fill(constrain(	(floor((this.a-this.b) * 255)), 0, 255));
		rect(this.x, this.y, 1, 1);
	}
}