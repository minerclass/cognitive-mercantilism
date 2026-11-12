# Implementation notes

Written on: mac · codex · November 11, 2026

The interactive page implements the supplied concept with the corrections documented below. `CONCEPT.md` remains the original, unchanged baseline. `REVIEW.md` and `SOURCE_CHECKS.md` record the initial review; their descriptions of the repository before implementation are historical.

## Content decisions applied

- Preserve all quoted text from Appendix B exactly, including excerpt-initial capitalization. The sources view explains that convention and the remaining need for audio verification.
- Correct the fixed-demand excerpt's locator to the published transcript's 00:08 block in the belief data. Do not change the original concept.
- Link the May episode to its verified publisher-provided episode listing.
- Distinguish a policy's protective purpose from its unequal access effects. Replace the original scarcity-to-access position line with two labeled judgments: the room's call and the demo's starting lean. These are categorical discussion judgments, not measurements or an answer key.
- Add a “Need more information” call, a question about evidence that could change the judgment, and a prompt about learning goals.
- Qualify the public-chatbot, gradebook, district-account, age-limit and school-funding scenarios as described in the review. A license, account or approval step alone is not a guarantee of safety or permission.
- Remove the categorical claim that freeing people from farm work fed them. Preserve the limitations concerning distribution, capability, coercion and colonial extraction.
- Describe Humphries and Weisdorf as supporting an industrious-revolution interpretation. Keep the distinction between that interpretation and a voluntary-consumption explanation.
- Treat pedagogical friction as broader than productive difficulty alone. Distinguish productive and exclusionary friction in the workshop definition.
- Mark the mercantilism primer as a simplified historical model. It is original framing for the demo and does not stand in for a full historical account.

## Interaction and privacy

Navigation uses ordinary links and hash routes. The primer, beliefs, sequential scenario reveals, room calls and glossary work entirely in the browser. Scenario state exists only in memory; changing sections or scenarios preserves it during the session, and reloading clears it. Only theme and large-text preferences use local storage, behind exception handling.

There are no analytics, forms, external fonts, script dependencies, automatic outbound requests or response collection. Source links make ordinary external navigations when deliberately opened. GitHub Pages, as the host, handles normal web requests under its own service practices.

The page works without a build step and uses relative asset URLs for both GitHub Pages and direct local-file use. Keep all files together when using it offline. The optional verification script needs Node.js but the page does not.

## Accessibility

Semantic navigation, a skip link, labeled native controls, visible focus, text labels alongside colors, reduced-motion support, announced comparison changes and explicit focus after view/reveal/scenario changes are implemented. Inline definitions use unique IDs, `aria-expanded` and Escape-to-close. Responsive comparison rows become labeled cards on smaller screens. Contrast checks cover both themes.

Verification results and any remaining limits are recorded in `VALIDATION.md`. Automated and browser checks do not constitute a full assistive-technology audit.
