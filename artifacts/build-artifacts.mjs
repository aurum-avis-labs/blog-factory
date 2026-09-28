import fs from 'fs';

const AUTH = Object.fromEntries(
  fs
    .readFileSync('/home/ubuntu/.cursor/projects/workspace/uploads/platforms-cloud_2d98.tsv', 'utf8')
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [platform, auth_lane, submit_hint] = line.split('\t');
      return [platform, { auth_lane, submit_hint }];
    })
);

const passwords = Object.fromEntries(
  fs
    .readFileSync('/workspace/artifacts/passwords.tsv', 'utf8')
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [platform, url, password] = line.split('\t');
      return [platform, { url, password }];
    })
);

const BADGES = {
  'Twelve Tools':
    '<a href="https://twelve.tools" target="_blank"><img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="148" height="40"></a>',
  Sumodir:
    '<a href="https://sumodir.com" target="_blank" rel="dofollow"><img src="https://sumodir.com/badge.png" alt="Featured on SumoDir" width="200" height="54" /></a>',
  SaaSBison:
    '<a href="https://saasbison.com" target="_blank" rel="dofollow"><img src="https://saasbison.com/badge.png" alt="Featured on SaaSBison" width="200" height="54" /></a>',
  DodoDirectory:
    '<a href="https://dododirectory.com" target="_blank" rel="dofollow"><img src="https://dododirectory.com/badge-light.png" alt="Featured On DodoDirectory" width="200" height="54" /></a>',
};

const PRODUCTS = ['Do4Me', 'Postology'];
const PLATFORMS = Object.keys(passwords);

/** @type {Record<string, Record<string, object>>} */
const final = {};

function set(product, platform, row) {
  final[platform] ??= {};
  final[platform][product] = row;
}

for (const platform of ['Twelve Tools', 'Sumodir', 'SaaSBison', 'DodoDirectory']) {
  for (const product of PRODUCTS) {
    set(product, platform, {
      status: 'blocked_badge',
      account_created: 'no',
      notes:
        'Free listing requires embedding directory badge on product homepage/footer before verification (paid tier skips badge; skipped per free-only rule).',
      badge_html: BADGES[platform],
    });
  }
}

for (const product of PRODUCTS) {
  set(product, 'AI NavHub', {
    status: 'submitted',
    account_created: 'no',
    notes: 'Free submit form at ainavhub.com/submit returned success for website/name/url/email.',
    badge_html: null,
  });
  set(product, 'Toolpilot', {
    status: 'blocked_paid',
    account_created: 'no',
    notes: 'Submit-your-AI-tool flow is Shopify paid listing (no free-only path observed).',
    badge_html: null,
  });
  set(product, 'Launching Next', {
    status: 'blocked_captcha',
    account_created: 'no',
    notes: 'Cloudflare bot challenge blocked automated access to launchingnext.com/submit.',
    badge_html: null,
  });
  set(product, 'Turbo0', {
    status: 'blocked_email_verify',
    account_created: 'attempted',
    notes:
      'Email/password registration attempted at turbo0.com/auth/register; submit requires login (callbackUrl=/submit). Email inbox verification not available (no Outlook).',
    badge_html: null,
  });
  set(product, 'Launch Llama', {
    status: 'error',
    account_created: 'no',
    notes: 'Site unreachable: TLS common-name error / connection failure from cloud agent.',
    badge_html: null,
  });
  set(product, 'Web Review', {
    status: 'error',
    account_created: 'no',
    notes: 'webreview.ai connection closed from cloud agent (all URL variants failed).',
    badge_html: null,
  });
  set(product, 'HUNT0', {
    status: 'pending_review',
    account_created: 'no',
    notes:
      'Launch form filled through product info; publish button requires Sign in. Email account exists but login failed (401 invalid password) — needs password reset via email to complete free launch.',
    badge_html: null,
  });
  set(product, 'What Launched Today', {
    status: 'blocked_google_sso',
    account_created: 'no',
    notes: 'Signup redirects to Google OAuth (Sign in with Google); no email/password path usable under batch rules.',
    badge_html: null,
  });
  set(product, 'Smol Launch', {
    status: 'blocked_google_sso',
    account_created: 'no',
    notes: 'Signup redirects to Google OAuth; no free email signup path under batch rules.',
    badge_html: null,
  });
}

const ts = new Date().toISOString();
const deltaRows = [
  'product,platform,auth_lane,submit_url,status,account_created,password_ref,notes,attempted_at',
];
for (const platform of PLATFORMS) {
  for (const product of PRODUCTS) {
    const row = final[platform][product];
    const meta = AUTH[platform] ?? { auth_lane: '', submit_hint: passwords[platform].url };
    deltaRows.push(
      [
        product,
        platform,
        meta.auth_lane,
        meta.submit_hint,
        row.status,
        row.account_created,
        platform,
        `"${row.notes.replace(/"/g, '""')}"`,
        ts,
      ].join(',')
    );
  }
}
fs.writeFileSync('/workspace/artifacts/register-delta.csv', deltaRows.join('\n') + '\n');

const loginRows = ['name,url,username,password,notes'];
for (const platform of PLATFORMS) {
  const { url, password } = passwords[platform];
  const statuses = PRODUCTS.map((p) => `${p}:${final[platform][p].status}`).join('; ');
  loginRows.push(
    [
      platform,
      url,
      'info@aurum-avis-labs.ch',
      password,
      `"Products: ${PRODUCTS.join(' & ')}. Outcomes: ${statuses}"`,
    ].join(',')
  );
}
fs.writeFileSync('/workspace/artifacts/logins.csv', loginRows.join('\n') + '\n');

let badgeMd = `# Badge embed requests (free tier gates)\n\n`;
badgeMd += `Embed on the matching **product site** (Do4Me → do4me.work, Postology → postology.ai) before re-running verification.\n\n`;
for (const platform of Object.keys(BADGES)) {
  badgeMd += `## ${platform}\n\n`;
  badgeMd += `Products blocked: Do4Me, Postology\n\n`;
  badgeMd += `\`\`\`html\n${BADGES[platform]}\n\`\`\`\n\n`;
}

fs.writeFileSync('/workspace/artifacts/badge-asks.md', badgeMd);

const counts = {};
for (const platform of PLATFORMS) {
  for (const product of PRODUCTS) {
    const s = final[platform][product].status;
    counts[s] = (counts[s] ?? 0) + 1;
  }
}

let report = `# SaaS directory batch run report\n\n`;
report += `- **Batch email:** info@aurum-avis-labs.ch\n`;
report += `- **Products:** Do4Me (https://do4me.work/), Postology (https://postology.ai/)\n`;
report += `- **Platforms attempted:** ${PLATFORMS.length} (Fazier skipped per brief)\n`;
report += `- **Cells (product × platform):** ${PLATFORMS.length * PRODUCTS.length}\n`;
report += `- **Completed at:** ${ts}\n\n`;
report += `## Outcome summary\n\n`;
report += `| Status | Count |\n|--------|------:|\n`;
for (const [k, v] of Object.entries(counts).sort()) {
  report += `| ${k} | ${v} |\n`;
}
report += `\n## Submitted (free)\n\n`;
report += `- **AI NavHub:** Do4Me and Postology — free submit form accepted (success response).\n\n`;
report += `## Blocked — badge (free tier)\n\n`;
report += `- Twelve Tools, Sumodir, SaaSBison, DodoDirectory — see \`badge-asks.md\` for exact HTML.\n\n`;
report += `## Blocked — policy / environment\n\n`;
report += `- **Toolpilot:** paid Shopify listing only.\n`;
report += `- **Launching Next:** Cloudflare captcha in automation.\n`;
report += `- **Turbo0:** registration/submit needs email verification.\n`;
report += `- **Smol Launch, What Launched Today:** Google SSO only.\n\n`;
report += `## Incomplete / infra\n\n`;
report += `- **HUNT0:** form prepared; sign-in required (existing account, password reset needed).\n`;
report += `- **Launch Llama:** TLS certificate error.\n`;
report += `- **Web Review:** site connection failed.\n\n`;
report += `## Artifacts\n\n`;
report += `- \`logins.csv\` — platform credentials (gitignored)\n`;
report += `- \`register-delta.csv\` — per product×platform status\n`;
report += `- \`badge-asks.md\` — badge HTML for blocked_badge platforms\n`;
report += `- \`passwords.tsv\` — local password map (gitignored)\n`;

fs.writeFileSync('/workspace/artifacts/run-report.md', report);
console.log('artifacts written', counts);
