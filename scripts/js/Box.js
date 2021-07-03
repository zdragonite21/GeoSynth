function Box(x, y, w, h) {
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

  this.body = Bodies.rectangle(x, y, w, h, options)
  this.w = w
  this.h = h

  World.add(world, this.body)

  this.show = function () {
    var pos = this.body.position
    var angle = this.body.angle

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    rectMode(CENTER)
    strokeWeight(1)
    stroke(255)
    fill(127)
    rect(0, 0, this.w, this.h)

    pop()
  }
}
