# Personal Website — V1 Specification and Codex Handoff

**Status:** Proposed implementation specification, not yet built  
**Date:** 14 November 2026  
**Owner:** Alexander Khundoev  
**Purpose:** A small, memorable, technically polished personal portfolio hosted on GitHub Pages.

## 1. Product goal

Build a **single-page, monochrome, Unix-terminal-inspired portfolio** for a London-based senior electronic trading software engineer. The website should convey substantial production engineering experience, curiosity, craftsmanship and personality. It should be immediately understandable to recruiters while rewarding engineers who explore its optional interactive terminal.

**Primary audience:** engineering managers and recruiters at hedge funds, market makers, HFT firms, financial technology companies, Big Tech and AI infrastructure teams.  
**Secondary audience:** peers, meetup contacts, open-source collaborators.

**Non-goals (V1):** blog/CMS, user accounts, backend, database, analytics tracking, live trading dashboard, actual shell execution, complicated animations, e-commerce, AI chatbot.

## 2. Visual direction

Use the **third approved visual mockup** from the November 2026 design exploration as the primary reference: a modern, polished black-and-white terminal aesthetic, with desktop and mobile variants. If the image is available to Codex, attach it as a reference; this document is authoritative for behaviour and content, not pixel-perfect measurements.

- Near-black background (`#080808`–`#101010`), off-white text, restrained grey secondary text.
- Monospace typography throughout (prefer locally available/system monospace; optional open-source web font with fallback).
- Clear hierarchy, generous whitespace, thin 1px dividers and outlines, minimal/no gradients.
- Shell prompts like `alexander@khundoev:~$ whoami`, `experience`, `projects`, `stack`, `contact`.
- A restrained faux terminal header/window treatment; avoid overdoing decorative window chrome.
- One standout outlined **TraderLab** featured-project card; other projects simpler and clearly labelled by maturity.
- Small command tags/chips and ASCII-like cues, without sacrificing readability.
- Blinking cursor only where useful; respect `prefers-reduced-motion`.
- Responsive layout: desktop two-column section labels/content where appropriate; mobile stacked, no horizontal page overflow.
- Do not display fictitious terminal output suggesting real system access.

## 3. Information architecture (one page)

### 3.1 Header / hero (`whoami`)
- **Name:** Alexander Khundoev
- **Headline:** `Electronic Trading Engineer` or `Software Engineer | Electronic Trading | Low-Latency Systems`.
- **Subheadline:** `Java · Rust · Distributed Systems · AI/ML`.
- **Location:** London, UK.
- **Suggested copy (editable):** “Senior software engineer building high-performance distributed systems and electronic trading infrastructure. Exploring quantitative trading, Rust and AI/ML engineering.”
- May include `20+ years building software. Still curious. Still building.` as a personal tagline.
- Do **not** claim professional HFT, quant-research or long-tenure Rust expertise.

### 3.2 Experience
Concise evidence-based highlights, not a complete CV:
- Senior front-office electronic trading engineering experience, including fixed income/rates.
- Market connectivity, pricing/RFQ workflows, execution-related infrastructure, real-time data processing.
- Java concurrency, performance, distributed systems, observability and reliability.
- Current work involving Rust/Aeron on strategic platform modernisation, without disclosing proprietary implementation details.
- Optional link to downloadable CV **only after an approved, public-safe PDF is supplied**; hide otherwise.

### 3.3 Projects
- **TraderLab — featured:** experimental trading systems laboratory; market-data connectivity, order-book processing, strategy infrastructure and reproducible performance experiments. Distinguish *implemented today* from *planned* features. Link only to verified public repository URL when supplied.
- **ML systems experiments:** LLM inference/performance experiments; include only if a public repository or meaningful write-up exists.
- **Rust experiments:** optional; do not create placeholder links to nonexistent projects.
- Project cards should support short summary, tech tags, status (`In progress`, `Experiment`, etc.) and optional repository/details link.

### 3.4 Stack
Compact groupings rather than a giant keyword wall:
- Core: Java, concurrency, distributed systems, electronic trading, market data, FIX.
- Current/expanding: Rust, Aeron, performance engineering.
- Exploring: Python, ML/AI infrastructure, LLM inference.
- C++ may be included as earlier experience, not represented as recent professional expertise.

### 3.5 Contact
- GitHub, LinkedIn and email links, with accessible labels.
- Exact URLs and public email must be supplied/confirmed; **never invent links or addresses**.
- Do not publicly expose telephone number, home address or employer-sensitive details.

## 4. Navigation and interaction

**Progressive enhancement:** all five sections are rendered as normal semantic HTML on first load. Navigation works without JavaScript via anchor links. Terminal interaction is optional.

### 4.1 Clickable navigation
Top or side navigation: `whoami`, `experience`, `projects`, `stack`, `contact`. Clicking scrolls to the corresponding section and preserves a clear focus state. On mobile, use compact wrapping navigation rather than hiding key sections behind a complex menu.

### 4.2 Interactive command prompt
A visually integrated prompt near the bottom (or in a distinct small terminal panel) with a text input and submit affordance. The terminal **does not execute arbitrary shell commands**; it parses a fixed allowlist locally.

**Required commands:**

| Input | Behaviour |
|---|---|
| `help` | Show available commands and short descriptions. |
| `whoami` / `about` | Show brief profile text and optionally focus/scroll to hero. |
| `experience` | Scroll to experience section. |
| `projects` / `ls projects/` | Show project names and/or scroll to projects. |
| `traderlab` | Scroll to featured TraderLab card; optionally show summary. |
| `stack` / `skills` | Scroll to technical stack. |
| `contact` | Scroll to contact links. |
| `clear` | Clear terminal transcript, not the main page. |

**Nice-to-have after required functionality works:** `cat about.txt`, `ls -la projects/`, `uname -a` (playful *fictional portfolio information*, not real host diagnostics), `sudo hire alex` (light-hearted Easter egg).

**Input behaviour:**
- Enter submits; empty input does nothing or shows a brief hint.
- Up/down arrows navigate bounded command history when the terminal input has focus.
- Tab completion is optional V1; if implemented, complete known commands without trapping keyboard navigation (consider Ctrl+Space instead if Tab would interfere with accessibility).
- Unknown commands return a concise `command not found — try help` message; escape all user-entered text (use `textContent`, never interpolate untrusted input into `innerHTML`).
- Trim whitespace; accept sensible case-insensitive aliases; prevent extremely long input (e.g. `maxlength=120`).
- Maintain a bounded transcript (e.g. last 30 entries) and history (e.g. 50 commands).
- The terminal should not steal keyboard focus on page load or globally intercept keys.
- All content and external links remain accessible without terminal interaction.

## 5. Technical implementation

**Preferred stack:** Astro + CSS + minimal TypeScript, static output for GitHub Pages. Plain HTML/CSS/JS is acceptable if it produces a materially simpler V1; do not introduce React or a backend without a demonstrated need.

Suggested structure:

```text
personal-website/
├── README.md
├── package.json
├── astro.config.mjs
├── public/
│   ├── favicon.svg
│   └── [approved-cv.pdf — optional]
├── src/
│   ├── pages/index.astro
│   ├── styles/global.css
│   ├── components/Terminal.astro
│   └── data/profile.ts
└── .github/workflows/deploy.yml
```

Treat this as a suggestion; adapt to actual repo state. Keep content in a small typed data file or similarly editable location so changing copy and links does not require touching interaction code.

### GitHub Pages
- Static build; no server runtime dependencies.
- Support both a repository project URL (`/<repo>/`) and a custom root domain with correct asset/base paths.
- Prefer official GitHub Actions Pages deployment workflow and document repository Settings → Pages setup.
- Document optional custom domain and DNS setup; do not assume domain ownership.
- No secrets required for the public site.

## 6. Quality requirements / acceptance criteria

1. **Five-second test:** name, expertise and primary links are immediately visible without typing or scrolling excessively.
2. **Accessibility:** semantic headings/landmarks, labelled terminal input, keyboard-accessible navigation, visible focus indicators, sufficient contrast, `aria-live` for terminal responses without excessive announcements.
3. **Responsive:** usable at 320px mobile width, tablet and wide desktop; no clipped text or horizontal page scrolling.
4. **Performance:** static, lightweight, minimal JavaScript; avoid unnecessary network calls and heavyweight dependencies.
5. **Reduced motion:** cursor blink and any transitions disabled or minimised under `prefers-reduced-motion`.
6. **SEO/social:** meaningful `<title>`, meta description, canonical URL only when known, Open Graph basics, favicon; no invented URL.
7. **Security:** no `eval`, `Function`, arbitrary shell execution, unsafe HTML injection, or remote terminal APIs.
8. **Link integrity:** all live external links verified by owner; missing links hidden or marked `Coming soon` without being clickable.
9. **Tests:** automated unit tests for command parser/aliases/unknown commands/history if practical; smoke test for static build and section anchor IDs. Optional Playwright smoke test if setup remains lightweight.
10. **Honest content:** do not describe proposed TraderLab components as completed work; no fabricated metrics, testimonials, project links or professional claims.
11. **Documentation:** README includes local development, build, test, GitHub Pages deployment, content editing and known limitations.

## 7. Suggested delivery phases

**Phase 1 — Static page:** design faithful to mockup #3; complete responsive sections, truthful placeholder-safe content, navigation and accessible links.

**Phase 2 — Interactive terminal:** allowlisted commands, history, clear, friendly errors, keyboard accessibility and tests.

**Phase 3 — Polish and publish:** visual QA on desktop/mobile, reduced-motion check, Lighthouse/a11y review, GitHub Pages workflow, optional domain.

**Defer:** blog, elaborate boot animations, live TraderLab metrics, custom email setup, CMS, animated charts, and any backend.

## 8. Decisions / inputs needed from owner

- GitHub username and exact profile URL.
- LinkedIn public profile URL.
- Contact email to display (can be decided after domain purchase).
- Domain choice and whether it has been registered.
- Public-safe CV PDF, if wanted.
- TraderLab repository URL and its **actual** current capabilities/publication status.
- Any other existing public repositories worth showing.
- Whether to display current employer by name or keep experience employer-neutral.

**Default:** Build without inventing these details. Use an editable config with `null` links and hide unavailable actions. Do not block local development waiting for final URLs.

## 9. Codex kickoff prompt

> Implement V1 of my personal website using `Personal_Website_Codex_Spec.md` as the product and technical specification. This is a small, static, black-and-white, Unix-terminal-inspired single-page portfolio. Use the approved third mockup as the visual reference if provided. First inspect the repository and summarise the current state; do not overwrite existing work. Then propose a short implementation plan. Build the static page and accessible navigation first, followed by a safe allowlisted interactive command prompt with tests. Keep everything lightweight and GitHub Pages compatible. Do not invent external links, employer-sensitive facts or completed TraderLab features. Run the available checks and report what works, what remains, and exactly how to deploy.

## 10. Success definition

A recruiter can skim the page in seconds, while an engineer can discover a playful functional terminal. The site is polished, fast, honest, mobile-friendly, maintainable and easy to deploy. Most of the owner's time remains available for TraderLab and interview preparation.
