# Normalized visual assets

This directory contains normalized copies of the supplied visual kit. The
original files in `/assets` are preserved unchanged.

Several supplied filenames and extensions did not match their actual content.
The copies here are organized and named according to what each file contains,
not according to its original filename.

## Identity

| Normalized file | Original source |
| --- | --- |
| `identity/monogram-circle-vr-xv.svg` | `assets/monogram-shield-vr-xv.svg` |
| `identity/monogram-shield-vr-xv.svg` | `assets/magical-house-emblem-vr.svg` |
| `identity/monogram-horizontal-vr-xv.svg` | `assets/monogram-circle-vr-xv.svg` |
| `identity/magical-house-emblem-vr.svg` | `assets/time.svg` |
| `identity/wax-seal-vr.png` | `assets/parchment-texture.webp` (PNG data) |
| `identity/wax-seal-vr.webp` | `assets/violet-magic-glow.webp` |

## Icons

| Normalized file | Original source |
| --- | --- |
| `icons/rsvp.svg` | `assets/camera.svg` |
| `icons/camera.svg` | `assets/compass-rose.svg` |
| `icons/time.svg` | `assets/countdown.svg` |
| `icons/gallery.svg` | `assets/date.svg` |
| `icons/map.svg` | `assets/envelope.svg` |
| `icons/date.svg` | `assets/footprints-pair.svg` |
| `icons/building.svg` | `assets/footprints.svg` |
| `icons/countdown.svg` | `assets/gallery.svg` |
| `icons/venue.svg` | `assets/location.svg` |
| `icons/dress-code.svg` | `assets/rsvp.svg` |
| `icons/envelope.svg` | `assets/sparkles.svg` |

## Map and ornaments

| Normalized file | Original source |
| --- | --- |
| `map/parchment-frame.svg` | `assets/dress-code.svg` |
| `map/route-path.svg` | `assets/constellation.svg` |
| `map/footprints-pair.svg` | `assets/separator-diamonds.svg` |
| `map/footprints-trail.svg` | `assets/welcome.svg` |
| `map/compass-rose.svg` | `assets/separator-moon.svg` |
| `map/location-pin.svg` | `assets/separator-star.svg` |
| `map/location-pin-simple.svg` | `assets/route-path.svg` |
| `map/label-cartouche.svg` | `assets/corner-flourish.svg` |
| `map/constellation.svg` | `assets/map-label-cartouche.svg` |
| `ornaments/corner-flourish.svg` | `assets/wax-seal-vr.webp` (SVG data) |
| `ornaments/constellation-line.svg` | `assets/visual-tokens.css` (SVG data) |
| `ornaments/separator-diamonds.svg` | `assets/design-tokens.json` (SVG data) |
| `ornaments/separator-moon.svg` | `assets/wax-seal-vr.png` (SVG data) |
| `ornaments/separator-star.svg` | `assets/parchment-texture.jpg` (SVG data) |

## Tokens and references

- `design-tokens.json` comes from the supplied `assets/README.md`, which
  contains valid JSON rather than Markdown.
- `reference/visual-kit-v1.png` comes from `assets/violet-magic-glow.jpg`,
  which contains PNG data and is a reference board, not a production texture.

## Missing production exports

The supplied kit does not contain standalone production files for the
parchment texture, magical-night texture, or violet glow shown on the visual
reference board. These should not be extracted from the board. Until corrected
exports are supplied, implementation should use restrained CSS surfaces or
clearly marked temporary placeholders.
