---
name: BOA Network
description: A label house style for a UK production company; poster caps over real footage, one deep gold, heavy fog.
colors:
  gold: "#e8b31a"
  amber: "#f6c83a"
  obsidian: "#0a0a0a"
  ink: "#101010"
  charcoal: "#161616"
  bone: "#ffffff"
  hud: "#e6e6e6"
  mist: "#b5b5b5"
typography:
  display:
    fontFamily: "Anton, Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(4.5rem, min(19vw, 27svh), 19rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.01em"
  headline-xl:
    fontFamily: "Anton, Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(3.75rem, 15vw, 15rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Anton, Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 9.5vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.01em"
  title:
    fontFamily: "Anton, Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 5.4vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.01em"
  lede:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.18em"
  meta:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  hard: "2px"
  pill: "9999px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "3.5rem"
  container-max: "1600px"
  section: "clamp(5rem, 14vw, 13rem)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "#000000"
    typography: "{typography.label}"
    rounded: "{rounded.hard}"
    padding: "1rem 2rem"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.amber}"
    textColor: "#000000"
  button-ghost:
    backgroundColor: "rgb(0 0 0 / 0.25)"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.hard}"
    padding: "1rem 2rem"
    height: "3.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.bone}"
    textColor: "#000000"
  chip:
    backgroundColor: "transparent"
    textColor: "rgb(255 255 255 / 0.8)"
    typography: "{typography.label}"
    rounded: "{rounded.hard}"
    padding: "0.75rem 1.3rem"
  chip-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
  input:
    backgroundColor: "rgb(10 10 10 / 0.6)"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.hard}"
    padding: "1rem 1.15rem"
    height: "3.5rem"
  panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.hard}"
  status-badge:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.meta}"
    rounded: "{rounded.hard}"
    padding: "0.25rem 0.75rem"
  play-disc:
    backgroundColor: "{colors.gold}"
    textColor: "#000000"
    rounded: "{rounded.pill}"
    size: "5rem"
---

# Design System: BOA Network

## Overview

**Creative North Star: "The House Style of a Label"**

BOA reads like a record label or a premium streamer's editorial house: the slate is the hero, set in poster-scale condensed caps over real footage. The ground is near-black, the type is stark white, and one deep gold carries the logo, the primary action and single accent words. Nothing is soft or tasteful-startup; there is no gradient wash behind the copy and no frosted card holding it.

Depth comes from the room, not from the furniture. Heavy fog drifts across every page in screen blend, a warm key light breathes behind headlines, and film grain re-rolls over everything like a projected print. Surfaces themselves are hard-edged slabs with hairline borders. Motion is held and deliberate: entrances hold, commit, then settle; hovers answer quickly and ease out.

Media is never an empty box. Every production frame is a full-bleed tile that pushes in on hover, and every trailer starts as its poster with a glowing gold play disc.

**Key Characteristics:**
- Near-black ground (obsidian), stark white type, one deep gold accent.
- Anton poster caps for every heading; Manrope for reading; JetBrains Mono only for production metadata.
- Fixed drifting fog, warm spotlight and film grain as the atmosphere; no vignette.
- Hard 2px corners everywhere except the status dot and the play disc.
- easeInOutExpo entrances, cine ease-out hovers.

## Colors

A monochrome near-black world with a single deep gold that does all the signalling.

### Primary
- **Label Gold** (gold): the logo, the primary button, accent words inside headlines, active nav, selected chips, production metadata on tiles, focus outlines and text selection.
- **Hot Amber** (amber): the hover state of gold surfaces (primary button, play disc) and a focused field's label. Never a resting colour.

### Neutral
- **Obsidian** (obsidian): the page ground, the html and body background, and the dark text on gold.
- **Ink Slab** (ink): solid panels and the footer band; one step lighter than the ground.
- **Charcoal Frame** (charcoal): the placeholder fill behind media tiles and select option lists.
- **Stark White** (bone): display type, body copy, ghost button text and borders.
- **Viewfinder White** (hud): tracked labels at 80% and the in-production status; a soft off-white for HUD detail.
- **Mist** (mist): ledes, secondary copy, form labels at rest and inactive counts.

Hairlines are white at low alpha: 7% to 10% for panel and header edges, 20% for chips, 55% for the ghost button.

### Named Rules
**The One Gold Rule.** Gold is the only hue. It marks the logo, the one primary action in view and single accent words; a second accent colour does not exist.

**The Flat Display Rule.** Display type is flat white or flat gold. No gradient text, no clipped-background fills, no tinted overlays across headlines.

## Typography

**Display Font:** Anton (with Oswald, Arial Narrow)
**Body Font:** Manrope Variable (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo), production metadata only

**Character:** Poster caps against a warm, open grotesk. Anton ships one weight, so size and colour do all the work; Manrope carries everything that is read rather than seen.

### Hierarchy
- **Display** (400, clamp(4.5rem, min(19vw, 27svh), 19rem), 0.92): the home hero tagline only; the biggest type on the site, two lines, second line gold.
- **Headline XL** (400, clamp(3.75rem, 15vw, 15rem), 0.86): inner page titles.
- **Headline** (400, clamp(3rem, 9.5vw, 9rem), 0.88): section headings and closing calls to action.
- **Title** (400, clamp(2.25rem, 5.4vw, 5rem), 0.92): sub-section headings and the scroll-lit mission statement. Tile titles run clamp(2.5rem, 5vw, 4.5rem) at 0.95.
- **Lede** (400, clamp(1.125rem, 1.6vw, 1.5rem), 1.5, mist): the paragraph under a page title, max about 42rem.
- **Body** (400, 1rem to 1.25rem, relaxed): reading copy in white at 85%.
- **Label** (Manrope 700, 0.6875rem to 0.8125rem, 0.14em to 0.24em, uppercase): buttons, chips, nav, footer column labels, roles and disciplines.
- **Meta** (JetBrains Mono 400, 0.625rem to 0.6875rem, 0.16em, uppercase): genre, type and year, casting IDs, status badges, filter counts and measurements.

### Named Rules
**The Metadata Below Rule.** Nothing sits above a heading: no kicker, no eyebrow, no section number. Metadata and context lines go below the title, between it and the lede.

**The Mono Is Data Rule.** JetBrains Mono appears only on production metadata, counts and measurements. Every other label is Manrope 700 in tracked caps.

**The One Weight Rule.** Headings are Anton 400 at 0.01em, enforced globally. Never fake-bold, condense or negatively track display type.

## Layout

A single full-width container (max 1600px) with gutters of 1.25rem, 2rem from 640px and 3.5rem from 1024px. Sections breathe on a fluid block padding of clamp(5rem, 14vw, 13rem). Heroes are full-bleed footage with the copy anchored to the bottom of the frame and a long gradient fade into the next section, so there is no seam.

Grids are editorial rather than uniform. The production slate is a 12-column staggered grid at desktop: alternating crops (4:5, 3:4, 16:9) offset by top margins of 6rem to 10rem, collapsing to two columns at 640px and one column on phones. Headline measure is held to 12ch to 14ch so poster caps stack into blocks. Calls to action sit bottom right of a hero at desktop and stack under the lede on mobile.

Navigation is a fixed bar 4.5rem high (5rem from 640px) that gains an obsidian 60% blurred backing after 24px of scroll; below 1024px it becomes a right-hand drawer.

## Elevation & Depth

Depth is atmospheric and luminous, not stacked. Surfaces are flat slabs; what lifts the page is light: fixed fog in screen blend (z 40), a breathing warm spotlight and light bleed behind headings, and film grain over everything (z 45). Hero copy sits above the fog at z 41 so display type stays crisp. Shadows are either a deep drop under a panel or a gold glow under gold elements.

### Shadow Vocabulary
- **Slab drop** (`box-shadow: 0 40px 80px -50px rgb(0 0 0 / 0.95)`): under solid ink panels.
- **Gold rest glow** (`box-shadow: 0 14px 40px -18px rgb(232 179 26 / 0.7)`): under the primary button.
- **Gold hover glow** (`box-shadow: 0 22px 60px -18px rgb(232 179 26 / 0.9)`): primary button on hover.
- **Play disc aura** (`box-shadow: 0 0 50px -6px rgb(232 179 26 / 0.9), 0 0 120px -20px rgb(232 179 26 / 0.7)`): the gold play disc, with a halo pulsing to 1.7x.
- **Field focus** (`box-shadow: 0 0 0 4px rgb(232 179 26 / 0.12), 0 0 32px -4px rgb(232 179 26 / 0.45)`): focused inputs.

### Named Rules
**The Screen Blend Rule.** Fog, smoke, spotlight and light bleed always composite with screen blend so they glow on the dark base. Never switch them to normal blending.

**The No Vignette Rule.** No darkening overlay frames the viewport; it greys the edges of display type. Darkness comes from the ground and from per-image bottom gradients only.

## Shapes

Hard, cut corners. Buttons, chips, inputs, checkboxes, panels, media tiles and badges all use a 2px radius, which reads as square at a glance. Circles are reserved for two things: the live status dot and the gold play disc. Borders are 1px hairlines in white at low alpha; gold borders mean active or focused. Focus is a 1px gold outline offset 3px.

**The Hard Corner Rule.** 2px on every control and container. A pill or rounded card is off-system; only the status dot and the play disc are round.

## Components

### Buttons
Tactile and magnetic: the shell leans toward the cursor and the label travels further, so the button feels like it has depth.
- **Shape:** hard corners (2px), minimum height 3.5rem, Manrope 700 at 0.8125rem tracked 0.16em, uppercase.
- **Primary:** gold fill, black text, gold rest glow. On hover it warms to amber, the glow grows and a sheen of light sweeps across once (0.9s cine ease-out). Trailing arrow nudges 4px right.
- **Ghost:** white 55% hairline over black 25%; on hover white fills up from the bottom (clip reveal, 0.55s) and the text turns black.
- **Press:** scales to 0.95 on a spring. Disabled at 55% opacity with no sheen.

### Chips
- **Style:** transparent with a white 20% hairline, Manrope 700 0.75rem tracked 0.14em, white 80%.
- **State:** hover turns the border gold 60%; selected (aria-pressed) fills gold from the bottom with obsidian text. Counts inside a chip are mono. Press scales to 0.96.

### Cards / Containers
- **Corner Style:** hard (2px).
- **Background:** ink slab; media tiles sit on charcoal.
- **Shadow Strategy:** slab drop (see Elevation & Depth).
- **Border:** white 8% hairline.
- **Internal Padding:** 1.25rem to 1.75rem on tiles; panels scale with the container.

### Inputs / Fields
- **Style:** a dark pane (obsidian 60% with a faint top sheen and a 16px backdrop blur), white 10% hairline, 2px corners, min height 3.5rem, 1rem text.
- **Focus:** border turns amber 85% with the field focus glow; the field's label turns amber.
- **Error:** border shifts to a soft red at 70% via user-invalid. Checkboxes are 1.25rem hard squares that fill gold with an obsidian tick.

### Navigation
- **Desktop:** Manrope 700 0.75rem tracked 0.18em caps in white 80%; hover goes white and draws a 1px gold underline from the left; active is gold with the underline held. A compact primary "Get seen" sits at the right.
- **Mobile:** a 3rem hard-cornered toggle whose two lines cross into an X. The drawer slides in from the right over a black 60% scrim; items are gold Anton caps at clamp(2.5rem, 12vw, 3.75rem) with hairline dividers, entering in sequence on the expo curve. Swipe right or Escape closes it; focus is trapped while open.

### Production Tile
The frame is the whole tile. A bottom gradient (black 90% to transparent) holds an Anton title and gold mono metadata. On hover or focus the image pushes in to 1.05x over 1.1s, the frame darkens to black 45%, and a hard gold "View Project" bar fades up 12px. On hover:none devices the CTA is always visible. A status badge (mono, hard corners, hairline) sits top right; in production it carries a pulsing round dot.

### Video Facade
Every YouTube embed renders as its poster frame under black 35% with the gold play disc centred (5rem, 7rem from 640px) and a halo pulsing outward. Hover darkens the frame to 50%, pushes the poster to 1.05x and scales the disc to 1.1x in amber. The iframe loads and autoplays only on click, fading in on the expo curve.

### Motion
- **Entrance** (easeInOutExpo, cubic-bezier(0.87, 0, 0.13, 1)): reveals rise 44px and fade over 1.2s; headline lines slide up from a mask over 1.5s.
- **Feedback** (cine ease-out, cubic-bezier(0.16, 1, 0.3, 1)): every hover, fill, sheen and focus transition, 0.3s to 1.2s.
- **Living still:** hero footage zooms 1.00 to 1.05 over 20s, alternating. All ambient loops stop under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set every heading in Anton 400 caps, flat white or flat gold, with one accent phrase in gold at most.
- **Do** put metadata below the title: tracked Manrope label or gold mono meta between the heading and the lede.
- **Do** run entrances on easeInOutExpo (0.87, 0, 0.13, 1) and hover or feedback on cine ease-out (0.16, 1, 0.3, 1).
- **Do** treat media tiles the same way: image to 1.05x, frame darkens, CTA fades up, and the CTA always shows on hover:none.
- **Do** render every YouTube embed as a video facade: poster plus gold play disc, iframe on click.
- **Do** keep hero copy above the fog (z 41) and let only the grain pass over it.
- **Do** use 2px corners on buttons, chips, inputs, panels and tiles.

### Don't:
- **Don't** place kickers, eyebrows or section numbers above a heading.
- **Don't** use JetBrains Mono for UI labels, form labels or prose; it is for production metadata, counts and measurements only.
- **Don't** use gradient text, a vignette overlay or any tint across display type.
- **Don't** use pills or rounded cards; only the status dot and the play disc are round.
- **Don't** use frosted glass cards; panels are solid ink slabs with a hairline.
- **Don't** introduce a second accent hue or a serif italic.
- **Don't** composite fog or light layers with normal blending.
