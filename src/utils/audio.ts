/**
 * Web Audio API synthesizer for personal, ambient, lo-fi piano and paper sound effects.
 * This ensures no external network requests or broken audio files.
 */

class KeepsakeAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientInterval: any = null;
  private isMusicPlaying = false;
  private masterVolume: GainNode | null = null;
  private musicVolume: GainNode | null = null;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    
    this.masterVolume = this.ctx.createGain();
    this.masterVolume.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.masterVolume.connect(this.ctx.destination);

    this.musicVolume = this.ctx.createGain();
    this.musicVolume.gain.setValueAtTime(0.12, this.ctx.currentTime); // Soft, low-volume background
    this.musicVolume.connect(this.masterVolume);
  }

  setVolume(val: number) {
    if (!this.ctx) this.init();
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  // Synthesize a piano-like note with soft harmonics
  playPianoNote(frequency: number, duration = 3.5, velocity = 0.5) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    // Create multiple oscillators for harmonics to sound like a rich piano
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    
    const harmonics = [1, 2, 3, 4];
    const weights = [1.0, 0.4, 0.15, 0.05];

    harmonics.forEach((h, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Use triangle or sine wave for soft, mellow tone
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(frequency * h, now);
      
      // Envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(velocity * weights[i] * 0.15, now + 0.08); // soft attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.musicVolume || this.ctx.destination);
      
      oscs.push(osc);
      gains.push(gain);
      
      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  // Chord progression loop: Cmaj7 - Am9 - Fmaj7 - G6
  private chordProgression = [
    // Chord 1 (Fmaj7): F2, A3, C4, E4
    [87.31, 220.00, 261.63, 329.63],
    // Chord 2 (Cmaj7): C2, E3, G3, B3
    [65.41, 164.81, 196.00, 246.94],
    // Chord 3 (Am9): A2, C3, E3, G3, B3
    [110.00, 130.81, 164.81, 196.00, 246.94],
    // Chord 4 (G6): G2, B3, D4, G4
    [98.00, 246.94, 293.66, 392.00]
  ];

  private currentChordIndex = 0;

  startAmbientMusic() {
    if (this.isMusicPlaying) return;
    this.init();
    this.isMusicPlaying = true;
    
    const playNextChord = () => {
      if (!this.isMusicPlaying) return;
      
      const freqs = this.chordProgression[this.currentChordIndex];
      // Play notes with soft offsets
      freqs.forEach((freq, idx) => {
        const offset = idx * 0.15; // Arpeggio effect
        setTimeout(() => {
          if (this.isMusicPlaying) {
            this.playPianoNote(freq, 4.5, 0.4);
          }
        }, offset * 1000);
      });

      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
    };

    playNextChord();
    this.ambientInterval = setInterval(playNextChord, 5000);
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // Synthesize realistic page flip sound (friction + snap)
  playPageFlipSound() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Create random noise band
    const bufferSize = this.ctx.sampleRate * 0.35; // 350ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.35);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);

    noise.start(now);
  }

  // Synthesize realistic paper unfold sound (gentle snap + small crinkle)
  playPaperUnfoldSound() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    // Series of 3 tiny random crinkles
    [0, 0.08, 0.15].forEach((delay) => {
      if (!this.ctx) return;
      const playCrinkleTime = now + delay;
      const bufferSize = this.ctx.sampleRate * 0.08; // 80ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, playCrinkleTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, playCrinkleTime);
      gain.gain.linearRampToValueAtTime(0.05, playCrinkleTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, playCrinkleTime + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterVolume || this.ctx.destination);
      noise.start(playCrinkleTime);
    });
  }

  // Pen writing sound: soft high pitched scratch
  playPenWritingSound() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.06; // 60ms scratch
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(4.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.015, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);

    noise.start(now);
  }
}

export const keepsakeAudio = new KeepsakeAudioEngine();
