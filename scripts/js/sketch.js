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

// var CONV_UNDO = {
//   0: "add shape",
//   1: "add ball",
//   2: "erase shape",
//   3: "erase ball",
// }

var SUSPENDED = []

// history
var UNDO = []

var step = -1

var stroke_col = 255
var stroke_weight = 3

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
var dashape = $("#hex")
var hkb = true

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
var mic
var color
var amp = 50
var paused = false
var scal = 1
var cleear = 1

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight)
  canvas.style("z-index", -2)
  canvas.parent("#pusher")
  engine = Engine.create()
  world = engine.world
  world.gravity.y = 0
  Engine.run(engine)

  SOUND = new Music()
  SOUND.initalize()
  SOUND.tone()

  Tone.context.resume()

  rectMode(CENTER)

  ground = Bodies.rectangle(width / 2, height + 20, width, 50, option)
  ground1 = Bodies.rectangle(width / 2, -20, width, 50, option)
  ground2 = Bodies.rectangle(-20, height / 2, 50, height, option)
  ground3 = Bodies.rectangle(width + 20, height / 2, 50, height, option)

  hex = new Polygon(width / 2, height / 2, 6, 80, 0, [117, 117, 117])

  shapes.push(hex)

  cir1 = new Circle(70, 70, 40, false, [117, 117, 117])
  cir2 = new Circle(220, 220, 40, false, [117, 117, 117])

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

  $("#yesbtn").on("click", () => {
    if (cleear === 1) {
      //all
      World.remove(world, ALL_BODIES)

      STATIC_BODIES = []
      NONSTATIC_BODIES = []
      ALL_BODIES = []
      SUSPENDED = []
      balls = []
      shapes = []
    } else if (cleear === 2) {
      //ball
      World.remove(world, NONSTATIC_BODIES)

      ALL_BODIES = STATIC_BODIES.map((x) => x)
      NONSTATIC_BODIES = []
      SUSPENDED = []
      balls = []
      for (var i = 0; i < shapes.length; i++) {
        if (shapes[i].body.sus) {
          shapes.splice(i, 1)
          i += 1
        }
      }
    } else if (cleear === 3) {
      //shape
      World.remove(world, STATIC_BODIES)

      ALL_BODIES = NONSTATIC_BODIES.map((x) => x)
      STATIC_BODIES = []
      SUSPENDED = []
      shapes = []
      for (var i = 0; i < balls.length; i++) {
        if (balls[i].body.sus) {
          balls.splice(i, 1)
          i += 1
        }
      }
    }
    UNDO = []
    step = -1
  })

  $("#startbt").on("click", () => {
    World.remove(world, ALL_BODIES)

    STATIC_BODIES = []
    NONSTATIC_BODIES = []
    ALL_BODIES = []
    balls = []
    shapes = []
  })
}

function undo() {
  var pevent = UNDO[step]
  if (pevent == 0) {
    let myindex = STATIC_BODIES.length - 1
    World.remove(world, STATIC_BODIES[myindex])
    let temp = shapes.pop()
    temp = STATIC_BODIES.pop()
    temp = ALL_BODIES.pop()
  } else if (pevent == 1) {
    let myindex = NONSTATIC_BODIES.length - 1
    World.remove(world, NONSTATIC_BODIES[myindex])
    let temp = balls.pop()
    temp = NONSTATIC_BODIES.pop()
    temp = ALL_BODIES.pop()
  } else if (pevent == 2) {
    let temp = SUSPENDED.pop()
    ALL_BODIES.push(temp)
    if (temp.stat == true) {
      STATIC_BODIES.push(temp)
    } else {
      NONSTATIC_BODIES.push(temp)
    }
    temp.sus = false

    World.add(world, temp)
  }
  let temp = UNDO.pop()
  step -= 1
}
function handleCollision(bodyA, bodyB) {
  if (bodyA.label == "collad") {
    if (bodyA.note != []) {
      SOUND.noteAttackRelease(bodyA.note, bodyA.effect)
    }
    bodyB.col = bodyA.col
  } else if (bodyB.label == "collad") {
    if (bodyB.note != []) {
      SOUND.noteAttackRelease(bodyB.note, bodyB.effect)
    }
    bodyA.col = bodyB.col
  }
}

function mouseClicked() {
  if (mouseX >= 0 && mouseY >= header) {
    if (button1) {
      if (cir) {
        shapes.push(new Circle(poX, poY, shape_rad, true, color))
        UNDO.push(0)
        step += 1
      } else if (L) {
        if (stay) {
          shapes.push(new Line(poX, pX, poY, pY, stroke_len, color))
          UNDO.push(0)
          step += 1
          stay = false
          turn = false
          $("#line").removeClass("disabled")
        } else {
          stay = true
          $("#line").addClass("disabled")
        }
      } else {
        if (stay) {
          shapes.push(new Polygon(poX, poY, side_length, shape_rad, rot, color))
          UNDO.push(0)
          step += 1
          stay = false
          turn = false
          dashape.removeClass("disabled")
        } else {
          stay = true
          dashape.addClass("disabled")
        }
      }
    } else if (button2) {
      if (stay) {
        var ball = new Circle(poX, poY, ball_rad, false)
        UNDO.push(1)
        step += 1
        Body.setVelocity(ball.body, vel)
        balls.push(ball)
        ball.body.isStatic = paused
        stay = false
        turn = false
        if (vset) {
          $("#enter").removeClass("disabled")
        } else {
          $("#ball").removeClass("disabled")
        }
      } else {
        stay = true
        if (vset) {
          $("#enter").addClass("disabled")
        } else {
          $("#ball").addClass("disabled")
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 72 && hidden == false) {
    $(".trans").animate({ top: "-100px" })
    $("#fhyt").animate({ right: "-200px" })
    $("#geo").animate({ right: "-200px" })
    hidden = true
    header = 0
  } else if (keyCode === 72 && hidden == true) {
    $(".trans").animate({ top: "0" })
    $("#fhyt").animate({ right: "-130px" })
    $("#geo").animate({ right: "-105px" })
    hidden = false
    header = 50
  } else if (keyCode === 32) {
    if (!$("#pause").hasClass("disabled")) {
      $("#pause").trigger("click")
    }
  } else if (keyCode === 66) {
    if (!$("#ball").hasClass("disabled") && hkb) {
      handler.toggle("#ball")
      handler.tgcolor("#ball")
      handler.disable("#ball")
      button2 = !button2
    }
  } else if (keyCode === 69) {
    if (!$("#erase").hasClass("disabled")) {
      handler.toggle("#erase")
      handler.color("#erase")
      handler.disable("#erase")
      erase = !erase
    }
  } else if (keyCode === 187) {
    scal += 0.2
    scal = constrain(scal, 0.1, 2)
  } else if (keyCode === 189) {
    scal -= 0.1
    scal = constrain(scal, 0.1, 2)
  } else if (keyCode === 48) {
    scal = 1
  } else if (keyCode === 67) {
    if (!$("#clearall").hasClass("disabled")) {
      $("#sure").modal("show")
    }
  } else if (keyCode === 77) {
    if (!$("#volume").hasClass("disabled")) {
      $("#volume").trigger("click")
    }
  } else if (keyCode == 90 && keyIsDown(17)) {
    if (UNDO.length > 0) {
      undo()
    }
  }

  // } else if (keyCode === 90) {
  //   if (!$("#line").hasClass("disabled")) {
  //     $("#line").trigger("click")
  //   }
  // } else if (keyCode === 88) {
  //   if (!$("#tri").hasClass("disabled")) {
  //     $("#tri").trigger("click")
  //   }
  // } else if (keyCode === 67) {
  //   if (!$("#sq").hasClass("disabled")) {
  //     $("#sq").trigger("click")
  //   }
  // } else if (keyCode === 52) {
  //   if (!$("#pent").hasClass("disabled")) {
  //     $("#pent").trigger("click")
  //   }
  // } else if (keyCode === 53) {
  //   if (!$("#hexa").hasClass("disabled")) {
  //     $("#hexa").trigger("click")
  //   }
  // } else if (keyCode === 77) {
  //   if (!$("#circle").hasClass("disabled")) {
  //     $("#circle").trigger("click")
  //   }
  // }
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
  if (button2) {
    ball_rad += event.delta / 40
    ball_rad = constrain(ball_rad, 10, 40)
  }
}

function draw() {
  engine.timing.timeScale = scal
  background(51)
  color = Color(note, SOUND.effect)
  mouse_vec = createVector(mouseX, constrain(mouseY, header, height))
  for (var i = 0; i < shapes.length; i++) {
    if (!shapes[i].body.sus) {
      shapes[i].show()
    }
  }

  for (var i = 0; i < balls.length; i++) {
    if (!balls[i].body.sus) {
      balls[i].show()
    }
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
    stepTwo = true
    var lcolor = color.map((val) => constrain(val + amp, 0, 255))
    Poly(poX, poY, side_length, shape_rad, rot, cir, L, lcolor)
  } else if (button2) {
    stepThree = true
    Cir(poX, poY, ball_rad)
  } else if (erase) {
    eraser.show()
    eraser.detect()
  }

  if (button1 == false && stepTwo == true && step2 == true) {
    handle.steptwo()
  }
  if (button2 == false && stepThree == true && step3 == true) {
    handle.stepthree()
    step2 = false
    step3 = false
  }

  pause()
}
