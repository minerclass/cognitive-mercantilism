'use strict';
(() => {
  const {$, el, rich, focus} = window.Guide;
  const views = ['start', 'then-and-now', 'sorter', 'sources', 'glossary'];
  document.querySelectorAll('[data-rich]').forEach((node) => node.replaceChildren(rich(node.textContent)));
  window.initPrimer();
  window.initBeliefs();
  window.initSorter();
  for (const caveat of window.CAVEATS) $('#caveat-list').append(el('article', {class: 'caveat-item'}, el('h3', {}, caveat.title), el('p', {}, caveat.text)));
  const italicText = (text) => {
    const fragment = document.createDocumentFragment();
    text.split('*').forEach((part, index) => fragment.append(index % 2 ? el('i', {}, part) : document.createTextNode(part)));
    return fragment;
  };
  for (const source of window.SOURCES) {
    // URLs are rendered as deliberate outbound links, never fetched by this app.
    const reference = source.ref.replace(/https:\/\/\S+/g, '').trim();
    $('#source-list').append(el('article', {class: 'source-item', id: 'source-' + source.id},
      el('div', {}, el('span', {class: 'badge'}, window.STATUS_LABELS[source.status])),
      el('div', {}, el('p', {class: 'ref'}, italicText(reference)), el('p', {class: 'small-note'}, source.note), source.url ? el('a', {href: source.url, target: '_blank', rel: 'noopener noreferrer'}, 'Open source ↗', el('span', {class: 'sr-only'}, ' (opens in a new tab)')) : null)));
  }
  const terms = Object.values(window.GLOSSARY).sort((a, b) => a.term.localeCompare(b.term));
  const glossaryRows = terms.map((term) => {
    const row = el('div', {}, el('dt', {}, term.term), el('dd', {}, term.def));
    $('#glossary-list').append(row);
    return {row, text: (term.term + ' ' + term.def).toLowerCase()};
  });
  const filterGlossary = () => {
    const query = $('#glossary-search').value.trim().toLowerCase();
    let shown = 0;
    for (const item of glossaryRows) {
      item.row.hidden = !item.text.includes(query);
      if (!item.row.hidden) shown++;
    }
    $('#glossary-count').textContent = shown + ' of ' + terms.length + ' terms';
    $('#glossary-empty').hidden = shown !== 0;
  };
  $('#glossary-search').addEventListener('input', filterGlossary);
  filterGlossary();
  const route = (moveFocus = true) => {
    const hash = location.hash.slice(1);
    if (hash === 'main') return;
    const id = views.includes(hash) ? hash : 'start';
    for (const name of views) $('#' + name).hidden = name !== id;
    document.querySelectorAll('.primary-nav a').forEach((link) => {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = (id === 'start' ? 'Scarcity or Access?' : $('.primary-nav a[href="#' + id + '"]').textContent.trim().replace(/^\d+\s*/, '') + ' · Scarcity or Access?') + ' · AI in Schools';
    if (moveFocus) { window.scrollTo(0, 0); focus($('#' + id + ' h1')); }
  };
  window.addEventListener('hashchange', () => route(true));
  route(false);
  const preference = (key, value) => { try { localStorage.setItem('scarcity-access-' + key, value); } catch (_) { /* Display preferences are optional. */ } };
  const readPreference = (key) => { try { return localStorage.getItem('scarcity-access-' + key); } catch (_) { return null; } };
  let theme = readPreference('theme');
  if (!['light', 'dark'].includes(theme)) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const applyTheme = () => { document.documentElement.dataset.theme = theme; $('#theme-toggle').setAttribute('aria-pressed', String(theme === 'dark')); };
  applyTheme();
  $('#theme-toggle').addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; applyTheme(); preference('theme', theme); });
  let largeText = readPreference('large') === 'true';
  const applyText = () => { document.documentElement.classList.toggle('large-text', largeText); $('#text-toggle').setAttribute('aria-pressed', String(largeText)); };
  applyText();
  $('#text-toggle').addEventListener('click', () => { largeText = !largeText; applyText(); preference('large', String(largeText)); });
})();
