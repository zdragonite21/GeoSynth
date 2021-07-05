function Circle(x, y, r, stat = false) {
  if (stat) {
    options = {
      note: note,
      isStatic: true,
      effect: SOUND.effect,
    }
  } else {
    options = {
      frictionAir: 0,
      friction: 0,
      frictionStatic: 0,
      inertia: Infinity,
      restitution: 1,
      collisionFilter: {
        mask: 0x001,
      },
    }
  }

  this.body = Bodies.circle(x, y, r, options)
  this.r = r

  if (stat) {
    STATIC_BODIES.push(this.body)
    this.body.label = "collad"
  } else {
    NONSTATIC_BODIES.push(this.body)
  }

  ALL_BODIES.push(this.body)

  World.add(world, this.body)

  this.show = function () {
    var pos = this.body.position
    var angle = this.body.angle

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    strokeWeight(1)
    stroke(255)
    fill(127)
    ellipse(0, 0, this.r * 2, this.r * 2)

    pop()
  }
}

function Cir(X, Y, r) {
  var pos = { x: X, y: constrain(Y, header, height) }

  push()
  translate(pos.x, pos.y)
  strokeWeight(1)
  stroke(255)
  fill(177)
  ellipse(0, 0, r * 2, r * 2)

  pop()
}
