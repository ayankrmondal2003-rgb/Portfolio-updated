/** A single indexed strip batch; allocated only when the device budget changes. */
export function ribbonGeometry(count: number, segments: number) {
  const positions = new Float32Array(count * (segments + 1) * 2 * 3);
  const coordinates = new Float32Array(count * (segments + 1) * 2 * 2);
  const indices = new Uint16Array(count * segments * 6);
  for (let ribbon = 0; ribbon < count; ribbon++) {
    for (let step = 0; step <= segments; step++) {
      for (let side = 0; side < 2; side++) {
        const vertex = (ribbon * (segments + 1) + step) * 2 + side;
        // x = path parameter, y = strip edge, z = ribbon identifier.
        positions.set([step / segments, side * 2 - 1, ribbon], vertex * 3);
        coordinates.set([step / segments, side], vertex * 2);
      }
      if (step < segments) {
        const base = (ribbon * (segments + 1) + step) * 2;
        indices.set([base, base + 1, base + 2, base + 1, base + 3, base + 2],
          (ribbon * segments + step) * 6);
      }
    }
  }
  return { positions, coordinates, indices };
}

export const ribbonSettings = {
  desktop: { count: 4, segments: 128 },
  tablet: { count: 2, segments: 64 },
} as const;
