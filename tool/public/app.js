/* ── Blog Factory Tool — Frontend ──────────────────────────────────────────── */
'use strict';

// ── State ──────────────────────────────────────────────────────────────────────
let brands = [];
let config = { azureOpenAI: false, azureDalle: false };
let selectedImageCount = 0;
let currentStagingId = null;     // ID of the staged post open in detail view
let activeBrand = null;          // global brand object — drives all tabs
let activeBrandContext = '';     // brand selected in settings brand-context section

// ── Init ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([fetchConfig(), fetchBrands()]);
  bindTabs();
  bindImageCountToggle();
  bindGlobalBrandSelect();
  bindGenerateBtn();
  bindStagingActions();
  bindSettings();
});

// ── API helpers ────────────────────────────────────────────────────────────────
async function api(path, opts) {
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result);
    r.onerror = reject;
    r.readAsText(file);
  });
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result.split(',')[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// ── Config & API status ────────────────────────────────────────────────────────
async function fetchConfig() {
  try {
    config = await api('/api/config');
  } catch {
    config = { azureOpenAI: false, azureDalle: false };
  }
  renderApiStatus('status-azure', config.azureOpenAI, 'Connected', 'Not configured');
  renderApiStatus('status-dalle', config.azureDalle,  'Connected', 'Not configured');
  updateDalleHint();
}

function renderApiStatus(id, ok, okText, errText) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('ok', ok);
  el.classList.toggle('err', !ok);
  el.querySelector('.status-badge').textContent = ok ? okText : errText;
}

// ── Brands ─────────────────────────────────────────────────────────────────────
async function fetchBrands() {
  try {
    brands = await api('/api/brands');
    populateBrandSelects();
  } catch (e) {
    console.error('Failed to fetch brands', e);
  }
}

function populateBrandSelects() {
  const opts = brands.map(b =>
    `<option value="${b.id}">${b.displayName}</option>`
  ).join('');

  // Topbar global selector
  const global = document.getElementById('global-brand-select');
  if (global) global.innerHTML = `<option value="">Select brand…</option>${opts}`;

  // Settings brand-context selector
  const ctx = document.getElementById('context-brand-select');
  if (ctx) ctx.innerHTML = `<option value="">Select a brand…</option>${opts}`;
}

// ── Global brand selector ──────────────────────────────────────────────────────
function bindGlobalBrandSelect() {
  document.getElementById('global-brand-select').addEventListener('change', e => {
    const id = e.target.value;
    activeBrand = id ? brands.find(b => b.id === id) : null;
    updateBrandInfo(activeBrand);

    // If we're on the existing tab, refresh
    const existingPanel = document.getElementById('tab-existing');
    if (existingPanel.classList.contains('active')) {
      refreshExistingTab();
    }
  });
}

function updateBrandInfo(brand) {
  const bar = document.getElementById('brand-info-bar');
  if (!brand) {
    bar.classList.add('hidden');
    document.getElementById('lang-checkboxes').innerHTML =
      '<span class="muted">Select a brand in the top bar first</span>';
    return;
  }
  bar.classList.remove('hidden');
  document.getElementById('binfo-domain').textContent = brand.domain;
  document.getElementById('binfo-repo').textContent   = brand.repo;
  document.getElementById('binfo-langs').textContent  = brand.languages.join(', ');

  document.getElementById('lang-checkboxes').innerHTML = brand.languages.map(lang =>
    `<label><input type="checkbox" value="${lang}" checked />${langName(lang)}</label>`
  ).join('');
}

function langName(code) {
  return { en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano' }[code] || code.toUpperCase();
}

function selectedLanguages() {
  return [...document.querySelectorAll('#lang-checkboxes input:checked')].map(i => i.value);
}

// ── Tabs ───────────────────────────────────────────────────────────────────────
function bindTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === name)
  );
  document.querySelectorAll('.tab-panel').forEach(p =>
    p.classList.toggle('active', p.id === `tab-${name}`)
  );

  if (name === 'existing') refreshExistingTab();
  if (name === 'preview') { closeStagingDetail(); loadStagingList(); }
}

// ── Image count toggle ─────────────────────────────────────────────────────────
function bindImageCountToggle() {
  document.querySelectorAll('[data-count]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedImageCount = parseInt(btn.dataset.count);
      document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDalleHint();
    });
  });
}

function updateDalleHint() {
  const hint = document.getElementById('dalle-hint');
  if (!hint) return;
  if (selectedImageCount === 0) { hint.textContent = ''; return; }
  if (!config.azureDalle) {
    hint.textContent = '⚠ Image generation not configured — images will be skipped';
    hint.style.color = 'var(--gold)';
  } else {
    hint.textContent = `${selectedImageCount} image${selectedImageCount > 1 ? 's' : ''} will be generated`;
    hint.style.color = 'var(--text-muted)';
  }
}

// ── Generate ───────────────────────────────────────────────────────────────────
function bindGenerateBtn() {
  document.getElementById('generate-btn').addEventListener('click', handleGenerate);
}

async function handleGenerate() {
  if (!activeBrand) return alert('Please select a brand in the top bar first.');
  const prompt  = document.getElementById('prompt-input').value.trim();
  const context = document.getElementById('context-input').value.trim();
  const langs   = selectedLanguages();

  if (!prompt)      return alert('Please enter a blog topic.');
  if (!langs.length) return alert('Please select at least one language.');

  const btn = document.getElementById('generate-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-icon">⏳</span> Generating…';

  const logContainer = document.getElementById('log-container');
  const logBox = document.getElementById('log-box');
  logContainer.style.display = '';
  logBox.innerHTML = '';

  const addLog = (text, cls = '') => {
    const span = document.createElement('span');
    span.className = cls;
    span.textContent = text + '\n';
    logBox.appendChild(span);
    logBox.scrollTop = logBox.scrollHeight;
  };

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandId: activeBrand.id,
        languages: langs,
        prompt,
        context,
        imageCount: selectedImageCount,
      }),
    });

    await streamSSE(res, {
      log: msg => {
        const cls = msg.startsWith('✅') ? 'log-ok' : msg.startsWith('⚠') ? 'log-gold' : '';
        addLog(msg, cls);
      },
      error: msg => addLog('ERROR: ' + msg, 'log-err'),
      done: data => {
        addLog('→ Saved to staging. Opening preview…', 'log-gold');
        setTimeout(() => {
          loadStagingList().then(() => openStagingDetail(data.stagingId));
          switchTab('preview');
        }, 600);
      },
    });
  } catch (err) {
    addLog('Network error: ' + err.message, 'log-err');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">✦</span> Generate Blog Post';
  }
}

// ── SSE stream helper ──────────────────────────────────────────────────────────
async function streamSSE(res, handlers) {
  const reader  = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      let msg;
      try { msg = JSON.parse(line.slice(6)); } catch { continue; }
      handlers[msg.type]?.(msg.data);
    }
  }
}

// ── Staging list ───────────────────────────────────────────────────────────────
async function loadStagingList() {
  const list  = document.getElementById('staging-list');
  const empty = document.getElementById('staging-empty');
  const bar   = document.getElementById('push-all-bar');
  try {
    const posts = await api('/api/staging');
    list.innerHTML = '';
    if (!posts.length) {
      empty.style.display = '';
      bar.style.display = 'none';
      return;
    }
    empty.style.display = 'none';
    posts.forEach(p => list.appendChild(buildStagingCard(p)));
    updatePushAllBar(posts);
  } catch (e) {
    list.innerHTML = `<span class="muted">Error loading staging: ${e.message}</span>`;
  }
}

function updatePushAllBar(posts) {
  const bar   = document.getElementById('push-all-bar');
  const count = document.getElementById('push-all-count');
  const n = posts.filter(p => p.status === 'approved').length;
  bar.style.display = n > 0 ? '' : 'none';
  count.textContent = `${n} post${n > 1 ? 's' : ''}`;
}

function buildStagingCard(p) {
  const card = document.createElement('div');
  card.className = `staging-card${p.status === 'approved' ? ' is-approved' : ''}`;
  card.dataset.id = p.id;

  const date = new Date(p.createdAt).toLocaleDateString('en-US',
    { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const langPills = p.languages.map(l =>
    `<span class="lang-pill has">${l.toUpperCase()}</span>`).join('');
  const imgNote = p.imageCount > 0
    ? `<span class="staging-card-img-count">🖼 ${p.imageCount} image${p.imageCount > 1 ? 's' : ''}</span>`
    : '';
  const statusBadge = p.status === 'approved'
    ? `<span class="status-badge approved">✓ Approved</span>`
    : `<span class="status-badge pending">Pending</span>`;

  card.innerHTML = `
    <div class="staging-card-body">
      <div class="staging-card-top">
        <div class="staging-card-brand">${p.brandName}</div>
        ${statusBadge}
      </div>
      <div class="staging-card-slug">${p.slug}</div>
      <div class="staging-card-meta">${langPills}${imgNote}<span>${date}</span></div>
    </div>
    <div class="staging-card-actions">
      <button class="btn-reject" data-action="reject">✕ Reject</button>
      ${p.status === 'approved'
        ? `<button class="btn-approve-action is-approved" data-action="approve">✓ Approved</button>`
        : `<button class="btn-approve-action" data-action="approve">✓ Approve</button>`
      }
    </div>`;

  card.querySelector('.staging-card-body').addEventListener('click', () => openStagingDetail(p.id));

  card.querySelector('[data-action="reject"]').addEventListener('click', async e => {
    e.stopPropagation();
    if (!confirm(`Reject and delete "${p.slug}"?`)) return;
    await api(`/api/staging/${p.id}`, { method: 'DELETE' });
    await loadStagingList();
  });

  card.querySelector('[data-action="approve"]').addEventListener('click', async e => {
    e.stopPropagation();
    await approveStaged(p.id);
    await loadStagingList();
  });

  return card;
}

function closeStagingDetail() {
  document.getElementById('staging-list-view').style.display = '';
  document.getElementById('staging-detail-view').style.display = 'none';
  currentStagingId = null;
}

async function openStagingDetail(id) {
  currentStagingId = id;
  let post;
  try {
    post = await api(`/api/staging/${id}`);
  } catch {
    alert('Could not load staged post — it may have been approved or rejected.');
    closeStagingDetail();
    return;
  }

  document.getElementById('staging-list-view').style.display = 'none';
  document.getElementById('staging-detail-view').style.display = '';
  document.getElementById('detail-slug-display').textContent = post.slug;

  // Set approve button state based on current status
  const approveBtn = document.getElementById('btn-approve-detail');
  const rejectBtn  = document.getElementById('btn-reject-detail');
  const isApproved = post.status === 'approved';
  approveBtn.textContent = isApproved ? '✓ Approved' : '✓ Approve';
  approveBtn.disabled = isApproved;
  approveBtn.classList.toggle('is-approved', isApproved);
  rejectBtn.disabled = false;
  rejectBtn.textContent = '✕ Reject';

  // Render language panels
  const langTabs  = document.getElementById('detail-lang-tabs');
  const mdxPanels = document.getElementById('detail-mdx-panels');
  langTabs.innerHTML = mdxPanels.innerHTML = '';

  // Reset view toggle
  document.querySelectorAll('#detail-view-toggle .view-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.view === 'rendered')
  );

  const langs = Object.keys(post.posts);

  function activeLang() {
    const active = langTabs.querySelector('.lang-tab.active');
    return active ? active.textContent.toLowerCase() : langs[0];
  }

  function renderChatHistory(lang) {
    const history = (post.chatHistory ?? {})[lang] ?? [];
    const box = document.getElementById('chat-history');
    const empty = document.getElementById('chat-empty');
    // Remove old bubbles (keep empty placeholder)
    box.querySelectorAll('.chat-bubble').forEach(el => el.remove());
    empty.style.display = history.length ? 'none' : '';
    history.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.role}`;
      bubble.textContent = msg.content;
      box.appendChild(bubble);
    });
    box.scrollTop = box.scrollHeight;
    document.getElementById('chat-lang-badge').textContent = lang.toUpperCase();
  }

  langs.forEach((lang, idx) => {
    const btn = document.createElement('button');
    btn.className = `lang-tab${idx === 0 ? ' active' : ''}`;
    btn.textContent = lang.toUpperCase();
    btn.addEventListener('click', () => {
      document.querySelectorAll('#detail-lang-tabs .lang-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('#detail-mdx-panels .mdx-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`detail-mdx-${lang}`).classList.add('active');
      renderChatHistory(lang);
    });
    langTabs.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = `mdx-panel${idx === 0 ? ' active' : ''}`;
    panel.id = `detail-mdx-${lang}`;

    const rendered = document.createElement('div');
    rendered.className = 'bp-rendered';
    rendered.innerHTML = renderBlogPostHTML(post.posts[lang], post.images);

    const raw = document.createElement('div');
    raw.className = 'bp-raw';
    raw.style.display = 'none';
    const code = document.createElement('div');
    code.className = 'mdx-code';
    code.innerHTML = syntaxHighlight(post.posts[lang]);
    raw.appendChild(code);

    panel.appendChild(rendered);
    panel.appendChild(raw);
    mdxPanels.appendChild(panel);
  });

  // Initialise chat for first language
  renderChatHistory(langs[0]);

  // Chat send handler
  const chatInput = document.getElementById('chat-input');
  const chatSend  = document.getElementById('btn-chat-send');

  // Remove any previous listener by replacing node
  const newSend = chatSend.cloneNode(true);
  chatSend.parentNode.replaceChild(newSend, chatSend);

  async function sendRefinement() {
    const lang = activeLang();
    const message = chatInput.value.trim();
    if (!message) return;

    chatInput.value = '';
    chatInput.disabled = true;
    newSend.disabled = true;

    const box = document.getElementById('chat-history');
    document.getElementById('chat-empty').style.display = 'none';

    // Append user bubble immediately
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = message;
    box.appendChild(userBubble);

    // Thinking indicator
    const thinkBubble = document.createElement('div');
    thinkBubble.className = 'chat-bubble thinking';
    thinkBubble.textContent = 'Refining…';
    box.appendChild(thinkBubble);
    box.scrollTop = box.scrollHeight;

    try {
      const res = await fetch(`/api/staging/${id}/refine`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lang, message }),
      });

      let updatedMdx = null;
      let summary = null;

      await streamSSE(res, {
        mdx:     d => { updatedMdx = d; },
        summary: d => { summary = d; },
        error:   d => { throw new Error(d); },
      });

      // Update in-memory post
      if (!post.chatHistory) post.chatHistory = {};
      if (!post.chatHistory[lang]) post.chatHistory[lang] = [];
      const now = new Date().toISOString();
      post.chatHistory[lang].push(
        { role: 'user',      content: message,           timestamp: now },
        { role: 'assistant', content: summary || 'Done.', timestamp: now },
      );
      if (updatedMdx) post.posts[lang] = updatedMdx;

      // Update rendered panel
      if (updatedMdx) {
        const panel = document.getElementById(`detail-mdx-${lang}`);
        if (panel) {
          panel.querySelector('.bp-rendered').innerHTML = renderBlogPostHTML(updatedMdx, post.images);
          const codeEl = panel.querySelector('.mdx-code');
          if (codeEl) codeEl.innerHTML = syntaxHighlight(updatedMdx);
        }
      }

      // Replace thinking with assistant summary
      thinkBubble.className = 'chat-bubble assistant';
      thinkBubble.textContent = summary || 'Done.';

    } catch (err) {
      thinkBubble.className = 'chat-bubble assistant';
      thinkBubble.textContent = `Error: ${err.message}`;
    } finally {
      chatInput.disabled = false;
      newSend.disabled = false;
      chatInput.focus();
      box.scrollTop = box.scrollHeight;
    }
  }

  newSend.addEventListener('click', sendRefinement);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendRefinement(); }
  });
}

async function approveStaged(id) {
  await api(`/api/staging/${id}/approve`, { method: 'POST' });
}

async function handlePushAll() {
  const btn = document.getElementById('btn-push-all');
  const logContainer = document.getElementById('push-all-log-container');
  const logBox = document.getElementById('push-all-log-box');

  btn.disabled = true;
  btn.innerHTML = '<span class="btn-icon">⏳</span> Pushing…';
  logContainer.style.display = '';
  logBox.innerHTML = '';

  const addLog = (text, cls = '') => {
    const span = document.createElement('span');
    span.className = cls;
    span.textContent = text + '\n';
    logBox.appendChild(span);
    logBox.scrollTop = logBox.scrollHeight;
  };

  try {
    const res = await fetch('/api/staging/push-all', { method: 'POST' });
    await streamSSE(res, {
      log:   msg => addLog(msg, msg.startsWith('🚀') || msg.startsWith('✓') ? 'log-ok' : ''),
      error: msg => addLog('ERROR: ' + msg, 'log-err'),
      done:  d  => {
        addLog(`✅ Done! ${d.count} post(s) published. Auto-publish workflow is running.`, 'log-ok');
        btn.innerHTML = '<span class="btn-icon">✅</span> Pushed!';
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = '<span class="btn-icon">🚀</span> Push All Approved';
          loadStagingList();
        }, 3000);
      },
    });
  } catch (err) {
    addLog('Network error: ' + err.message, 'log-err');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">🚀</span> Push All Approved';
  }
}

// ── Staging action bindings ────────────────────────────────────────────────────
function bindStagingActions() {
  document.getElementById('btn-refresh-staging').addEventListener('click', loadStagingList);
  document.getElementById('btn-push-all').addEventListener('click', handlePushAll);

  document.getElementById('btn-back-staging').addEventListener('click', () => {
    closeStagingDetail();
    loadStagingList();
  });

  document.getElementById('btn-approve-detail').addEventListener('click', async () => {
    if (!currentStagingId) return;
    const btn = document.getElementById('btn-approve-detail');
    await approveStaged(currentStagingId);
    btn.textContent = '✓ Approved';
    btn.classList.add('is-approved');
    btn.disabled = true;
  });

  document.getElementById('btn-reject-detail').addEventListener('click', async () => {
    const slug = document.getElementById('detail-slug-display').textContent;
    if (!confirm(`Reject and delete "${slug}"?`)) return;
    await api(`/api/staging/${currentStagingId}`, { method: 'DELETE' });
    closeStagingDetail();
    loadStagingList();
  });

  // View toggle in detail
  document.querySelectorAll('#detail-view-toggle .view-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('#detail-view-toggle .view-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.view === view)
      );
      document.querySelectorAll('#detail-mdx-panels .bp-rendered').forEach(el =>
        el.style.display = view === 'rendered' ? '' : 'none'
      );
      document.querySelectorAll('#detail-mdx-panels .bp-raw').forEach(el =>
        el.style.display = view === 'raw' ? '' : 'none'
      );
    })
  );
}

// ── MDX parsing helpers ────────────────────────────────────────────────────────
function parseFrontmatter(mdx) {
  const match = mdx.trimStart().match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return { meta: {}, body: mdx };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^([\w-]+):\s*(.*)/);
    if (!m) return;
    const key = m[1], raw = m[2].trim();
    if (raw.startsWith('[')) {
      // array: ["a", "b"] or [a, b]
      meta[key] = raw.slice(1, -1).split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      meta[key] = raw.replace(/^["']|["']$/g, '');
    }
  });
  return { meta, body: match[2] };
}

// Build varName → previewUrl map from MDX import statements
function buildImageMap(mdx, images) {
  const map = {};
  const re = /^import\s+(\w+)\s+from\s+['"][^'"]*\/([^'"\/]+)['"]/gm;
  let m;
  while ((m = re.exec(mdx)) !== null) {
    const varName = m[1], filename = m[2];
    const img = images?.find(i => i.filename === filename);
    if (img) map[varName] = img.previewUrl;
  }
  return map;
}

// Strip imports + replace <Image> JSX with <img> tags for markdown rendering
function processBodyForRender(body, imageMap) {
  // Remove import lines
  let out = body.replace(/^import\s+.+from\s+['"][^'"]+['"]\s*;?\r?\n?/gm, '');
  // Replace <Image src={varName} alt="..." ... /> with markdown image
  out = out.replace(/<Image\b([^/]*?)\/>/gs, (_, attrs) => {
    const srcM = attrs.match(/src=\{(\w+)\}/);
    const altM = attrs.match(/alt="([^"]*)"/);
    const src  = srcM ? (imageMap[srcM[1]] || '') : '';
    const alt  = altM ? altM[1] : '';
    return src ? `\n\n![${alt}](${src})\n\n` : '';
  });
  // Remove any remaining unknown JSX tags (keep known HTML)
  const knownTags = /^(img|a|strong|em|code|pre|blockquote|ul|ol|li|h[1-6]|p|br|hr|table|thead|tbody|tr|th|td|div|span|section|article)$/i;
  out = out.replace(/<(\/?)([\w-]+)([^>]*)>/g, (full, slash, tag) =>
    knownTags.test(tag) ? full : ''
  );
  return out;
}

function renderBlogPostHTML(mdx, images) {
  const { meta, body } = parseFrontmatter(mdx);
  const imageMap        = buildImageMap(mdx, images);
  const processedBody   = processBodyForRender(body, imageMap);

  // Date formatting
  let dateStr = '';
  if (meta.pubDate) {
    try {
      dateStr = new Date(meta.pubDate).toLocaleDateString('en-US',
        { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { dateStr = meta.pubDate; }
  }

  // Meta line (date · author)
  const metaParts = [dateStr, meta.author].filter(Boolean);
  const metaHtml  = metaParts.map((p, i) =>
    i === 0 ? `<span>${p}</span>` : `<span class="bp-meta-sep">·</span><span>${p}</span>`
  ).join('');

  // Tags
  const tags    = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
  const tagsHtml = tags.map(t => `<span class="bp-tag">${t}</span>`).join('');

  // Body — render markdown to HTML
  const bodyHtml = typeof marked !== 'undefined'
    ? marked.parse(processedBody)
    : `<pre>${processedBody}</pre>`;

  return `
    <div class="blog-post-view">
      ${metaHtml ? `<div class="bp-meta">${metaHtml}</div>` : ''}
      ${meta.title ? `<h1 class="bp-title">${meta.title}</h1>` : ''}
      ${meta.description ? `<p class="bp-desc">${meta.description}</p>` : ''}
      ${tagsHtml ? `<div class="bp-tags">${tagsHtml}</div>` : ''}
      <hr class="bp-divider" />
      <div class="bp-body">${bodyHtml}</div>
    </div>`;
}

function syntaxHighlight(mdx) {
  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let inFm = false, fmDone = false;
  return mdx.split('\n').map(line => {
    const esc = escape(line);
    if (line === '---') {
      if (!inFm && !fmDone) inFm = true;
      else if (inFm) { inFm = false; fmDone = true; }
      return `<span class="comment">${esc}</span>`;
    }
    if (inFm) {
      const m = line.match(/^(\w[\w-]*):\s*(.*)/);
      return m
        ? `<span class="fm-key">${escape(m[1])}</span><span style="color:var(--text-muted)">: </span><span class="fm-val">${escape(m[2])}</span>`
        : `<span style="color:var(--text-dim)">${esc}</span>`;
    }
    if (line.startsWith('import ')) return `<span class="import">${esc}</span>`;
    if (/^#{2,4}\s/.test(line)) return `<span class="heading">${esc}</span>`;
    return `<span>${esc}</span>`;
  }).join('\n');
}


// ── Existing posts tab ─────────────────────────────────────────────────────────
function refreshExistingTab() {
  const noBrand = document.getElementById('existing-no-brand');
  closeExistingDetail();
  if (!activeBrand) {
    noBrand.style.display = '';
    document.getElementById('existing-loading').style.display = 'none';
    document.getElementById('existing-empty').style.display   = 'none';
    document.getElementById('existing-table-wrap').style.display = 'none';
    return;
  }
  noBrand.style.display = 'none';
  loadExistingPosts(activeBrand.id);
}

function closeExistingDetail() {
  document.getElementById('existing-list-view').style.display  = '';
  document.getElementById('existing-detail-view').style.display = 'none';
}

async function loadExistingPosts(brandId) {
  const loading   = document.getElementById('existing-loading');
  const empty     = document.getElementById('existing-empty');
  const tableWrap = document.getElementById('existing-table-wrap');
  const tbody     = document.getElementById('existing-tbody');

  loading.style.display = '';
  empty.style.display = tableWrap.style.display = 'none';

  try {
    const data  = await api(`/api/existing/${brandId}`);
    const brand = brands.find(b => b.id === brandId);
    const langs = brand ? brand.languages : Object.keys(data);
    const allSlugs = [...new Set(langs.flatMap(l => data[l] || []))].sort();

    if (!allSlugs.length) { empty.style.display = ''; return; }

    tbody.innerHTML = '';
    allSlugs.forEach(slug => {
      const pills = langs.map(l => {
        const has = (data[l] || []).includes(slug);
        return `<span class="lang-pill ${has ? 'has' : ''}">${l.toUpperCase()}</span>`;
      }).join('');
      const liveUrl = brand ? `${brand.domain}/blog/${slug}` : '#';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="post-slug-cell">${slug}</td>
        <td>${pills}</td>
        <td style="text-align:right;white-space:nowrap;">
          <a class="btn-ghost btn-sm" href="${liveUrl}" target="_blank" style="text-decoration:none;margin-right:8px;">Live ↗</a>
          <button class="btn-ghost btn-sm btn-preview-existing">Preview</button>
        </td>`;
      tr.querySelector('.btn-preview-existing').addEventListener('click', () =>
        openExistingDetail(brandId, slug, langs.filter(l => (data[l] || []).includes(slug)), brand)
      );
      tbody.appendChild(tr);
    });

    tableWrap.style.display = '';
  } catch (err) {
    empty.textContent = 'Error: ' + err.message;
    empty.style.display = '';
  } finally {
    loading.style.display = 'none';
  }
}

async function openExistingDetail(brandId, slug, langs, brand) {
  document.getElementById('existing-list-view').style.display  = 'none';
  document.getElementById('existing-detail-view').style.display = '';
  document.getElementById('existing-slug-display').textContent  = slug;

  const liveUrl = brand ? `${brand.domain}/blog/${slug}` : '#';
  document.getElementById('existing-live-link').href = liveUrl;

  const langTabs  = document.getElementById('existing-lang-tabs');
  const mdxPanels = document.getElementById('existing-mdx-panels');
  langTabs.innerHTML = mdxPanels.innerHTML = '';

  // Reset view toggle
  document.querySelectorAll('#existing-view-toggle .view-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.view === 'rendered')
  );
  document.querySelectorAll('#existing-mdx-panels .bp-raw').forEach(el => el.style.display = 'none');
  document.querySelectorAll('#existing-mdx-panels .bp-rendered').forEach(el => el.style.display = '');

  // Bind view toggle
  document.querySelectorAll('#existing-view-toggle .view-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#existing-view-toggle .view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isRendered = btn.dataset.view === 'rendered';
      document.querySelectorAll('#existing-mdx-panels .bp-rendered').forEach(el => el.style.display = isRendered ? '' : 'none');
      document.querySelectorAll('#existing-mdx-panels .bp-raw').forEach(el => el.style.display = isRendered ? 'none' : '');
    };
  });

  // Bind back button
  document.getElementById('btn-back-existing').onclick = closeExistingDetail;

  // Load each language
  for (const [idx, lang] of langs.entries()) {
    const btn = document.createElement('button');
    btn.className = `lang-tab${idx === 0 ? ' active' : ''}`;
    btn.textContent = lang.toUpperCase();
    btn.addEventListener('click', () => {
      langTabs.querySelectorAll('.lang-tab').forEach(b => b.classList.remove('active'));
      mdxPanels.querySelectorAll('.mdx-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`existing-mdx-${lang}`).classList.add('active');
    });
    langTabs.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = `mdx-panel${idx === 0 ? ' active' : ''}`;
    panel.id = `existing-mdx-${lang}`;

    // Placeholder while loading
    panel.innerHTML = `<div class="muted" style="padding:20px">Loading ${lang.toUpperCase()}…</div>`;
    mdxPanels.appendChild(panel);

    // Fetch MDX async
    api(`/api/existing/${brandId}/${lang}/${slug}`).then(({ mdx, images }) => {
      const rendered = document.createElement('div');
      rendered.className = 'bp-rendered';
      rendered.innerHTML = renderBlogPostHTML(mdx, images);

      const raw = document.createElement('div');
      raw.className = 'bp-raw';
      raw.style.display = 'none';
      const code = document.createElement('div');
      code.className = 'mdx-code';
      code.innerHTML = syntaxHighlight(mdx);
      raw.appendChild(code);

      panel.innerHTML = '';
      panel.appendChild(rendered);
      panel.appendChild(raw);
    }).catch(() => {
      panel.innerHTML = `<div class="muted" style="padding:20px">Could not load ${lang.toUpperCase()} version.</div>`;
    });
  }
}

// ── Settings tab ───────────────────────────────────────────────────────────────
function bindSettings() {
  // Load global instructions
  fetch('/api/instructions').then(r => r.json())
    .then(d => { document.getElementById('global-instructions').value = d.content || ''; })
    .catch(() => {});

  // Save global instructions
  document.getElementById('save-instructions-btn').addEventListener('click', async () => {
    const status = document.getElementById('instructions-save-status');
    try {
      await api('/api/instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: document.getElementById('global-instructions').value }),
      });
      showStatus(status, '✓ Saved to writing-instructions.md');
    } catch (e) { showStatus(status, '✗ ' + e.message, true); }
  });

  // Brand context — enable/disable helpers
  const setBrandContextEnabled = (enabled) => {
    const textarea   = document.getElementById('brand-context');
    const fileInput  = document.getElementById('context-file-input');
    const imgInput   = document.getElementById('style-ref-input');
    const addFileBtn = document.getElementById('add-file-btn');
    const addImgBtn  = document.getElementById('add-img-btn');
    textarea.readOnly = !enabled;
    textarea.style.opacity = enabled ? '' : '0.45';
    fileInput.disabled = !enabled;
    imgInput.disabled  = !enabled;
    addFileBtn.style.opacity      = enabled ? '' : '0.45';
    addFileBtn.style.pointerEvents = enabled ? '' : 'none';
    addImgBtn.style.opacity       = enabled ? '' : '0.45';
    addImgBtn.style.pointerEvents  = enabled ? '' : 'none';
  };

  setBrandContextEnabled(false);

  document.getElementById('context-brand-select').addEventListener('change', async e => {
    activeBrandContext = e.target.value;

    if (!activeBrandContext) {
      setBrandContextEnabled(false);
      document.getElementById('brand-context').value = '';
      document.getElementById('context-file-list').innerHTML = '<span class="muted">Select a brand to manage context files</span>';
      document.getElementById('style-refs-grid').innerHTML   = '<span class="muted">Select a brand to manage style references</span>';
      return;
    }

    setBrandContextEnabled(true);

    try {
      const d = await api(`/api/brand-context/${activeBrandContext}`);
      document.getElementById('brand-context').value = d.content || '';
    } catch { document.getElementById('brand-context').value = ''; }

    await Promise.all([loadContextFiles(activeBrandContext), loadStyleRefs(activeBrandContext)]);
  });

  // Save brand context text
  document.getElementById('save-context-btn').addEventListener('click', async () => {
    const status = document.getElementById('context-save-status');
    if (!activeBrandContext) { showStatus(status, '✗ Select a brand first', true); return; }
    try {
      await api(`/api/brand-context/${activeBrandContext}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: document.getElementById('brand-context').value }),
      });
      showStatus(status, '✓ Saved');
    } catch (e) { showStatus(status, '✗ ' + e.message, true); }
  });

  // Context file upload
  document.getElementById('context-file-input').addEventListener('change', async e => {
    const files = [...e.target.files];
    for (const file of files) {
      const content = await readFileAsText(file);
      await api(`/api/brand-context/${activeBrandContext}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, content }),
      });
    }
    e.target.value = '';
    await loadContextFiles(activeBrandContext);
  });

  // Style ref image upload
  document.getElementById('style-ref-input').addEventListener('change', async e => {
    const files = [...e.target.files];
    for (const file of files) {
      const base64 = await readFileAsBase64(file);
      await api(`/api/brand-context/${activeBrandContext}/style-refs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, base64 }),
      });
    }
    e.target.value = '';
    await loadStyleRefs(activeBrandContext);
  });
}

async function loadContextFiles(brandId) {
  const list = document.getElementById('context-file-list');
  try {
    const files = await api(`/api/brand-context/${brandId}/files`);
    if (!files.length) { list.innerHTML = '<span class="muted">No files yet</span>'; return; }
    list.innerHTML = '';
    files.forEach(f => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `
        <span class="file-item-icon">📄</span>
        <span class="file-item-name">${f.name}</span>
        <span class="file-item-size">${f.sizeKb} KB</span>
        <button class="btn-delete" title="Delete">✕</button>`;
      item.querySelector('.btn-delete').addEventListener('click', async () => {
        await api(`/api/brand-context/${brandId}/files/${encodeURIComponent(f.name)}`, { method: 'DELETE' });
        await loadContextFiles(brandId);
      });
      list.appendChild(item);
    });
  } catch { list.innerHTML = '<span class="muted">Error loading files</span>'; }
}

async function loadStyleRefs(brandId) {
  const grid = document.getElementById('style-refs-grid');
  try {
    const refs = await api(`/api/brand-context/${brandId}/style-refs`);
    if (!refs.length) { grid.innerHTML = '<span class="muted">No reference images yet</span>'; return; }
    grid.innerHTML = '';
    refs.forEach(ref => {
      const card = document.createElement('div');
      card.className = 'style-ref-card';
      card.innerHTML = `
        <img src="data:image/png;base64,${ref.base64}" alt="${ref.name}" loading="lazy" />
        <div class="style-ref-card-label">${ref.name}</div>
        <button class="style-ref-delete" title="Delete">✕</button>`;
      card.querySelector('.style-ref-delete').addEventListener('click', async () => {
        await api(`/api/brand-context/${brandId}/style-refs/${encodeURIComponent(ref.name)}`, { method: 'DELETE' });
        await loadStyleRefs(brandId);
      });
      grid.appendChild(card);
    });
  } catch { grid.innerHTML = '<span class="muted">Error loading images</span>'; }
}

function showStatus(el, msg, isError = false) {
  el.textContent = msg;
  el.className = 'save-status ' + (isError ? 'err' : 'ok');
  setTimeout(() => { el.textContent = ''; el.className = 'save-status'; }, 3000);
}
