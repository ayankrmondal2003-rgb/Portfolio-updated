import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ShaderMaterial, Vector2 } from "three";
import { particleSettings } from "../../lib/particlePolicy";
import { LightRibbons } from "./LightRibbons";
import { ribbonSettings } from "../../lib/ribbonGeometry";

type Props = {
  mode: "tablet" | "desktop";
  active: boolean;
  host: RefObject<HTMLDivElement | null>;
  onFailure: () => void;
};

const vertexShader = `
  uniform float uTime;
  uniform float uAspect;
  uniform float uDpr;
  uniform vec2 uPointer;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    p.x *= uAspect;
    p.xy += vec2(sin(uTime * .18 + p.z * 2.0), cos(uTime * .15 + p.x)) * .09;
    vec2 distanceToPointer = p.xy - uPointer * vec2(uAspect * 4.0, 3.0);
    float influence = exp(-dot(distanceToPointer, distanceToPointer) * .25);
    p.xy += uPointer * (.12 + influence * .18);
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(1.7 * uDpr * (8.0 / -viewPosition.z), 1.0, 3.5);
    vColor = color;
  }`;
const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float radius = length(gl_PointCoord - .5);
    float alpha = (1.0 - smoothstep(.15, .5, radius)) * .32;
    gl_FragColor = vec4(vColor, alpha);
  }`;

function Field({ mode, active, host, onFailure }: Props) {
  const { advance, gl, size } = useThree();
  const material = useRef<ShaderMaterial>(null);
  const target = useRef(new Vector2());
  const elapsed = useRef(0);
  const settings = particleSettings[mode];
  const arrays = useMemo(() => {
    const positions = new Float32Array(settings.count * 3);
    const colors = new Float32Array(settings.count * 3);
    let seed = 43;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < settings.count; i++) {
      positions[i * 3] = (random() - 0.5) * 11;
      positions[i * 3 + 1] = (random() - 0.5) * 11;
      positions[i * 3 + 2] = (random() - 0.5) * 5;
      const white = random() > 0.8;
      colors.set(white ? [0.90, 0.87, 0.76] : [0.58, 0.49, 0.28], i * 3);
    }
    return { positions, colors };
  }, [settings.count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uDpr: { value: 1 },
      uPointer: { value: new Vector2() },
    }),
    [],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    const lost = () => onFailure();
    canvas.addEventListener("webglcontextlost", lost);
    const oldError = gl.debug.onShaderError;
    gl.debug.onShaderError = onFailure;
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      gl.debug.onShaderError = oldError;
    };
  }, [gl, onFailure]);

  useEffect(() => {
    const hero = host.current?.parentElement;
    if (!active || mode !== "desktop" || !hero) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = hero.getBoundingClientRect();
      target.current.set(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        -((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      );
    };
    const leave = () => target.current.set(0, 0);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      leave();
    };
  }, [active, mode, host]);

  useFrame((_state, delta) => {
    if (!material.current) return;
    const dt = Math.min(Math.max(delta, 0), 0.05);
    elapsed.current += dt;
    material.current.uniforms.uTime.value = elapsed.current;
    material.current.uniforms.uAspect.value =
      size.width / Math.max(size.height, 1);
    material.current.uniforms.uDpr.value = gl.getPixelRatio();
    material.current.uniforms.uPointer.value.lerp(
      target.current,
      1 - Math.exp(-dt * 2),
    );
  });

  useEffect(() => {
    if (!active) return;
    let last = 0;
    let frames = 0;
    let sampleFrames = 0;
    let slowFrames = 0;
    let totalCost = 0;
    // One shared GSAP RAF ticker; Fiber's own continuous loop is disabled.
    const tick = (time: number) => {
      if (document.hidden || time - last < 1 / settings.fps) return;
      const gap = last ? time - last : 0;
      last = time - ((time - last) % (1 / settings.fps));
      const start = performance.now();
      try {
        advance(time, false);
      } catch {
        onFailure();
        return;
      }
      const cost = performance.now() - start;
      totalCost += cost;
      frames++;
      sampleFrames++;
      if (frames > 10 && (cost > 24 || gap > 0.085)) slowFrames++;
      if (sampleFrames === 100) {
        if (slowFrames > 35) {
          onFailure();
          return;
        }
        sampleFrames = 0;
        slowFrames = 0;
      }
      if ((frames === 1 || frames % 60 === 0) && host.current) {
        host.current.dataset.particleFrames = String(frames);
        host.current.dataset.particleCount = String(settings.count);
        host.current.dataset.ribbonCount = String(ribbonSettings[mode].count);
        host.current.dataset.particleDpr = String(gl.getPixelRatio());
        host.current.dataset.particleRenderMs = (totalCost / frames).toFixed(2);
        host.current.dataset.particleDrawCalls = String(gl.info.render.calls);
        host.current.dataset.particleGeometries = String(
          gl.info.memory.geometries,
        );
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [active, advance, gl, host, onFailure, settings.fps, settings.count, mode]);

  return (
    <>
    <LightRibbons mode={mode} time={uniforms.uTime} aspect={uniforms.uAspect} />
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[arrays.positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[arrays.colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </points>
    </>
  );
}

export default function ParticleScene(props: Props) {
  return (
    <Canvas
      key={props.mode}
      frameloop="never"
      dpr={[1, particleSettings[props.mode].dpr]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      }}
      fallback={null}
      events={undefined}
    >
      <Field {...props} />
    </Canvas>
  );
}
