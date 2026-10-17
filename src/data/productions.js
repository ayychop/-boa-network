// The slate. Only `slug` and `title` are required, everything else is optional
// and the cards hide whatever is missing.
// image:  poster (2:3)        e.g. '/media/mind-states-uk-poster.jpg'
// still:  wide still (2.39:1) e.g. '/media/mind-states-uk-still.jpg'
// Leave either as null to keep the generated placeholder art.
// video:  { title, url } YouTube embed, plays in place of the wide still.

export const STATUS = {
  development: 'In Development',
  production: 'In Production',
  post: 'Post-Production',
  released: 'Released',
}

export const productionMeta = (p) => [p.type, p.year].filter(Boolean).join(' · ')

export const productions = [
  {
    slug: 'mind-states-uk',
    title: 'Mind States UK',
    type: 'Series - Crime/Drama/Thriller',
    year: '2026',
    featured: true,
    tone: 'amber',
    image: null,
    still: null,
    video: {
      title: 'Mind States UK - Episode 1',
      url: 'https://www.youtube-nocookie.com/embed/SnQglPC9S2M',
    },
    logline:
      'Five friends navigate daily life in Northwest London, juggling pressures from the streets, financial struggles, and differing aspirations for the future. Through flashbacks and personal reflections, Joe examines how their environment shapes his mindset and choices.',
  },
  {
    slug: 'mind-states-ep2',
    title: 'Mind States EP2',
    type: 'Coming Soon',
    tone: 'bone',
    image: null,
    still: null,
  },
  {
    slug: 'coming-soon-1',
    title: 'Coming Soon',
    tone: 'smoke',
    image: null,
    still: null,
  },
  {
    slug: 'coming-soon-2',
    title: 'Coming Soon',
    tone: 'smoke',
    image: null,
    still: null,
  },
]
