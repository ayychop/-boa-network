// Site-wide settings. Everything here is safe to edit.

export const site = {
  name: 'BOA Network',
  longName: 'Best Of All Networks',
  location: 'United Kingdom',
  // PLACEHOLDER — replace with your real inboxes.
  email: 'hello@boanetworks.com',
  castingEmail: 'casting@boanetworks.com',
  // Showreel videos, shown top to bottom in this order.
  // url is a YouTube embed URL: https://www.youtube-nocookie.com/embed/VIDEO_ID
  showreel: [
    {
      label: '01 - Trailer',
      title: 'Mind States UK - Official Trailer',
      // TODO: Replace this EP1 trailer with the EP2 trailer when ready.
      url: 'https://www.youtube-nocookie.com/embed/1Luf9F3wl-k',
    },
  ],
  // e.g. { label: 'Instagram', href: 'https://instagram.com/yourhandle' }
  socials: [],
}

export const nav = [
  { to: '/about', label: 'About' },
  { to: '/productions', label: 'Productions' },
  { to: '/talent', label: 'Talent' },
  { to: '/access', label: 'Access' },
  { to: '/contact', label: 'Contact' },
]

// Founders' own words.
export const founders = [
  {
    name: 'Joseph Boat',
    role: 'Co-founder',
    image: '/media/Joseph-Boat.jpg',
    avatar: '/media/Joseph-Boat-avatar.jpg', // face crop for the footer
    line: 'Talent was never the problem. Access was.',
    bio: 'A confident leader who is always looking for ways for all of us to win. My goal is to create chances and opportunities for people who the door has been closed on and not given a chance, yet they are talented and have what it takes, they just need exposure. Profile is charismatic and a people’s person, great at networking in any environment. Inside I am shy, but on the outside I portray a very confident, assertive demeanour. Overall, walk with love.',
  },
  {
    name: 'David O',
    role: 'Co-founder',
    image: '/media/David-O.jpg',
    avatar: '/media/David-O-avatar.jpg', // face crop for the footer
    line: 'We are not here to guard the door. We are here to hold it open.',
    bio: 'Very observant, quiet and reserved in profile, yet very thoughtful and one of the most helpful, outgoing people you’ll meet. He is technically and creatively up to date, good with all equipment and setup. He has done everything creatively from a camera and editing standpoint, so he is well experienced.',
  },
]
