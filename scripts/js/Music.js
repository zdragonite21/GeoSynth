class Music {
  constructor() {}

  initalize() {
    this.effectOn = true
    this.octave = 3

    this.synth, delay
    this.wave
    this.select, octSelect
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
    this.delay = new Tone.FeedbackDelay(delaySettings)
    this.fft = new Tone.FFT(256).toMaster()
    this.wave = new Tone.Waveform(256).toMaster()
    this.sampler = new Tone.Sampler(
      {
        // C3: '../samples/ringtone.mp3',
        C3: "https://freesound.org/data/previews/337/337923_5997821-lq.mp3",
        // G3: '../samples/duck.mp3',
      },
      {
        volume: -5,
      }
    )

    if (effectOn) {
      this.sampler.connect(delay)
      this.delay.connect(fft)
      this.delay.connect(wave)
    } else {
      this.sampler.connect(fft)
      this.sampler.connect(wave)
    }
  }

  noteAttack(key) {
    this.scale = getScaleRange("C", "major", this.octave)
    this.note = scale[key]
    this.sampler.triggerAttack(note)
  }

  noteRelease() {
    this.sampler.triggerRelease()
  }

  noteAttackRelease() {
    this.scale = getScaleRange("C", "major", this.octave)
    this.note = scale[key]
    this.sampler.triggerAttackRelease(note)
  }
}
