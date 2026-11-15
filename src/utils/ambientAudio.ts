/**
 * Elegant Web Audio API Ambient Synthesizer
 * Generates a peaceful, warm, acoustic-like chord progression (Rhodes / music box feel)
 * Completely self-contained: zero external network requests or missing MP3 file issues.
 */

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.5;

  // Romantic warm chord progression in D major / B minor:
  // Dmaj7 -> Bm9 -> Gmaj7 -> A6/add9
  private chords = [
    [146.83, 220.00, 277.18, 369.99, 440.00], // D3, A3, C#4, F#4, A4 (Dmaj7)
    [123.47, 185.00, 246.94, 293.66, 369.99], // B2, F#3, B3, D4, F#4 (Bm9)
    [98.00, 146.83, 196.00, 246.94, 293.66, 369.99], // G2, D3, G3, B3, D4, F#4 (Gmaj7)
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00], // A2, E3, A3, C#4, E4, A4 (A6/9)
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private playTone(freq: number, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator: Warm triangle + soft sine for organic chime / Rhodes tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // gentle chorus detune

    // Warm low-pass filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.35, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  private stepChord() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    const now = this.ctx.currentTime;

    // Arpeggiate the chord gently
    chord.forEach((note, i) => {
      const delay = i * 0.18 + Math.random() * 0.04;
      const duration = 3.6 + Math.random() * 0.8;
      const velocity = 0.4 - i * 0.03;
      this.playTone(note, now + delay, duration, Math.max(0.15, velocity));
    });

    // High delicate chime sprinkle
    if (Math.random() > 0.4) {
      const highNotes = [587.33, 659.25, 739.99, 880.00];
      const randomNote = highNotes[Math.floor(Math.random() * highNotes.length)];
      this.playTone(randomNote, now + 1.2, 2.5, 0.12);
    }

    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Schedule next chord every 3.2 seconds
    this.timer = window.setTimeout(() => {
      this.stepChord();
    }, 3200);
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.stepChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = typeof window !== "undefined" ? new AmbientSynth() : null;

