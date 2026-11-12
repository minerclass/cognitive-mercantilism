'use strict';
window.initPrimer = () => {
  const {$, el, rich} = window.Guide;
  const render = (era, announce = false) => {
    const data = window.WORLDVIEWS[era];
    const table = el('div', {class: 'comparison-table', role: 'table', 'aria-label': data.label + ': scarcity and access comparison'});
    table.append(el('div', {class: 'comparison-row header', role: 'row'},
      el('div', {role: 'columnheader'}, 'The question'),
      el('div', {role: 'columnheader', 'data-label': 'Scarcity', class: 'scarcity-text'}, el('span', {'aria-hidden': 'true', class: 'table-icon'}, '▣'), 'Scarcity view', el('small', {}, 'Keep it scarce, hold it close')),
      el('div', {role: 'columnheader', 'data-label': 'Access', class: 'access-text'}, el('span', {'aria-hidden': 'true', class: 'table-icon'}, '⌑'), 'Access view', el('small', {}, 'Open it up, protect people'))));
    for (const row of data.rows) table.append(el('div', {class: 'comparison-row', role: 'row'}, el('div', {role: 'rowheader'}, row.q), el('div', {role: 'cell', 'data-label': 'Scarcity'}, rich(row.scarcity)), el('div', {role: 'cell', 'data-label': 'Access'}, rich(row.access))));
    $('#primer').replaceChildren(table);
    document.querySelectorAll('[data-era]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.era === era)));
    if (announce) $('#primer-status').textContent = 'Showing ' + data.label + '. Four questions compare the two perspectives.';
  };
  document.querySelectorAll('[data-era]').forEach((button) => button.addEventListener('click', () => render(button.dataset.era, true)));
  render('then');
};
