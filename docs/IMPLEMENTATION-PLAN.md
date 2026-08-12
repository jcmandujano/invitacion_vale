# IMPLEMENTATION-PLAN.md

## Purpose

This document defines the recommended implementation order for the quinceañera web invitation.

The project should be built incrementally.

Each phase should:

* have a clear objective
* remain independently reviewable
* avoid unrelated changes
* preserve previously approved work
* include basic validation before moving forward

Do not attempt to build the entire website in a single implementation pass.

The project includes complex visual and motion work, so iterative validation is required.

---

# 1. Implementation Strategy

Use the following workflow:

```text
Plan
  ↓
Implement
  ↓
Run
  ↓
Review
  ↓
Adjust
  ↓
Approve
  ↓
Next phase
```

The goal is to reduce visual regressions and animation complexity.

Each phase should build on stable previous work.

---

# 2. Project Phases

The recommended implementation order is:

```text
Phase 0 — Project setup
Phase 1 — Static structure and responsive foundation
Phase 2 — Intro environment and envelope
Phase 3 — Seal interaction and envelope opening
Phase 4 — Letter-to-website transition
Phase 5 — Main content sections
Phase 6 — Scroll-based reveal system
Phase 7 — Magical map
Phase 8 — Gallery
Phase 9 — Countdown and RSVP
Phase 10 — Navigation and polish
Phase 11 — Accessibility and reduced motion
Phase 12 — Performance and final QA
```

Do not skip directly to later phases unless explicitly requested.

---

# Phase 0 — Project Setup

## Objective

Create a clean, minimal development environment.

## Tasks

Set up:

* Vite
* HTML
* SCSS
* Vanilla JavaScript
* GSAP

Create the initial project structure.

Suggested structure:

```text
src/
├── assets/
├── js/
│   ├── main.js
│   ├── config.js
│   └── animations/
├── scss/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   ├── sections/
│   └── main.scss
└── index.html
```

Copy the approved asset kit into the project.

Create basic event configuration.

Example:

```js
export const eventConfig = {
  quinceanera: {
    name: "Valeria Ramírez",
    initials: "VR"
  },

  event: {
    date: "2026-10-18T19:00:00",
    venue: "Salón Encantado",
    address: "Av. de la Luna 123",
    mapsUrl: "#"
  }
};
```

Register GSAP and required plugins.

## Do Not Implement Yet

Do not implement:

* final sections
* envelope animation
* map animation
* gallery
* RSVP

## Acceptance Criteria

Phase is complete when:

* project installs successfully
* Vite starts successfully
* SCSS compiles
* JavaScript modules load
* GSAP is available
* assets resolve correctly
* no console errors appear

---

# Phase 1 — Static Structure and Responsive Foundation

## Objective

Build the complete semantic HTML structure without advanced animation.

This phase creates the layout skeleton for the full invitation.

## Sections

Create placeholders for:

1. intro
2. welcome
3. date
4. countdown
5. venue
6. dress code
7. map
8. gallery
9. RSVP
10. closing

Use realistic dummy content.

## Styling

Implement:

* core CSS reset
* typography
* color variables
* spacing variables
* basic section layout
* mobile-first breakpoints
* base containers
* surface styles

Use `DESIGN-SYSTEM.md` as reference.

## Important

The website should already be readable without animation.

## Do Not Implement Yet

Do not create:

* cinematic intro motion
* ScrollTrigger reveals
* map route animation
* lightbox
* RSVP functionality

## Acceptance Criteria

Phase is complete when:

* all major sections exist
* section order matches `STORYBOARD.md`
* layout is mobile-first
* desktop layout is functional
* typography hierarchy is visible
* color system is applied
* content remains readable
* no major horizontal overflow exists
* no JavaScript errors appear

---

# Phase 2 — Intro Environment and Envelope

## Objective

Create the static visual environment for the opening scene and animate the envelope arrival.

## Tasks

Build:

* full-screen intro container
* dark magical background
* subtle texture
* restrained magical particles
* envelope component
* wax seal
* recipient text
* interactive hint

Implement envelope arrival using GSAP.

Expected sequence:

```text
darkness
↓
background atmosphere
↓
particles
↓
envelope enters
↓
envelope settles
↓
seal becomes interactive
```

## Envelope Architecture

Separate visual layers where useful:

```text
envelope-back
letter
envelope-front
flap
seal
```

Do not flatten the envelope into one image if it prevents opening animation.

## Interaction

At the end of this phase:

* seal should be visibly interactive
* clicking it may log or trigger a placeholder event

Do not open the envelope yet.

## Acceptance Criteria

Phase is complete when:

* intro occupies viewport correctly
* body is scroll-locked during intro
* envelope arrival is smooth
* envelope scales correctly on mobile
* seal is keyboard/touch accessible
* idle state clearly suggests interaction
* no accidental auto-opening occurs
* no layout shifts appear during animation

---

# Phase 3 — Seal Interaction and Envelope Opening

## Objective

Implement the physical interaction of opening the invitation.

## Tasks

On seal activation:

1. animate seal press
2. show subtle magical response
3. remove or release seal
4. rotate flap backward
5. reveal letter
6. begin lifting letter

Use GSAP timelines.

Keep animation logic isolated in:

```text
js/animations/intro.js
```

or equivalent.

## Interaction Rules

Support:

* mouse
* touch
* keyboard

Prevent accidental repeated activation.

## Important

The opening sequence should feel tactile, not explosive.

Avoid large particle bursts.

## Acceptance Criteria

Phase is complete when:

* seal activates only once
* flap opens correctly
* letter remains correctly layered
* animation works on mobile
* no clipping issues occur
* no z-index issues remain
* interaction does not produce duplicate timelines
* reduced-motion behavior has a safe fallback

---

# Phase 4 — Letter-to-Website Transition

## Objective

Create the primary cinematic transition from the physical letter into the main webpage.

This is a hero moment.

## Desired Illusion

Avoid:

```text
letter
↓
fade
↓
website
```

Prefer:

```text
letter
↓
expands
↓
fills viewport
↓
becomes welcome surface
```

## Tasks

After envelope opening:

1. letter rises fully
2. envelope moves away
3. letter scales toward viewport
4. letter corners leave frame
5. background transitions into the welcome section
6. main site becomes visible
7. intro layer is removed or disabled
8. body scroll is restored
9. navigation becomes available

## Technical Notes

Possible approaches:

* transform-based scaling
* shared background colors/textures
* masking
* clip-path
* matching letter and section surfaces

Prefer the simplest solution that preserves the visual illusion.

## Acceptance Criteria

Phase is complete when:

* transition feels visually continuous
* no abrupt black flash appears
* welcome content appears naturally
* intro is no longer interactive afterward
* body scroll restores correctly
* viewport height changes on mobile do not break the effect
* transition does not leave invisible blocking layers

---

# Phase 5 — Main Content Sections

## Objective

Implement the final static composition of all main content sections.

## Sections

### Welcome

Include:

* monogram
* quinceañera name
* XV identity
* dummy portrait
* short bio

### Date

Include:

* day
* month
* year
* event time

### Countdown Container

Create the structure only if dynamic logic is not already present.

### Venue

Include:

* venue name
* city / region
* supporting information

### Dress Code

Include:

* formal attire information
* subtle custom house-inspired accents

### Map Section

Create the visual container and placeholders.

Do not animate the map yet.

### Gallery

Create image placeholders.

### RSVP

Create visual form structure.

### Closing

Use:

* VR
* XV
* event date
* final phrase

## Acceptance Criteria

Phase is complete when:

* every section matches the intended visual hierarchy
* mobile layout feels intentional
* desktop layout feels expanded rather than simply stretched
* provided assets are used consistently
* dummy content is easy to replace
* visual rhythm matches `DESIGN-SYSTEM.md`

---

# Phase 6 — Scroll-Based Reveal System

## Objective

Add restrained scroll-triggered motion to the main site.

## Tasks

Create a reusable reveal strategy.

Possible categories:

```text
reveal-text
reveal-image
reveal-ornament
reveal-stagger
```

Use ScrollTrigger.

## Recommended Motion

Prefer:

* opacity
* translateY
* subtle scale
* SVG stroke reveals
* small stagger

## Do Not

Do not give every element a custom animation.

Do not animate content continuously after it has appeared.

## Trigger Behavior

Most animations should run once.

Avoid late triggers that leave large empty sections.

## Acceptance Criteria

Phase is complete when:

* sections reveal progressively
* reading is never blocked
* animation timing feels consistent
* mobile performance remains smooth
* revisiting previous sections does not cause distracting replays
* ScrollTrigger refresh works after load

---

# Phase 7 — Magical Map

## Objective

Create the second major hero interaction of the website.

## Tasks

Use provided assets:

* parchment surface
* compass
* route path
* footprints
* location pin
* cartouche

Create the final map composition.

## Animation Sequence

Recommended:

```text
map frame appears
↓
compass appears
↓
map lines reveal
↓
route draws
↓
footprints begin
↓
footprints progress
↓
destination activates
↓
venue label appears
↓
maps CTA reveals
```

## Route

Animate SVG path using:

* stroke-dasharray
* stroke-dashoffset

or another efficient SVG reveal technique.

## Footprints

Possible implementation:

* staggered footprints
* MotionPath
* alternating left/right footprints

Choose the implementation that is visually convincing and performant.

## CTA

Real location button must remain usable regardless of animation state.

## Acceptance Criteria

Phase is complete when:

* map is readable on mobile
* route draws smoothly
* footprints clearly imply movement
* final location feels visually important
* CTA opens the configured map URL
* animation only runs once unless otherwise requested
* reduced motion reveals a completed map immediately

---

# Phase 8 — Gallery

## Objective

Implement the interactive photo section.

## Tasks

Create:

* responsive staggered gallery
* dummy image data
* lazy loading
* lightbox

## Visual Behavior

Images may have:

* subtle rotation
* varying aspect ratios
* elegant frames
* mild overlap on larger screens

Mobile should reduce overlap.

## Lightbox

Must support:

* click / tap open
* visible close control
* Escape key
* background click when appropriate

Do not create a heavy carousel unless explicitly requested.

## Acceptance Criteria

Phase is complete when:

* gallery loads efficiently
* images do not cause major layout shifts
* lightbox is accessible
* images scale correctly
* mobile gallery remains readable
* dummy images can be replaced easily

---

# Phase 9 — Countdown and RSVP

## Objective

Add the primary functional elements.

---

## Countdown

Implement dynamic countdown based on `eventConfig`.

Required values:

* days
* hours
* minutes
* seconds

Handle the case where the event date has passed.

Avoid invalid negative values.

---

## RSVP

Start with the simplest approved implementation.

Possible options:

### Option A

WhatsApp CTA.

### Option B

External form.

### Option C

Simple front-end form.

Do not introduce a backend unless explicitly requested.

## Confirmation

After successful RSVP interaction, show a confirmation state.

Example:

```text
Asistencia confirmada

Nos vemos en una noche
llena de magia.
```

## Acceptance Criteria

Phase is complete when:

* countdown uses configured date
* countdown remains accurate
* RSVP CTA works
* form behavior is clear
* confirmation state is understandable
* functional elements work on mobile

---

# Phase 10 — Navigation and Visual Polish

## Objective

Finalize navigation and small visual details after core functionality is stable.

## Navigation Tasks

Implement:

* hidden state during intro
* sticky navigation after intro
* mobile menu
* smooth anchor navigation
* active section behavior if appropriate

## Polish Tasks

Review:

* section transitions
* icon sizing
* ornament density
* button states
* hover states
* focus states
* spacing
* typography
* shadows
* glows
* gradients

## Important

This phase should refine.

Do not redesign completed sections.

## Acceptance Criteria

Phase is complete when:

* navigation works on all target viewports
* menu does not overlap important content
* mobile menu is accessible
* visual details remain consistent
* no section feels excessively decorated

---

# Phase 11 — Accessibility and Reduced Motion

## Objective

Ensure the experience remains usable for a broad range of visitors.

## Tasks

Review:

* semantic HTML
* heading hierarchy
* alt text
* decorative image handling
* labels
* keyboard navigation
* focus visibility
* contrast

Implement:

```css
@media (prefers-reduced-motion: reduce)
```

## Reduced Motion Behavior

Intro:

```text
envelope
↓
simple interaction
↓
short transition
```

Map:

* show complete route
* avoid long path animation

Sections:

* instant display or minimal fades

## Acceptance Criteria

Phase is complete when:

* site is navigable using keyboard
* focus states are visible
* content remains accessible without animation
* reduced-motion mode does not hide content
* decorative assets are not announced unnecessarily

---

# Phase 12 — Performance and Final QA

## Objective

Prepare the invitation for production deployment.

## Performance Tasks

Review:

* image dimensions
* image compression
* WebP / AVIF usage
* lazy loading
* JavaScript bundle
* GSAP usage
* unused code
* unused assets
* font loading

Avoid loading unnecessary resources.

## Test Viewports

At minimum:

```text
375 × 667
390 × 844
430 × 932
768 × 1024
1366 × 768
1440 × 900
```

## Browser Testing

Prioritize:

* Chrome mobile
* Safari iOS
* Chrome desktop
* Safari desktop
* Edge

## Functional QA

Verify:

* initial load
* intro
* seal interaction
* envelope opening
* site transition
* navigation
* countdown
* map
* gallery
* RSVP
* external links

## Visual QA

Review:

* spacing
* overflow
* clipping
* image quality
* typography
* SVG rendering
* animation timing
* fixed / sticky elements

## Acceptance Criteria

Project is ready when:

* no blocking console errors exist
* no obvious responsive regressions remain
* key interactions work reliably
* page remains usable with reduced motion
* images are optimized
* mobile performance is acceptable
* event content can be replaced easily
* final experience follows the approved visual direction

---

# 3. Recommended Agent Workflow Per Phase

For every implementation phase, use the following workflow.

## Step 1 — Inspect

Read:

* `AGENTS.md`
* relevant documentation
* current source files
* relevant visual assets

## Step 2 — Report Intended Changes

Before editing, briefly state:

* files to modify
* files to create
* implementation approach
* any relevant technical risks

## Step 3 — Implement

Make only the changes required for the current phase.

## Step 4 — Validate

Run the project and inspect:

* build
* console
* responsive layout
* relevant interactions

## Step 5 — Report

Summarize:

* completed work
* modified files
* relevant implementation details
* known limitations
* recommended next phase

---

# 4. Change Boundaries

A phase should not silently implement major features from future phases.

Example:

During Phase 2:

Allowed:

```text
envelope visuals
envelope arrival
particles
seal idle state
```

Not allowed:

```text
full map
gallery lightbox
RSVP
complete scroll reveal system
```

Small foundational work for a future phase is acceptable when technically necessary, but it should not expand the scope unnecessarily.

---

# 5. Commit Strategy

If using Git, prefer one focused commit per completed phase or meaningful sub-phase.

Example:

```text
feat: setup invitation project foundation

feat: add responsive invitation structure

feat: build magical envelope intro

feat: add envelope opening interaction

feat: create letter-to-site transition

feat: add scroll reveal animations

feat: build animated magical map
```

Avoid mixing unrelated fixes and features into one large commit.

---

# 6. Review Checkpoint Strategy

The following phases should receive explicit visual review before continuing:

## Checkpoint A

After Phase 1

Review:

* structure
* responsive composition
* basic visual language

---

## Checkpoint B

After Phase 3

Review:

* envelope
* seal
* opening interaction

This is important before developing the transition.

---

## Checkpoint C

After Phase 4

Review:

* letter-to-site illusion

Do not continue polishing the rest of the site if this transition is not satisfactory.

---

## Checkpoint D

After Phase 7

Review:

* magical map
* route
* footprints
* destination reveal

---

## Checkpoint E

After Phase 10

Review:

* complete visual experience

Then proceed to technical QA.

---

# 7. Priority Order

If time becomes limited, prioritize:

```text
1. Mobile usability
2. Event information clarity
3. Envelope intro
4. Letter transition
5. Map
6. RSVP
7. Gallery
8. Decorative polish
```

Never sacrifice usability for decorative animation.

---

# 8. Definition of Done

The project is considered complete when the guest can:

1. open the invitation
2. understand how to interact with the envelope
3. open the seal
4. enter the main invitation
5. identify the quinceañera
6. see the date and time
7. understand the dress code
8. find the location
9. open real navigation
10. view the gallery
11. confirm attendance
12. experience the site comfortably from a mobile device

The finished website should feel:

* coherent
* magical
* elegant
* personal
* responsive
* smooth
* intentional

The final experience should feel like **a custom digital invitation for VR**, not a generic fantasy template.
