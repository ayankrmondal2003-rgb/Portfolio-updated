/**
 * Real light bulb pull string sound effects sourced directly from:
 * "Light Bulb Pull String | HQ Sound Effects" (Everyday Cinematic Sounds)
 * Supports zero-latency Web Audio buffer playback with HTML5 Audio & procedural fallbacks.
 */

let audioCtx: AudioContext | null = null;
const audioBuffers: Record<string, AudioBuffer | null> = {
  ropePull: null,
  beadTick: null,
  switchClick: null,
  pullFull: null,
};
let isPreloaded = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function preloadLampAudio(): void {
  if (typeof window === "undefined" || isPreloaded) return;
  isPreloaded = true;

  const ctx = getAudioContext();
  if (!ctx) return;

  const files: { key: keyof typeof audioBuffers; url: string }[] = [
    { key: "ropePull", url: "/audio/lamp-rope-pull.wav" },
    { key: "beadTick", url: "/audio/lamp-bead-tick.wav" },
    { key: "switchClick", url: "/audio/lamp-switch-click.wav" },
    { key: "pullFull", url: "/audio/lamp-pull-full.wav" },
  ];

  files.forEach(({ key, url }) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedBuffer) => {
        audioBuffers[key] = decodedBuffer;
      })
      .catch(() => {
        // Fallback gracefully
      });
  });
}

// Auto-trigger audio preload on first pointer or key gesture
if (typeof window !== "undefined") {
  const triggerPreload = () => {
    preloadLampAudio();
    window.removeEventListener("pointerdown", triggerPreload);
    window.removeEventListener("keydown", triggerPreload);
  };
  window.addEventListener("pointerdown", triggerPreload, { once: true });
  window.addEventListener("keydown", triggerPreload, { once: true });
}

function playBuffer(buf: AudioBuffer, volume = 0.6): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    source.buffer = buf;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
  } catch {
    // Fallback if needed
  }
}

/**
 * Full authentic YouTube light bulb pull string sound (pull tension + switch snap).
 * Best used for single click/tap on the hanging lamp cord.
 */
export function playLampPullFull(): void {
  try {
    const ctx = getAudioContext();
    if (ctx && audioBuffers.pullFull) {
      playBuffer(audioBuffers.pullFull, 0.7);
      return;
    }

    // Secondary fallback: HTML5 Audio
    const audio = new Audio("/audio/lamp-pull-full.wav");
    audio.volume = 0.7;
    audio.play().catch(() => {
      // Procedural fallback
      playRopePull();
      setTimeout(playCordClick, 100);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Sound of the night lamp rope being pulled down under tension.
 * Plays the real pull string movement from the YouTube video.
 */
export function playRopePull(): void {
  try {
    const ctx = getAudioContext();
    if (ctx && audioBuffers.ropePull) {
      playBuffer(audioBuffers.ropePull, 0.65);
      return;
    }

    const audio = new Audio("/audio/lamp-rope-pull.wav");
    audio.volume = 0.65;
    audio.play().catch(() => {});
  } catch {
    // Graceful fallback
  }
}

/**
 * Tactile micro-bead click while dragging the rope downward.
 */
export function playBeadTick(): void {
  try {
    const ctx = getAudioContext();
    if (ctx && audioBuffers.beadTick) {
      playBuffer(audioBuffers.beadTick, 0.45);
      return;
    }

    const audio = new Audio("/audio/lamp-bead-tick.wav");
    audio.volume = 0.45;
    audio.play().catch(() => {});
  } catch {
    // Graceful fallback
  }
}

/**
 * The authentic mechanical switch snap click of the night lamp.
 * Plays the real switch latch snap from the YouTube video.
 */
export function playCordClick(): void {
  try {
    const ctx = getAudioContext();
    if (ctx && audioBuffers.switchClick) {
      playBuffer(audioBuffers.switchClick, 0.75);
      return;
    }

    const audio = new Audio("/audio/lamp-switch-click.wav");
    audio.volume = 0.75;
    audio.play().catch(() => {});
  } catch {
    // Graceful fallback
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
 * Paper page flip sound - disabled to prevent background noise.
 */
export function playPageFlip(): void {
  // Silent
}
