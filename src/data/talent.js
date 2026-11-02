// The roster. Only `slug`, `name` and `discipline` are required; the cards and
// profile hide whatever is missing, so add `base`, `bio` and `credits` (production
// slugs) only once they are confirmed. `discipline` drives the filter; set
// `title` to show different wording on the card and profile (e.g. 'Actress & Model').
// image: headshot, e.g. '/media/Phillip-Quartey.jpg'. Leave it null
// to keep the generated gradient portrait.

export const DISCIPLINES = ['Actor', 'Model', 'Actor & Model']

export const talent = [
  {
    slug: 'sabeian-gilzene',
    name: 'Sabeian Gilzene',
    discipline: 'Actor & Model',
    tone: 'amber',
    image: '/media/Sabeian-Gilzene.jpg',
  },
  {
    slug: 'ngor-yel',
    name: 'Ngor Yel',
    discipline: 'Actor & Model',
    tone: 'bone',
    image: '/media/Ngor-Yel.jpg',
  },
  {
    slug: 'chan-yel',
    name: 'Chan Yel',
    discipline: 'Actor & Model',
    tone: 'rose',
    image: null,
  },
  {
    slug: 'rebecca-soper',
    name: 'Rebecca Soper',
    discipline: 'Actor & Model',
    title: 'Actress & Model',
    tone: 'amber',
    image: '/media/Rebecca-Soper.jpg',
  },
  {
    slug: 'prince-boamah',
    name: 'Prince Boamah',
    discipline: 'Actor & Model',
    tone: 'crimson',
    image: '/media/Prince-Boamah.jpg',
  },
  {
    slug: 'jeremy-owusu',
    name: 'Jeremy Owusu',
    discipline: 'Actor & Model',
    tone: 'bone',
    image: '/media/Jeremy-Owusu.jpg',
  },
  {
    slug: 'phillip-quartey',
    name: 'Phillip Quartey',
    discipline: 'Actor & Model',
    tone: 'smoke',
    image: '/media/Phillip-Quartey.jpg',
  },
  {
    slug: 'jeremy-benson',
    name: 'Jeremy Benson',
    discipline: 'Model',
    base: 'London',
    tone: 'moss',
    image: null,
    bio: 'London-based actor and model, cast in a key role in the upcoming second episode of the BOA Original series Mind States UK.',
    credits: ['mind-states-ep2'],
  },
]
