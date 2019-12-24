var Engine = Matter.Engine,
    Render = Matter.Render,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

var engine = Engine.create();

var render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: canvas.height,
    wireframes: false,
    background: "#121212",
  }
})

var mouse = Mouse.create(render.canvas);

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
});

window.addEventListener("DOMContentLoaded", function() {
  var population = 100;

  for (var i = 0; i < population; i++) {
    var x = randomInteger(-canvas.width, canvas.width)
    var y = randomInteger(-canvas.height, canvas.height)

    var radius = randomInteger(50, 100);

    new Planet(x, y, radius);
  }
});

mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

function Planet (x = 0, y = 0, radius = 100, mass = 100, color = "#6e72ff") {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.mass = mass;

  var planet = Bodies.circle(x, y, radius);

  planet.frictionAir = 0;
  planet.restitution = 0.5;

  planet.render.fillStyle = color;

  World.add(engine.world, planet);
}

function createPlanet() {
  var x = parseInt(document.getElementById("xPos").value);
  var y = parseInt(document.getElementById("yPos").value);

  var radius = parseInt(document.getElementById("radius").value);
  var mass = parseInt(document.getElementById("mass").value);

  return new Planet(x, y, radius, mass)
}

function randomInteger(min, max) {
  return Math.random() * (max - min) + min;
}

engine.world.gravity.y = 0;

World.add(engine.world, mouseConstraint);

Engine.run(engine);
Render.run(render);