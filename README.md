# BOA Network

Website for BOA Network (Best Of All Networks) — React + Vite, Tailwind, Framer Motion, GSAP ScrollTrigger and Lenis.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Where to change things

| What | Where |
| --- | --- |
| Emails, showreel URL, social links, founder bios | `src/data/site.js` |
| Productions slate | `src/data/productions.js` |
| Talent roster | `src/data/talent.js` |
| Pathways, casting calls, FAQs | `src/data/access.js` |
| Colours, type scale, fog | `src/index.css` |

## Swapping in real imagery

Every image slot shows generated placeholder art until it is given a file.
Put images in `public/media/` and set the matching `image` / `still` field in
the data files (or `HERO_IMAGE` in `src/pages/Home.jsx`), e.g.
`image: '/media/salt-and-ember-poster.jpg'`.

Sizes: stills 2.39:1, posters 2:3, headshots 4:5.

## Forms

Set `VITE_FORM_ENDPOINT` in a `.env` file to a form backend that accepts JSON
(Formspree, Basin, your own API) and both contact forms will post to it.
Without it they open the visitor's email app with the message pre-filled.

## Deploying

This is a single-page app, so the host must serve `index.html` for every
route. `public/_redirects` covers Netlify and Cloudflare Pages; other hosts
need their own equivalent rewrite rule.
