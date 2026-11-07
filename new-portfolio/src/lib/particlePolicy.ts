export type ParticleMode = "static" | "tablet" | "desktop";

export function particleMode(input: {
  width: number;
  reducedMotion: boolean;
  cores?: number;
  memory?: number;
  saveData?: boolean;
}): ParticleMode {
  if (
    input.width < 768 ||
    input.reducedMotion ||
    input.saveData ||
    (input.cores !== undefined && input.cores <= 2) ||
    (input.memory !== undefined && input.memory <= 2)
  )
    return "static";
  return input.width < 1024 ? "tablet" : "desktop";
}

export function supportsParticles(
  createCanvas: () => HTMLCanvasElement,
): boolean {
  try {
    const gl = createCanvas().getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export const particleSettings = {
  desktop: { count: 1200, dpr: 1.5, fps: 45 },
  tablet: { count: 480, dpr: 1, fps: 24 },
} as const;
