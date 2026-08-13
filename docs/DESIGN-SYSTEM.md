# DESIGN-SYSTEM.md

## Purpose

This document defines the visual language for the quinceañera web invitation.

It should be used as the primary reference for:

* colors
* typography
* spacing
* surfaces
* ornamental elements
* iconography
* photography
* section composition
* magical effects
* animation style
* visual hierarchy

The goal is to create a consistent magical / fantasy experience that feels elegant, cinematic, mysterious, youthful, and personalized.

This is not intended to reproduce Harry Potter literally.

The project should feel like its own original magical universe created specifically for **VR**.

---

# 1. Visual Concept

## Core Idea

The invitation should feel like:

> An enchanted letter that opens the door to a magical celebration.

The visual world combines:

* magical academy atmosphere
* antique parchment
* nighttime fantasy
* constellations
* old books
* heraldry
* wax seals
* secret maps
* glowing particles
* editorial quinceañera elegance

The result should feel magical without becoming childish or overly theatrical.

---

# 2. Brand Personality

The visual personality should communicate:

* mystery
* elegance
* celebration
* warmth
* fantasy
* youth
* refinement
* personality

The quinceañera is the protagonist.

Magical references are supporting elements.

---

# 3. Visual Keywords

Use these words as visual filters when making design decisions:

* magical
* nocturnal
* enchanted
* mysterious
* elegant
* editorial
* cinematic
* antique
* celestial
* delicate
* personal

Avoid visual decisions that feel:

* cartoonish
* childish
* generic fantasy
* gothic horror
* Halloween-like
* theme-park-like
* overly medieval
* overly saturated

---

# 4. Color System

The primary color identity is based on:

* black
* deep purple
* violet
* lilac

Warm gold and parchment tones balance the palette.

## Core Palette

### Magical Black

```css
--vr-black: #0B0B0F;
```

Use for:

* primary dark backgrounds
* intro experience
* navigation background
* deep contrast sections

Do not use pure black unless required.

---

### Midnight Purple

```css
--vr-midnight: #1A1430;
```

Use for:

* dark section backgrounds
* gradients
* cards
* navigation surfaces
* magical atmosphere

This should often replace flat black.

---

### Deep Purple

```css
--vr-purple: #4B2E83;
```

Use for:

* primary brand accents
* buttons
* decorative details
* magical highlights
* active navigation states

Avoid using it as a large saturated background too frequently.

---

### Lilac

```css
--vr-lilac: #B79ADB;
```

Use for:

* soft magical glow
* secondary accents
* borders
* decorative symbols
* subtle highlights

---

### Lavender

```css
--vr-lavender: #D8D2E6;
```

Use for:

* soft text accents
* backgrounds
* secondary decorative elements
* subtle section transitions

---

### Parchment

```css
--vr-parchment: #F3E9D6;
```

Use for:

* invitation letter
* map
* editorial light sections
* cards
* decorative paper surfaces

Avoid using completely flat parchment colors when possible.

Use texture and subtle variation.

---

### Antique Gold

```css
--vr-gold: #C8A66B;
```

Primary metallic accent.

Use for:

* borders
* icons
* headings
* separators
* monogram
* map lines
* ornaments

Gold should feel aged and elegant, not shiny yellow.

---

### Light Gold

```css
--vr-gold-light: #E6C98A;
```

Use selectively for:

* stars
* glow points
* important highlights
* active elements

---

### Ink

```css
--vr-ink: #201D18;
```

Use for text on parchment.

Avoid pure black on paper backgrounds when possible.

---

### Wax

```css
--vr-wax: #5A1424;
```

Use primarily for:

* wax seal
* subtle accent details

This color should remain secondary.

---

# 5. Color Usage Ratio

A useful approximate visual balance:

```text
45% dark backgrounds
25% parchment / light surfaces
15% purple / violet
10% antique gold
5% secondary accents
```

Do not treat this as a strict mathematical rule.

The purpose is to prevent the design from becoming overwhelmingly purple or gold.

---

# 6. Gradients

Gradients should be subtle.

Preferred examples:

```css
background:
  linear-gradient(
    180deg,
    #0B0B0F 0%,
    #1A1430 100%
  );
```

or:

```css
background:
  radial-gradient(
    circle at 50% 30%,
    rgba(75, 46, 131, 0.3),
    transparent 60%
  ),
  #0B0B0F;
```

Avoid:

* rainbow gradients
* neon gradients
* highly saturated purple gradients

---

# 7. Typography

Typography should feel editorial, magical, and elegant.

Use a maximum of three primary font families.

Recommended web-safe direction:

## Display Font

Recommended:

**Cormorant Garamond**

Use for:

* quinceañera name
* major section titles
* large dates
* XV
* emotional statements

Characteristics:

* editorial
* elegant
* classical
* expressive

Example:

```css
font-family: "Cormorant Garamond", Georgia, serif;
```

---

## Accent / Heraldic Font

Recommended:

**Cinzel**

Use sparingly for:

* navigation labels
* small section labels
* map headings
* ornamental text
* event metadata

Example:

```css
font-family: "Cinzel", Georgia, serif;
```

Avoid using it for long paragraphs.

---

## Body Font

Recommended:

**EB Garamond**

Use for:

* paragraphs
* event information
* descriptions
* RSVP text
* readable editorial content

Example:

```css
font-family: "EB Garamond", Georgia, serif;
```

---

# 8. Typography Scale

Mobile-first reference.

## Hero Name

```css
font-size: clamp(3.5rem, 18vw, 8rem);
line-height: 0.9;
```

---

## Main Section Title

```css
font-size: clamp(2.5rem, 10vw, 5rem);
line-height: 1;
```

---

## Large Date / Number

```css
font-size: clamp(5rem, 24vw, 10rem);
line-height: 0.8;
```

---

## Subtitle

```css
font-size: clamp(1.2rem, 5vw, 2rem);
```

---

## Body

```css
font-size: clamp(1rem, 4vw, 1.25rem);
line-height: 1.6;
```

---

## Small Label

```css
font-size: 0.75rem;
letter-spacing: 0.15em;
text-transform: uppercase;
```

---

# 9. Typography Rules

Prefer:

* generous line-height
* editorial spacing
* short line lengths
* clear hierarchy

Paragraph width should generally remain around:

```css
max-width: 60ch;
```

Do not center long paragraphs.

Centered typography is appropriate for:

* hero
* event date
* section introductions
* ceremonial moments

Body copy should often be left aligned.

---

# 10. Spacing System

Use a consistent spacing scale.

Recommended:

```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2.5rem;
--space-xl: 4rem;
--space-2xl: 6rem;
--space-3xl: 9rem;
```

Mobile sections should generally use:

```css
padding-inline: 1.25rem;
padding-block: 5rem;
```

Larger sections may use:

```css
padding-block: 7rem;
```

Desktop sections may increase to:

```css
padding-block: 8rem 10rem;
```

The design should feel spacious.

Avoid cramped layouts.

---

# 11. Layout System

The site should feel editorial rather than grid-heavy.

Prefer:

* asymmetric compositions
* overlapping decorative elements
* generous whitespace
* large typography
* vertical rhythm
* controlled image overlap

Avoid making every section look like:

```text
heading
paragraph
card
card
card
```

The page should feel like a sequence of visual scenes.

---

# 12. Section Width

Recommended maximum content width:

```css
--content-width: 1200px;
```

Long text content:

```css
max-width: 720px;
```

Full visual sections may use the entire viewport.

---

# 13. Section Rhythm

Alternate visual densities.

Example:

```text
high-impact section
↓
quiet editorial section
↓
high-impact section
↓
breathing space
↓
interactive section
```

Do not make every section visually intense.

---

# 14. Surfaces

Use three primary surface types.

## Dark Magical Surface

Characteristics:

* black / midnight purple
* subtle texture
* soft violet glow
* sparse stars

Use for:

* intro
* date
* RSVP
* closing

---

## Parchment Surface

Characteristics:

* warm ivory
* subtle paper texture
* antique gold linework
* ink-colored text

Use for:

* letter
* map
* selected editorial sections

---

## Lavender Editorial Surface

Characteristics:

* very light lavender
* soft neutral contrast
* subtle gold detail

Use sparingly for visual relief.

---

# 15. Parchment Treatment

Parchment must not feel like a flat beige rectangle.

Use:

* subtle paper texture
* edge darkening
* slight grain
* very restrained stains
* decorative frame
* irregular edge only when useful

Avoid:

* heavy burn effects
* fake torn edges everywhere
* exaggerated medieval paper texture

---

# 16. Magical Night Treatment

Dark backgrounds should use subtle depth.

Preferred visual ingredients:

* faint violet radial glow
* small stars
* light grain
* occasional gold sparks
* deep purple gradient

Avoid animated backgrounds with constant heavy movement.

---

# 17. Monogram

The main identity mark is:

**VR + XV**

Available versions may include:

* circular monogram
* shield monogram
* horizontal monogram

Use the circular or shield version for:

* envelope
* closing
* hero accents

Use horizontal version for:

* navigation
* footer-like areas
* desktop compositions

Do not use all versions simultaneously within the same viewport.

---

# 18. Wax Seal

The wax seal is one of the most recognizable custom assets.

Use primarily in the intro.

The seal should:

* feel tactile
* use burgundy wax
* contain VR / XV
* have subtle gold embossing

It may receive:

* soft glow
* tiny scale pulse
* hover response

Do not make it constantly bounce.

---

# 19. Original Magical Emblem

The custom magical crest should be treated as an original fantasy-house symbol.

Possible uses:

* welcome section
* dress-code section
* decorative background
* map references

It should not dominate every section.

Use it as a secondary storytelling element.

---

# 20. Iconography

Icons should follow a consistent style.

Characteristics:

* line-based
* antique gold stroke
* rounded or elegant endpoints
* minimal internal detail
* SVG

Recommended stroke range:

```css
stroke-width: 2px–3px;
```

Use icons for:

* date
* time
* venue
* dress code
* gallery
* map
* RSVP
* countdown

Icons should support information rather than become decorative clutter.

---

# 21. Ornaments

Approved ornamental vocabulary includes:

* stars
* moons
* diamonds
* constellations
* fine lines
* corner flourishes
* cartouches
* botanical curves
* small celestial details

Use ornaments primarily to:

* separate sections
* frame important text
* guide visual rhythm
* add depth to parchment

Avoid filling empty space simply because it exists.

---

# 22. Stars and Sparkles

Stars should feel refined.

Preferred styles:

* four-point stars
* small eight-point stars
* tiny dots
* constellation patterns

Avoid emoji-like stars.

Use a mix of:

```text
gold
lilac
very subtle ivory
```

---

# 23. Magical Particles

Particles should be sparse.

Recommended visible count:

```text
20–60 elements
```

depending on viewport and implementation.

Preferred behavior:

* slow float
* opacity variation
* slight scale
* occasional glow

Particles must remain background elements.

---

# 24. Photography

The quinceañera photography should remain one of the strongest visual elements.

Use images with:

* natural light
* elegant styling
* clean compositions
* good contrast
* portrait orientation when possible

Avoid applying heavy fantasy filters to every image.

The fantasy atmosphere should come from the interface around the photos.

---

# 25. Gallery Style

The gallery should feel like a magical photo album.

Preferred layout:

* staggered cards
* slightly varied size
* subtle rotation
* small overlap
* parchment or gold frames

Example:

```text
    photo

             photo

 photo

        photo
```

Rotation range:

```css
transform: rotate(-2deg);
```

to:

```css
transform: rotate(2deg);
```

Keep rotations subtle.

---

# 26. Image Frames

Possible treatments:

* thin antique gold border
* parchment mat
* soft dark shadow
* decorative corner elements

Avoid thick modern card borders.

---

# 27. Navigation

Navigation should remain visually understated.

## Initial State

During the intro:

* hidden or nearly invisible

## Main Site

After intro:

* sticky
* dark translucent background
* subtle backdrop blur

Example:

```css
background: rgba(11, 11, 15, 0.72);
backdrop-filter: blur(12px);
```

Navigation labels should use the accent font.

Desktop:

```text
VR   HISTORIA   FECHA   VESTIMENTA   MAPA   GALERÍA   RSVP
```

Mobile:

```text
VR                                      ☰
```

---

# 28. Buttons

Buttons should feel elegant and magical.

Primary button:

* deep purple background
* antique gold border
* parchment or light-gold text

Example:

```css
background: var(--vr-purple);
border: 1px solid var(--vr-gold);
color: var(--vr-parchment);
```

Hover:

* subtle glow
* small translateY
* slightly brighter border

Avoid large pill-shaped modern SaaS buttons.

Recommended radius:

```css
border-radius: 0.25rem;
```

or subtle custom corners.

---

# 29. Links

Inline links should use:

* gold
* underline
* subtle hover glow

Avoid bright blue default link colors.

---

# 30. Form Fields

RSVP fields should feel integrated into the theme.

Preferred:

* transparent or dark background
* thin gold border
* parchment text
* elegant labels

Example:

```css
border-bottom: 1px solid var(--vr-gold);
background: transparent;
```

Avoid generic white rectangular form controls when possible.

---

# 31. Map Visual Language

The magical map is a hero section.

Visual ingredients:

* parchment
* compass rose
* route line
* footprints
* custom location marker
* cartouche labels
* hand-drawn-looking linework

The decorative map should feel like an enchanted document.

Do not attempt to reproduce the official Marauder's Map.

---

# 32. Map Route

Route line:

* antique gold or ink
* dashed or hand-drawn
* progressively revealed

Footprints should follow or appear near the route.

The final event location should be visually emphasized.

---

# 33. Footprints

Footprints should feel magical but subtle.

Preferred behavior:

```text
appear
↓
move slightly
↓
fade
↓
next footprint
```

or travel progressively along the route.

Avoid showing dozens simultaneously.

---

# 34. Countdown

Countdown should feel ceremonial, not digital.

Avoid:

```text
00:00:00
```

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

Use large serif numbers.

Use small uppercase labels.

---

# 35. Dress Code Visual Style

Dress code should remain elegant.

May reference magical houses through:

* abstract colors
* symbols
* virtues
* heraldic shapes

Do not display official house logos.

Use restrained color accents.

Primary palette remains the VR brand palette.

---

# 36. Welcome Section

The welcome section should visually establish VR as the protagonist.

Preferred hierarchy:

```text
small ceremonial label

VR emblem

NAME

XV

portrait

short emotional text
```

This section may use parchment or a transitional light surface.

---

# 37. Date Section

Date should be one of the strongest typographic moments.

The day number may dominate the composition.

Example:

```text
18

OCTUBRE

2026
```

Use negative space generously.

---

# 38. RSVP Section

RSVP should feel like the final invitation ritual.

Preferred mood:

* dark background
* restrained stars
* gold ornamentation
* clear form
* strong CTA

After successful confirmation:

* subtle sparkles
* short confirmation message
* no exaggerated celebration animation

---

# 39. Closing Section

The closing should be quiet and emotional.

Suggested composition:

```text
VR

XV

date

short final phrase

small constellation
```

Avoid introducing new visual motifs at the end.

---

# 40. Motion Design Principles

Animation should feel:

* smooth
* slow enough to appreciate
* intentional
* cinematic
* elegant

Recommended easing families:

```js
power2.out
power3.out
sine.inOut
expo.out
```

Use spring-like effects sparingly.

---

# 41. Animation Duration

General reference:

Microinteraction:

```text
0.2–0.4s
```

Element reveal:

```text
0.6–1.0s
```

Large visual reveal:

```text
1.0–1.8s
```

Intro cinematic sequence:

```text
multiple coordinated steps
```

Avoid animations longer than necessary.

---

# 42. Scroll Reveals

Default section reveal:

```text
opacity: 0 → 1
translateY: 24px → 0
```

with subtle stagger.

Do not apply the exact same reveal to every element.

Use variations based on hierarchy.

---

# 43. Glow

Glow should remain subtle.

Preferred:

```css
filter:
  drop-shadow(
    0 0 10px
    rgba(183, 154, 219, 0.35)
  );
```

Gold glow should be weaker.

Avoid neon effects.

---

# 44. Shadows

Preferred shadows:

```css
box-shadow:
  0 20px 60px
  rgba(0, 0, 0, 0.35);
```

Parchment surfaces may use softer shadows.

Avoid strong modern card shadows everywhere.

---

# 45. Border Radius

The visual language should feel editorial and antique.

Recommended:

```text
0px–8px
```

depending on component.

Avoid excessive rounded cards.

---

# 46. Texture Usage

Texture is important but must remain subtle.

Use:

* parchment grain
* fine paper grain
* dark atmospheric noise

Texture opacity should generally remain low.

Avoid obvious repeating textures.

---

# 47. Responsive Behavior

Mobile is the primary design.

On mobile:

* typography remains dramatic
* sections stack vertically
* decorative assets should not obstruct content
* animations should require less travel distance
* map should remain readable
* gallery should reduce overlap

On desktop:

* allow more asymmetry
* increase negative space
* allow decorative elements farther from content
* use larger typography

---

# 48. Accessibility Considerations

Ensure text contrast remains high.

On dark backgrounds:

```text
parchment / lavender / gold-light
```

On parchment:

```text
ink / deep purple
```

Do not rely only on color to communicate information.

Decorative stars and ornaments should be hidden from screen readers.

---

# 49. Visual Anti-Patterns

Do not use:

* emoji as design assets
* neon purple
* bright yellow as dominant color
* fake Harry Potter logo fonts
* official house crests
* wizard clip art
* excessive lightning bolts
* floating magical objects everywhere
* saturated rainbow effects
* heavy gothic typography
* excessive parchment sections
* excessive particle effects

---

# 50. Visual Priority

When deciding between adding more decoration or simplifying:

**simplify.**

The invitation should feel special because of:

* composition
* typography
* motion
* custom assets
* photography
* atmosphere

not because of visual clutter.

---

# 51. Approved Asset Categories

The project currently includes custom assets for:

* VR monogram
* VR + XV shield
* wax seal
* magical emblem
* section icons
* stars and constellations
* decorative separators
* parchment frame
* footprints
* compass
* magical map marker
* route path
* map cartouche
* parchment textures
* magical night textures

Use these as the baseline visual language.

---

# 52. Final Visual Test

Before considering a section visually complete, ask:

1. Does it feel consistent with the VR identity?
2. Does it feel magical without being childish?
3. Is the quinceañera still the protagonist?
4. Is the typography elegant and readable?
5. Are decorative elements supporting the content?
6. Is the section visually distinct from the previous one?
7. Does it work on mobile?
8. Is the animation necessary?
9. Is there enough breathing room?
10. Would removing one decorative element improve it?

If the answer to question 10 is yes, remove it.
