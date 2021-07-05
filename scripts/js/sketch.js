var Engine = Matter.Engine
// Render = Matter.Render
World = Matter.World
Bodies = Matter.Bodies
Body = Matter.Body
Events = Matter.Events
Composite = Matter.Composite
Query = Matter.Query

var option = {
  isStatic: true,
}

var STATIC_BODIES = []
var NONSTATIC_BODIES = []
var ALL_BODIES = []

var SOUND

var engine
var world
var cir1
var cir2
var eraser
var hex
var con
var con_vec
var mouse_vec
var shapes = []
var balls = []

var ground
var ground1
var ground2
var ground3

var button1 = false
var button2 = false
var side_length = 6
var cir = false
var shape_rad = 80
var ball_rad = 20
var header = 50
var rot = 0
var vel = { x: 3, y: 4 }
var max_rad = 400
var min_rad = 40
var stroke_len = 10
var note = "C3"

var poX = 0
var poY = 0
var pX = 0
var pY = 0
var stay = false
var turn = false
var hidden = false
var erase = false
var L = false
var set_vel = 0
var vset = false
var ev = new every()
var mic

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  engine = Engine.create()
  world = engine.world
  world.gravity.y = 0
  Engine.run(engine)

  SOUND = new Music()
  SOUND.initalize()
  SOUND.tone()

  Tone.context.resume()

  rectMode(CENTER)

  ground = Bodies.rectangle(width / 2, height, width, 10, option)
  ground1 = Bodies.rectangle(width / 2, 0, width, 10, option)
  ground2 = Bodies.rectangle(0, height / 2, 10, height, option)
  ground3 = Bodies.rectangle(width, height / 2, 10, height, option)

  hex = new Polygon(width / 2, height / 2, 6, 80, 0)

  shapes.push(hex)

  cir1 = new Circle(70, 70, 40, false)
  cir2 = new Circle(220, 220, 40, false)

  balls.push(cir1, cir2)

  eraser = new Eraser(mouseX, 50, 10)

  Body.setVelocity(cir1.body, { x: 3, y: 5 })

  Body.setVelocity(cir2.body, { x: -5, y: 3 })

  World.add(world, [ground, ground1, ground2, ground3])

  Events.on(engine, "collisionStart", function (event) {
    var pair = event.pairs[0]

    var bodyA = pair.bodyA
    var bodyB = pair.bodyB

    handleCollision(bodyA, bodyB)
  })
}

function handleCollision(bodyA, bodyB) {
  // console.log(bodyA.label, bodyB.label)
  // handle if eraser is one of the objects
  // if (bodyA.label === "eraser" || bodyB.label === "eraser") {
  //   console.log("eraser collided")
  // } else {
  //   console.log(bodyA.label, bodyB.label)
  // }
  // if bodyA || bodyB === hex -- sampler.triggerAttackRelease(['a3', 'c3', 'e3'], '8n')
  if (bodyA.label == "collad") {
    if (bodyA.note != []) {
      SOUND.noteAttackRelease(bodyA.note, bodyA.effect)
    }
  } else if (bodyB.label == "collad") {
    if (bodyB.note != []) {
      SOUND.noteAttackRelease(bodyB.note, bodyB.effect)
    }
  }
}

function mouseClicked() {
  if (mouseX >= 0 && mouseY >= header) {
    if (button1) {
      if (cir) {
        shapes.push(new Circle(poX, poY, shape_rad, true))
        button1 = false
      } else if (L) {
        if (stay) {
          shapes.push(new Line(poX, pX, poY, pY, stroke_len))
          button1 = false
          stay = false
          turn = false
        } else {
          stay = true
        }
      } else {
        if (stay) {
          shapes.push(new Polygon(poX, poY, side_length, shape_rad, rot))
          button1 = false
          stay = false
          turn = false
        } else {
          stay = true
        }
      }
    } else if (button2) {
      if (stay) {
        var ball = new Circle(poX, poY, ball_rad, false)
        Body.setVelocity(ball.body, vel)
        balls.push(ball)
        button2 = false
        stay = false
        turn = false
        vset = false
      } else {
        stay = true
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 72 && hidden == false) {
    $(".trans").animate({ top: "-100px" })
    hidden = true
    header = 0
  } else if (keyCode === 72 && hidden == true) {
    $(".trans").animate({ top: "0" })
    hidden = false
    header = 50
  }
}

function mouseWheel(event) {
  if (button1) {
    if (L) {
      stroke_len += event.delta / 40
      stroke_len = constrain(stroke_len, 5, 30)
    } else {
      shape_rad += event.delta / 20
      shape_rad = constrain(shape_rad, 30, 150)
    }
  }
}

function draw() {
  background(51)
  mouse_vec = createVector(mouseX, constrain(mouseY, header, height))

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].show()
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].show()
  }

  if (!stay) {
    poX = mouseX
    poY = mouseY
  } else {
    turn = true
  }

  if (turn) {
    if (button1) {
      if (keyIsDown(16)) {
        if (L) {
          pX = mouseX
          pY = mouseY
          var con = cons(poX, pX, poY, pY, PI / 16)
          pX = con.x2
          pY = con.y2
        } else {
          rot = roun(
            Math.atan2(mouseY - poY, mouseX - poX),
            PI / (side_length * 2)
          )
        }
      } else {
        rot = Math.atan2(mouseY - poY, mouseX - poX)
        pX = mouseX
        pY = mouseY
      }
    } else if (button2) {
      con = cirConstrain(
        { x: poX, y: poY },
        mouse_vec,
        min_rad,
        max_rad,
        keyIsDown(16),
        vset
      )
      con_vec = createVector(con.x, con.y)
      vel = drawArrow({ x: poX, y: poY }, con_vec)
    }
  }
  if (button1) {
    Poly(poX, poY, side_length, shape_rad, rot, cir, L)
    ev.on()
  } else if (button2) {
    Cir(poX, poY, ball_rad)
    ev.on()
  } else if (erase) {
    eraser.show()
    eraser.detect()
    ev.on()
    $(".toggle").removeClass("disabled")
  } else {
    ev.off()
  }
}
