# Animated Feature Card Pattern Catalog

Use this catalog to invent a scene that fits the feature rather than reusing the same interaction repeatedly.

## 1. Streaming list / realtime activity

Best for: visitors, logs, alerts, transactions, events, messages.

Storyboard:
1. Show 4-7 existing rows.
2. Introduce a new row at the top with a short fade/slide.
3. Shift existing rows downward together.
4. Fade or clip the oldest row at the bottom.
5. Update a timestamp/count/status badge.
6. Dwell, then repeat with another deterministic entry.

Implementation notes:
- Give rows stable IDs.
- Animate the list container or use FLIP/layout transitions if available.
- Keep row movement synchronized.
- New content should feel incoming, not as if the whole list jumps.

## 2. Terminal / setup sequence

Best for: SDK installation, CLI setup, deployment, configuration, onboarding.

Storyboard:
1. Empty prompt or one existing shell prompt.
2. Type a command quickly but readably.
3. Pause.
4. Reveal 2-5 success/check rows one by one.
5. Finish with a colored success state.
6. Dwell, fade terminal contents, restart.

Implementation notes:
- Do not simulate every character if it makes the loop too long; chunks are acceptable.
- Cursor blink can run independently.
- Keep code text monospace and compact.

## 3. Cursor click-through

Best for: consent-free flows, settings, connect buttons, filtering, toggles, permissions.

Storyboard:
1. Resting UI.
2. Cursor enters.
3. Hover state appears.
4. Cursor clicks.
5. Target transforms to new state.
6. Optional follow-up panel/result appears.
7. Cursor exits/fades; dwell.

Use sparingly across a section.

## 4. Connection / first-event handshake

Best for: activation, data ingestion, API connection, sync, pairing.

Storyboard:
1. Two endpoints are inactive.
2. A line or dots travel between them.
3. Endpoint states change as progress arrives.
4. Success icon appears.
5. Copy changes from waiting to received/connected.
6. Dwell.

Keep connector motion minimal and avoid sci-fi effects unless they fit the brand.

## 5. Integration connect sequence

Best for: integrations, imports, sources, destinations, linked accounts.

Storyboard:
1. Show 3-5 integration rows with neutral Connect buttons.
2. Cursor selects one.
3. Button passes through short loading state.
4. It becomes Connected with a check.
5. Repeat for remaining rows at a calm cadence.
6. Final all-connected state; dwell.

Vary the speed slightly through a fixed sequence, not random timers.

## 6. Chat / assistant / tool-call flow

Best for: AI search, analytics assistant, support assistant, MCP/tool use.

Storyboard:
1. User message enters.
2. Assistant typing/loading state.
3. Optional tool-call/status chip appears.
4. Tool-call resolves with check/state update.
5. Assistant answer appears.
6. Dwell long enough to read.
7. Fade or slide conversation out before reset.

Keep messages very short. The animation is a demo, not a transcript.

## 7. Card stack / attribution event

Best for: revenue, transactions, attribution, workflow events, document processing.

Storyboard:
1. Base stack sits at rest.
2. Event pill appears above it.
3. New card/object falls or slides onto stack.
4. Stack compresses 1-2 px and settles.
5. Pill updates to another event.
6. Repeat 2-4 times.
7. Reset behind fade or by sliding oldest cards out.

Keep bounce subtle.

## 8. Filter / drill-down transformation

Best for: analytics, search, segmentation, dashboards, data exploration.

Storyboard:
1. Show initial list/table/chart.
2. Cursor highlights a row/filter.
3. Selection state appears.
4. Existing content crossfades/reorders into a filtered view.
5. Header/breadcrumb/pill reflects the selection.
6. Dwell, then clear selection.

Prefer transforming between meaningful states over animating many numbers independently.

## 9. Progress rings / funnel

Best for: conversion, completion, utilization, health, pipeline.

Storyboard:
1. Empty/neutral rings.
2. Animate first ring to percentage; reveal label.
3. Repeat for subsequent rings.
4. Reveal derived sentence or summary once all are complete.
5. Dwell.
6. Sweep rings back to zero or fade/reset.

Implementation notes:
- SVG circle `stroke-dashoffset` is usually enough.
- Stagger starts by 250-600 ms.

## 10. Ambient map / globe

Best for: global traffic, locations, infrastructure, network coverage.

Storyboard:
1. Slow continuous rotation/pan.
2. Location markers remain attached to geography.
3. Occasionally pulse or introduce one marker.
4. Keep labels sparse.

This is ambient motion: it should not demand attention or require a visible reset.

## 11. Counters / metrics / mini charts

Best for: performance, savings, revenue, usage, monitoring.

Storyboard:
1. Begin with stable baseline.
2. Update one metric.
3. Corresponding sparkline/bar/progress shifts.
4. Add a small status chip explaining the change.
5. Dwell.

Do not continuously scramble numbers; viewers should be able to read them.

## 12. Hover-led static demo

Best for: feature lists where continuous animation is unnecessary.

Storyboard:
1. Mostly static miniature interface.
2. One row/button gently becomes active every few seconds, or only on actual hover.
3. Supporting tooltip/detail appears.

Use this to create pacing contrast next to more animated cards.

## Scene-selection heuristic

Map the feature to the clearest causal story:

- Something arrives -> streaming list
- Something gets installed -> terminal
- A user chooses something -> cursor/filter
- Systems connect -> handshake/integration
- A question is answered -> chat
- Value accumulates -> stack/counter
- A process completes -> progress/funnel
- Geography matters -> map/globe
- Exploration matters -> drill-down

When two patterns both fit, choose the one that is less represented in neighboring cards.
