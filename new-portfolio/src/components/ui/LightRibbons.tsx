import { useMemo } from "react";
import { DoubleSide } from "three";
import { ribbonGeometry, ribbonSettings } from "../../lib/ribbonGeometry";

const vertexShader = `
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;
  varying float vRibbon;
  void main() {
    float t = position.x;
    float id = position.z;
    float phase = uTime * .16 + id * .65;
    float lengthScale = 1.0 - id * .055;
    float x = (t - .5) * 11.8 * lengthScale;
    float bend = t * 5.4 + phase;
    float y = sin(bend) * (1.0 + id * .12)
      + sin(t * 2.8 - phase * .75) * .45 + (id - 1.5) * .52;
    float slope = (cos(bend) * 5.4 * (1.0 + id * .12)
      + cos(t * 2.8 - phase * .75) * 2.8 * .45) / (11.8 * lengthScale);
    vec2 normal = normalize(vec2(-slope, 1.0));
    float width = (.045 + id * .009) * sin(t * 3.14159265);
    vec2 p = vec2(x, y) + normal * position.y * width;
    p.x *= uAspect;
    float z = -.6 - id * .22 + sin(t * 4.0 + phase) * .12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, z, 1.0);
    vUv = uv;
    vRibbon = id;
  }`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vRibbon;
  void main() {
    float edge = abs(vUv.y * 2.0 - 1.0);
    float soft = 1.0 - smoothstep(.05, 1.0, edge);
    float core = 1.0 - smoothstep(.0, .22, edge);
    float ends = smoothstep(0.0, .12, vUv.x) * (1.0 - smoothstep(.84, 1.0, vUv.x));
    float flow = .72 + .28 * sin(vUv.x * 9.0 - uTime * .35 + vRibbon);
    vec3 blue = vec3(.278, .486, 1.0);
    vec3 cyan = vec3(.30, .65, .76);
    vec3 color = mix(blue, cyan, step(2.5, vRibbon) * .45);
    color = mix(color, vec3(.70, .82, 1.0), core * .25);
    gl_FragColor = vec4(color, (soft * .42 + core * .24) * ends * flow);
  }`;

export function LightRibbons({ mode, time, aspect }: {
  mode: "desktop" | "tablet";
  time: { value: number };
  aspect: { value: number };
}) {
  const settings = ribbonSettings[mode];
  const arrays = useMemo(() => ribbonGeometry(settings.count, settings.segments),
    [settings.count, settings.segments]);
  // Uniform objects are shared with the particle field: no second frame callback.
  const uniforms = useMemo(() => ({ uTime: time, uAspect: aspect }), [time, aspect]);
  return (
    <mesh frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[arrays.positions, 3]} />
        <bufferAttribute attach="attributes-uv" args={[arrays.coordinates, 2]} />
        <bufferAttribute attach="index" args={[arrays.indices, 1]} />
      </bufferGeometry>
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader}
        fragmentShader={fragmentShader} transparent depthWrite={false}
        depthTest={false} side={DoubleSide} />
    </mesh>
  );
}
