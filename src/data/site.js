// Site-wide settings. Everything here is safe to edit.

export const site = {
  name: 'BOA Network',
  longName: 'Best Of All Networks',
  location: 'United Kingdom',
  // PLACEHOLDER — replace with your real inboxes.
  email: 'hello@boanetwork.co.uk',
  castingEmail: 'casting@boanetwork.co.uk',
  // Paste an embed URL to switch the showreel on, e.g.
  // 'https://www.youtube-nocookie.com/embed/VIDEO_ID' or
  // 'https://player.vimeo.com/video/VIDEO_ID'
  showreelEmbedUrl: '',
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
    line: 'Talent was never the thing in short supply. Access was.',
    bio: 'Joseph co-founded BOA Network to build the kind of company he wanted to exist: one where the work is cinematic, the standards are high, and the casting room is open to people who have never been let near one.',
  },
  {
    name: 'David O',
    role: 'Co-founder',
    image: null, // e.g. '/media/david-o.jpg'
    tone: 'teal',
    line: 'We are not here to guard the door. We are here to hold it open.',
    bio: 'David co-founded BOA Network on a simple conviction: who you know, what you look like and what you can afford should have nothing to do with whether you get seen.',
  },
]
