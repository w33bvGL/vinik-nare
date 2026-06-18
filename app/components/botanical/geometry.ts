export type BotanicalVariant = 'sprig' | 'spray' | 'branch' | 'vine' | 'arch' | 'rose'

export interface Curve { p0: [number, number]; p1: [number, number]; p2: [number, number]; p3: [number, number] }
export interface Leaf { cx: number; cy: number; rx: number; ry: number; angle: number; vein: string }
export interface Sprig { stem: string; leaves: Leaf[]; berries?: [number, number, number][] }

export const VIEW = 200

export function cubic(c: Curve, t: number): [number, number] {
  const mt = 1 - t
  const a = mt * mt * mt, b = 3 * mt * mt * t, d = 3 * mt * t * t, e = t * t * t
  return [
    a * c.p0[0] + b * c.p1[0] + d * c.p2[0] + e * c.p3[0],
    a * c.p0[1] + b * c.p1[1] + d * c.p2[1] + e * c.p3[1],
  ]
}

export function tangentAngle(c: Curve, t: number): number {
  const mt = 1 - t
  const dx = 3 * mt * mt * (c.p1[0] - c.p0[0]) + 6 * mt * t * (c.p2[0] - c.p1[0]) + 3 * t * t * (c.p3[0] - c.p2[0])
  const dy = 3 * mt * mt * (c.p1[1] - c.p0[1]) + 6 * mt * t * (c.p2[1] - c.p1[1]) + 3 * t * t * (c.p3[1] - c.p2[1])
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

export function stemPath(c: Curve): string {
  return `M ${c.p0[0]} ${c.p0[1]} C ${c.p1[0]} ${c.p1[1]}, ${c.p2[0]} ${c.p2[1]}, ${c.p3[0]} ${c.p3[1]}`
}

interface GrowOpts { count: number; rx: number; ry: number; spread: number; tStart?: number; tEnd?: number }

export function growLeaves(c: Curve, opts: GrowOpts): Leaf[] {
  const { count, rx, ry, spread } = opts
  const tStart = opts.tStart ?? 0.16
  const tEnd = opts.tEnd ?? 0.96
  const leaves: Leaf[] = []
  for (let i = 0; i < count; i++) {
    const t = tStart + (tEnd - tStart) * (count === 1 ? 0.5 : i / (count - 1))
    const [px, py] = cubic(c, t)
    const ang = tangentAngle(c, t)
    const side = i % 2 === 0 ? 1 : -1
    const rad = (ang + 90 * side) * (Math.PI / 180)
    // taper: leaves shrink toward the growing tip
    const scale = 0.55 + 0.45 * (1 - t)
    const lrx = rx * scale, lry = ry * scale
    const off = (lry + 2) * 0.92
    const cx = px + Math.cos(rad) * off
    const cy = py + Math.sin(rad) * off
    const leafAngle = ang + spread * side
    // central vein along the leaf's long axis
    const veinHalf = lrx * 0.82
    const vr = leafAngle * (Math.PI / 180)
    const vx = Math.cos(vr) * veinHalf, vy = Math.sin(vr) * veinHalf
    leaves.push({
      cx, cy, rx: lrx, ry: lry, angle: leafAngle,
      vein: `M ${(cx - vx).toFixed(1)} ${(cy - vy).toFixed(1)} L ${(cx + vx).toFixed(1)} ${(cy + vy).toFixed(1)}`,
    })
  }
  return leaves
}

/** Build the sprigs for a variant. `density` multiplies leaf count (1 = default). */
export function buildSprigs(variant: BotanicalVariant, density = 1): Sprig[] {
  const n = (base: number) => Math.max(2, Math.round(base * density))

  switch (variant) {
    case 'spray': {
      // p0 of both branches is anchored in the corner [0, 200]; the tips (p3)
      // reach exactly to the right [200, 35] and top [105, 0] edges.
      const main: Curve = { p0: [0, 200], p1: [50, 150], p2: [140, 110], p3: [200, 35] }
      const second: Curve = { p0: [0, 200], p1: [35, 120], p2: [70, 65], p3: [105, 0] }
      const berries: [number, number, number][] = [
        [196, 39, 3.4], [188, 53, 2.6], [204, 27, 2.4],
        [105, 2, 3], [97, 14, 2.3],
      ]
      return [
        { stem: stemPath(main), leaves: growLeaves(main, { count: n(7), rx: 16, ry: 6.4, spread: 26 }) },
        { stem: stemPath(second), leaves: growLeaves(second, { count: n(5), rx: 13, ry: 5.2, spread: 30 }) },
        { stem: '', leaves: [], berries },
      ]
    }
    case 'branch': {
      // Horizontal divider: stretched strictly from X=0 to X=200.
      const c: Curve = { p0: [0, 112], p1: [70, 78], p2: [130, 78], p3: [200, 112] }
      return [{ stem: stemPath(c), leaves: growLeaves(c, { count: n(9), rx: 14, ry: 5.6, spread: 24, tStart: 0.08, tEnd: 0.92 }) }]
    }
    case 'vine': {
      // Tall cascading vine, top → bottom, with a gentle double S-bend and a
      // couple of berry clusters — made for vertical edges & framing.
      const main: Curve = { p0: [120, 0], p1: [70, 60], p2: [150, 130], p3: [92, 200] }
      const offshoot: Curve = { p0: [110, 70], p1: [150, 90], p2: [168, 120], p3: [176, 150] }
      const berries: [number, number, number][] = [
        [176, 153, 3], [170, 164, 2.3], [118, 6, 2.6],
      ]
      return [
        { stem: stemPath(main), leaves: growLeaves(main, { count: n(11), rx: 13, ry: 5, spread: 30, tStart: 0.06, tEnd: 0.97 }) },
        { stem: stemPath(offshoot), leaves: growLeaves(offshoot, { count: n(4), rx: 10, ry: 4, spread: 32 }) },
        { stem: '', leaves: [], berries },
      ]
    }
    case 'arch': {
      // Two branches rising from the lower corners to frame a heading.
      const left: Curve = { p0: [4, 200], p1: [20, 110], p2: [60, 52], p3: [96, 34] }
      const right: Curve = { p0: [196, 200], p1: [180, 110], p2: [140, 52], p3: [104, 34] }
      return [
        { stem: stemPath(left), leaves: growLeaves(left, { count: n(8), rx: 14, ry: 5.6, spread: 26, tStart: 0.1, tEnd: 0.95 }) },
        { stem: stemPath(right), leaves: growLeaves(right, { count: n(8), rx: 14, ry: 5.6, spread: 26, tStart: 0.1, tEnd: 0.95 }) },
        { stem: '', leaves: [], berries: [[96, 32, 2.6], [104, 32, 2.6], [100, 26, 3]] },
      ]
    }
    case 'rose':
      return [] // drawn from static paths in the component
    case 'sprig':
    default: {
      // Single sprig: from the very bottom Y=200 to the very top Y=0.
      const c: Curve = { p0: [100, 200], p1: [96, 132], p2: [104, 78], p3: [100, 0] }
      return [{ stem: stemPath(c), leaves: growLeaves(c, { count: n(8), rx: 15, ry: 6, spread: 24 }) }]
    }
  }
}
