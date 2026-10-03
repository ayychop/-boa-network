// PLACEHOLDER slate — swap for real productions.
// image:  poster (2:3)        e.g. '/media/salt-and-ember-poster.jpg'
// still:  wide still (2.39:1) e.g. '/media/salt-and-ember-still.jpg'
// Leave either as null to keep the generated placeholder art.

export const FORMATS = ['Film', 'Series', 'TV']

export const STATUS = {
  development: 'In Development',
  production: 'In Production',
  post: 'Post-Production',
  released: 'Released',
}

export const productions = [
  {
    slug: 'salt-and-ember',
    title: 'Salt & Ember',
    format: 'Film',
    genre: 'Drama',
    year: '2027',
    status: 'production',
    featured: true,
    tone: 'amber',
    image: null,
    still: null,
    logline:
      'A night-shift welder on the Tyne has one weekend to get to a London audition she was never supposed to hear about.',
  },
  {
    slug: 'northern-line',
    title: 'Northern Line',
    format: 'Series',
    genre: 'Crime drama',
    year: '2027',
    status: 'development',
    featured: true,
    tone: 'teal',
    image: null,
    still: null,
    logline:
      'Six strangers on the last tube home witness the same crime. None of them saw the same thing.',
  },
  {
    slug: 'the-quiet-hours',
    title: 'The Quiet Hours',
    format: 'TV',
    genre: 'Anthology',
    year: '2026',
    status: 'post',
    featured: true,
    tone: 'indigo',
    image: null,
    still: null,
    logline:
      'Five stories set between midnight and dawn, each led by a first-time screen actor.',
  },
  {
    slug: 'kingsland',
    title: 'Kingsland',
    format: 'Series',
    genre: 'Family saga',
    year: '2027',
    status: 'development',
    tone: 'crimson',
    image: null,
    still: null,
    logline:
      'Three generations, one market stall, and the developer who wants the whole road.',
  },
  {
    slug: 'paper-crowns',
    title: 'Paper Crowns',
    format: 'Film',
    genre: 'Coming of age',
    year: '2026',
    status: 'released',
    tone: 'rose',
    image: null,
    still: null,
    logline:
      'Two sisters enter a pageant they cannot afford with dresses they made themselves.',
  },
  {
    slug: 'afterglow',
    title: 'Afterglow',
    format: 'Film',
    genre: 'Sci-fi romance',
    year: '2028',
    status: 'development',
    tone: 'indigo',
    image: null,
    still: null,
    logline:
      'When the city loses power for a week, two neighbours finally have time to meet.',
  },
  {
    slug: 'open-call',
    title: 'Open Call',
    format: 'TV',
    genre: 'Documentary',
    year: '2026',
    status: 'production',
    tone: 'amber',
    image: null,
    still: null,
    logline:
      'Cameras follow a BOA open casting day from the first queue to the final callback.',
  },
  {
    slug: 'low-tide',
    title: 'Low Tide',
    format: 'Film',
    genre: 'Thriller',
    year: '2026',
    status: 'post',
    tone: 'moss',
    image: null,
    still: null,
    logline:
      'A cockle picker finds something in the sand that half the coast is looking for.',
  },
  {
    slug: 'borrowed-light',
    title: 'Borrowed Light',
    format: 'Series',
    genre: 'Fashion drama',
    year: '2027',
    status: 'development',
    tone: 'rose',
    image: null,
    still: null,
    logline:
      'An unsigned model and a broke photographer fake a campaign and accidentally start a movement.',
  },
]
