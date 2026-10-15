---
name: animated-feature-cards
description: Design and implement polished looping feature cards that demonstrate product capabilities through compact HTML and SVG scenes. Use for animated landing-page feature grids, miniature product demos, and refinements to their visual design or motion. Adapt to the project's design system with readable typography, purposeful detail, and seamless accessible playback.
---

# Animated Feature Cards

Build rich, detailed miniature product scenes with a clear action and payoff. Combine HTML with custom SVG artwork liberally. Make the composition attractive and understandable in a still frame, then use motion to explain what changes.

The strongest result usually comes from a focused scene designed at its actual display size: confident typography, a recognizable product object, precise alignment, a clear accent color, and one readable outcome.

## Workflow

1. **Inspect the host and reference.** Identify the framework, components, design tokens, fonts, icons, animation utilities, and intended card width. Study a supplied reference for hierarchy, readability, density, spacing, and motion. Preserve the host's visual language and the user's explicit choices; redesign when requested.
2. **Choose the clearest story.** Extract the feature's action, response, and payoff. Invent a suitable scene when only feature copy is provided. Simplify or replace an ineffective presentation while preserving the actual feature, supplied facts, and required approval boundaries. Read the relevant patterns in [references/pattern-catalog.md](references/pattern-catalog.md).
3. **Compose the resting and completed frames first.** Work at the width the card will occupy in the page. Establish the focal element, supporting context, and result. Fix typography, contrast, and spacing before choreographing motion.
4. **Storyboard a short loop.** Use establish → action → response → result → dwell → reset. Choose one main moving element per beat. Give neighboring cards different motion patterns within a shared visual system.
5. **Implement a deterministic timeline.** Keep simulated data local, separate visual states from timing, and maintain stable outer card geometry. Reuse installed tools and components; add dependencies only when they materially help.
6. **Inspect the actual render and iterate.** Review initial, intermediate, completed, and reset frames at the real card size. Check narrow layouts and reduced motion. A successful build is separate evidence from a successful visual review.

When refining an existing card, first identify whether the weakness is its concept, composition, typography, color, or motion. Change the part responsible for the weak result. Adding more animation to an unreadable scene will not improve it.

## Composition and readable scale

Design a compact product moment rather than shrinking a complete application. Detail should come from useful context and carefully drawn objects, not a crowd of tiny controls.

- For a conventional feature grid with no specified dimensions, start around **360–420 px wide**. Adapt to the host layout; wider cards can suit a deliberate dashboard or spanning feature.
- Use the finished scene to determine stage height. Leave room for badges, source citations, receipts, and wrapped text. Keep grid cards visually aligned without clipping content or inflating empty space.
- Prefer normal layout for text and rows. Use positioned layers for artwork, connectors, cursors, and overlapping objects.
- Keep essential labels readable at the final display size. When content does not fit, remove secondary detail, shorten copy, or change the scene before reducing font size.
- On mobile, reflow or simplify the scene. Avoid uniformly scaling down a desktop dashboard, including all of its text.
- Give the eye one focal point: a ticket, document stack, answer, task, pipeline, chart, or recommendation. Supporting elements should explain that focal point.
- Let layers provide depth: a document behind another document, an inset terminal, a source citation, a selected row, or a small result receipt. Keep borders, shadows, and gradients restrained and purposeful.
- Keep copy concise and factual. Omit redundant labels, explanatory footnotes, and implementation details unless they help a product user make a decision.
- Make fictional data internally consistent: totals add up, stage counts agree, dates match, and forecasts support their recommendations. Preserve an item's identity as it moves.

Useful ways to reduce density without losing the story:

| Crowded presentation | Focused presentation |
| --- | --- |
| Search sidebar, conversation, and tool dashboard | One question, a document stack, and a source-backed answer |
| Full board with tiny task cards | One readable task moving between labeled states, with a progress summary |
| Inbox, conversation pane, and routing settings | One request, its classification, an assignment, and a reviewable draft |
| Metrics, small chart, legend, and side panel | Product context, a full-width chart, and one recommendation below it |

## Typography and optical polish

Use the project's established font. When typography is open, **Inter is a strong default** for a crisp product interface. Load actual font files and weights using the host's font conventions; check that the intended face renders instead of silently falling back.

Starting points for a card around 400 px wide:

| Element | Size | Weight |
| --- | --- | --- |
| Feature title | 18–22 px | 600–700 |
| Feature description | 14–16 px | 500 |
| Main demo labels and controls | 12–14 px | 500–600 |
| Supporting metadata | 11–12 px | 400–500 |
| Focal date, amount, or result | 20–28 px | 650–750 |

Adapt these to the actual font and brand. Essential information should not rely on microtype. Small decorative labels can be quieter, but important statuses need enough size, weight, and contrast to read.

- Use comfortable line height for descriptions and messages; about 1.5–1.7 is a useful starting point.
- Reserve monospace for commands, code, and identifiers. Do not make all product copy look like a terminal.
- Use tabular numerals for changing counts, prices, and metrics so they do not wobble horizontally.
- Align icons with the text they accompany. Use a consistent stroke weight and optical size across a section.
- Center avatar initials and compact badges using layout or measured text bounds. Check the rendered result instead of guessing baseline offsets.
- Leave room for the longest visible state, including a success badge replacing a shorter pending label.

## Color and surface hierarchy

Use existing design tokens first. When the palette is open, favor a clear, confident accent over a uniformly faded palette. Useful starting accents are **blue `#3b82f6`**, **indigo `#6366f1`**, **pink `#ec4899`**, and **emerald `#10b981`**. These do not require installing a component library.

- Establish a neutral canvas and readable foreground appropriate to the host's light or dark theme. Do not force every product into a dark palette.
- Give each card one main accent. Use it for the focal artwork, selected state, chart line, or result. A solid accent badge or action can provide an anchor alongside lighter tinted surfaces.
- Keep supporting surfaces quieter than the focal element. A subtle accent tint with a visible border often works better than a large glow or heavy blur.
- Check muted text against the actual background. Secondary text should remain readable, not disappear into the card.
- Keep semantic colors understandable: success and warnings need labels or icons alongside color. Maintain enough contrast for text on saturated fills.
- Share typography, padding, radii, border treatment, and shadow language across the grid. Vary accent colors and stories when that improves the section.

## HTML and SVG together

Use **HTML for readable text, product rows, lists, badges, and controls**. Use **SVG for custom geometry and detailed artwork**: tickets with perforations and barcodes, folded documents, product illustrations, connectors, pipeline nodes, charts, masks, and progress rings.

SVG can be a major part of the scene, not just an icon source. Build a recognizable object with purposeful details rather than substituting a generic icon floating in a glowing box. Combine a few well-drawn vector layers with a readable interface around them.

- Use a sensible `viewBox` and preserve aspect ratio. Keep essential labels in HTML when scaling the artwork would make them too small.
- Scope gradient, mask, and clipping IDs per instance so repeated cards do not collide.
- Align connectors to their endpoints. Signals should follow the connector path; chart markers should stay attached to their data; map markers should remain attached to geography.
- Draw believable charts with units, meaningful dates or thresholds, and a recommendation justified by the data. Avoid decorative lines that imply unsupported metrics.
- Use clipping to contain motion, not to hide important text. A bottom fade must not erase the result, CTA, legend, or receipt.
- Prefer DOM/SVG implementation over raster drawings when the task is a miniature interface. Avoid canvas, WebGL, and 3D dependencies unless the scene genuinely needs them.

## Motion that explains the feature

Decide why each element moves: user action, system progress, state change, or payoff. Keep supporting detail mostly still. Use a cursor only when a human choice matters; a document scan, connector signal, or chart projection can explain a feature without one.

Keep live controls immediately responsive. Do not make frequent navigation or keyboard actions wait for marketing choreography. If continuous motion is unnecessary, a strong static scene or occasional state change may be the better choice.

| Motion | Starting duration |
| --- | --- |
| Real button press feedback | 100–160 ms |
| Small UI state transition | 150–280 ms |
| Demo panel/message reveal | 200–350 ms |
| Row or object movement | 300–600 ms |
| Demonstration cursor travel | 500–1,000 ms |
| Completed result hold | 2–5 seconds; longer when reading requires it |
| Complete marketing loop | 7–16 seconds |

Use custom curves for deliberate pacing:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
```

- Use ease-out for entrances and direct feedback, ease-in-out for objects moving between positions, and linear motion for a constant-speed scan or signal.
- Start entering panels near their final geometry, for example opacity plus `translateY(4px)` or `scale(0.98)`. Avoid entrances from `scale(0)` and gratuitous bouncing.
- Stagger related elements briefly, around 30–80 ms, when it helps hierarchy. Do not turn every label into a separate delayed reveal.
- Make causality visible: a click precedes its response; a pipeline node and its check resolve together; a forecast precedes its recommendation.
- When an item leaves a list or board column, close the gap naturally. Update counts and preserve its identity at the destination.
- For interruptible live interactions, prefer transitions or appropriate springs. Use fixed timelines for predetermined demonstration loops.

When a cursor is useful, approach the target, pause briefly, press subtly, show the response, then move or fade the cursor away. Decorative cursors must not intercept real pointer events.

## Loop architecture and performance

Choose the smallest suitable implementation:

- **CSS keyframes** for predetermined loops.
- **CSS transitions with explicit states** for discrete or interruptible changes.
- **Native Web Animations API** when programmatic playback, seeking, or pausing helps.
- **An installed motion library** when it materially simplifies the scene.
- **RequestAnimationFrame** for genuinely continuous simulation, not as a default scheduler for every element.

Keep timing and visual states understandable. A small timeline or state machine is preferable to scattered timeouts or one enormous choreography function. Reuse primitives when multiple cards need them, without building an unrelated animation framework.

- Animate transform and opacity for most motion. Keep SVG path reveals and clipping limited to the geometry that needs them; inspect performance with several cards running together.
- Keep scene data and timing deterministic. Avoid random values that cause unstable loops or hydration differences.
- Reserve space for state changes so the outer card and copy stay still.
- Hold the result long enough to read before resetting. Reset inner states while the scene is hidden, or return naturally to its starting state. Fade only the demo when the title and description should remain readable.
- Review the end-to-start transition, including a second loop. Avoid visible resets, accidental leftover badges, and teleporting objects.
- Pause unnecessary work when offscreen or when the tab is hidden. Clean up observers, timers, animation handles, and subscriptions on unmount.

## Accessibility and real interaction

- Under `prefers-reduced-motion: reduce`, show a useful finished or resting state without the repeating choreography. Ensure hidden initial-state overlays do not obscure that state.
- Provide pause controls when the presentation needs them, especially in a live example gallery. Keep the feature understandable without watching a complete animation.
- Represent simulated controls with noninteractive elements. Do not place focusable fake controls inside an `aria-hidden` scene. Real links and controls still need usable focus states, labels, and immediate keyboard behavior.
- Hide purely decorative scenes from assistive technology only when nearby semantic content conveys the feature. Preserve accessibility for real product information and actions.
- Gate hover-dependent visual effects behind `(hover: hover) and (pointer: fine)`. Make the resting scene useful on touch devices.

## Visual verification and repair

Inspect the browser-rendered result at **100% of its intended display size**, not only in an enlarged screenshot. Check the card in the full section as well as on its own.

Review:

- Initial and completed frames: clear hierarchy, visible focal object, and readable copy.
- Intermediate frames: no awkward overlaps, drifting connectors, double-visible replacement text, or inconsistent counts.
- Reset and next loop: a quiet boundary with the correct initial state restored.
- Narrow layouts: text remains readable through reflow or simplification; the result stays inside the stage.
- Reduced motion: the representative state is complete and all choreography is stopped.
- Typography: the intended font and weights loaded; icons, initials, and numeric alignment look correct.

Use pause/scrub controls or slow playback when coordinated transitions are hard to assess. If browser verification is unavailable or explicitly excluded, report that limit rather than presenting a static/build check as visual confirmation.

When a scene feels weak, repair it in this order:

1. **Concept:** replace an overcrowded or generic presentation with a clearer product moment.
2. **Scale:** enlarge the focal object and important labels; remove lower-value detail.
3. **Typography:** correct the font, weight, hierarchy, and spacing.
4. **Contrast:** strengthen foreground, borders, and the main accent where needed.
5. **Composition:** refine alignment, layering, rhythm, and stage height.
6. **Motion:** tune transitions, dwell, and reset after the still frames work.

For a quality reference, inspect the [live examples](examples/index.html), their [HTML/SVG scene source](examples/examples.js), and [styles](examples/examples.css). Use them to study readable scale and composition; adapt the approach to the host product instead of copying the exact scenes or palette.

When producing documentation GIFs or PNGs, capture the actual HTML/SVG implementation so the illustrations match the live scene. The [README](README.md#regenerate-the-illustrations) documents this repository's renderer. Check encoded duration, dimensions, palette stability, and loop boundaries. GIF playback cannot implement reduced motion, responsive layout, or keyboard behavior.

## Delivery

Make the authorized code changes and briefly describe each scene's action and payoff. Mention dependencies or reusable primitives only when material. Report the visual/runtime checks actually performed and any remaining limits separately from static validation.
