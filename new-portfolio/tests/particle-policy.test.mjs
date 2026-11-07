import { test } from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(
  new URL("../src/lib/particlePolicy.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { particleMode, supportsParticles } = await import(
  `data:text/javascript,${encodeURIComponent(compiled)}`
);

test("mobile and reduced motion cannot select the 3D path", () => {
  for (const width of [320, 375, 430, 767])
    assert.equal(particleMode({ width, reducedMotion: false }), "static");
  for (const width of [768, 1024, 1440])
    assert.equal(particleMode({ width, reducedMotion: true }), "static");
});
test("tablet and desktop select different budgets", () => {
  assert.equal(particleMode({ width: 768, reducedMotion: false }), "tablet");
  assert.equal(particleMode({ width: 1023, reducedMotion: false }), "tablet");
  assert.equal(particleMode({ width: 1024, reducedMotion: false }), "desktop");
});
test("low-resource and data-saving devices select CSS", () => {
  for (const device of [{ cores: 2 }, { memory: 2 }, { saveData: true }])
    assert.equal(
      particleMode({ width: 1440, reducedMotion: false, ...device }),
      "static",
    );
});
test("disabled or failed WebGL returns a static fallback without throwing", () => {
  assert.equal(
    supportsParticles(() => ({ getContext: () => null })),
    false,
  );
  assert.equal(
    supportsParticles(() => ({
      getContext: () => {
        throw new Error("WebGL disabled");
      },
    })),
    false,
  );
});
test("successful capability probe releases its temporary context", () => {
  let released = false;
  assert.equal(
    supportsParticles(() => ({
      getContext: () => ({
        getExtension: () => ({
          loseContext: () => {
            released = true;
          },
        }),
      }),
    })),
    true,
  );
  assert.equal(released, true);
});
