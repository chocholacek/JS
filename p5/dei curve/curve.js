var elis = 5;
var turn = 64;

class curve {
	constructor(l, r) {
		this.pos = createVector(floor(random(0, width)), floor(random(0, height)));
		this.dir = p5.Vector.random2D();
		this.tail = [];
		this.hit = false;
		this.right = r;
		this.left = l;
		this.angle = 0;
		this.clr = {
			r: random(0, 255),
			g: random(0, 255),
			b: random(0, 255)
		}
	}

	hits() {
		--active;
		this.hit = true;
	}

	collides(p) {
		// checks head
		if (dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y) < elis) 
			return true;

		// checks tail
		for (let part of p.tail)
			if (dist(this.pos.x, this.pos.y, part.x, part.y) < elis)
				return true;
		return false;
	}

	step() {
		var angle = 0;
		if (keys.includes(this.left)) {
			angle -= PI / turn;
		}
		if(keys.includes(this.right)) {
			angle += PI / turn;
		} 
		if (!this.hit) {
			this.tail.push(createVector(this.pos.x, this.pos.y));
			this.dir = p5.Vector.fromAngle(this.dir.heading() + angle);
			this.pos.add(this.dir);

			// hits wall
			if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
				this.hits();
			}
			// hits self
			for (let t of this.tail.slice(0, -20)) {
				if (dist(this.pos.x, this.pos.y, t.x, t.y) < elis) {
					this.hits();
					return;
				}
			}

			// hits others
			for (let p of players) {
				if (this === p)
					continue;
				if (this.collides(p)) {
					this.hits();
					break;
				}
			}
		}
	}

	draw() {
		noStroke();
		fill(this.clr.r, this.clr.g, this.clr.b);
		for (var i = 0; i < this.tail.length; ++i)
			ellipse(this.tail[i].x, this.tail[i].y, elis, elis);
		ellipse(this.pos.x, this.pos.y, elis, elis);
	}
}