step1 = false
var handle = {
  disab: function (id) {
    var all = $(".button").not($(id))
    // if (id != "#select") {
    //   sel = $("#select")
    //   sel.parent().addClass("disabled")
    // }
    all.addClass("disabled")
    // $(".w").addClass("g")
    // dis = true
  },
  enab: function () {
    var all = $(".button")
    all.removeClass("disabled")
    // $("#select").parent().removeClass("disabled")
    // $(".w").removeClass("g")
    // dis = false
  },
  enable: function (n) {
    $(n).children().removeClass("disabled")
    $("#stepsound").addClass("completed")
    $("#stepshape").addClass("active").siblings().removeClass("active")
  },
}

$(document).ready(() => {
  handle.disab("#select")
  step1 = true
})
