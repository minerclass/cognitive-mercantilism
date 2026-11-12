'use strict';
window.Guide = (() => {
  let termId = 0;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'class') node.className = value;
      else node.setAttribute(key, String(value));
    }
    for (const child of children.flat(Infinity)) {
      if (child !== undefined && child !== null) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  };
  const rich = (text) => {
    const fragment = document.createDocumentFragment();
    const pattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    let cursor = 0;
    for (const match of String(text).matchAll(pattern)) {
      fragment.append(document.createTextNode(text.slice(cursor, match.index)));
      const label = match[1];
      const key = match[2] || label;
      const definition = window.GLOSSARY[key];
      if (!definition) fragment.append(document.createTextNode(label));
      else {
        const id = 'term-definition-' + (++termId);
        const button = el('button', {type: 'button', class: 'term-button', 'aria-expanded': 'false', 'aria-controls': id}, label);
        const detail = el('span', {class: 'term-definition', id, hidden: ''}, el('strong', {}, definition.term), definition.def);
        button.addEventListener('click', () => {
          const open = button.getAttribute('aria-expanded') !== 'true';
          button.setAttribute('aria-expanded', String(open));
          detail.hidden = !open;
        });
        const wrapper = el('span', {class: 'term-wrap'}, button, detail);
        wrapper.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !detail.hidden) {
            event.preventDefault();
            detail.hidden = true;
            button.setAttribute('aria-expanded', 'false');
            button.focus();
          }
        });
        fragment.append(wrapper);
      }
      cursor = match.index + match[0].length;
    }
    fragment.append(document.createTextNode(String(text).slice(cursor)));
    return fragment;
  };
  const focus = (node) => { node.focus({preventScroll: true}); node.scrollIntoView({block: 'nearest'}); };
  const excerpt = (data, heading) => {
    const type = data.quote !== undefined ? 'quote' : data.paraphrase !== undefined ? 'paraphrase' : 'framing';
    const label = {quote: 'Quotation', paraphrase: 'Paraphrase, not a quotation', framing: "This demo's framing, not a source."}[type];
    const source = window.SOURCES.find((item) => item.id === data.sourceId);
    const citation = el('cite', {}, rich(data.source));
    if (source && source.url) citation.append(' ', el('a', {href: source.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Open source in a new tab'}, '↗'));
    return el('div', {class: 'excerpt'}, heading ? el('h4', {}, heading) : null, el('span', {class: 'excerpt-kind'}, label), el(type === 'quote' ? 'blockquote' : 'p', {}, rich(type === 'quote' ? '“' + data[type] + '”' : data[type])), citation);
  };
  return {$, el, rich, focus, excerpt};
})();
