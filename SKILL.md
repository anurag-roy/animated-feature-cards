---
name: animated-feature-cards
description: Design and implement tasteful looping animated feature cards for websites, landing pages, product pages, dashboards, and marketing surfaces. Use when asked to create cards that visually demonstrate a feature through miniature UI scenes, fake product interactions, cursors, chat flows, lists, progress indicators, maps, terminals, stacks, counters, filters, integrations, or similar micro-demos. Adapt to the existing framework and design system, invent suitable animations from the feature copy when needed, and prioritize clarity, polish, performance, accessibility, and seamless looping rather than flashy motion.
---

# Animated Feature Cards

Create self-contained miniature product demos that explain a feature through motion. Treat each card as a tiny storyboard, not as decorative animation.

## Workflow

1. Inspect the existing project before writing code.
   - Identify the framework, styling approach, animation utilities/libraries, design tokens, icon set, component conventions, and responsive patterns already in use.
   - Prefer existing dependencies and primitives. Do not add an animation library when CSS or an installed library is sufficient.
   - Preserve the application's visual language unless the user explicitly asks for a redesign.

2. Understand the feature being demonstrated.
   - Extract the feature's user action, system response, and payoff.
   - If the user provides only feature names/copy, invent a plausible miniature UI that communicates the feature in 3-10 seconds.
   - Prefer product-specific demonstrations over abstract decoration.

3. Write a compact storyboard before implementation.
   - Use 3-6 beats: establish -> action -> response -> result -> dwell -> reset.
   - Decide whether the card needs a cursor, staged text, moving rows, progress, stacked objects, chart changes, chat messages, map motion, or another pattern.
   - Avoid using the same motion grammar for every card in a grid.

4. Implement the scene as a deterministic state machine or timeline.
   - Keep scene data local and deterministic unless real data is explicitly required.
   - Separate visual states from timing logic.
   - Favor transforms and opacity for motion.
   - Keep the card's outer geometry stable; animate inside an overflow-hidden stage.

5. Make the loop feel intentional.
   - Add a short quiet dwell after the payoff.
   - Reset during a visually low-attention moment, behind a fade/mask, or by returning objects to their initial state before the next cycle.
   - Avoid visible snaps, sudden teleports, or immediate restart after the final action.

6. Verify responsive behavior, reduced motion, and performance.
   - Ensure the static first frame still explains the feature.
   - Under `prefers-reduced-motion: reduce`, show a representative finished or resting state rather than running the full choreography.
   - Avoid timers or observers that continue after unmount.
   - Do not animate expensive layout properties repeatedly when transform/opacity can achieve the same result.

## Design principles

- Make the animation explain the feature within one loop even without surrounding prose.
- Keep motion calm and legible. Marketing micro-demos should feel closer to product UI than to an animated banner.
- Use realistic fake UI: short labels, believable counts, tiny icons, subtle separators, compact controls, restrained shadows.
- Reserve saturated accent colors for state changes, highlights, success, or the feature's focal element.
- Use small cursor motion only when a human action matters. Do not put a cursor in every card.
- Let one thing happen at a time unless simultaneity is part of the concept.
- Give the viewer time to register each state before the next transition.
- Keep all text readable long enough to understand. Never animate important copy so quickly that it becomes texture.
- Use clipping, masks, fades, and layering to make miniature UIs feel like cropped real product surfaces.
- Invent original scenes for the user's product. Do not copy another site's exact assets, labels, arrangement, or animation sequence.

## Default timing language

Treat these as starting points, not rigid constants:

- Tiny UI transition: 180-350 ms
- Row/card move: 300-600 ms
- Cursor travel: 500-1000 ms
- Cursor pause before click: 150-350 ms
- Click feedback: 100-220 ms
- Text/message reveal: 250-700 ms
- Payoff dwell: 1200-2500 ms
- Typical full loop: 7-16 s

Use ease-out for direct manipulation, gentle ease-in-out for ambient motion, and spring-like motion only when the existing stack already supports it and the bounce is subtle.

## Choosing animation patterns

Consult `references/pattern-catalog.md` when selecting or combining patterns. Good options include:

- streaming/reordered lists
- terminal/install sequences
- cursor click-through flows
- connection/progress handshakes
- integration connect states
- chat/tool-call conversations
- card stacks and event attribution
- filter/drill-down transformations
- progress rings/funnels
- ambient maps/globes
- counters, badges, status chips, and tiny charts

Do not default to a cursor-click sequence if a passive system animation communicates the feature better.

## Implementation rules

- Reuse existing components, tokens, icons, spacing, radii, shadows, and typography where practical.
- Keep animation logic colocated with the scene unless the project already has a shared motion architecture.
- Build reusable primitives only when at least two cards genuinely benefit from them, e.g. `DemoCursor`, `StatusPill`, `MiniWindow`, `ProgressRing`.
- Prefer semantic DOM for recognizable controls and lists even though the data is simulated.
- Use stable keys and explicit scene data for animated lists.
- Use absolute positioning inside the demo stage for cursor paths and layered illustrations, but do not turn the entire card into arbitrary pixel coordinates if normal layout works.
- Avoid random values that make loops nondeterministic or cause hydration mismatches. If variation is desirable, use a fixed sequence.
- Avoid autoplay audio, video dependencies, canvas, WebGL, or 3D libraries unless the concept specifically requires them and the user approves the added complexity.
- If a real globe/map is overkill, prefer a lightweight illustrated or CSS/SVG representation.
- Use SVG for simple progress rings, connector lines, paths, and icons when appropriate.

## Cursor choreography

When a cursor is useful:

1. Start it slightly away from the target.
2. Move at a calm speed with a natural path.
3. Pause briefly over the target before clicking.
4. Add subtle click feedback: a 1-2 px depression, cursor scale change, ripple, or target press state.
5. Let the resulting UI response begin just after the click.
6. Move or fade the cursor away before the next beat if it would otherwise distract.

The cursor should support causality: viewers should understand what changed because of the click.

## Loop architecture

Prefer one of these approaches:

- **CSS keyframes** for fully deterministic decorative/ambient loops.
- **CSS transitions + state machine** for discrete product states.
- **Existing motion library timeline/variants** when already installed and it materially simplifies orchestration.
- **RequestAnimationFrame** only for genuinely continuous simulation such as inertial/physics motion.

For multi-step UI demonstrations, a small state machine is usually clearer than one giant keyframe animation.

Pseudo-flow:

```text
REST
 -> ACTION_1
 -> RESULT_1
 -> ACTION_2
 -> PAYOFF
 -> DWELL
 -> RESET
 -> REST
```

The reset may be visually hidden by an opacity transition or may reverse naturally to the resting state.

## Quality bar

Before finishing, check all of the following:

- The feature is understandable from the animation itself.
- The animation looks plausible for the product being marketed.
- There is no layout shift outside the demo stage.
- Text never overlaps or clips unintentionally.
- The loop has no obvious hard reset.
- Motion is slow enough to follow at normal reading speed.
- Cards in the same section use varied but coherent motion patterns.
- Hover/focus behavior still works if the card contains interactive elements.
- `prefers-reduced-motion` produces a useful static state.
- Mobile layout is intentional rather than a scaled-down desktop scene.
- CPU usage remains modest with several cards animating simultaneously.

## Output expectations

When implementing in a codebase:

1. Make the code changes, not just a conceptual recommendation.
2. Briefly summarize the storyboard chosen for each card.
3. List important reusable primitives introduced, if any.
4. Mention any dependency added and why. Prefer adding none.
5. Call out reduced-motion behavior and any performance tradeoffs.
