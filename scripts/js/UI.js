$(document).ready(function () {
  var inp = $("#in")

  var input = $(".input")

  var add = $(".butt")

  var dis = false

  var handler = {
    activate: function () {
      $(this).addClass("active").siblings().removeClass("active")
    },

    color: function () {
      if ($(this).hasClass("red")) {
        $(this).addClass("green")
        $(this).removeClass("red")
      } else {
        $(this).addClass("red")
        $(this).removeClass("green")
      }
    },

    err: function () {
      if (this.value.length == 0) {
        if (!add.hasClass("disabled")) {
          console.log("none")
          add.addClass("disabled")
        }
      } else {
        if ($(".butt").hasClass("disabled")) {
          $(".butt").removeClass("disabled")
        }
      }
      if (parseInt(this.value) > 20) {
        if (!input.hasClass("error")) {
          input.addClass("error")
          add.addClass("disabled")
        }
      } else if (input.hasClass("error")) {
        input.removeClass("error")
        add.removeClass("disabled")
      }
    },
  }

  $(".toggle").on("click", handler.color)

  $("#sb").click(function () {
    $(".ui.labeled.icon.sidebar")
      .sidebar("setting", "transition", "overlay")
      .sidebar("toggle")
  })

  inp.on("input", handler.err)

  $(".grp").on("click", handler.activate)

  $(".pop").popup({
    inline: true,
    delay: {
      show: 1000,
      hide: 0,
    },
  })

  $(".akey").click(function () {
    if (dis) {
      if (!$(this).hasClass("r")) {
        $(this).siblings().removeClass("r").removeClass("bl").removeClass("db")
        $(this).addClass("r").removeClass("bl").removeClass("db")
        note = $(this).data("note")
      }
      if (keyIsDown(16)) {
        SOUND.noteAttackRelease(note)
      }

      if (keyIsDown(17)) {
        var chor = SOUND.chord(note)
        SOUND.chBlue(chor)
      } else {
        $(".akey").each(function () {
          $(this).removeClass("bl").removeClass("db")
        })
      }
    }
  })
})

function every() {
  var everything = $(".ui").not(".butt")

  this.on = function () {
    if (!everything.hasClass("disabled")) {
      everything.addClass("disabled")
      $(".w").addClass("g")
      dis = true
    }
  }

  this.off = function () {
    if (everything.hasClass("disabled")) {
      everything.removeClass("disabled")
      $(".w").removeClass("g")
      dis = false
    }
  }
}
