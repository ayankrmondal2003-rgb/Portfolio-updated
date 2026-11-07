import { test } from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/ribbonGeometry.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { ribbonGeometry, ribbonSettings } = await import(`data:text/javascript,${encodeURIComponent(compiled)}`);

for (const [mode, { count, segments }] of Object.entries(ribbonSettings)) {
  test(`${mode} strip batch has finite coordinates, valid indices and distinct ribbons`, () => {
    const { positions, coordinates, indices } = ribbonGeometry(count, segments);
    const vertices = count * (segments + 1) * 2;
    assert.equal(positions.length, vertices * 3);
    assert.equal(coordinates.length, vertices * 2);
    assert.equal(indices.length, count * segments * 6);
    assert.ok(positions.every(Number.isFinite));
    assert.ok(coordinates.every(v => v >= 0 && v <= 1));
    assert.ok(indices.every(i => i < vertices));
    for (let ribbon = 0; ribbon < count; ribbon++) {
      const start = ribbon * (segments + 1) * 2;
      assert.equal(positions[start * 3], 0);
      assert.equal(positions[(start + segments * 2) * 3], 1);
      assert.equal(positions[start * 3 + 2], ribbon);
      for (let triangle = ribbon * segments * 6; triangle < (ribbon + 1) * segments * 6; triangle += 3) {
        const ids = indices.slice(triangle, triangle + 3);
        assert.equal(new Set(ids).size, 3);
        assert.ok(ids.every(i => i >= start && i < start + (segments + 1) * 2));
      }
    }
  });
}
