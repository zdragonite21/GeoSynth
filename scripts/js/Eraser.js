function Eraser(x, y, r) {
  options = {
    isSensor: true,
    isStatic: true,
    label: "eraser",
  }

  this.body = Bodies.circle(x, y, r, options)
  this.r = r

  World.add(world, this.body)

  this.show = function () {
    var pos = { x: mouseX, y: constrain(mouseY, header, height) }

    Matter.Body.setPosition(this.body, pos)

    push()

    translate(pos.x, pos.y)
    strokeWeight(1)
    stroke(255)
    fill(230)
    ellipse(0, 0, this.r * 2, this.r * 2)

    pop()
  }

  this.detect = function () {
    if (mouseIsPressed) {
      var checker = Query.point(ALL_BODIES, mouse_vec)
      if (checker.length > 0) {
        if (checker[0].stat == true) {
          console.log(ALL_BODIES)
          console.log(STATIC_BODIES)
          console.log(NONSTATIC_BODIES)
          console.log(shapes)
          console.log(balls)
          console.log("--------------")
          var stat_index = STATIC_BODIES.indexOf(checker[0])
          shapes.splice(stat_index, 1)
          STATIC_BODIES.splice(stat_index, 1)
        } else if (checker[0].stat == false) {
          var nonstat_index = NONSTATIC_BODIES.indexOf(checker[0])
          balls.splice(nonstat_index, 1)
          NONSTATIC_BODIES.splice(nonstat_index, 1)
        }

        var index = ALL_BODIES.indexOf(checker[0])
        ALL_BODIES.splice(index, 1)

        World.remove(world, checker[0])

        console.log(ALL_BODIES)
        console.log(STATIC_BODIES)
        console.log(NONSTATIC_BODIES)
        console.log(shapes)
        console.log(balls)
        console.log("===============")
      }
    }
  }
}
