# Workspace Rules: Web Animation Standard (GSAP)

Whenever building, modifying, designing, or styling websites, web applications, landing pages, or UI components in this workspace:

## 1. Primary Animation Engine: GSAP
- **Always use GSAP (GreenSock Animation Platform)** as the primary animation engine for all animations, transitions, and interactions.
- Avoid ad-hoc CSS `@keyframes`, Framer Motion, or custom requestAnimationFrame loops for complex or interactive animations unless explicitly requested.
- Ensure `gsap` and `@gsap/react` are used for animation logic.

## 2. Mandatory GSAP Best Practices
- **Core Animations**: Consult `gsap-core` skill. Use `gsap.to()`, `gsap.from()`, `gsap.fromTo()`. Animate GPU properties (`x`, `y`, `scale`, `rotation`, `opacity`). Never animate `width`, `height`, `top`, `left`, `margin`.
- **Scroll & Parallax**: Consult `gsap-scrolltrigger` skill. Register plugins (`gsap.registerPlugin(ScrollTrigger)`). Use ScrollTrigger for scroll-based reveals, scrub, and pinned sections.
- **Timelines & Orchestration**: Consult `gsap-timeline` skill. Use `gsap.timeline()` with position parameters (`"<"`, `"+=0.2"`) to sequence multi-step animations.
- **React & Next.js**: Consult `gsap-react` skill. Always use `useGSAP()` hook from `@gsap/react` with `{ scope: containerRef }` for automatic cleanup and proper context scoping.
- **Responsive & Accessibility**: Use `gsap.matchMedia()` for responsive animations and respect `prefers-reduced-motion: reduce`.
- **Performance**: Consult `gsap-performance` skill. Batch reads/writes and avoid layout thrashing.
