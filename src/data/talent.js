// The roster. Only `slug`, `name` and `discipline` are required; the cards and
// profile hide whatever is missing, so add `base`, `bio` and `credits` (production
// slugs) only once they are confirmed. `discipline` drives the filter; set
// `title` to show different wording on the card and profile (e.g. 'Actress & Model').
// image: headshot (4:5), e.g. '/media/talent/sabeian-gilzene.jpg'. Leave it null
// to keep the generated gradient portrait.

export const DISCIPLINES = ['Actor', 'Model', 'Actor & Model']

export const talent = [
  {
    slug: 'sabeian-gilzene',
    name: 'Sabeian Gilzene',
    discipline: 'Actor & Model',
    tone: 'amber',
    image: null,
  },
  {
    slug: 'ngor-yel',
    name: 'Ngor Yel',
    discipline: 'Actor & Model',
    tone: 'bone',
    image: null,
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
    image: null,
  },
  {
    slug: 'prince-boamah',
    name: 'Prince Boamah',
    discipline: 'Actor & Model',
    tone: 'crimson',
    image: null,
  },
  {
    slug: 'jeremy-owusu',
    name: 'Jeremy Owusu',
    discipline: 'Actor & Model',
    tone: 'bone',
    image: null,
  },
  {
    slug: 'aaron-russell',
    name: 'Aaron Russell',
    discipline: 'Actor & Model',
    tone: 'smoke',
    image: null,
  },
  // PLACEHOLDER: an invented person, kept so the grid stays at eight.
  {
    slug: 'tobi-adeyemi',
    name: 'Tobi Adeyemi',
    discipline: 'Actor & Model',
    base: 'London',
    tone: 'moss',
    image: null,
    bio: 'Found at a community casting day. Signed the same afternoon.',
    credits: ['open-call', 'salt-and-ember'],
  },
]
