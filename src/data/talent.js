// The roster. Only `slug`, `name` and `discipline` are required; the cards and
// profile hide whatever is missing, so add `base`, `bio` and `credits` (production
// slugs) only once they are confirmed. `discipline` drives the filter; set
// `title` to show different wording on the card and profile (e.g. 'Actress & Model').
// image: headshot, e.g. '/media/Phillip-Quartey.jpg'. Leave it null
// to show their monogram; anyone without a photo sorts to the end until they have one.

export const DISCIPLINES = ['Actor', 'Model', 'Actor & Model']

const roster = [
  {
    slug: 'sabeian-gilzene',
    name: 'Sabeian Gilzene',
    discipline: 'Actor & Model',
    image: '/media/Sabeian-Gilzene.jpg',
  },
  {
    slug: 'ngor-yel',
    name: 'Ngor Yel',
    discipline: 'Actor & Model',
    image: '/media/Ngor-Yel.jpg',
  },
  {
    slug: 'chan-yel',
    name: 'Chan Yel',
    discipline: 'Actor & Model',
    image: null,
  },
  {
    slug: 'rebecca-soper',
    name: 'Rebecca Soper',
    discipline: 'Actor & Model',
    title: 'Actress & Model',
    image: '/media/Rebecca-Soper.jpg',
  },
  {
    slug: 'prince-boamah',
    name: 'Prince Boamah',
    discipline: 'Actor & Model',
    image: '/media/Prince-Boamah.jpg',
  },
  {
    slug: 'jeremy-owusu',
    name: 'Jeremy Owusu',
    discipline: 'Actor & Model',
    image: '/media/Jeremy-Owusu.jpg',
  },
  {
    slug: 'phillip-quartey',
    name: 'Phillip Quartey',
    discipline: 'Actor & Model',
    image: '/media/Phillip-Quartey.jpg',
  },
  {
    slug: 'jeremy-benson',
    name: 'Jeremy Benson',
    discipline: 'Model',
    base: 'London',
    image: null,
    bio: 'London-based actor and model, cast in a key role in the upcoming second episode of the BOA Original series Mind States UK.',
    credits: ['mind-states-ep2'],
  },
]

export const talent = [...roster.filter((t) => t.image), ...roster.filter((t) => !t.image)]
