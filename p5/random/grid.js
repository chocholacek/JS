var cellw = 5;
var cellh = 5;

class cell {
	constructor(x, y, alive, count) {
		this.alive = alive;
		this.pos = createVector(x, y);
		this.dye(count);
	}

	dye(count) {
		switch (count) {
		case 2:
			this.clr = { r: 255, g: 0, b: 0 };
			break;
		case 3:
			this.clr = { r: 0, g: 0, b: 255 };
			break;
		default:
			this.clr = { r: 0, g: 255, b: 0 };
		}
	}

	draw() {
		if (this.alive) {
			fill(this.clr.r, this.clr.g, this.clr.b);
			stroke(0);
			rect(this.pos.x, this.pos.y, cellw, cellh);
		}
	}

	breed(count) {
		if (this.alive) {
			if (2 <= count && count <= 3) {
				if (this.clr.r < 255)
					++this.clr.r;
				if (this.clr.g < 255)
					++this.clr.g
				if (this.clr.b < 255)
					++this.clr.b;
				return this;
			}
			return new cell(this.pos.x, this.pos.y, false, count);
		} else {
			return new cell(this.pos.x, this.pos.y, count == 3, count);
		}
	}
}

class grid {
	constructor(w, h, rand = 0) {
		this.data = [];
		this.h = h / cellh;
		this.w = w / cellw;
		for (var i = 0; i < this.h; ++i) {
			var row = [];
			for (var j = 0; j < this.w; ++j)
				row.push(new cell(j * cellw, i * cellh, random(1) < rand));
			this.data.push(row);
		}
	}

	draw() {
		for (let r of this.data)
			for (let c of r) 
				c.draw();
	}

	change(x, y, to) {
		if (x >= 0 && x < width && y >= 0 && y < height) {
			this.data[floor(y / cellw)][floor(x / cellh)].alive = to;
			this.data[floor(y / cellw)][floor(x / cellh)].dye;
		}
	}

	step() {
		let data = [];
		for (let i = 0; i < this.h; ++i) {
			let row = [];
			for (let j = 0; j < this.w; ++j) {
				row.push(this.data[i][j].breed(this.countAlive(i, j)));
			}
			data.push(row);
		}
		this.data = data;;
	}

	countAlive(i, j) {
		let alive = 0;
		let top = (i - 1 < 0 ? this.h - 1 : i - 1);
		let bot = (i + 1 >= this.h ? 0 : i + 1);
		let left = (j - 1 < 0 ? this.w - 1 : j - 1);
		let right = (j + 1 >= this.w ? 0 : j + 1);
		alive += this.data[top][left].alive; // top left
		alive += this.data[top][j].alive; // top mid
		alive += this.data[top][right].alive; // top right
		alive += this.data[i][left].alive; // mid left
		alive += this.data[i][right].alive; // mid right
		alive += this.data[bot][left].alive; // bot left
		alive += this.data[bot][j].alive; // bot mid
		alive += this.data[bot][right].alive; // bot right
		// console.log(alive);
		return alive;
	}
}