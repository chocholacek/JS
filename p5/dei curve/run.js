var players = [];
var keys = [];

var buttons = [];
var button;

var x = 20;
var y = 50;

var left;
var right;

function add_player() {
	buttons = [];
	left = createInput();
	left.position(x, y);

	right = createInput();
	right.position(x + left.width, y);

	// buttons.push(createButton("set"));
	// buttons[0].position(right.x + right.width, y);
	// buttons[0].mousePressed(addp);

	button = createButton("set");
	button.position(right.x + right.width, y);
	button.mousePressed(add);
}

function add() {
	// var l = left.input();
	// var r = right.input();
	// players.push(new curve(l, r));
	console.log("creating new curve: " + left.input() + " " + right.input());
}

function menu() {
 // 	buttons.push(createButton("add player"));
	// buttons[0].position(20, 50);
	// buttons[0].mousePressed(add_player);

	button = createButton("add player");
	button.position(20, 50);
	button.mousePressed(add_player);
}

function setup() {
	createCanvas(200, 400);
	menu();
	createCanvas(1600, 900);
}

function draw() {

}