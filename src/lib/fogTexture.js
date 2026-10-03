// Generates one small, seamlessly tileable smoke texture on a canvas.
// It is rasterised once and then only ever moved with transforms, so the
// fog costs no per-frame paint. Upscaling the small bitmap is what makes
// it soft.

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const smooth = (t) => t * t * (3 - 2 * t)

export function createFogTexture(size = 256, seed = 11) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(size, size)
  const rand = mulberry32(seed)

  // Each octave is a periodic lattice, so the result wraps on both axes.
  const octaves = [3, 6, 12, 24, 48].map((n, i) => {
    const grid = new Float32Array(n * n)
    for (let k = 0; k < grid.length; k++) grid[k] = rand()
    return { n, grid, amp: 1 / 2 ** i }
  })
  const total = octaves.reduce((s, o) => s + o.amp, 0)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = 0
      for (const { n, grid, amp } of octaves) {
        const fx = (x / size) * n
        const fy = (y / size) * n
        const x0 = Math.floor(fx)
        const y0 = Math.floor(fy)
        const tx = smooth(fx - x0)
        const ty = smooth(fy - y0)
        const x1 = (x0 + 1) % n
        const y1 = (y0 + 1) % n
        const top = grid[y0 * n + x0] * (1 - tx) + grid[y0 * n + x1] * tx
        const bot = grid[y1 * n + x0] * (1 - tx) + grid[y1 * n + x1] * tx
        v += (top * (1 - ty) + bot * ty) * amp
      }
      v /= total
      // Carve the noise into plumes with clear air between them.
      const a = smooth(Math.min(1, Math.max(0, (v - 0.38) / 0.42)))
      const i = (y * size + x) * 4
      img.data[i] = 255
      img.data[i + 1] = 243
      img.data[i + 2] = 226
      img.data[i + 3] = a * 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}
