import { useState, useCallback, useRef } from 'react'

// Musical scales (frequencies in Hz)
const SCALES = {
  cMajor: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
  aMinor: [220.0, 246.94, 261.63, 293.66, 329.63, 349.23, 392.0, 440.0],
  pentatonic: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25],
  blues: [261.63, 311.13, 349.23, 369.99, 392.0, 466.16, 523.25, 622.25],
}

const SCALE_KEYS = Object.keys(SCALES)
const WAVE_TYPES = ['square', 'sawtooth', 'triangle']

// Note durations in seconds
const DURATIONS = [0.15, 0.2, 0.25, 0.3]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateMelody(scale) {
  const length = 32 + Math.floor(Math.random() * 32)
  const melody = []
  let prevIdx = Math.floor(Math.random() * scale.length)

  for (let i = 0; i < length; i++) {
    // Prefer stepwise motion for musicality
    const step = Math.random() < 0.7 ? pickRandom([-1, 1]) : pickRandom([-2, -1, 1, 2])
    let idx = prevIdx + step
    idx = Math.max(0, Math.min(scale.length - 1, idx))

    // Occasional rest
    if (Math.random() < 0.1) {
      melody.push({ freq: 0, dur: pickRandom(DURATIONS) })
    } else {
      melody.push({ freq: scale[idx], dur: pickRandom(DURATIONS) })
    }
    prevIdx = idx
  }
  return melody
}

export function useChiptune() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const timeoutsRef = useRef([])
  const nodesRef = useRef([])

  const stop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    nodesRef.current.forEach((n) => {
      try { n.stop() } catch { /* already stopped */ }
    })
    nodesRef.current = []
    setPlaying(false)
  }, [])

  const play = useCallback(() => {
    stop()

    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = ctxRef.current

    const scaleKey = pickRandom(SCALE_KEYS)
    const scale = SCALES[scaleKey]
    const waveType = pickRandom(WAVE_TYPES)
    const melody = generateMelody(scale)
    const tempo = 0.8 + Math.random() * 0.4 // speed multiplier

    setPlaying(true)

    let time = ctx.currentTime + 0.05

    melody.forEach((note, i) => {
      const dur = note.dur * tempo

      const tid = setTimeout(() => {
        if (note.freq === 0) return

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = waveType
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime)

        // Slight vibrato
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.value = 5
        lfoGain.gain.value = 2
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        lfo.start()

        // Low-pass filter for warmth
        filter.type = 'lowpass'
        filter.frequency.value = 1500 + Math.random() * 500

        // Envelope
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + dur + 0.01)

        nodesRef.current.push(osc, lfo)
      }, (time - ctx.currentTime) * 1000)

      timeoutsRef.current.push(tid)
      time += dur
    })

    // Auto-stop when melody ends
    const endTid = setTimeout(() => {
      setPlaying(false)
      nodesRef.current = []
    }, (time - ctx.currentTime) * 1000 + 100)
    timeoutsRef.current.push(endTid)

    return scaleKey
  }, [stop])

  return { playing, play, stop }
}
