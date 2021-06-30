function Polygon(
  x,
  y,
  s,
  r,
  R = 0,
  options = {
    isStatic: true,
  }
) {
  this.body = Bodies.polygon(x, y, s, r, options)
  this.r = r
  this.s = s
  this.R = R

  STATIC_BODIES.push(this.body)
  ALL_BODIES.push(this.body)

  if (this.s == 3) {
    this.R += PI / (s * -2)
  } else if (this.s == 5) {
    this.R += PI / (s * 2)
  }

  Body.rotate(this.body, this.R)
  World.add(world, this.body)

  this.show = function () {
    var pos = this.body.position
    var angle = this.body.angle - PI / s
    var an = TWO_PI / s

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    strokeWeight(1)
    stroke(255)
    fill(127)

    beginShape()
    for (let a = 0; a < TWO_PI; a += an) {
      let sx = cos(a) * r
      let sy = sin(a) * r
      vertex(sx, sy)
    }
    endShape(CLOSE)

    pop()
  }
}

function Poly(X, Y, s, r, a, c, l) {
  var pos = { x: X, y: constrain(Y, header, height) }
  if (c) {
    strokeWeight(1)
    stroke(255)
    fill(177)
    ellipse(pos.x, pos.y, r * 2, r * 2)
  } else if (l && turn) {
    Ln({ x: X, y: Y }, pX, pY)
  } else if (l) {
    strokeWeight(1)
    stroke(255)
    fill(177)
    ellipse(pos.x, pos.y, stroke_len, stroke_len)
  } else {
    var angle = a - PI / s
    var an = TWO_PI / s

    if (s == 3) {
      angle += PI / (s * -2)
    } else if (s == 5) {
      angle += PI / (s * 2)
    }

    push()
    translate(pos.x, pos.y)
    rotate(angle)
    strokeWeight(1)
    stroke(255)
    fill(177)

    beginShape()
    for (let i = 0; i < TWO_PI; i += an) {
      let sx = cos(i) * r
      let sy = sin(i) * r
      vertex(sx, sy)
    }
    endShape(CLOSE)

    pop()
  }
}
