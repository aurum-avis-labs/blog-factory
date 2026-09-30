// Badge audit for ONE site. Paste into the javascript tool of Claude in Chrome (or the browser console)
// while the tab is on the page you want to audit (homepage; for a product that can only carry badges on a
// subpage, e.g. /help, open that page). Edit the two CONFIG lines first.
//
// It compares what the directories see (raw server HTML) with what visitors see (DOM after the client loaded).
// Output uses ':' instead of '=' / '?' / '&' because the tool can block URL-like output.

const DIRECTORY_HOSTS = [            // every directory whose badge we may have placed
  'dailypings.com', 'findly.tools', 'neeed.directory', 'fazier.com', 'wired.business', 'thesaasdir.com',
  'startupfa.me', 'nicklaunches.com', 'twelve.tools', 'instantlaunch.xyz', 'saasbison.com', 'sumodir.com',
  'dododirectory.com', 'turbo0.com', 'smollaunch.com', 'toolpilot.ai', 'betterlaunch', 'scrolllaunch',
  'saascity.io', 'aat.ee', 'web-review.com', 'firsto.co', 'launchleague', 'boostdomainrating.com',
];
const EXPECTED = ['dailypings.com', 'findly.tools'];   // CONFIG: hosts that MUST be present (have a listing)

const html = await (await fetch(location.href, { cache: 'no-store' })).text();
const domLinks = [...document.querySelectorAll('a[href^="http"]')].map(a => a.href);
const count = (host, text) => text.split(host).length - 1;

const rows = DIRECTORY_HOSTS.map(h => {
  const raw = count(h, html);
  const dom = domLinks.filter(u => u.includes(h)).length;
  return { host: h, raw, dom };
}).filter(r => r.raw || r.dom);

const problems = [];
for (const h of EXPECTED) {
  const r = rows.find(x => x.host === h);
  if (!r || r.raw === 0) problems.push(h + ' missing in raw HTML (directory verification will fail)');
  else if (r.dom === 0) problems.push(h + ' in raw HTML but gone after client load (visitors do not see it)');
  else if (r.dom > 1) problems.push(h + ' appears ' + r.dom + 'x in the DOM (duplicate)');
}
(location.pathname + ' | ' + rows.map(r => r.host + ' raw:' + r.raw + ' dom:' + r.dom).join(' ; ') +
  ' || PROBLEMS: ' + (problems.join(' ; ') || 'none')).replace(/[?&=]/g, '~');
