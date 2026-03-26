/* ── Blog Factory Tool — Frontend ──────────────────────────────────────────── */
'use strict';

// ── State ──────────────────────────────────────────────────────────────────────
let brands = [];
let config = { azureOpenAI: false, azureDalle: false };
let selectedImageCount = 0;
let generatedData = null;
let activeBrand = null;          // global brand object — drives all tabs
let activeBrandContext = '';     // brand selected in settings brand-context section

// ── Init ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([fetchConfig(), fetchBrands()]);
  bindTabs();
  bindImageCountToggle();
  bindGlobalBrandSelect();
  bindGenerateBtn();
  bindPreviewActions();
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

  // Auto-load existing posts when switching to that tab
  if (name === 'existing') refreshExistingTab();
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
        generatedData = data;
        addLog('→ Switching to Preview tab…', 'log-gold');
        setTimeout(() => { renderPreview(generatedData); switchTab('preview'); }, 600);
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

// ── Preview ────────────────────────────────────────────────────────────────────
function renderPreview(data) {
  document.getElementById('preview-empty').style.display = 'none';
  document.getElementById('preview-content').style.display = '';
  document.getElementById('preview-slug-display').textContent = data.slug;

  const langTabs  = document.getElementById('lang-tabs');
  const mdxPanels = document.getElementById('mdx-panels');
  langTabs.innerHTML = mdxPanels.innerHTML = '';

  Object.keys(data.posts).forEach((lang, idx) => {
    const btn = document.createElement('button');
    btn.className = `lang-tab${idx === 0 ? ' active' : ''}`;
    btn.textContent = lang.toUpperCase();
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.mdx-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`mdx-${lang}`).classList.add('active');
    });
    langTabs.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = `mdx-panel${idx === 0 ? ' active' : ''}`;
    panel.id = `mdx-${lang}`;
    const code = document.createElement('div');
    code.className = 'mdx-code';
    code.innerHTML = syntaxHighlight(data.posts[lang]);
    panel.appendChild(code);
    mdxPanels.appendChild(panel);
  });

  const imagesSection = document.getElementById('images-section');
  const imagesGrid    = document.getElementById('images-grid');
  imagesGrid.innerHTML = '';
  if (data.images?.length) {
    imagesSection.style.display = '';
    data.images.forEach(img => {
      const card = document.createElement('div');
      card.className = 'img-card';
      card.innerHTML = `<img src="${img.previewUrl}" alt="${img.filename}" loading="lazy" /><div class="img-card-label">${img.filename}</div>`;
      imagesGrid.appendChild(card);
    });
  } else {
    imagesSection.style.display = 'none';
  }

  document.getElementById('push-log-container').style.display = 'none';
  document.getElementById('push-log-box').innerHTML = '';
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

// ── Preview actions ────────────────────────────────────────────────────────────
function bindPreviewActions() {
  document.getElementById('btn-back').addEventListener('click', () => switchTab('generate'));
  document.getElementById('btn-push').addEventListener('click', handlePush);
}

async function handlePush() {
  if (!generatedData) return;
  if (!activeBrand) return alert('Brand not set — go back and re-generate.');

  const btn = document.getElementById('btn-push');
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-icon">⏳</span> Pushing…';

  const logContainer = document.getElementById('push-log-container');
  const logBox = document.getElementById('push-log-box');
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
    const res = await fetch('/api/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandId: activeBrand.id,
        slug: generatedData.slug,
        posts: generatedData.posts,
        images: generatedData.images || [],
      }),
    });
    await streamSSE(res, {
      log: msg => addLog(msg, (msg.startsWith('🚀') || msg.startsWith('✓')) ? 'log-ok' : ''),
      error: msg => addLog('ERROR: ' + msg, 'log-err'),
      done: () => {
        addLog('✅ Done! Auto-publish workflow is now running.', 'log-ok');
        btn.innerHTML = '<span class="btn-icon">✅</span> Pushed!';
      },
    });
  } catch (err) {
    addLog('Network error: ' + err.message, 'log-err');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">🚀</span> Approve &amp; Push to GitHub';
  }
}

// ── Existing posts tab ─────────────────────────────────────────────────────────
function refreshExistingTab() {
  const noBrand   = document.getElementById('existing-no-brand');
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
    const allSlugs = new Set(langs.flatMap(l => data[l] || []));

    if (!allSlugs.size) { empty.style.display = ''; return; }

    tbody.innerHTML = [...allSlugs].sort().map(slug => {
      const pills = langs.map(l => {
        const has = (data[l] || []).includes(slug);
        return `<span class="lang-pill ${has ? 'has' : ''}">${l.toUpperCase()}</span>`;
      }).join('');
      const ghUrl = `https://github.com/aurum-avis-labs/blog-factory/tree/main/brands/${brandId}`;
      return `<tr><td>${slug}</td><td>${pills}</td><td><a class="gh-link" href="${ghUrl}" target="_blank">View ↗</a></td></tr>`;
    }).join('');

    tableWrap.style.display = '';
  } catch (err) {
    empty.textContent = 'Error: ' + err.message;
    empty.style.display = '';
  } finally {
    loading.style.display = 'none';
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
