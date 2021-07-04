class Music {
  initalize() {
    this.effectOn = true
    this.octave = 3
    this.isFFT = false

    this.synthSettings = {
      volume: -10, // goes from -80+, 0 is default
      frequency: "C4",
      detune: 0,
      oscillator: {
        type: "sawtooth",
      },
      filter: {
        Q: 4,
        type: "lowpass",
        rolloff: -12,
        frequency: 30,
      },
      envelope: {
        attack: 0.1,
        decay: 0.9,
        sustain: 0.9,
        release: 1,
      },
      filterEnvelope: {
        attack: 1,
        decay: 0.05,
        sustain: 0.5,
        release: 2,
        baseFrequency: 200,
        octaves: 7,
        exponent: 1,
      },
    }

    this.delaySettings = {
      delayTime: 0.1,
      maxDelay: 1,
      wet: 0.5,
      feedback: 0.2,
    }
  }

  tone() {
    this.delay = new Tone.FeedbackDelay(this.delaySettings)
    this.fft = new Tone.FFT(256).toMaster()
    this.wave = new Tone.Waveform(256).toMaster()
    this.sampler = new Tone.Sampler({
      urls: {
        C1: "utils/samples/C1vL.wav",
        C2: "utils/samples/C2vL.wav",
        C3: "utils/samples/C3vL.wav",
        C4: "utils/samples/C4vL.wav",
        C5: "utils/samples/C5vL.wav",
        C6: "utils/samples/C6vL.wav",
        C7: "utils/samples/C7vL.wav",
        C8: "utils/samples/C8vL.wav",
      },

      volume: -30,

      onload: () => {
        this.sampler.triggerAttackRelease(["C3", "E3", "G3", "B3"], 3)
      },
    }).toDestination()

    if (this.effectOn) {
      this.sampler.connect(this.delay)
      this.delay.connect(this.fft)
      this.delay.connect(this.wave)
    } else {
      this.sampler.connect(this.fft)
      this.sampler.connect(this.wave)
    }
  }

  noteAttack(key) {
    this.scale = getScaleRange("C", "major", this.octave)
    this.note = this.scale[key]
    this.sampler.triggerAttack(this.note)
  }

  noteRelease() {
    this.sampler.triggerRelease()
  }

  noteAttackRelease(note) {
    // this.scale = getScaleRange("C", "major", this.octave)
    // console.log(this.scale)
    // this.note = this.scale[key]
    this.sampler.triggerAttackRelease(note, "2n")
  }

  chord(key) {
    var notes = key.length == 3 ? conFlat[key.slice(0, 2)] : key[0]

    var mix_chord = majorChords[notes]

    for (var i = 0; i < mix_chord.length; i++) {
      if (mix_chord[i].includes("b")) {
        mix_chord[i] = conSharp[mix_chord[i]]
      }
    }

    return mix_chord
  }

  chBlue(chor) {
    $(".akey").each(function () {
      var temp = $(this).data("note")
      temp = temp.length == 3 ? temp.slice(0, 2) : temp[0]
      if (!$(this).hasClass("r")) {
        for (let i = 0; i < chor.length; i++) {
          if (chor[i] == temp) {
            if (!$(this).hasClass("bl") && !$(this).hasClass("db")) {
              if ($(this).hasClass("b")) {
                $(this).addClass("db")
              } else {
                $(this).addClass("bl")
              }
            }
          }
        }
      }
    })
  }
}
