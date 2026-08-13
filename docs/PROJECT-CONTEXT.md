# PROJECT-CONTEXT.md

## Project Summary

This project is a custom interactive web invitation for a quinceañera.

The experience is built around the idea of receiving a magical invitation that gradually reveals the event through a cinematic, scroll-based journey.

The project is inspired by:

* magical schools
* enchanted letters
* antique parchment
* fantasy heraldry
* constellations
* secret maps
* magical footprints
* old books
* mysterious nocturnal environments

Harry Potter is an important creative reference for atmosphere and storytelling, especially the ideas of:

* receiving a magical letter
* magical houses
* enchanted maps
* hidden routes
* magical academia

However, the final invitation must remain visually original.

Do not reproduce official Harry Potter logos, crests, typography, characters, illustrations, maps, or branded assets.

---

# Main Creative Direction

The invitation should feel:

* magical
* fantastic
* elegant
* cinematic
* mysterious
* youthful
* personal

It should not feel:

* childish
* cartoonish
* like a theme-park website
* overly gothic
* overloaded with fantasy decoration
* like a direct Harry Potter replica

The quinceañera must remain the main protagonist.

The fantasy universe exists to frame her celebration.

---

# Quinceañera Identity

Current working identity:

```text
Name: Valeria Ramírez
Initials: VR
Celebration: XV
```

This information is temporary dummy content and will be replaced later.

The custom visual identity uses:

* `VR`
* `XV`
* original monograms
* original magical heraldry

---

# Color Preferences

The quinceañera's preferred colors are:

* purple
* violet
* lilac
* black

A warm antique gold is used as a secondary magical accent.

There is also a subtle creative influence from Hufflepuff, mainly through:

* warmth
* gold tones
* loyalty / warmth / friendship symbolism
* occasional house-like heraldic references

Do not make yellow the primary palette.

Refer to:

```text
docs/DESIGN-SYSTEM.md
```

for the approved color system.

---

# Primary User Experience

The intended user journey is:

```text
Guest opens the page
        ↓
Dark magical atmosphere
        ↓
A sealed envelope arrives
        ↓
Guest taps the wax seal
        ↓
Envelope opens
        ↓
Letter emerges
        ↓
Letter expands into the website
        ↓
Quinceañera introduction
        ↓
Date and countdown
        ↓
Venue and dress code
        ↓
Magical parchment transition
        ↓
Animated magical map
        ↓
Gallery
        ↓
RSVP
        ↓
Closing
```

The full interaction sequence is documented in:

```text
docs/STORYBOARD.md
```

---

# Hero Moments

There are three primary visual moments.

## 1. Envelope Arrival

The page begins in darkness.

A magical envelope arrives and becomes the first interactive object.

---

## 2. Letter-to-Website Transition

After the envelope opens, the letter expands visually until it becomes the main webpage.

This should feel continuous rather than like a conventional page transition.

---

## 3. Magical Map

A parchment-style map reveals:

* route
* footprints
* compass
* destination
* event location

This section is inspired by enchanted maps but must remain visually original.

---

# Main Website Sections

Current expected structure:

1. Welcome / quinceañera introduction
2. Date and time
3. Countdown
4. Venue
5. Dress code
6. Magical map transition
7. Magical map / directions
8. Gallery
9. RSVP
10. Closing

This order may only change if explicitly requested.

---

# Dummy Event Content

Until final information is available, use the following test data.

```text
Quinceañera:
Valeria Ramírez

Initials:
VR

Event:
Mis XV años

Date:
October 18, 2026

Time:
7:00 PM

Venue:
Salón Encantado

Address:
Av. de la Luna 123,
Bosque Mágico,
Guadalajara, Jalisco

Dress code:
Formal
```

Suggested temporary welcome text:

> Valeria está por comenzar una nueva etapa llena de sueños, magia y momentos inolvidables. Acompáñanos a celebrar una noche muy especial en honor a sus XV años.

Suggested RSVP copy:

> Confirma tu asistencia y acompáñanos en esta noche mágica.

Suggested closing phrase:

> Que la magia nos encuentre juntos.

All dummy content should remain easy to replace.

---

# Gallery

The gallery does not currently contain final photography.

Use:

* dummy images
* placeholders
* neutral sample photography

Do not design around a specific photograph unless final images are later provided.

The final gallery should feel like a magical photo album rather than a conventional grid.

---

# Available Visual Assets

A custom visual asset pack has already been created.

It includes:

* VR circular monogram
* VR shield monogram
* VR horizontal monogram
* wax seal
* custom magical emblem
* section icons
* ornamental separators
* corner flourishes
* constellation elements
* parchment frame
* footprints
* compass rose
* magical location pin
* map route
* map cartouche
* parchment texture
* magical night texture
* violet magical glow texture
* CSS visual tokens
* design tokens

Use these assets before creating replacements.

---

# Approved Visual Reference

A mobile-first visual wireframe / storyboard has already been approved.

It represents the desired overall direction for:

* atmosphere
* vertical composition
* section rhythm
* magical identity
* envelope experience
* parchment usage
* gallery style
* RSVP mood

The wireframe is a visual reference, not a strict pixel-perfect specification.

Preserve its design intent while adapting layouts responsibly for real content and responsive behavior.

---

# Technical Direction

The intended stack is:

```text
Vite
HTML5
SCSS
Vanilla JavaScript
GSAP
```

Do not introduce a frontend framework unless explicitly requested.

The site should remain lightweight and optimized for mobile.

Technical rules are documented in:

```text
AGENTS.md
```

---

# Primary Device Context

Most guests are expected to open the invitation from mobile devices, often through:

* WhatsApp
* social media
* mobile browser links

Mobile is therefore the primary experience.

A useful reference viewport is:

```text
390 × 844
```

Desktop should enhance the experience without changing its narrative.

---

# Animation Philosophy

Animation should support storytelling.

Use sophisticated motion mainly for:

* envelope
* letter transition
* magical map

Other sections should use subtle scroll reveals.

Avoid unnecessary motion.

The invitation should remain elegant and readable.

Detailed motion behavior is documented in:

```text
docs/STORYBOARD.md
```

and visual animation rules are documented in:

```text
docs/DESIGN-SYSTEM.md
```

---

# RSVP Status

The final RSVP mechanism has not yet been selected.

Possible future options include:

* WhatsApp
* external form
* lightweight front-end form

Do not add a backend unless explicitly requested.

Build the RSVP UI so the final mechanism can be integrated later without redesigning the section.

---

# Map Status

The final physical address may change.

The decorative magical map should therefore be implemented independently from the final external map URL.

Event location data should come from centralized configuration.

The real maps CTA should be easy to update later.

---

# Project Priorities

When making tradeoffs, prioritize:

```text
1. Mobile usability
2. Event information clarity
3. Visual coherence
4. Envelope experience
5. Letter transition
6. Magical map
7. Performance
8. Gallery
9. Decorative complexity
```

Do not sacrifice usability or performance for visual effects.

---

# Documentation Map

Use the following documents according to their purpose.

## `PROJECT-CONTEXT.md`

Answers:

> What are we building and why?

---

## `AGENTS.md`

Answers:

> How should the coding agent work?

---

## `docs/DESIGN-SYSTEM.md`

Answers:

> How should the project look and feel?

---

## `docs/STORYBOARD.md`

Answers:

> What should the guest experience?

---

## `docs/IMPLEMENTATION-PLAN.md`

Answers:

> In what order should the project be built?

---

# Recommended Reading Order

Before starting major implementation work:

```text
1. PROJECT-CONTEXT.md
2. AGENTS.md
3. docs/DESIGN-SYSTEM.md
4. docs/STORYBOARD.md
5. docs/IMPLEMENTATION-PLAN.md
6. approved wireframe
7. visual asset kit
```

For later implementation phases, reread only the documents relevant to the requested work.

---

# Current Project Status

Completed:

* creative concept
* visual direction
* mobile-first wireframe
* visual asset kit v1
* project documentation structure

Not yet implemented:

* project codebase
* responsive HTML structure
* envelope animation
* GSAP timelines
* scroll animations
* magical map interaction
* gallery
* countdown
* RSVP

The next stage is implementation in VS Code following the phased plan.
