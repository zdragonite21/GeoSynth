//////////////////////
// controls
/////////////////////
let drawWave = true
let effectOn = true
let octave = 3

let synth, delay
let wave
let select, octSelect
let isFFT = false

let synthSettings = {
  volume: -10, // goes from -80+, 0 is default
  frequency: 'C4',
  detune: 0,
  oscillator: {
    type: 'sawtooth',
  },
  filter: {
    Q: 4,
    type: 'lowpass',
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

let delaySettings = {
  delayTime: 0.1,
  maxDelay: 1,
  wet: 0.5,
  feedback: 0.2,
}

function setup() {
  createCanvas(900, 600)

  if (drawWave) {
    // waveform drawing
    select = createSelect()
    select.position(10, 45)
    select.option('Waveform')
    select.option('FFT')
    select.changed(() => {
      if (select.value() === 'FFT') {
        isFFT = true
      } else {
        isFFT = false
      }
    })
  }

  // create tone elements
  delay = new Tone.FeedbackDelay(delaySettings)
  fft = new Tone.FFT(256).toMaster()
  wave = new Tone.Waveform(256).toMaster()
  sampler = new Tone.Sampler(
    {
      // C3: '../samples/ringtone.mp3',
      C3: 'https://freesound.org/data/previews/337/337923_5997821-lq.mp3',
      // G3: '../samples/duck.mp3',
    },
    {
      volume: -5,
    }
  )

  // routing
  if (effectOn) {
    sampler.connect(delay)
    delay.connect(fft)
    delay.connect(wave)
  } else {
    sampler.connect(fft)
    sampler.connect(wave)
  }
}

function draw() {
  background('black')

  // draw keyboard
  for (var i = 0; i < 7; i++) {
    var x = i * (width / 7)

    stroke('white')
    strokeWeight(2)
    line(x, 0, x, height)
  }

  // get wave array
  if (drawWave) {
    noFill()
    strokeWeight(3)
    stroke('red')
    if (isFFT) {
      const waveArray = fft.getValue()
      beginShape()
      for (let i = 0; i < waveArray.length; i++) {
        curveVertex(
          map(log(i), 0, log(waveArray.length), 0, width),
          map(waveArray[i], -200, 0, height, 0)
        )
      }
      endShape()
    } else {
      // get wave array
      const waveArray = wave.getValue()
      const bandSize = width / 256.0
      beginShape()
      for (let i = 0; i < waveArray.length; i++) {
        curveVertex(bandSize * i, map(waveArray[i], -1, 1, height, 0))
      }
      endShape()
    }
  }
}

function mousePressed() {
  if (mouseY > 30) {
    // calculate which key was clicked
    var bandSize = width / 7
    var key = Math.floor(mouseX / bandSize)

    // get note value
    const scale = getScaleRange('C', 'major', octave)
    const note = scale[key]

    // trigger attack
    sampler.triggerAttack(note)
  }
}

function mouseReleased() {
  // trigger release
  sampler.triggerRelease()
}

console.log(document.getElementById('plus-button'))

document.getElementById('plus-button').addEventListener('click', () => {
  if (octave < 7) {
    octave++
    document.getElementById('octave-num').innerHTML = octave
  }
})

document.getElementById('minus-button').addEventListener('click', () => {
  if (octave > 1) {
    octave--
    document.getElementById('octave-num').innerHTML = octave
  }
})
