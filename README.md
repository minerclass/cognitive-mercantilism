# Scarcity or Access?

**Cognitive Mercantilism and AI in Schools**

A concept for an offline workshop tool that helps educators discuss AI access, protective limits, and the thinking students need to develop. It draws on Venkatesh Rao's cognitive-mercantilism analogy and Nathaniel Whittemore's commentary, then applies an original three-question discussion aid to fictional school scenarios.

[Open the interactive guide](https://minerclass.github.io/cognitive-mercantilism/) · [Download the offline copy](downloads/Scarcity-or-Access-offline.zip)

## Use the guide

The page includes a historical primer, a Then/Now scarcity–access comparison, four belief panels, nine fictional school scenarios, sources and caveats, and a searchable glossary. A presenter reveals the scenario's three answers, records the room's call and compares its reasoning with the demo's starting lean. Light/dark themes and large text support different viewing conditions.

This is an illustrative discussion aid, not a validated policy instrument or findings about a district. Protective purpose, learning goals, implementation capacity and unequal access can coexist in a single decision. The contested-history and human-capability caveats are integral to the guide.

## Run locally or offline

Download and extract the offline ZIP, keeping its folders together, then open `index.html`. The site uses plain HTML, CSS and JavaScript with local script-loaded data; it needs no build step, framework, external assets, account or server API. Alternatively, serve the repository folder:

```sh
python3 -m http.server 8000
```

Open the local address printed by the server. Direct file opening is implemented but could not be browser-tested because the testing browser blocks file URLs; see [VALIDATION.md](VALIDATION.md).

## Privacy

Scenario choices stay in memory and reset when the page reloads. Only theme and large-text preferences use local storage, with a working fallback if storage is unavailable. There are no analytics or response-collection services. External sources open only when you follow their links. GitHub Pages handles ordinary hosting requests under its own service practices.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html`, `assets/` | Page, styling, local SVG and browser interactions |
| `data/` | Beliefs, scenarios, worldviews, glossary and source records |
| [CONCEPT.md](CONCEPT.md) | Original concept, preserved unchanged |
| [REVIEW.md](REVIEW.md) | Initial critical review; its pre-build status is historical |
| [SOURCE_CHECKS.md](SOURCE_CHECKS.md) | Source coverage and verification limits |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | Content corrections and implementation decisions |
| [VALIDATION.md](VALIDATION.md) | Completed checks and remaining limits |
| `scripts/check.mjs` | Optional, dependency-free content and contrast checks |

The initial review's substantive corrections are applied to the page and documented separately. Quotation wording remains as supplied; the fixed-demand excerpt now points to its published 00:08 transcript block. Audio verification is still open.

## Verify

With Node.js installed:

```sh
node scripts/check.mjs
```

The checks verify the quoted text against the original Appendix B, data completeness, glossary keys, script syntax, local assets, absence of application network APIs and theme text contrast. See the validation record for browser coverage and limitations.

## Deployment

GitHub Pages serves the root of `main`. `.nojekyll` keeps the site buildless. All asset URLs are relative so the project works under its repository path.

## References

Appleby, J. (2010). *The relentless revolution: A history of capitalism*. W. W. Norton.

Clark, G., & Van Der Werf, Y. (1998). Work in progress? The industrious revolution. *The Journal of Economic History, 58*(3), 830–843. https://doi.org/10.1017/S0022050700021197

de Vries, J. (2008). *The industrious revolution: Consumer behavior and the household economy, 1650 to the present*. Cambridge University Press.

Humphries, J., & Weisdorf, J. (2019). Unreal wages? Real income and economic growth in England, 1260–1850. *The Economic Journal, 129*(623), 2867–2887. https://doi.org/10.1093/ej/uez017

Rao, V. (2026, October 25). Cognitive mercantilism. *Contraptions*. https://contraptions.venkateshrao.com/p/cognitive-mercantilism

Whittemore, N. (Host). (2026a, November 1). *AI won't make our minds useless according to 400 years of history* [Audio podcast episode]. In *The AI Daily Brief: Artificial intelligence news and analysis*. https://aidailybrief.ai/e/2026-11-01

Whittemore, N. (Host). (2026b, May 10). *The new jobs AI will create* [Audio podcast episode]. In *The AI Daily Brief: Artificial intelligence news and analysis*. https://podcasts.apple.com/us/podcast/the-new-jobs-ai-will-create/id1680633614?i=1000767079446

Source links and reading/check status also appear in the page's Sources & caveats view. More demand and more AI output do not, by themselves, establish improved learning. The historical analogy does not resolve distribution, coercion, colonial extraction or the costs students bear during transitions.

## Rights

Original project material is available under the [MIT License](LICENSE), copyright 2026 Micah J. Miner. Third-party quotations and materials retain their owners' rights and are not relicensed by this repository.
