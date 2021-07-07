var dis = false

var en = ""

$(document)
  .ready(function () {
    var inp = $("#in")

    var input = $(".input")

    var add = $("#enter")

    var handler = {
      activate: function () {
        $(this).addClass("active").siblings().removeClass("active")
      },

      color: function (id) {
        if ($(id).hasClass("red")) {
          $(id).addClass("green")
          $(id).removeClass("red")
        } else {
          $(id).addClass("red")
          $(id).removeClass("green")
        }
      },

      tgcolor: function (id) {
        if ($(id).data("val") == true) {
          $(id).addClass("green")
          $(id).removeClass($(id).data("color"))
        } else {
          $(id).removeClass("green")
          $(id).addClass($(id).data("color"))
        }
      },

      err: function () {
        if (this.value.length == 0) {
          add.addClass("disabled")
        } else {
          add.removeClass("disabled")
        }
        if (parseInt(this.value) > 20) {
          input.addClass("error")
          add.addClass("disabled")
        } else {
          input.removeClass("error")
          add.removeClass("disabled")
        }
      },

      disable: function (id, but = false) {
        var all = $(".ui").not($(id))

        if (but) {
          all = all.not($("#enter"))
        }

        var sel = $("#select")
        if ($(id).data("val")) {
          all.addClass("disabled")
          sel.parent().addClass("disabled")
          $(".w").addClass("g")
          dis = true
          en = but ? "#enter" : id
        } else {
          all.removeClass("disabled")
          sel.parent().removeClass("disabled")
          $(".w").removeClass("g")
          dis = false
        }
      },
      toggle: function (id) {
        $(id).data("val", !$(id).data("val"))
      },
    }
    $(".erase").on("click", () => {
      handler.color("#erase")
      handler.toggle("#erase")
      handler.disable("#erase")
    })

    $("#sb").click(function () {
      $(".ui.labeled.icon.sidebar")
        .sidebar("setting", "transition", "overlay")
        .sidebar("toggle")
    })

    inp.on("input", handler.err)

    $("#shape").click(() => {
      handler.toggle("#shape")
      handler.tgcolor("#shape")
      handler.disable("#shape")
      button1 = !button1
    })

    $("#ball").click(() => {
      handler.toggle("#ball")
      handler.tgcolor("#ball")
      handler.disable("#ball")
      button2 = !button2
    })

    $("#enter").click(() => {
      handler.toggle("#enter")
      handler.tgcolor("#enter")
      $("#hold").data("val", $("#enter").data("val"))
      handler.disable("#hold", true)
      set_vel = parseInt($("#in")[0].value)
      button2 = !button2
      vset = !vset
    })

    $(".grp").on("click", handler.activate)

    $("#select").dropdown({
      onChange: function (value) {
        SOUND.setEffect(value)
      },
    })

    $("#setting").click(() => {
      $(".ui.modal").modal("show")
    })

    $("#fhyt").on("mouseenter", function () {
      $(this).animate({ right: "0px" })
    })

    $("#fhyt").on("mouseleave", function () {
      $(this).animate({ right: "-130px" })
      if ($(this).queue("fx").length > 2) {
        $(this).clearQueue()
      }
    })

    $("#geo").on("mouseenter", function () {
      $(this).animate({ right: "0px" })
    })

    $("#geo").on("mouseleave", function () {
      $(this).animate({ right: "-105px" })
      if ($(this).queue("fx").length > 2) {
        $(this).clearQueue()
      }
    })

    $(".drum").on("click", function () {
      var cur = $(this)
      cur.addClass("active")
      note = SOUND.drum(cur.data("val"))
      console.log(note)

      if (keyIsDown(16)) {
        SOUND.noteAttackRelease(note, 3)
      }

      $(".drum")
        .not(cur)
        .each(function () {
          $(this).removeClass("active")
        })
    })

    $(".pop").popup({
      inline: true,
      delay: {
        show: 1000,
        hide: 0,
      },
    })

    $("#copy").on("click", () => {
      copy2clip("https://zdragonite21.github.io/GeoSynth")
      alert("Link Copied!")
    })

    $("#pause")
      .state({
        text: {
          active: "Play",
          inactive: "Pause",
        },
      })
      .click(() => {
        handler.toggle("#pause")
        handler.tgcolor("#pause")
      })

    $(".akey").click(function () {
      if (!dis) {
        if (!$(this).hasClass("r")) {
          $(this)
            .siblings()
            .removeClass("r")
            .removeClass("bl")
            .removeClass("db")
          $(this).addClass("r").removeClass("bl").removeClass("db")
          note = $(this).data("note")
        }
        if (keyIsDown(16)) {
          SOUND.noteAttackRelease(note, SOUND.effect)
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
  .keyup((event) => {
    if (event.key === "Escape") {
      console.log("yay")
      if (dis) {
        $(en).trigger("click")
      }
    }
  })
  .on("contextmenu", function () {
    return false
  })

function copy2clip(str) {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

// function every() {
//   var everything = $(".ui").not(".butt")
//   var select = $(".ui.dropdown")

//   this.on = function (e = false) {
//     dis = true
//     if (e) {
//       everything.not(".erase").addClass("disabled")
//     } else {
//       everything.addClass("disabled")
//     }

//     select.parent().addClass("disabled")
//     $(".w").addClass("g")
//   }

//   this.off = function () {
//     dis = false
//     everything.removeClass("disabled")
//     select.parent().removeClass("disabled")
//     $(".w").removeClass("g")
//   }
// }
