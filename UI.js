$(document).ready(function () {
  var everything = $(".ui").not($(".erase"))

  var inp = $("#in")

  var input = $(".input")

  var add = $(".butt")

  var handler = {
    activate: function () {
      $(this).addClass("active").siblings().removeClass("active")
    },

    color: function () {
      if ($(this).hasClass("red")) {
        $(this).addClass("green")
        $(this).removeClass("red")
        everything.removeClass("disabled")
      } else {
        $(this).addClass("red")
        $(this).removeClass("green")
        everything.addClass("disabled")
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
})

function every() {
  var everything = $(".ui").not(".butt")

  this.on = function () {
    if (!everything.hasClass("disabled")) {
      everything.addClass("disabled")
    }
  }

  this.off = function () {
    if (everything.hasClass("disabled")) {
      everything.removeClass("disabled")
    }
  }
}
