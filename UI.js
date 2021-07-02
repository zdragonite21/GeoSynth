$(document).ready(function () {
  var everything = $(".ui").not($(".erase"))

  var inp = $(".input")

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
  }

  $(".toggle").on("click", handler.color)

  $("#sb").click(function () {
    console.log(inp.value)
    $(".ui.labeled.icon.sidebar")
      .sidebar("setting", "transition", "overlay")
      .sidebar("toggle")
  })

  if (parseInt(inp.value) > 20) {
    if (!inp.hasClass("error")) {
      inp.addClass("error")
    }
  } else if (inp.hasClass("error")) {
    inp.removeClass("error")
  }

  $(".grp").on("click", handler.activate)

  $(".pop").popup({
    inline: true,
    delay: {
      show: 1000,
      hide: 0,
    },
  })
})
