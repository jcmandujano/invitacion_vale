# STORYBOARD.md

## Purpose

This document defines the narrative flow and interaction sequence for the quinceañera invitation.

It should be used as the primary reference for:

* scene order
* user journey
* section transitions
* animation triggers
* interaction timing
* cinematic moments
* scroll-based reveals
* major visual states

This document does not define detailed styling.

For visual rules, use:

* `docs/DESIGN-SYSTEM.md`

For implementation order, use:

* `docs/IMPLEMENTATION-PLAN.md`

---

# 1. Experience Overview

The invitation should feel like a short interactive magical story.

The guest should not feel that they simply opened a website.

The intended narrative is:

```text
A magical invitation arrives
        ↓
The guest opens it
        ↓
The invitation reveals a new world
        ↓
The quinceañera is introduced
        ↓
The celebration details are discovered
        ↓
A magical map reveals the destination
        ↓
The guest explores memories
        ↓
The guest confirms attendance
        ↓
The experience closes quietly
```

The journey should feel continuous.

Avoid hard visual breaks unless they are narratively intentional.

---

# 2. Narrative Structure

The experience is divided into three acts.

## Act I — The Invitation Arrives

Purpose:

Create curiosity and establish the magical world.

Scenes:

1. Preload / darkness
2. Magical atmosphere
3. Envelope arrival
4. Seal interaction
5. Envelope opening
6. Letter reveal
7. Letter-to-site transition

---

## Act II — Discover the Celebration

Purpose:

Introduce the quinceañera and reveal the event.

Scenes:

8. Welcome
9. Date
10. Countdown
11. Venue
12. Dress code

---

## Act III — Follow the Journey

Purpose:

Guide the guest toward the celebration and complete the invitation.

Scenes:

13. Map transition
14. Magical map
15. Gallery
16. RSVP
17. Confirmation
18. Closing

---

# 3. Global Experience Rules

The invitation should preserve a calm cinematic rhythm.

Not every section requires complex animation.

The most sophisticated animation should be reserved for:

1. envelope arrival
2. envelope opening
3. letter-to-site transition
4. magical map

Other sections should use restrained reveals.

---

# 4. Initial Page State

When the page loads:

* body is locked from scrolling
* main invitation content is prepared but not yet exposed
* navigation is hidden
* intro occupies the viewport
* background is dark
* essential assets should be loaded before the main intro begins

The user should not briefly see the final website before the intro.

Avoid layout flashes.

---

# 5. Scene 00 — Preload

## Objective

Hide asset loading and establish the first hint of magic.

## Visual State

Background:

* magical black
* almost no visible decoration

Possible elements:

* small star
* constellation point
* tiny VR monogram
* subtle text

Suggested temporary message:

> Preparando la magia…

The message is optional.

## Motion

A minimal element may:

* fade
* slowly rotate a few degrees
* draw itself
* pulse softly

Do not use a conventional loading bar unless technically necessary.

## Exit

Once critical intro assets are ready:

* loader fades
* magical background remains

Transition directly into Scene 01.

---

# 6. Scene 01 — Darkness Awakens

## Objective

Create anticipation before the envelope appears.

## Initial State

The viewport is almost completely dark.

Visible elements may include:

* very subtle grain
* faint violet radial glow
* sparse particles
* small gold or lilac stars

## Animation

Suggested sequence:

1. background glow fades in
2. particles begin appearing
3. a few sparkles activate
4. light subtly grows around the center

Movement should remain very slow.

This scene should feel atmospheric rather than spectacular.

---

# 7. Scene 02 — Envelope Arrival

## Objective

Introduce the invitation as a physical magical object.

The envelope is the first hero object.

## Entry

The envelope may enter:

* from the upper-right
* from slightly above the viewport
* with subtle rotation

Suggested movement:

```text
off-screen
    ↓
diagonal descent
    ↓
slight overshoot
    ↓
settle in center
```

## Envelope Appearance

The envelope should show:

* recipient name
* VR identity
* wax seal
* subtle decorative details

Dummy copy may be used.

Example:

```text
Srta. Valeria Ramírez

Una invitación especial
ha llegado para ti
```

## Motion Details

During arrival:

* shadow grows as envelope approaches
* rotation gradually settles
* scale may increase slightly
* particles react subtly around it

Avoid exaggerated bouncing.

---

# 8. Scene 03 — Invitation Waiting State

## Objective

Give the guest control.

Once the envelope has settled:

* the animation pauses
* the wax seal becomes interactive
* a subtle hint communicates that it can be opened

Possible hint:

> Toca el sello para abrir

The hint may fade in after a short delay.

## Seal Idle Motion

Allowed:

* subtle pulse
* soft glow
* tiny scale change

Do not bounce the seal.

## Interaction

Trigger:

* click
* tap
* keyboard activation if seal is implemented as a button

The envelope must not open automatically.

---

# 9. Scene 04 — Seal Activation

## Objective

Reward the interaction and initiate the opening sequence.

## Trigger

User activates the wax seal.

## Sequence

1. seal slightly compresses
2. small golden/lilac light appears
3. subtle sparkle burst
4. seal separates or fades away
5. envelope opening begins

The effect should last only briefly.

Avoid explosion-like particle effects.

---

# 10. Scene 05 — Envelope Opening

## Objective

Make the envelope feel physical.

## Sequence

Recommended layer order:

```text
envelope-back
letter
envelope-front
flap
seal
```

The flap should rotate backward using 3D perspective.

Suggested steps:

1. seal interaction completes
2. flap rotates open
3. inner letter becomes more visible
4. envelope front remains in foreground
5. letter begins rising

Use CSS transforms / GSAP for the physical envelope motion.

---

# 11. Scene 06 — Letter Reveal

## Objective

Transition from physical invitation to digital experience.

The letter rises from inside the envelope.

## Sequence

1. letter moves upward
2. envelope moves slightly downward
3. letter increases in scale
4. letter becomes the dominant object
5. decorative content on the letter fades into view

Possible letter content:

```text
VR

Mis XV años

Una nueva historia
está por comenzar
```

This content may be minimal because the full welcome section follows.

---

# 12. Scene 07 — Letter-to-Website Transition

## Objective

Create the first major visual surprise.

The guest should feel that the letter itself becomes the website.

Avoid:

```text
letter
↓
black fade
↓
website
```

Prefer:

```text
letter
↓
scale
↓
fills viewport
↓
paper surface becomes webpage
```

## Transition Strategy

Possible approach:

1. letter scales toward viewport
2. envelope fades/moves away
3. letter corners leave the visible frame
4. paper texture expands to full section
5. website content becomes visible inside the same visual surface
6. scroll lock is released
7. navigation becomes available

The exact implementation may evolve technically.

The visual illusion is the priority.

---

# 13. Main Website State

After Scene 07:

* intro is considered complete
* body scrolling becomes available
* navigation becomes active
* normal scroll experience begins

The user should arrive directly at the Welcome section.

Do not force another click.

---

# 14. Scene 08 — Welcome

## Objective

Introduce the quinceañera as the protagonist.

The section should answer:

> Who are we celebrating?

## Content

Suggested hierarchy:

```text
small ceremonial label

VR / XV identity

Valeria Ramírez

portrait

short emotional introduction
```

Dummy bio:

> Valeria está por comenzar una nueva etapa llena de sueños, magia y momentos inolvidables. Acompáñanos a celebrar una noche muy especial en honor a sus XV años.

## Reveal

As section enters:

1. ornamental label appears
2. name reveals
3. portrait fades/scales gently
4. biography follows
5. decorative SVG details draw or fade

Keep the sequence calm.

---

# 15. Scene 09 — Date Reveal

## Objective

Make the event date memorable.

The date should be strongly typographic.

Example:

```text
18

OCTUBRE

2026
```

## Reveal

Suggested:

* section label fades
* large day number rises slightly
* month appears
* year follows
* small ornament completes the composition

No complex interaction is required.

---

# 16. Scene 10 — Countdown

## Objective

Create anticipation and connect the guest to the upcoming event.

The countdown belongs directly after the date.

## Layout

Preferred:

```text
71
DÍAS

16
HORAS

43
MIN

21
SEG
```

On mobile, use a layout that remains readable without overcrowding.

## Behavior

Countdown:

* updates dynamically
* starts automatically
* should remain synchronized with the configured event date

## Entrance

Numbers may:

* fade upward
* stagger slightly

Do not continuously animate them beyond the numeric update.

---

# 17. Scene 11 — Venue

## Objective

Introduce the physical event location before the decorative map.

## Content

Suggested:

```text
La celebración tendrá lugar en

SALÓN ENCANTADO

Ciudad / region

small venue details
```

The exact address may be intentionally withheld until the map section.

## Reveal

Simple:

* heading
* venue
* short supporting copy

Potential venue photo or architectural illustration may appear.

---

# 18. Scene 12 — Dress Code

## Objective

Communicate attire clearly while preserving the magical language.

## Content

Example:

```text
DRESS CODE

Formal

Damas
Vestido formal

Caballeros
Traje / formal
```

Optional phrase:

> No importa de qué casa vengas, esta noche todos celebramos juntos.

## Visual Reference

Subtle magical-house influence may appear through:

* four symbols
* color accents
* virtues
* custom heraldic imagery

Do not turn this section into a house selector.

## Reveal

Cards or labels may stagger gently.

---

# 19. Scene 13 — Transition to the Map

## Objective

Signal that the guest is entering a new part of the story.

This transition should be visually distinct.

The visual environment moves from:

```text
dark / editorial
```

toward:

```text
parchment / map
```

## Possible Transition

1. dark background begins warming
2. paper texture emerges
3. map ornamentation appears
4. central phrase reveals

Suggested original phrase:

> Todo viaje mágico comienza con un destino.

Avoid direct quotes from Harry Potter.

## Motion

Could include:

* parchment unfolding
* mask reveal
* vertical paper transition
* light traveling across paper

This transition should prepare Scene 14.

---

# 20. Scene 14 — Magical Map

## Objective

Create the second major hero moment after the intro.

The map should reveal the route toward the celebration.

The map is inspired by enchanted parchment maps but must remain visually original.

## Initial State

When section enters:

* parchment is visible
* most map linework is hidden
* location marker is inactive
* footprints are not yet visible

## Sequence

Recommended:

1. map frame appears
2. compass appears
3. major map lines draw
4. route path begins drawing
5. footprints progressively appear
6. footprints follow or imply movement along route
7. final destination activates
8. event label appears
9. external map CTA becomes visible

## Route

Use the custom SVG route.

Potential GSAP techniques:

* stroke-dashoffset reveal
* MotionPath
* staggered footprints

## Footprints

Preferred behavior:

```text
footprint 1
    ↓
footprint 2
    ↓
footprint 3
    ↓
destination
```

Avoid dozens of footprints.

## Destination

At completion:

* magical location pin glows
* venue name appears
* subtle star/spark activates

## CTA

Example:

> Ver ubicación

CTA opens the configured real-world maps URL.

---

# 21. Map Interaction Rules

The decorative map must not prevent actual navigation.

If animations fail:

* address remains readable
* CTA remains usable

Do not require the animation to finish before the guest can access the location.

---

# 22. Scene 15 — Gallery Transition

## Objective

Provide visual breathing room after the map.

The visual atmosphere should become softer and more personal.

Possible transition:

* parchment fades into light lavender or soft neutral
* map decorations recede
* first photograph emerges

---

# 23. Scene 16 — Gallery

## Objective

Celebrate the quinceañera through photographs.

The gallery should feel like discovering a magical photo album.

## Content

Use dummy images until final photos are available.

## Layout

Preferred mobile behavior:

* vertically staggered photographs
* varying proportions
* minimal overlap

Desktop may increase asymmetry.

## Scroll Reveal

Photos may:

* fade
* scale from approximately `.96`
* rotate gently into position

Keep rotation subtle.

## Interaction

Tap/click:

* open lightbox
* show larger image
* allow closing easily

Lightbox should remain simple.

Do not create a complex carousel unless required.

---

# 24. Scene 17 — RSVP

## Objective

Turn the magical narrative into a clear action.

The visual atmosphere returns to the dark magical palette.

## Content

Suggested:

```text
TU PRESENCIA
COMPLETARÁ LA HISTORIA

Confirma tu asistencia

Name field
Guests / attendees
Confirm CTA
```

Exact RSVP mechanism may change later.

Possible implementations:

* WhatsApp
* external form
* simple web form

No backend is required unless explicitly requested.

## Reveal

1. section heading
2. short copy
3. form
4. CTA

Do not over-animate form fields.

---

# 25. Scene 18 — RSVP Confirmation

## Objective

Give clear feedback after the action.

After successful confirmation:

* form may collapse or transition
* confirmation message appears
* small sparkles activate
* VR symbol may appear

Example:

```text
Asistencia confirmada

Nos vemos en una noche
llena de magia.
```

Keep celebration subtle.

Avoid confetti unless specifically requested later.

---

# 26. Scene 19 — Closing

## Objective

End the experience gently.

This should feel like the final page of a book.

## Content

Suggested:

```text
VR

XV

18 · 10 · 26

Que la magia nos encuentre juntos.
```

Add:

* small constellation
* subtle gold ornament
* optional monogram

## Motion

Very simple:

* fade
* slight upward reveal

No major new animation.

---

# 27. Navigation Story

Navigation must respect the narrative.

## During Intro

Navigation is hidden.

## After Intro

Navigation becomes available.

Suggested sections:

```text
Inicio
Fecha
Vestimenta
Mapa
Galería
RSVP
```

Desktop may show full labels.

Mobile should use a compact menu.

Navigation should not interrupt the cinematic intro.

---

# 28. Scroll Behavior

Normal browser scrolling should be preserved.

Avoid hijacking scroll unnecessarily.

ScrollTrigger may synchronize reveals, but users should still feel in control.

Do not force long pinned sequences unless they clearly improve the story.

Prefer a smooth natural vertical journey.

---

# 29. Animation Trigger Strategy

Use three trigger categories.

## Interaction Trigger

Used for:

* wax seal
* navigation
* gallery
* RSVP

## Scroll Trigger

Used for:

* section reveals
* date
* dress code
* map
* gallery imagery

## Time-Based Timeline

Used for:

* loader
* magical atmosphere
* envelope arrival
* envelope opening sequence after user interaction

---

# 30. Scroll Reveal Threshold

General reference:

Reveal when approximately:

```text
15%–30%
```

of a section has entered the viewport.

Adjust based on content.

Avoid triggering critical animations too late.

---

# 31. Replaying Animations

Most section reveals should occur once.

Recommended:

```text
once: true
```

for:

* welcome
* date
* map drawing
* gallery image entrance

Avoid repeating expensive animation every time the user scrolls back.

Interactive hover/tap effects may repeat normally.

---

# 32. Reduced Motion Experience

When reduced motion is requested:

## Intro

Simplify to:

```text
dark background
↓
envelope visible
↓
user opens
↓
short fade to website
```

Avoid large movement across the screen.

## Sections

Show content with minimal or instant fades.

## Map

Reveal completed map rather than drawing long paths.

All content must remain usable.

---

# 33. Mobile Motion Adjustments

Mobile animations should generally use:

* shorter travel distances
* fewer particles
* fewer simultaneous animated elements
* shorter stagger values

Avoid complex parallax on small screens if it hurts performance.

The emotional experience should remain intact even when animations are simplified.

---

# 34. Timing Philosophy

Do not make the guest wait unnecessarily.

The intro should feel cinematic but concise.

The guest should reach the invitation content quickly after choosing to open the seal.

Avoid:

* long forced animations
* repeated loading sequences
* multiple confirmation clicks

The user interaction with the seal is the main deliberate pause.

---

# 35. Hero Moments

The project has three primary hero moments.

## Hero Moment 1

Envelope arrival and opening.

Purpose:

Create curiosity.

---

## Hero Moment 2

Letter becomes the website.

Purpose:

Create surprise and continuity.

---

## Hero Moment 3

Magical map route and footprints.

Purpose:

Create delight and reinforce the theme.

All other animation should support these moments rather than compete with them.

---

# 36. Emotional Rhythm

Target rhythm:

```text
mystery
↓
surprise
↓
warmth
↓
anticipation
↓
information
↓
discovery
↓
nostalgia / personality
↓
commitment
↓
quiet emotional close
```

This emotional rhythm should guide transition pacing.

---

# 37. Content Priority

Even during highly visual scenes, information must remain easy to understand.

Priority:

```text
content
↓
interaction
↓
animation
↓
decoration
```

Never invert this hierarchy.

---

# 38. Failure-Safe Behavior

The page must remain understandable if animation is unavailable.

If GSAP fails or JavaScript is partially unavailable:

* event information should remain in the DOM
* content should still be readable
* maps CTA should remain accessible
* RSVP CTA should remain accessible

Do not build core event information exclusively inside animation-generated DOM.

---

# 39. End-to-End Flow

Final expected journey:

```text
LOAD
  ↓
PRELOAD
  ↓
DARKNESS
  ↓
MAGICAL PARTICLES
  ↓
ENVELOPE ARRIVES
  ↓
ENVELOPE WAITS
  ↓
USER TAPS SEAL
  ↓
SEAL ACTIVATES
  ↓
FLAP OPENS
  ↓
LETTER RISES
  ↓
LETTER FILLS VIEWPORT
  ↓
WEBSITE REVEALS
  ↓
WELCOME
  ↓
DATE
  ↓
COUNTDOWN
  ↓
VENUE
  ↓
DRESS CODE
  ↓
PARCHMENT TRANSITION
  ↓
MAGICAL MAP
  ↓
ROUTE DRAWS
  ↓
FOOTPRINTS TRAVEL
  ↓
LOCATION REVEALS
  ↓
GALLERY
  ↓
RSVP
  ↓
CONFIRMATION
  ↓
CLOSING
```

---

# 40. Storyboard Completion Test

Before considering the experience complete, verify:

1. Does the intro immediately establish mystery?
2. Does the guest understand that the seal is interactive?
3. Does the envelope open only after user interaction?
4. Does the letter-to-site transition feel continuous?
5. Is the quinceañera clearly established as the protagonist?
6. Is the event date easy to remember?
7. Does the countdown support anticipation without distracting?
8. Is the venue information clear?
9. Is the dress code understandable?
10. Does the map feel like a hero moment?
11. Can the guest easily open the real map location?
12. Does the gallery feel personal rather than generic?
13. Is RSVP obvious and simple?
14. Does confirmation clearly communicate success?
15. Does the closing feel like a deliberate ending?
16. Does the complete journey remain smooth on mobile?

If any major scene feels disconnected from the previous one, improve the transition before adding additional decoration.
