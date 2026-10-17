---
name: BOA Network
description: A prestige screen studio for a UK production company; quiet Garamond over real footage, one deep gold, fog and grain.
colors:
  gold: "#e8b31a"
  gold-deep: "#be9315"
  amber: "#f6c83a"
  obsidian: "#0a0a0a"
  ink: "#101010"
  charcoal: "#161616"
  bone: "#ffffff"
  hud: "#e6e6e6"
  mist: "#b5b5b5"
typography:
  display:
    fontFamily: "Cormorant Garamond, Cormorant Fallback, Garamond, Times New Roman, serif"
    fontSize: "clamp(3.5rem, min(12.5vw, 19svh), 10.5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  headline-xl:
    fontFamily: "Cormorant Garamond, Cormorant Fallback, Garamond, Times New Roman, serif"
    fontSize: "clamp(3.25rem, 9vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cormorant Garamond, Cormorant Fallback, Garamond, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 6.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Cormorant Fallback, Garamond, Times New Roman, serif"
    fontSize: "clamp(2rem, 4.2vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.01em"
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
    letterSpacing: "0.16em"
  meta:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  hard: "2px"
  round: "9999px"
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
    backgroundColor: "{colors.gold-deep}"
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
  play-mark:
    backgroundColor: "rgb(0 0 0 / 0.3)"
    textColor: "{colors.bone}"
    rounded: "{rounded.round}"
    size: "4rem"
  play-mark-hover:
    backgroundColor: "{colors.gold}"
    textColor: "#000000"
---

# Design System: BOA Network

## Overview

**Creative North Star: "The Screening Room"**

BOA reads like a prestige screen studio: real footage fills the frame and quiet, high-contrast serif type sits over it with generous air. Elegance comes from contrast, italics and space rather than size, so the type scale is restrained. The ground is near-black, the type is stark white, and one deep gold carries the logo, the primary action and the italic key phrase of a heading. There is no gradient wash behind the copy and no frosted card holding it.

Depth comes from the room, not the furniture. Fog drifts across every page, a warm key light sits behind headlines, and film grain lies over everything like a projected print. On desktop the fog glows in screen blend and follows the pointer and the scroll; on touch and tablet screens the same look is rebuilt from fewer, unblended, mostly still layers. Every atmospheric layer waits for the loader to finish, then eases in, staggered. Surfaces are hard-edged slabs with hairline borders, flat, with no coloured light on them.

Media is staged like a screening. Every trailer starts as its poster between thin letterbox bars, with a hairline gold ring and a serif italic title card; the ring fills with gold when you reach for it.

**Key Characteristics:**
- Near-black ground (obsidian), stark white type, one deep gold accent.
- Cormorant Garamond 500 for every heading in sentence case, with gold italic for the key phrase; Manrope for reading and for tracked-caps labels and buttons; JetBrains Mono only for production metadata.
- Fog, warm key light and film grain as the atmosphere, lighter on touch screens; no vignette.
- Flat surfaces: no coloured glows, no sheen, no pulse on controls.
- Hard 2px corners everywhere except the status dot, the play ring and the mobile nav active dot.
- easeInOutExpo entrances, cine ease-out hovers.

## Colors

A monochrome near-black world with a single deep gold that does all the signalling.

### Primary
- **Label Gold** (gold): the logo, the primary button, gold italic accent phrases in headings, active nav, selected chips, the play ring's hairline and its hover fill, production metadata on tiles, focus outlines and text selection.
- **Deep Gold** (gold-deep): the primary button on hover; gold mixed 82% with black, so the button darkens instead of lighting up.
- **Hot Amber** (amber): small feedback only: a focused field's label and border, the post-production status badge, pressed mobile nav items and FAQ question hover. Never a resting fill.

### Neutral
- **Obsidian** (obsidian): the page ground, the html and body background, and the dark text on gold.
- **Ink Slab** (ink): solid panels and the footer band; one step lighter than the ground.
- **Charcoal Frame** (charcoal): the placeholder fill behind media tiles and select option lists.
- **Stark White** (bone): display type, body copy, ghost button text and borders.
- **Viewfinder White** (hud): tracked labels at 80% and the in-production status; a soft off-white for HUD detail.
- **Mist** (mist): ledes, secondary copy, form labels at rest and inactive counts.

Hairlines are white at low alpha: 7% to 10% for panel and header edges, 20% for chips, 55% for the ghost button. Gold hairlines mean active, focused or playable.

### Named Rules
**The One Gold Rule.** Gold is the only hue. It marks the logo, the one primary action in view and the accent phrase; a second accent colour does not exist.

**The Flat Display Rule.** Display type is flat white or flat gold. No gradient text, no clipped-background fills, no tinted overlays across headlines.

**The No Glow Rule.** Gold is a fill or a hairline, never light. No coloured box-shadows, halos, sheens or pulses on buttons, the play ring, tabs or frames; depth on controls is a neutral black drop at most.

## Typography

**Display Font:** Cormorant Garamond 500 and 500 italic (with Cormorant Fallback, a Georgia face metric-matched at 86% size-adjust, then Garamond, Times New Roman)
**Body Font:** Manrope Variable (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo), production metadata only

**Character:** A high-contrast Garamond at a single medium weight against a warm, open grotesk. The serif is seen; Manrope is read, and in tracked caps it does the small, functional labelling.

### Hierarchy
- **Display** (500, clamp(3.5rem, min(12.5vw, 19svh), 10.5rem), 0.9): the home hero tagline only, two lines, the last word in gold italic. The featured production title on the productions hero runs clamp(3.5rem, 11vw, 10rem) at 0.98.
- **Headline XL** (500, clamp(3.25rem, 9vw, 8.5rem), 0.98): inner page titles.
- **Headline** (500, clamp(2.6rem, 6.4vw, 6rem), 1): section headings and closing calls to action, measure 12ch to 14ch.
- **Title** (500, clamp(2rem, 4.2vw, 3.75rem), 1.05): sub-section headings and the scroll-lit mission statement. Production tile titles run clamp(2.25rem, 4vw, 3.5rem) at 1; talent names clamp(1.6rem, 2.8vw, 2.6rem).
- **Serif italic invitation** (500 italic, 1.5rem to 1.75rem): "Watch the trailer" beside the play ring, video title cards (1.125rem to 1.875rem), founder quotes and access promises.
- **Lede** (400, clamp(1.125rem, 1.6vw, 1.5rem), 1.5, mist): the paragraph under a page title, max about 42rem.
- **Body** (400, 1rem to 1.25rem, relaxed): reading copy in white at 85%.
- **Label** (Manrope 700, 0.6875rem to 0.8125rem, 0.14em to 0.2em, uppercase): buttons, chips, nav, HUD labels, footer column labels, roles and disciplines.
- **Meta** (JetBrains Mono 400, 0.625rem to 0.6875rem, 0.16em, uppercase): genre, type and year, casting IDs, status badges, filter counts and measurements.

### Named Rules
**The Metadata Below Rule.** Nothing sits above a heading: no kicker, no eyebrow, no section number. Metadata and context lines go below the title, between it and the lede.

**The Mono Is Data Rule.** JetBrains Mono appears only on production metadata, counts and measurements. Every other label is Manrope 700 in tracked caps.

**The One Weight Rule.** Headings are Cormorant Garamond 500 at -0.01em in sentence case, enforced globally. Never bold, uppercase or track display type open.

**The Key Phrase Rule.** A heading may end in a gold italic accent on its key word or phrase. It is the house convention and most section headings carry one, so reserve it for the phrase that carries the meaning: one accent per heading, never a whole line of body or a second accent in the same view's heading.

## Layout

A single full-width container (max 1600px) with gutters of 1.25rem, 2rem from 640px and 3.5rem from 1024px. Sections breathe on a fluid block padding of clamp(5rem, 14vw, 13rem). Heroes are full-bleed footage with the copy anchored to the lower half of the frame and a long gradient fade into the next section, so there is no seam. Calls to action sit bottom right of a hero at desktop and stack under the lede on small screens.

Grids are editorial rather than uniform. The productions slate is a 12-column staggered grid at desktop: alternating crops (4:5, 3:4, 16:9) offset by top margins of 6rem to 10rem. The home slate runs three columns at desktop, two from 640px to 1024px and one on phones; when the count is odd, the last tile spans both columns between 640px and 1024px and switches to a 16:8 crop so it does not tower. Home founders sit two-up only from 1024px; below that they stack one per row with a small portrait beside the quote.

Navigation is a fixed bar 4.5rem high (5rem from 640px) that gains an obsidian 60% blurred backing after 24px of scroll; below 1024px it becomes a right-hand drawer.

## Elevation & Depth

Depth is atmospheric, not stacked. Surfaces are flat slabs; what lifts the page is the room: fixed fog (z 40), a warm spotlight and light bleed behind headings, and film grain over everything (z 45). Hero copy sits above the fog at z 41 so display type stays crisp. The only shadows are neutral black drops under panels, the active contact tab, the video theatre and the mobile drawer.

The atmosphere has two builds. Desktop with a fine pointer and wider than 1024px gets screen-blended fog, drifting plumes, smoke at three depths, breathing light, re-rolling grain, and fog that leans from the pointer and lags behind scroll. At 1024px and below, or on any coarse pointer, every layer composites normally, plume b and the far and mid smoke and plumes are dropped, the light stops breathing and the grain is still. The fog texture is one baked image (/media/fog.png). Layers mount only after the loader is done, staggered about 350ms apart (hero smoke, then section light, then site fog, then grain), and fade in over 1.8s.

### Shadow Vocabulary
- **Slab drop** (`box-shadow: 0 40px 80px -50px rgb(0 0 0 / 0.95)`): under solid ink panels.
- **Tab lift** (`box-shadow: 0 20px 60px -30px rgb(0 0 0 / 0.9)`): the selected contact tab.
- **Theatre drop** (`box-shadow: 0 40px 120px -30px rgb(0 0 0 / 0.9)`): the trailer frame in the video theatre.
- **Drawer edge** (`box-shadow: -40px 0 80px rgb(0 0 0 / 0.8)`): the mobile nav drawer.

### Named Rules
**The Desktop Screen Blend Rule.** On fine-pointer desktops, fog, smoke, spotlight and light bleed composite with screen blend so they glow on the dark base. On touch and tablet screens they composite normally with fewer layers and no per-frame work; never port the desktop stack to touch.

**The After The Loader Rule.** Heavy atmosphere never mounts behind the loader. Hero entrances play as the loader's iris opens; fog, light and grain arrive after it is gone, one layer at a time.

**The No Vignette Rule.** No darkening overlay frames the viewport; it greys the edges of display type. Darkness comes from the ground and from per-image gradients only.

## Shapes

Hard, cut corners. Buttons, chips, inputs, checkboxes, panels, media tiles, the video frame and badges all use a 2px radius, which reads as square at a glance. Circles are reserved for three things: the live status dot, the play ring and the mobile nav's active dot. Borders are 1px hairlines in white at low alpha; gold borders mean active, focused or playable. Panels that invite action carry a gold corner hairline that fades from the top-left edge (55%, full on hover). Focus is a 1px gold outline offset 3px.

**The Hard Corner Rule.** 2px on every control and container. A pill or rounded card is off-system; only the status dot, the play ring and the mobile nav active dot are round.

## Components

### Buttons
Quiet and decisive: the shell leans toward the cursor and the label travels a little further, but the material stays flat, like a ticket rather than a light.
- **Shape:** hard corners (2px), minimum height 3.5rem, Manrope 700 at 0.8125rem tracked 0.16em, uppercase.
- **Primary:** flat gold fill, black text. On hover it deepens to gold-deep; no glow, no sheen. Trailing arrow nudges 4px right.
- **Ghost:** white 55% hairline over black 25%; on hover white fills up from the bottom (clip reveal, 0.55s) and the text turns black.
- **Press:** scales on a spring. Disabled at 55% opacity.

### Chips
- **Style:** transparent with a white 20% hairline, Manrope 700 0.75rem tracked 0.14em, white 80%.
- **State:** hover turns the border gold 60%; selected (aria-pressed) fills gold from the bottom with obsidian text. Counts inside a chip are mono. Press scales to 0.96. The theatre's close control is a square chip that fills gold on hover.

### Cards / Containers
- **Corner Style:** hard (2px).
- **Background:** ink slab; media tiles sit on charcoal.
- **Shadow Strategy:** slab drop (see Elevation & Depth).
- **Border:** white 8% hairline, with the gold corner hairline on action panels.
- **Internal Padding:** 1.25rem to 1.75rem on tiles; panels scale with the container.

### Inputs / Fields
- **Style:** a dark pane (obsidian 60% with a faint top sheen and a 16px backdrop blur), white 10% hairline, 2px corners, min height 3.5rem, 1rem text.
- **Focus:** the border turns amber 85% and the field's label turns amber.
- **Error:** border shifts to a soft red at 70% via user-invalid. Checkboxes are 1.25rem hard squares that fill gold with an obsidian tick.

### Navigation
- **Desktop:** Manrope 700 0.75rem tracked 0.18em caps in white 80%; hover goes white and draws a 1px gold underline from the left; active is gold with the underline held. A compact primary "Get seen" sits at the right.
- **Mobile:** a 3rem hard-cornered toggle whose two lines cross into an X. The drawer slides in from the right over a black 60% scrim; items are Cormorant at clamp(2.25rem, 10vw, 3.25rem) with hairline dividers and a small round gold dot marking the active page, entering in sequence on the expo curve. Swipe right or Escape closes it; focus is trapped while open.

### Production Tile
The frame is the whole tile. A bottom gradient (black 90% to transparent) holds a serif title and gold mono metadata. On hover or focus the image pushes in to 1.05x over 1.1s, the frame darkens to black 45%, and a hard gold "View Project" bar fades up 12px. On hover:none devices that hover bar is removed and a separate gold "View Project" button is always shown, never animated. A status badge (mono, hard corners, hairline) sits top right; in production it carries a pulsing round dot. Callers can override the crop per tile.

### Play Mark (signature)
The premiere play control: a hairline gold ring (gold 85%) over black 30% with a slight blur, holding a fine white triangle. On hover or focus of its group, gold fills the ring outward from the centre (0.7s cine ease-out), the triangle turns black and the ring scales to 1.04. No glow, no pulse. Three sizes: small 3rem; medium 4rem (5rem from 640px); large 3.5rem on phones, 5rem from 640px and 6rem from 1024px. Paired with "Watch the trailer" in serif italic, which turns gold on hover.

### Video Facade
Every YouTube embed renders as its poster frame under black 30%, between black letterbox bars 6% tall, with the play mark centred (large) and the title in serif italic bottom left above the lower bar. Hover pushes the poster to 1.03x over 1.6s and darkens it to 45%. When the poster prints its own title, the title card is dropped and on phones the mark moves to the top right corner at small size, returning to the centre from 640px. The iframe loads and autoplays only on click, fading in on the expo curve.

### Motion
- **Entrance** (easeInOutExpo, cubic-bezier(0.87, 0, 0.13, 1)): reveals rise and fade over 1.2s; headline lines slide up from a mask over 1.5s. Hero entrances wait for the loader's opening phase.
- **Feedback** (cine ease-out, cubic-bezier(0.16, 1, 0.3, 1)): every hover, fill and focus transition, 0.3s to 1.2s, and the atmosphere fade-in.
- **Living still:** hero footage zooms 1.00 to 1.05 over 20s, alternating. All ambient loops stop under reduced motion, and the loader is skipped.

## Do's and Don'ts

### Do:
- **Do** set every heading in Cormorant Garamond 500, sentence case, flat white, with at most one gold italic accent on the key phrase.
- **Do** put metadata below the title: tracked Manrope label or gold mono meta between the heading and the lede.
- **Do** run entrances on easeInOutExpo (0.87, 0, 0.13, 1) and hover or feedback on cine ease-out (0.16, 1, 0.3, 1).
- **Do** treat media tiles the same way: image to 1.05x, frame darkens, CTA fades up, and a static CTA on hover:none.
- **Do** render every YouTube embed through the video facade: letterboxed poster, hairline gold play ring, serif italic title, iframe on click.
- **Do** keep hero copy above the fog (z 41) and let only the grain pass over it.
- **Do** mount atmosphere after the loader, and give touch and tablet screens the lighter, unblended build.
- **Do** use 2px corners on buttons, chips, inputs, panels, frames and tiles.

### Don't:
- **Don't** place kickers, eyebrows or section numbers above a heading.
- **Don't** use JetBrains Mono for UI labels, form labels or prose; it is for production metadata, counts and measurements only.
- **Don't** use gradient text, a vignette overlay or any tint across display type.
- **Don't** add coloured glows, sheens, halos or pulses to buttons, the play ring, tabs or frames.
- **Don't** use pills or rounded cards; only the status dot, the play ring and the mobile nav active dot are round.
- **Don't** use frosted glass cards; panels are solid ink slabs with a hairline.
- **Don't** set headings in caps, in bold, or in a second display face.
- **Don't** run screen blending, masks or pointer-driven fog on touch or tablet screens.
