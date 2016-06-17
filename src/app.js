
var drawCanvas = function(){
  var $canvas = $('#myCanvas');
  var canvas = $canvas.get(0).getContext("2d");
  canvas.FPS = 30;
  return canvas;
};

var seedBoard = function() {
  var grass = 200;
  var rabbits = 50;
  var foxes = 10;

  for (var i = 0; i < grass; i++) {
    entities.push(new Grass())
  }

  for (var j = 0; j < rabbits; j++) {
    entities.push(new Rabbit())
  }

  for (var k = 0; k < foxes; k++) {
    entities.push(new Fox())
  }
}

var updateItems = function() {
  //removes inactive entities from the array
  entities = entities.filter(ent => !!ent.alive);

  //seed random population
	var rand = Math.random();
  for (var i = 0; i < 3; i++) {
  	entities.push(new Grass());
  }

  //install generic entity behavior into all entities
	entities.forEach((ent) => {
    ent.encounterPred();
    ent.encouterPrey();
    ent.randomMove();
    ent.huntPrey();
    ent.decHealth();
    ent.isAlive();
    if (ent.type === 'rabbit' || ent.type === 'fox') {
      ent.encouterPeer();
    }
  });

};

var displayItems = function(canvas) {
  canvas.clearRect(0,0,1200,1200)
  entities.forEach(function(item) {
    canvas.beginPath();
    canvas.arc(item.x, item.y, item.size, 0, 2 * Math.PI, false);
    canvas.fillStyle = item.color;
    canvas.fill();
	})
}

$(document).ready(function() {
	var canvas = drawCanvas();
  seedBoard();
	window.setInterval(function() {
		updateItems();
		displayItems(canvas);
	} ,1000/30);
});