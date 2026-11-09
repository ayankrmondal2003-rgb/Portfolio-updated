/**
 * Synthesizes realistic mechanical and ambient sound effects using Web Audio API.
 * Zero external MP3/WAV dependencies, perfectly lightweight and instant.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Mechanical lamp pull-cord snap click.
 * Emulates the dual-stage spring latch and tactile snap.
 */
export function playCordClick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First stage: low mechanical latch click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(60, now + 0.04);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Second stage: crisp metallic spring snap (at +0.02s)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400, now + 0.02);
    filter.Q.setValueAtTime(4, now + 0.02);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(800, now + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(200, now + 0.07);
    gain2.gain.setValueAtTime(0.4, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc2.connect(filter);
    filter.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.08);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/**
 * Tactile wood door opening resonance.
 */
export function playDoorOpen(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(85, now);
    osc.frequency.linearRampToValueAtTime(95, now + 0.12);
    osc.frequency.linearRampToValueAtTime(70, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  } catch {
    // Graceful fallback
  }
}

/**
 * Solid wood door latching & closing thud.
 */
export function playDoorClose(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, now);

    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  } catch {
    // Graceful fallback
  }
}

/**
 * Paper page flip sound - disabled to prevent unwanted background noise.
 */
export function playPageFlip(): void {
  // Silent
}

