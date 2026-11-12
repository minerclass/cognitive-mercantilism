'use strict';
window.initSorter = () => {
  const {$, el, rich, focus} = window.Guide;
  const states = new Map();
  let current = 0;
  const labels = {gate: 'Gate', mix: 'Some of each', guardrail: 'Guardrail', unknown: 'Need more information'};
  const questions = [ ['Who or what does it protect?', 'protects'], ['From what specific harm?', 'harm'], ['Would a smaller limit do the same job?', 'narrower'] ];
  const getState = (id) => {
    if (!states.has(id)) states.set(id, {revealed: 0, call: null});
    return states.get(id);
  };
  const render = (index, moveFocus = false) => {
    current = index;
    const scenario = window.SCENARIOS[index];
    const state = getState(scenario.id);
    $('#scenario-select').value = String(index);
    document.querySelectorAll('[data-scenario]').forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.scenario) === index)));
    $('#scenario-progress').textContent = 'Scenario ' + (index + 1) + ' of ' + window.SCENARIOS.length + ' · ' + [...states.values()].filter((value) => value.call).length + ' discussed';
    const title = el('h2', {id: 'scenario-title', tabindex: '-1'}, scenario.title);
    const card = el('article', {class: 'scenario-card', 'aria-labelledby': 'scenario-title'}, el('p', {class: 'eyebrow'}, 'SCENARIO ' + String(index + 1).padStart(2, '0') + ' / 09 · FICTIONAL'), title, el('p', {class: 'scenario-prompt'}, rich(scenario.prompt)));
    const voteButtons = [];
    const revealButtons = [];
    questions.forEach(([question, key], i) => {
      const answerId = 'answer-' + scenario.id + '-' + i;
      const answer = el('div', {id: answerId, class: 'reveal-answer', tabindex: '-1'}, el('p', {}, rich(scenario[key])));
      answer.hidden = i >= state.revealed;
      const action = el('span', {class: 'step-action'}, i < state.revealed ? 'Revealed' : 'Reveal +');
      const button = el('button', {type: 'button', 'aria-expanded': String(!answer.hidden), 'aria-controls': answerId}, el('span', {class: 'step-number'}, String(i + 1).padStart(2, '0')), question, action);
      button.disabled = i > state.revealed;
      button.addEventListener('click', () => {
        state.revealed = Math.max(state.revealed, i + 1);
        answer.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        action.textContent = 'Revealed';
        if (revealButtons[i + 1]) revealButtons[i + 1].disabled = false;
        voteButtons.forEach((vote) => { vote.disabled = state.revealed < 3; });
        focus(answer);
      });
      revealButtons.push(button);
      card.append(el('div', {class: 'reveal-step'}, button, answer));
    });
    const result = el('div', {class: 'comparison-result', id: 'comparison-result', tabindex: '-1', role: 'region', 'aria-label': 'Discussion comparison'});
    const showResult = (move = false) => {
      result.hidden = !state.call;
      if (!state.call) return;
      voteButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.call === state.call)));
      result.replaceChildren(
        el('h3', {}, 'Two judgments. Keep the reasons visible.'),
        el('div', {class: 'call-grid'}, el('div', {class: state.call}, el('span', {}, "THE ROOM'S CALL"), el('strong', {}, labels[state.call])), el('div', {class: scenario.lean}, el('span', {}, "THE DEMO'S STARTING LEAN"), el('strong', {}, labels[scenario.lean]))),
        el('p', {class: 'small-note'}, 'The starting lean is an invitation to argue, not an answer key. A protective purpose can coexist with an inequitable effect.'),
        el('div', {class: 'case-pair'}, el('div', {class: 'gate-case'}, el('h4', {class: 'scarcity-text'}, 'Consider the gate reading'), el('p', {}, rich(scenario.gateCase))), el('div', {class: 'guardrail-case'}, el('h4', {class: 'access-text'}, 'Consider the guardrail reading'), el('p', {}, rich(scenario.guardrailCase)))),
        el('div', {class: 'scenario-notes'}, el('p', {}, el('strong', {}, 'What would change your judgment? '), scenario.evidence), el('p', {}, el('strong', {}, 'Keep learning in view. '), scenario.learning)));
      if (move) focus(result);
      $('#scenario-progress').textContent = 'Scenario ' + (index + 1) + ' of 9 · ' + [...states.values()].filter((value) => value.call).length + ' discussed';
    };
    const choices = el('div', {class: 'vote-buttons', role: 'group', 'aria-label': "Record the room's call"});
    for (const call of ['gate', 'mix', 'guardrail']) {
      const button = el('button', {type: 'button', 'data-call': call, 'aria-pressed': String(state.call === call)}, labels[call]);
      button.disabled = state.revealed < 3;
      button.addEventListener('click', () => { state.call = call; showResult(true); });
      voteButtons.push(button);
      choices.append(button);
    }
    const uncertain = el('button', {type: 'button', class: 'uncertain-button', 'data-call': 'unknown', 'aria-pressed': String(state.call === 'unknown')}, 'Need more information');
    uncertain.disabled = state.revealed < 3;
    uncertain.addEventListener('click', () => { state.call = 'unknown'; showResult(true); });
    voteButtons.push(uncertain);
    card.append(el('div', {class: 'vote-section'}, el('h3', {}, "What's the room's call?"), el('p', {class: 'small-note'}, 'Reveal the three answers first, discuss, then record one shared judgment.'), choices, el('p', {class: 'small-note', style: 'margin-top:1rem;margin-bottom:0'}, uncertain)), result);
    const previous = el('button', {type: 'button'}, '← Previous');
    previous.disabled = index === 0;
    previous.addEventListener('click', () => render(current - 1, true));
    const next = el('button', {type: 'button'}, 'Next scenario →');
    next.disabled = index === window.SCENARIOS.length - 1;
    next.addEventListener('click', () => render(current + 1, true));
    const reset = el('button', {type: 'button', class: 'reset-button'}, 'Start this one over');
    reset.addEventListener('click', () => { states.delete(scenario.id); render(current, true); });
    $('#scenario-panel').replaceChildren(card, el('div', {class: 'scenario-controls'}, previous, reset, next));
    showResult();
    if (moveFocus) focus(title);
  };
  window.SCENARIOS.forEach((scenario, index) => {
    $('#scenario-select').append(el('option', {value: index}, (index + 1) + '. ' + scenario.title));
    const button = el('button', {type: 'button', 'data-scenario': index, 'aria-pressed': String(index === 0)}, scenario.title);
    button.addEventListener('click', () => render(index, true));
    $('#scenario-list').append(el('li', {}, button));
  });
  $('#scenario-select').addEventListener('change', (event) => render(Number(event.target.value), true));
  render(0);
};
