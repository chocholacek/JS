var players = [];
var keys = [];
var active = 2;
var counter = 0;

function setup() {
  createCanvas(1200, 600);
  players.push(new curve(65, 68));
  players.push(new curve(37, 39));
}

function initial() {
	
}

function keyReleased() {
	keys.splice(keys.indexOf(keyCode), 1);
}

function keyPressed() {
	keys.push(keyCode);
}

function draw() {
	background(50);
	if (active > 1) {
	  for (let p of players) {
	  	p.draw();
	  	p.step();
	  }
	  ++counter;
	} else {
		textSize(100);
		var winner;
		for (let p of players) {
			if (!p.hit)
				winner = p;
		}
		if (winner) {
			fill(winner.clr.r, winner.clr.g, winner.clr.b);
			var msg = "Won!";
		} else {
			fill(255);
			var msg = "Draw";
		}
		textAlign(CENTER, CENTER);
		text(msg, 0, 0, width, height);
	}
}