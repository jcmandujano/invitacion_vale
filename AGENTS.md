# AGENTS.md
## Project
Interactive mobile-first web invitation for a quinceañera.
The experience has an original magical / fantasy identity inspired by enchanted letters, old schools of magic, parchment maps, constellations, heraldry, and secret journeys.
The project must feel cinematic, elegant, mysterious, youthful, and personalized for the quinceañera.
Do not reproduce official Harry Potter logos, crests, typography, characters, maps, artwork, or other franchise assets.
The visual identity and approved assets are custom to this project.

---
## Source of Truth
Before implementing visual or interaction work, read:
* `docs/DESIGN-SYSTEM.md`
* `docs/STORYBOARD.md`
* `docs/IMPLEMENTATION-PLAN.md`
* approved wireframes/reference images
* provided visual asset kit
If instructions conflict, use this priority:
1. Most recent explicit user instruction
2. Approved visual reference
3. `DESIGN-SYSTEM.md`
4. `STORYBOARD.md`
5. `IMPLEMENTATION-PLAN.md`
6. `AGENTS.md`
Do not redesign approved work unless explicitly requested.
---

## Stack
Use:
* HTML5
* SCSS
* Vanilla JavaScript
* Vite
* GSAP
Use GSAP for complex motion and storytelling interactions.
Prefer browser-native APIs for simple behavior.
Do not introduce React, Vue, Angular, jQuery, or another frontend framework unless explicitly requested.
Do not add major dependencies without explaining why they are necessary.
---
## Architecture
Keep the project simple.
Suggested organization:
```text
src/
├── js/
├── scss/
└── assets/
```
JavaScript should be modular by responsibility.
Example:
```text
js/
├── main.js
├── config.js
├── countdown.js
├── rsvp.js
└── animations/
    ├── intro.js
    ├── scroll.js
    └── map.js
```
SCSS should be organized by base styles, reusable components, and major sections.
Avoid excessive abstraction or fragmentation.
This is a visual microsite, not an enterprise application.
---
## Mobile First
Mobile is the primary experience.
Assume most visitors will open the invitation through WhatsApp or another mobile app.
Design and implement mobile first, using approximately `390 × 844` as a useful reference viewport.
Then progressively enhance for tablet and desktop.
Do not build desktop-first layouts that require extensive mobile overrides.
---
## Assets
Use the supplied visual kit whenever an appropriate asset already exists.
Prefer:
* SVG for scalable or animated graphics
* WebP / AVIF for raster images and textures
Keep animation-critical SVGs inline when GSAP needs access to their paths or elements.
Do not replace approved assets without a clear technical or visual reason.
If an asset needs modification, explain the reason before changing it.
---
## Animation
Motion must support the story rather than decorate every element.
Prefer:
* opacity
* translate
* subtle scale
* SVG path reveals
* stagger
* masks
* restrained glow
* subtle parallax
* MotionPath when appropriate
Avoid:
* arbitrary spinning
* excessive bouncing
* random flips
* aggressive zooming
* constant movement
The main hero animation moments are defined in `STORYBOARD.md`.
Do not invent additional major animation sequences without approval.
---
## Performance
Prioritize smooth mobile performance.
Avoid:
* unnecessarily large images
* excessive DOM particles
* autoplay video
* unnecessary WebGL
* large third-party libraries
* hundreds of simultaneous animations
Use responsive images and lazy loading where appropriate.
Keep the JavaScript bundle lightweight.
---
## Accessibility
Use semantic HTML.
Interactive controls must support keyboard interaction and visible focus states.
Images must have appropriate alt text.
Respect:
```css
@media (prefers-reduced-motion: reduce)
```
Reduced-motion users must still be able to access all content and interactions.
Do not autoplay audio.
---
## Event Data
Event-specific information should be easy to update.
Prefer a central configuration module for values such as:
* quinceañera name
* initials
* event date
* time
* venue
* address
* external maps URL
Do not scatter event configuration through multiple JavaScript files.
Dummy content may be used until final information is available.
---
## Working Method
Work one implementation phase at a time according to `docs/IMPLEMENTATION-PLAN.md`.
Before implementing a phase:
1. Read the relevant documentation.
2. Inspect existing code.
3. Inspect relevant assets.
4. Identify the files that need changes.
5. Briefly explain the proposed implementation.
Then implement.
Do not modify unrelated sections while completing a focused task.
Prefer small, reviewable changes.
---
## Change Discipline
Preserve previously approved behavior and design.
Do not:
* refactor unrelated files
* redesign unrelated sections
* replace working systems unnecessarily
* add dependencies casually
* change the visual language without instruction
If a larger change is necessary, explain:
* the problem
* proposed solution
* affected files
* expected benefit
---
## After Implementation
Before considering a phase complete:
1. Run the project.
2. Check for JavaScript errors.
3. Check the browser console.
4. Verify mobile layout.
5. Verify desktop layout.
6. Verify relevant interactions.
7. Confirm responsive behavior.
8. Check reduced-motion behavior when applicable.
Then report:
* files modified
* what was implemented
* any limitations or follow-up work
---
## Quality Bar
A change is successful when it:
* follows the approved visual direction
* works well on mobile
* remains readable and accessible
* uses existing assets appropriately
* keeps animations smooth and intentional
* does not introduce unnecessary complexity
* remains easy for another developer to understand
When uncertain about visual intent, consult the design documentation instead of improvising.