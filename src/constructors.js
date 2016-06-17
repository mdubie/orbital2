var entities = [];

class Entity {
	constructor(type, color, predator, prey, x, y, size, health, alive, range, speed, fertility) {
		this.type = type;
		this.color = color;
		this.predator = predator;
		this.prey = prey;
		this.x = x || Math.random() * 1200;
		this.y = y || Math.random() * 1200;
		this.size = size;
		this.health = health;
		this.alive = alive || true;
		this.range = range;
		this.speed = speed;
		this.fertility = fertility;
	}

	//if an entity is with in a certain range of a predator, change alive status to false
	encounterPred() {
		if (entities
		  .slice()
		  .filter(ent => ent.type === this.predator)
		  .filter(ent =>  20 > Math.sqrt(Math.pow(ent.x - this.x, 2) + Math.pow(ent.y - this.y, 2)))
		  .length) {
			this.alive = false;
		}
	}

	//if an entity is with in a certain range of a prey, increment health status up
	encouterPrey() {
		if (entities
		  .slice()
		  .filter(ent => ent.type === this.prey)
		  .filter(ent =>  20 > Math.sqrt(Math.pow(ent.x - this.x, 2) + Math.pow(ent.y - this.y, 2)))
		  .length) {
			this.health += 50;
		}
	}

	randomMove() {
		this.x += Math.random() * this.speed - this.speed/2; //random movement
		this.y += Math.random() * this.speed - this.speed/2;
	}

	//decrement health each turn
	decHealth() {
		this.health--;
	}

	//if health falls below zero, set this entities alive status to false
	isAlive() {
		if (this.health <= 0) {
			this.alive = false;
		}
	}

	escapePredators() {

	}

	huntPrey() {
		var target = entities
			.slice()
		  .filter(ent => ent.type === this.prey)
		  .reduce((ac, cr) => {
		  	var d = Math.sqrt(Math.pow(ac.loc.x - cr.x, 2) + Math.pow(ac.loc.y - cr.y, 2));
		  	if (d < ac.d) {
		  		ac.loc.x = cr.x;
		  		ac.loc.y = cr.y;
		  		ac.d = d;
		  	}
		  	return ac;
		  }, {loc: {x: this.x, y: this.y}, d: this.range});
		this.x = (target.loc.x + this.x*19)/20;
		this.y = (target.loc.y + this.y*19)/20;
	}

	encouterPeer() {
		if (entities
		  .slice()
		  .filter(ent => ent.type === this.type)
		  .filter(ent =>  10 > Math.sqrt(Math.pow(ent.x - this.x, 2) + Math.pow(ent.y - this.y, 2)))
		  .length) {
			if (Math.random() < this.fertility) {
				if (this.type === 'rabbit') {
					entities.push(new Rabbit());
				} else {
					entities.push(new Fox());
				}
			}
		}
	}

	herdTogether() {

	}
};

class Fox extends Entity {
	constructor(type, color, predator, prey, x, y, size, health, alive, range, speed, fertility) {
		super('fox', 'red', null, 'rabbit', Math.random() * 1200, Math.random() * 1200, 10, 100, true, 100, 5, .007)
	}
}

class Grass extends Entity {
	constructor(type, color, predator, prey, x, y, size, health, alive, range, speed, fertility) {
		super('grass', 'green', 'rabbit', null, Math.random() * 1200, Math.random() * 1200, 5, 100, true, 0, 0, .01)
	}
}

class Rabbit extends Entity {
	constructor(type, color, predator, prey, x, y, size, health, alive, range, speed, fertility) {
		super('rabbit', 'blue', 'fox', 'grass', Math.random() * 1200, Math.random() * 1200, 8, 200, true, 100, 5, .01)
	}

}


// color
// type
// predator
// prey
// x
// y
// size
// alive?
// health

// encouter predator
// encounter prey
// encounter peer
// random movement
// escaping prey
// hunting predator