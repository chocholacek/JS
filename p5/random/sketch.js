var gr;
var paused = true;
var FPSslider;

function setup() {
	createCanvas(1600, 900);
	FPSslider = createSlider(2, 60, 30);
	FPSslider.position(20, height - 20);
	gr = new grid(width, height);
}

var mpressed = false;

function mousePressed() {
	mpressed = true;
}

function mouseReleased() {
	mpressed = false;
}

function keyPressed() {
	switch (keyCode) {
	case 32:
		paused = !paused;
		break;
	case 67:
		gr = new grid(width, height);
		break;
	case 82:
		gr = new grid(width, height, 0.10);
		break;
	}
}

function draw() {
	background(0);
	frameRate(FPSslider.value());
	gr.draw();
	if (!paused) {
		gr.step();
	}
	if (mpressed) {
		switch (mouseButton) {
		case LEFT:
			gr.change(mouseX, mouseY, true);
			break;
		case RIGHT:
			gr.change(mouseX, mouseY, false);
			break;
		}
	}
}