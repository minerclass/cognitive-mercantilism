'use strict';
window.initBeliefs = () => {
  const {$, el, rich, focus, excerpt} = window.Guide;
  const render = (index, moveFocus = false) => {
    const belief = window.BELIEFS[index];
    document.querySelectorAll('[data-belief]').forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.belief) === index)));
    const title = el('h2', {class: 'belief-title', tabindex: '-1'}, belief.label);
    $('#belief-panel').replaceChildren(title,
      el('div', {class: 'belief-columns'},
        el('article', {class: 'perspective scarcity'}, el('h3', {class: 'scarcity-text'}, '▣ Scarcity view'), excerpt(belief.then, 'Then: about wealth'), excerpt(belief.now, 'Now: about intelligence')),
        el('article', {class: 'perspective access'}, el('h3', {class: 'access-text'}, '⌑ Access view'), excerpt(belief.access, 'The other answer'))),
      el('aside', {class: 'discussion-prompt'}, el('p', {class: 'eyebrow'}, 'FOR THE ROOM'), el('p', {}, rich(belief.question))),
      el('details', {class: 'strain'}, el('summary', {}, 'Where the comparison breaks down'), el('p', {}, rich(belief.strain))));
    if (moveFocus) focus(title);
  };
  window.BELIEFS.forEach((belief, index) => {
    const button = el('button', {type: 'button', 'data-belief': index, 'aria-pressed': String(index === 0)}, el('span', {}, 'BELIEF 0' + (index + 1)), belief.label);
    button.addEventListener('click', () => render(index, true));
    $('#belief-buttons').append(button);
  });
  render(0);
  const prediction = window.PREDICTS;
  $('#prediction-panel').replaceChildren(
    el('div', {}, el('span', {class: 'badge'}, 'Contested history'), el('h2', {}, prediction.label), el('p', {class: 'small-note'}, "An argument about possible demand, not a forecast of student learning.")),
    el('div', {}, excerpt(prediction.claim), excerpt(prediction.quote), excerpt(prediction.history), el('aside', {class: 'learning-note'}, el('strong', {}, 'Why historians push back'), el('p', {}, prediction.strain))));
  $('#transition-panel').replaceChildren(el('p', {class: 'eyebrow'}, 'WHO CARRIES THE TRANSITION?'), excerpt(window.TRANSITION), el('div', {class: 'discussion-prompt'}, el('p', {class: 'eyebrow'}, 'FOR THE ROOM'), el('p', {}, rich(window.TRANSITION.question))));
};
