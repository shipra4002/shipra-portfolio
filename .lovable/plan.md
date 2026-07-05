# Colorful hero: layout + portrait redesign

Only the hero's **layout arrangement** and **portrait picture area** change. The typewriter headline, its exact copy, the subtext, the CTA label, the fonts, and all text animation logic stay exactly as they are today.

## What stays untouched
- `useTypewriter` hook and its timing (lines 6–64) — no change.
- Headline copy, subtext copy, and "See How I Think" CTA text.
- The `motion` reveal animations on the subtext and button (they already gate on `showFinal`).
- Fonts, color tokens, and the uploaded portrait image (`@/assets/hero-portrait.png`).

## What changes (right column + layout only)
Replace the current pale layered portrait card (lines 117–290) with the selected **Architectural Color Blocks v2** composition, rendered with the project's real palette so it reads as bold color rather than faint tints:

- **Colored structural blocks behind the photo**: a solid sage-green (`#6b7a68`) panel offset up-right, and a terracotta (`#b06a4c`) panel offset down-left, layered behind the portrait to create depth and real color mass.
- **Gold framing**: a thick gold (`#d8b36a`) border/frame around the portrait card, plus a gold accent corner block inside the card and a gold ring decoration.
- **Frosted glass** (per your direction): the portrait card and the small info container use `bg-white/30 backdrop-blur-xl border border-white/40` style frosted panels so the photo sits on a premium glass surface over the color blocks. The left text column's subtext/CTA area also gets a subtle frosted glass panel for cohesion.
- **Decorative accents**: sage dot-matrix grid and a floating gold circle outline, positioned around the frame.
- **Portrait**: same image, kept at ~92–94% frame height, `object-contain object-bottom`, with the existing entrance + gentle float animation preserved.
- **Layout rebalance**: keep the two-column grid but tighten spacing so the composition feels intentional and full at desktop, tablet, and mobile; portrait column stacks first on mobile as it does now.

## Technical notes
- All work stays in `src/components/sections/hero-section.tsx` (presentation only).
- Frosted glass uses Tailwind `backdrop-blur` utilities only — never hand-written `-webkit-backdrop-filter` (Lightning CSS would drop the standard property in production).
- Colors reference existing semantic tokens (`sage`, `terracotta`, gold accent) already in the design system rather than new hardcoded hexes where tokens exist.
- Verify with a typecheck and a Playwright screenshot at desktop/tablet/mobile to confirm color and glass render and the typewriter still runs.
