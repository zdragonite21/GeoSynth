function Line(x1, x2, y1, y2, s, col) {
  options = {
    stat: true,
    note: note,
    effect: SOUND.effect,
    isStatic: true,
    col: col,
    sus: false,
  }

  conv = converter(x1, x2, y1, y2, s)

  this.body = Bodies.rectangle(conv.x, conv.y, conv.l, conv.w, options)
  this.s = s

  this.body.label = "collad"

  var length = conv.l
  var width = conv.w

  Body.rotate(this.body, conv.a)

  STATIC_BODIES.push(this.body)

  ALL_BODIES.push(this.body)

  World.add(world, this.body)

  this.show = function () {
    var pos = this.body.position
    var angle = this.body.angle
    var color = this.body.col
    push()
    translate(pos.x, pos.y)
    rotate(angle)
    strokeWeight(stroke_weight)
    stroke(stroke_col)
    fill(color[0], color[1], color[2])
    rect(0, 0, length, width)
    pop()
  }
}

function Ln(base, X, Y, col) {
  conv = converter(base.x, X, base.y, Y, stroke_len)
  push()
  translate(conv.x, conv.y)
  rotate(conv.a)
  strokeWeight(stroke_weight)
  stroke(stroke_col)
  fill(col[0], col[1], col[2])
  rect(0, 0, conv.l, conv.w)
  pop()
}

function converter(x1, x2, y1, y2, s) {
  var l
  var w
  var c
  var x
  var y
  var a
  var vy
  var vx

  l = hpt(distance(x1, x2, y1, y2))

  w = s

  c = avg(x1, x2, y1, y2)

  x = c.x
  y = c.y

  vx = x2 - x
  vy = y2 - y

  a = Math.atan2(vy, vx)

  return { x: x, y: y, l: l, w: w, a: a }
}
