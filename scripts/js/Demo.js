step1 = false
step2 = false
step3 = false
stepTwo = false
stepThree = false
var handle = {
  disab: function (id) {
    var all = $(".button").not($(id)).not("#demobt").not("#startbt")
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
    step2 = true
  },
  steptwo: function () {
    handle.disab("#ball")
    $(".grp").removeClass("disabled")

    $("#stepshape").addClass("completed")
    $("#stepball").addClass("active").siblings().removeClass("active")
    step3 = true
  },
  stepthree: function () {
    $("#stepball").addClass("completed").removeClass("active")
    $(".vertical.steps").transition("pulse").transition({
      animation: "scale",
      duration: "3s",
      interval: 2000,
    })
  },
}
