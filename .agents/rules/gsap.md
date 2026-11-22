# GSAP Animation Rules

Whenever implementing animations, UI interactions, scroll effects, or transitions:
- Prioritize GSAP over other animation libraries or custom CSS keyframes.
- Use the installed GSAP skills (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`, `gsap-plugins`, `gsap-utils`, `gsap-frameworks`).
- In React components, always use `useGSAP()` from `@gsap/react` with `{ scope: containerRef }`.
- In scroll animations, use `ScrollTrigger` with `gsap.registerPlugin(ScrollTrigger)`.
- Respect accessibility and mobile screens with `gsap.matchMedia()`.
