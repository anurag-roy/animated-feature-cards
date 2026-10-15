/* Original HTML/SVG scenes. One native timeline is shared by preview and capture. */
(() => {
  const DURATION = 12000;
  const OUT = 'cubic-bezier(.23, 1, .32, 1)';
  const MOVE = 'cubic-bezier(.77, 0, .175, 1)';
  const paths = {
    spark: '<path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2Z"/><path d="M20 2v4m-2-2h4"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    doc: '<path d="M6 2h9l4 4v16H6Z"/><path d="M14 2v5h5M9 11h7M9 15h7M9 19h4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    circleCheck: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3m6 0h4"/>',
    test: '<path d="M9 3h6M10 3v7l-6 9q-1 2 2 2h12q3 0 2-2l-6-9V3M7 15h10"/>',
    build: '<path d="m12 2 9 5v10l-9 5-9-5V7Z"/><path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    inbox: '<path d="m3 13 3-9h12l3 9v7H3Z"/><path d="M3 13h5l2 3h4l2-3h5"/>',
    route: '<rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="16" width="5" height="5" rx="1"/><path d="M5.5 8v10.5H16m-5-6H18V6m-3 3 3-3 3 3"/>',
    flag: '<path d="M5 21V3m0 1c5-4 9 4 14 0v9c-5 4-9-4-14 0"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    chart: '<path d="M4 3v17h17M7 15l4-5 4 3 5-8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    link: '<path d="m10 13 4-4M8 15l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m2 2 1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0"/>',
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  const pill = (text, color = '', glyph = '') => `<span class="pill ${color}">${glyph ? icon(glyph) : ''}${text}</span>`;
  const avatar = letters => `<span class="avatar">${letters}</span>`;
  const swap = (before, after, name) => `<span class="state-stack"><span data-motion="${name}-before">${before}</span><span data-motion="${name}-after">${after}</span></span>`;
  const header = (glyph, title) => `<div class="scene-header"><div class="scene-title">${icon(glyph)}${title}</div><span class="example-label">Example</span></div>`;

  function assistant() {
    return `${header('search', 'Workspace search')}<div class="scene-loop" data-motion="loop">
      <div class="search-query surface">${icon('search')}When do we launch?<span class="enter-key">↵</span></div>
      <div class="search-rest" data-motion="search-rest">
        <svg class="source-art" viewBox="0 0 116 92" fill="none" aria-hidden="true">
          <g transform="rotate(-12 40 51)"><rect x="16" y="14" width="54" height="69" rx="7" fill="#17243b" stroke="#3b82f680"/><path d="M27 35h28M27 44h24M27 53h28M27 62h17" stroke="#60a5fa70" stroke-width="2" stroke-linecap="round"/></g>
          <g transform="rotate(10 75 50)"><rect x="47" y="10" width="54" height="69" rx="7" fill="#16243d" stroke="#3b82f680"/><path d="M58 30h27M58 39h22M58 48h27M58 57h17" stroke="#60a5fa70" stroke-width="2" stroke-linecap="round"/></g>
          <path d="M39 6h34l12 12v61a7 7 0 0 1-7 7H39a7 7 0 0 1-7-7V13a7 7 0 0 1 7-7Z" fill="#1d3154" stroke="#3b82f6"/><path d="M72 6v13h13" fill="#254273" stroke="#3b82f6"/><path d="M43 31h27M43 40h22M43 49h27M43 58h16" stroke="#bfdbfe" stroke-width="2.5" stroke-linecap="round"/>
          <g data-motion="file-scan"><rect x="33" y="20" width="51" height="2" rx="1" fill="#3b82f6"/><rect x="33" y="22" width="51" height="8" fill="#3b82f61c"/></g>
          <circle cx="86" cy="70" r="14" fill="#3b82f6" stroke="#19191c" stroke-width="3"/><path d="m81 70 3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg><p class="searching">Searching your workspace…</p><div class="source-chips">${pill('Launch plan', '', 'doc')}${pill('2 more sources', '', 'link')}</div>
      </div>
      <div class="search-answer surface accent-surface" data-motion="answer"><div class="answer-top"><span class="answer-logo">${icon('spark')}</span>Answer found</div><p class="answer-date">Friday, Oct 23</p><div class="answer-detail">Mobile release · 10:00 AM</div><div class="answer-source">${icon('doc')}Launch plan.pdf${pill('Verified', 'accent', 'check')}</div></div>
    </div>`;
  }
  function release() {
    return `${header('terminal', 'Deploy to production')}<div class="scene-loop" data-motion="loop"><div class="pipeline"><svg class="pipeline-wires" viewBox="0 0 352 44" aria-hidden="true"><path d="M80 22h74m44 0h74"/><circle cx="80" cy="22" r="2.5" data-motion="packet-0"/><circle cx="198" cy="22" r="2.5" data-motion="packet-1"/></svg>
      ${[['test', 'Tests'], ['build', 'Build'], ['globe', 'Live']].map(([glyph, label], i) => `<div class="pipeline-step"><div class="step-node state-stack"><span style="display:grid;place-items:center">${icon(glyph)}</span><span class="step-ready" data-motion="step-${i}">${icon('check')}</span></div><span>${label}</span></div>`).join('')}</div>
      <div class="terminal surface"><div class="terminal-bar">${icon('terminal')}production${swap(pill('Deploying', 'accent'), pill('Ready', 'success', 'check'), 'deploy-status')}</div><div class="command"><span>$</span>deploy --production</div><div class="terminal-results"><div class="terminal-result" data-motion="test-result">${icon('check')}Tests passed<span>32 / 32</span></div><div class="terminal-result" data-motion="build-result">${icon('check')}Build complete<span>v2.8.0</span></div></div></div>
      <div class="deployment" data-motion="deployment">${icon('circleCheck')}mobile.example.app ${icon('arrow')}</div></div>`;
  }
  function support() {
    return `${header('inbox', 'Smart routing')}<div class="scene-loop" data-motion="loop"><div class="request surface"><div class="request-person">${avatar('AM')}Ava Morgan<time>Just now</time></div><h3 class="request-title">Export missing columns</h3><p class="request-message">My CSV is missing the owner field.<br>Can you help before our review?</p><div class="request-tags"><span data-motion="topic">${pill('Exports', '', 'doc')}</span><span data-motion="priority">${pill('High priority', 'accent', 'flag')}</span></div></div>
      <svg class="routing-line" viewBox="0 0 352 20" fill="none" aria-hidden="true"><path d="M176 0v16m-3-3 3 3 3-3" stroke="currentColor" stroke-opacity=".5"/><circle cx="176" cy="1" r="2" fill="currentColor" data-motion="route-signal"/></svg>
      <div class="assignment surface accent-surface" data-motion="assignee">${avatar('MK')}<div><strong>Assigned to Maya</strong><small>Product support team</small></div>${icon('circleCheck')}</div><div class="draft-ready" data-motion="draft"><span>${icon('spark')}Reply draft ready</span>${pill('Review', 'solid', 'arrow')}</div></div>`;
  }
  function inventory() {
    return `${header('chart', 'Demand forecast')}<div class="scene-loop" data-motion="loop"><div class="stock-heading"><svg class="product-icon" viewBox="0 0 30 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 2h10v5l3 5v16q0 4-4 4h-8q-4 0-4-4V12l3-5Z" fill="#10b98115"/><path d="M10 6h10M7 15h16M7 25h16"/><rect x="11" y="18" width="8" height="4" rx="1" fill="#10b98140"/></svg><div><strong>Everyday bottle</strong><small>36 orders / day</small></div>${pill('180 in stock', 'accent')}</div>
      <svg class="stock-chart" viewBox="0 0 352 139" aria-hidden="true"><defs><linearGradient id="stock-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#10b981" stop-opacity=".25"/><stop offset="1" stop-color="#10b981" stop-opacity="0"/></linearGradient></defs><g class="grid"><path d="M32 40h306M32 75h306M32 110h306"/></g><text x="0" y="44">180</text><text x="7" y="79">90</text><text x="14" y="114">0</text><path d="M32 14 74 25 116 40V110H32Z" fill="url(#stock-fill)"/><path class="actual" d="M32 14 74 25 116 40"/><path d="M116 7v105" stroke="#10b98160" stroke-dasharray="2 4"/><g data-motion="projection"><path d="M116 40 160 54 204 68 248 82 292 96 336 110V110H116Z" fill="url(#stock-fill)"/><path class="future" d="M116 40 160 54 204 68 248 82 292 96 336 110"/></g><circle cx="116" cy="40" r="4" fill="#10b981" stroke="#19191c" stroke-width="2"/><g data-motion="stockout"><circle cx="336" cy="110" r="8" fill="#10b98122"/><circle cx="336" cy="110" r="3" fill="#34d399"/></g><text x="99" y="134" class="today">Today</text><text x="296" y="134">Oct 20</text></svg>
      <div class="reorder surface accent-surface" data-motion="reorder"><div><small>Suggested order</small><strong>240 units</strong></div>${pill('Review order', 'solid', 'arrow')}</div><div class="stock-warning" data-motion="stock-warning">${icon('clock')}4-day lead time · arrives before stock runs out</div></div>`;
  }
  const scenes = [
    { id: 'assistant-tool-calls', title: 'Ask your workspace', description: "Find clear answers in your team's files, with sources attached to every result.", render: assistant },
    { id: 'release-pipeline', title: 'Ship with confidence', description: 'From a single command to a live release. Follow every check, build, and deployment.', render: release },
    { id: 'support-triage', title: 'Give every request a home', description: 'Prioritize incoming requests, route them to the right teammate, and prepare a reply.', render: support },
    { id: 'inventory-forecast', title: 'Stay ahead of demand', description: 'See when stock will run low and prepare your next order before the shortage arrives.', render: inventory },
  ];
  const params = new URLSearchParams(location.search);
  if (params.has('capture')) document.body.classList.add('capture');
  document.querySelector('.gallery').innerHTML = scenes.filter(s => !params.has('scene') || s.id === params.get('scene')).map(s => `<article class="feature-card" data-scene="${s.id}" aria-labelledby="${s.id}-title"><div class="stage" aria-hidden="true"><div class="stage-inner">${s.render()}</div></div><div class="feature-copy"><h2 id="${s.id}-title">${s.title}</h2><p>${s.description}</p></div></article>`).join('');
  const cards = [...document.querySelectorAll('.feature-card')];
  const groups = new Map(cards.map(card => [card, []]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches && !params.has('capture');
  let position = reduced.matches ? 9000 : 0;
  function track(card, name, frames) {
    card.querySelectorAll(`[data-motion="${name}"]`).forEach(element => {
      const animation = element.animate(frames, { duration: DURATION, iterations: Infinity, easing: 'linear' });
      animation.pause(); animation.currentTime = position;
      groups.get(card).push(animation);
    });
  }
  function reveal(card, name, time, dy = 4, duration = .28) {
    track(card, name, [{ offset: 0, opacity: 0, transform: `translateY(${dy}px)` }, { offset: time / 12, opacity: 0, transform: `translateY(${dy}px)`, easing: OUT }, { offset: (time + duration) / 12, opacity: 1, transform: 'translateY(0px)' }, { offset: .94, opacity: 1, transform: 'translateY(0px)' }, { offset: .955, opacity: 0, transform: `translateY(${dy}px)` }, { offset: 1, opacity: 0, transform: `translateY(${dy}px)` }]);
  }
  function replace(card, name, time) {
    track(card, `${name}-before`, [{ offset: 0, opacity: 1 }, { offset: time / 12, opacity: 1, easing: OUT }, { offset: (time + .2) / 12, opacity: 0 }, { offset: .94, opacity: 0 }, { offset: .955, opacity: 1 }, { offset: 1, opacity: 1 }]);
    reveal(card, `${name}-after`, time + .08, 0);
  }
  cards.forEach(card => {
    track(card, 'loop', [{ offset: 0, opacity: 1 }, { offset: .885, opacity: 1, easing: OUT }, { offset: .935, opacity: 0 }, { offset: .965, opacity: 0, easing: OUT }, { offset: 1, opacity: 1 }]);
    const scene = card.dataset.scene;
    if (scene === 'assistant-tool-calls') {
      track(card, 'file-scan', [{ offset: 0, opacity: 0, transform: 'translateY(0px)' }, { offset: .08, opacity: 1, transform: 'translateY(0px)' }, { offset: .24, opacity: 1, transform: 'translateY(47px)' }, { offset: .27, opacity: 0, transform: 'translateY(47px)' }, { offset: 1, opacity: 0, transform: 'translateY(0px)' }]);
      track(card, 'search-rest', [{ offset: 0, opacity: 1 }, { offset: 3.3 / 12, opacity: 1, easing: OUT }, { offset: 3.55 / 12, opacity: 0 }, { offset: .94, opacity: 0 }, { offset: .955, opacity: 1 }, { offset: 1, opacity: 1 }]);
      reveal(card, 'answer', 3.5, 6, .3);
    }
    if (scene === 'release-pipeline') {
      [2.1, 3.8, 5.5].forEach((time, i) => reveal(card, `step-${i}`, time, 0));
      [1.5, 3.2].forEach((time, i) => track(card, `packet-${i}`, [{ offset: 0, opacity: 0, transform: 'translateX(0px)' }, { offset: time / 12, opacity: 1, transform: 'translateX(0px)', easing: MOVE }, { offset: (time + .6) / 12, opacity: 1, transform: 'translateX(74px)' }, { offset: (time + .7) / 12, opacity: 0, transform: 'translateX(74px)' }, { offset: 1, opacity: 0, transform: 'translateX(0px)' }]));
      reveal(card, 'test-result', 2.25, 3);
      reveal(card, 'build-result', 3.95, 3);
      replace(card, 'deploy-status', 5.5);
      reveal(card, 'deployment', 5.8, 4);
    }
    if (scene === 'support-triage') {
      reveal(card, 'topic', 1.3, 2); reveal(card, 'priority', 1.8, 2);
      track(card, 'route-signal', [{ offset: 0, opacity: 0, transform: 'translateY(0px)' }, { offset: 2.6 / 12, opacity: 1, transform: 'translateY(0px)' }, { offset: 3.15 / 12, opacity: 1, transform: 'translateY(15px)' }, { offset: 3.25 / 12, opacity: 0, transform: 'translateY(15px)' }, { offset: 1, opacity: 0, transform: 'translateY(0px)' }]);
      reveal(card, 'assignee', 3.2, 4); reveal(card, 'draft', 4.6, 3);
    }
    if (scene === 'inventory-forecast') {
      track(card, 'projection', [{ offset: 0, clipPath: 'inset(0 100% 0 0)' }, { offset: 1.0 / 12, clipPath: 'inset(0 100% 0 0)', easing: MOVE }, { offset: 3.5 / 12, clipPath: 'inset(0 0% 0 0)' }, { offset: .94, clipPath: 'inset(0 0% 0 0)' }, { offset: .955, clipPath: 'inset(0 100% 0 0)' }, { offset: 1, clipPath: 'inset(0 100% 0 0)' }]);
      reveal(card, 'stockout', 3.5, 0); reveal(card, 'reorder', 4.15, 4); reveal(card, 'stock-warning', 4.8, 2);
    }
  });
  const animations = [...groups.values()].flat();
  const button = document.querySelector('#playback');
  const slider = document.querySelector('#timeline');
  const visible = new Set(cards);
  let scrubberFrame;
  let lastSliderUpdate = 0;
  function currentTime() { const active = animations.find(a => a.playState === 'running'); return active ? active.currentTime % DURATION : position; }
  function reflectTimeline(time) { if (time - lastSliderUpdate > 100) { slider.value = String(currentTime()); lastSliderUpdate = time; } scrubberFrame = requestAnimationFrame(reflectTimeline); }
  function syncPlayback() {
    cancelAnimationFrame(scrubberFrame);
    const start = document.timeline.currentTime - position;
    for (const [card, items] of groups) for (const a of items) {
      a.pause(); a.currentTime = position;
      if (playing && !document.hidden && visible.has(card)) { a.play(); a.startTime = start; }
    }
    button.disabled = reduced.matches;
    button.textContent = reduced.matches ? 'Reduced motion enabled' : playing ? 'Pause animations' : 'Play animations';
    if (playing && !document.hidden && visible.size) scrubberFrame = requestAnimationFrame(reflectTimeline);
  }
  function seek(milliseconds) { position = Math.max(0, Math.min(DURATION, milliseconds)); playing = false; syncPlayback(); slider.value = String(position); }
  button.addEventListener('click', () => { position = currentTime(); playing = !playing; syncPlayback(); });
  slider.addEventListener('input', () => seek(Number(slider.value)));
  reduced.addEventListener('change', () => { playing = !reduced.matches; position = reduced.matches ? 9000 : 0; syncPlayback(); });
  document.addEventListener('visibilitychange', () => { position = currentTime(); syncPlayback(); });
  const intersection = new IntersectionObserver(entries => { position = currentTime(); entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)); syncPlayback(); });
  cards.forEach(card => intersection.observe(card));
  syncPlayback();
  window.exampleDemo = { duration: DURATION, scenes: scenes.map(s => s.id), seek, ready: document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))), dispose() { cancelAnimationFrame(scrubberFrame); intersection.disconnect(); animations.forEach(a => a.cancel()); } };
})();
