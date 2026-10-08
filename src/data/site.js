// Site-wide settings. Everything here is safe to edit.

export const site = {
  name: 'BOA Network',
  longName: 'Best Of All Networks',
  location: 'United Kingdom',
  // PLACEHOLDER — replace with your real inboxes.
  email: 'hello@boanetwork.co.uk',
  castingEmail: 'casting@boanetwork.co.uk',
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

// PLACEHOLDER bios — written from the brief, replace with the founders' own words.
export const founders = [
  {
    name: 'Joseph Boat',
    role: 'Co-founder',
    image: null, // e.g. '/media/joseph-boat.jpg'
    tone: 'amber',
    line: 'Talent was never the problem. Access was.',
    bio: 'Joseph co-founded BOA Network to build the kind of company he wanted to exist: one where the work is cinematic, the standards are high, and the casting room is open to people who have never been let near one.',
  },
  {
    name: 'David O',
    role: 'Co-founder',
    image: null, // e.g. '/media/david-o.jpg'
    tone: 'bone',
    line: 'We are not here to guard the door. We are here to hold it open.',
    bio: 'David co-founded BOA Network on a simple conviction: who you know, what you look like and what you can afford should have nothing to do with whether you get seen.',
  },
]
