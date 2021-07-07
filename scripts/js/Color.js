var piano = {
  F2: (0, 64, 0),
  "F#2": (0, 0, 0),
  G2: (0, 0, 165),
  "G#2": (0, 0, 0),
  A2: (37, 0, 65),
  "A#2": (0, 0, 0),
  B2: (148, 75, 148),
  C3: (255, 0, 0),
  "C#3": (0, 0, 0),
  D3: (255, 165, 0),
  "D#3": (0, 0, 0),
  E3: (255, 255, 0),
  F3: (0, 128, 0),
  "F#3": (0, 0, 0),
  G3: (0, 0, 255),
  "G#3": (0, 0, 0),
  A3: (75, 0, 130),
  "A#3": (0, 0, 0),
  B3: (238, 120, 238),
  C4: (255, 90, 90),
  "C#4": (0, 0, 0),
  D4: (255, 197, 90),
  "D#4": (0, 0, 0),
  E4: (255, 255, 90),
}

var note2color = [
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
]

function Color(note, eff) {
  if (eff == 1) {
    return piano[note]
  } else if (eff == 2) {
    var index = note2color.indexOf(note) + 1
    if (index !== -1) {
      var inc = 255 / note2color.length
      var hex = inc * index
      return hex, hex, hex
    } else {
      alert(`note not found: ${note}, effect ${eff}`)
    }
  } else if (eff == 3) {
    var index = note2color.indexOf(note) + 1
    if (index !== -1) {
      var inc = 255 / note2color.length
      var hex = inc * index
      return 255, 255, hex
    } else {
      alert(`note not found: ${note}, effect ${eff}`)
    }
  }
}
