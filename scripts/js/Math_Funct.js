function roun(num, step) {
  return Math.round(num / step) * step
}

function drawArrow(base, pt, len = 0) {
  var myColor = "Green"
  push()
  stroke(myColor)
  strokeWeight(3)
  fill(myColor)
  line(base.x, base.y, pt.x, pt.y)
  let arrowSize = 7
  translate(pt.x, pt.y)
  pt.sub(base.x, base.y)
  rotate(pt.heading())
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0)
  pop()
  return { x: pt.x / 20, y: pt.y / 20 }
}

function hpt(val) {
  return Math.sqrt(Math.pow(val.x, 2) + Math.pow(val.y, 2))
}

function cirConstrain(base, pt, min_rad, max_rad, shift, set) {
  dist = hpt(distance(base.x, pt.x, base.y, pt.y))

  x = pt.x - base.x
  y = pt.y - base.y
  var radians = Math.atan2(y, x)
  if (set) {
    dist = set_vel * 20
  }

  if (shift) {
    radians = roun(radians, PI / 8)
  }

  if (dist >= min_rad && dist <= max_rad) {
    return {
      x: Math.cos(radians) * dist + base.x,
      y: Math.sin(radians) * dist + base.y,
    }
  } else if (dist >= max_rad) {
    return {
      x: Math.cos(radians) * max_rad + base.x,
      y: Math.sin(radians) * max_rad + base.y,
    }
  } else if (dist <= min_rad) {
    return {
      x: Math.cos(radians) * min_rad + base.x,
      y: Math.sin(radians) * min_rad + base.y,
    }
  }
}

function distance(x1, x2, y1, y2) {
  return { x: x2 - x1, y: y2 - y1 }
}

function avg(x1, x2, y1, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
}

function cons(x1, x2, y1, y2, con) {
  x = x2 - x1
  y = y2 - y1

  d = hpt(distance(x1, x2, y1, y2))

  a = Math.atan2(y, x)

  a = roun(a, con)

  x2 = Math.cos(a) * d + x1
  y2 = Math.sin(a) * d + y1

  return { x1: x1, x2: x2, y1: y1, y2: y2 }
}

function pause() {
  if ($(".pause").hasClass("red")) {
    ALL_BODIES.forEach((body) => (body.isStatic = true))
  } else {
    ALL_BODIES.forEach(function (body) {
      if (body.stat == false) {
        body.isStatic = false
      }
    })
  }
}
