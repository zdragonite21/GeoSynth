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
        C3: "C.mp3",
        // C3: '../samples/ringtone.mp3',
        // G3: "../samples/duck.mp3",
      },

      volume: -10,

      onload: () => {
        sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5)
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
    this.note = scale[key]
    this.sampler.triggerAttack(this.note)
  }

  noteRelease() {
    this.sampler.triggerRelease()
  }

  noteAttackRelease(key) {
    this.scale = getScaleRange("C", "major", this.octave)
    this.note = scale[key]
    this.sampler.triggerAttackRelease("C3", "8n")
  }
}
