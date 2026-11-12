// Content adapted from CONCEPT.md; see IMPLEMENTATION.md for changes.
window.BELIEFS = [
  {
    "id": "belief-1",
    "label": "There is only so much",
    "then": {
      "quote": "Wealth was fundamentally scarce and finite.",
      "source": "Rao (2026), summarizing Appleby (2010)",
      "sourceId": "rao"
    },
    "now": {
      "quote": "Intelligence is imagined as a fixed resource embodied in human brains and the knowledge products mined from them.",
      "source": "Rao (2026)",
      "sourceId": "rao"
    },
    "access": {
      "paraphrase": "Wealth turned out to grow through production and trade. Rao argues intelligence can grow the same way when more people use it.",
      "source": "Paraphrase of Rao (2026)",
      "sourceId": "rao"
    },
    "question": "Do our AI decisions assume there is only so much expertise to go around?",
    "strain": "AI is not finite like gold, but access to it is still rationed by licenses, computing power and contracts held by a few companies. Scarcity can be produced, not only imagined."
  },
  {
    "id": "belief-2",
    "label": "Only the approved can be trusted with it",
    "then": {
      "paraphrase": "The poor had to be governed by force; prosperity was safe only under elite control.",
      "source": "Paraphrase of Rao (2026), summarizing Appleby (2010)",
      "sourceId": "rao"
    },
    "now": {
      "quote": "The assumption is that intelligence is safe only in the hands of those already certified to possess it.",
      "source": "Rao (2026)",
      "sourceId": "rao"
    },
    "access": {
      "framing": "Trust people with the tool and protect against named harms, such as a privacy breach, instead of screening out whole groups.",
      "source": "This demo's framing",
      "sourceId": "demo"
    },
    "question": "Which of our AI limits follow a credential, and which follow a specific risk?",
    "strain": "Some limits really do protect people. Student privacy law, [[least privilege|least-privilege]] for [[AI agents|ai-agent]] and age rules are [[guardrails|guardrail]], not hoarding."
  },
  {
    "id": "belief-3",
    "label": "What people want doesn't count",
    "then": {
      "paraphrase": "Economic thinking centered on supply. Ordinary people's wants were not seen as a source of growth.",
      "source": "Paraphrase of Rao (2026), summarizing Appleby (2010)",
      "sourceId": "rao"
    },
    "now": {
      "quote": "we demand as much right now as we could ever demand",
      "source": "Whittemore (2026a, 00:08:00), describing the assumption behind the [[lump of labor fallacy|lump-of-labor]], which he calls \"completely ahistorical\"",
      "sourceId": "whittemore-nov"
    },
    "access": {
      "quote": "Access elasticity, I wanted it, but I couldn't get it",
      "source": "Whittemore (2026a, 00:08:00), on one kind of [[demand elasticity|demand-elasticity]]",
      "sourceId": "whittemore-nov"
    },
    "question": "What would students and staff ask AI to help with if getting to it were not the problem?",
    "strain": "More demand does not tell us who profits from it, or whether the people using the tools get better at thinking."
  },
  {
    "id": "belief-4",
    "label": "Most people aren't good for much",
    "then": {
      "paraphrase": "Most people were fit only for farm labor and contributed little beyond it.",
      "source": "Paraphrase of Rao (2026), summarizing Appleby (2010)",
      "sourceId": "rao"
    },
    "now": {
      "quote": "The cognitive mercantilist assumes that most people are not good for much intellectually.",
      "source": "Rao (2026)",
      "sourceId": "rao"
    },
    "access": {
      "framing": "Everyone's thinking is worth developing. Tools should extend it, not replace it.",
      "source": "This demo's framing",
      "sourceId": "demo"
    },
    "question": "Whose thinking do our tools and policies treat as worth developing?",
    "strain": "The distribution of gains from historical economic change was unequal. Access to AI output likewise does not, by itself, develop a person's knowledge or judgment."
  }
];
window.PREDICTS = {
  "label": "What the access view predicts",
  "claim": {
    "paraphrase": "Rao expects a cognitive industrious revolution: when expertise gets cheap, people take on more intellectual work, not less.",
    "source": "Paraphrase of Rao (2026)",
    "sourceId": "rao"
  },
  "quote": {
    "quote": "The entirety of the infinite backlog becomes unlockable",
    "source": "Whittemore (2026a, 00:17:00)",
    "sourceId": "whittemore-nov"
  },
  "history": {
    "paraphrase": "Rao's historical model: working days rose from about 250 to 300 a year before industrialization, partly so households could buy new goods such as tea, sugar, tobacco and cotton cloth.",
    "source": "Attributed to Appleby (2010) by Rao (2026)",
    "sourceId": "rao"
  },
  "strain": "The scale and explanation of increased work are disputed. Clark and Van Der Werf (1998) challenge the rise; Humphries and Weisdorf (2019) support an industrious-revolution interpretation, without this review establishing a voluntary-consumption cause. Slavery and colonial extraction underwrote goods in this story. “Voluntary” describes some households, not the whole system."
};
window.TRANSITION = {
  "quote": "Transitions between orders, even if the order that results is a good one, are never without cost.",
  "source": "Whittemore (2026a, 00:26:00)",
  "sourceId": "whittemore-nov",
  "question": "In a school, the [[transition cost|transition-cost]] falls on the students enrolled while it happens. Who are they in our district?"
};
