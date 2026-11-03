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
    bio: 'Sabeian Gilzene is a 6ft5 Actor and model from the UK with Caribbean roots. He is an amazing model and Actor, very professional on set, and looks to one day make his own TV shows and movies.',
  },
  {
    slug: 'ngor-yel',
    name: 'Ngor Yel',
    discipline: 'Actor & Model',
    image: '/media/Ngor-Yel.jpg',
    bio: 'Ngor Yel is an Actor and model who is professional on set and ready to do whatever it takes to make sure the scene is right. A great basketball player and athlete, he is also a daytime teacher, making him excellent at code-switching.',
  },
  {
    slug: 'chan-yel',
    name: 'Chan Yel',
    discipline: 'Actor & Model',
    image: null,
    bio: 'Chan Yel is an amazing Actor and model who takes his craft seriously. He is very good at basketball, specialises in urban content, and would be great for thriller roles both inside and outside the urban scene. He is athletic and has the perfect muscular build, not too big and not too small.',
  },
  {
    slug: 'rebecca-soper',
    name: 'Rebecca Soper',
    discipline: 'Actor & Model',
    title: 'Actress & Model',
    image: '/media/Rebecca-Soper.jpg',
    bio: 'Rebecca Soper is a London-based actor, drama facilitator and Youth Violence Intervention Specialist. She trained at Intermission Youth Theatre, Identity Drama School, the National Youth Theatre and London School of Dramatic Arts. Her acting credits include Shakespeare’s Globe, the Royal Court Theatre, film and voiceover work, including Netflix productions. Alongside acting, Rebecca uses drama and storytelling to raise awareness of youth violence, exploitation, identity and belonging, working with young people across schools, youth theatres and prison settings to inspire meaningful change.',
  },
  {
    slug: 'prince-boamah',
    name: 'Prince Boamah',
    discipline: 'Actor & Model',
    image: '/media/Prince-Boamah.jpg',
    bio: 'Prince Boamah is an emerging creative with a passion for storytelling, film and bringing meaningful characters to life. Driven by creativity, ambition and a desire to grow, he is focused on developing his craft and exploring opportunities within the entertainment industry. With a genuine appreciation for authentic stories and the power of film to connect people, Prince brings dedication, personality and a fresh perspective to every project he is part of. His journey is rooted in resilience, self-expression and the belief that every story deserves to be told. As he continues to build his experience, Prince aims to create work that resonates with audiences, challenges perspectives and leaves a lasting impression.',
  },
  {
    slug: 'jeremy-owusu',
    name: 'Jeremy Owusu',
    discipline: 'Actor & Model',
    image: '/media/Jeremy-Owusu.jpg',
    bio: 'Jeremy Owusu is an Actor and model who is confident, a comedian, and brings joy and good energy into the room. He still has a quiet, cool, observant profile about himself. He enjoys football a lot, is excellent at code-switching, and showcases this on camera.',
  },
  {
    slug: 'phillip-quartey',
    name: 'Phillip Quartey',
    discipline: 'Actor & Model',
    image: '/media/Phillip-Quartey.jpg',
    bio: 'Phillip Quartey is an Actor and Model from London. Standing at 6ft2, he is confident, an amazing dancer, and is always ready for the call. He is also a great athlete, especially in football.',
  },
  {
    slug: 'jeremy-benson',
    name: 'Jeremy Benson',
    discipline: 'Model',
    base: 'London',
    image: null,
    bio: 'Jeremy Benson is up and coming, learning the ropes of acting and the whole creative portfolio that comes with it. He will soon be hosting his own channel, which will have activities and explorations inside it. He is very confident, ready at fast speed, and gets his scenes right, if not on the first attempt, then the second.',
    credits: ['mind-states-ep2'],
  },
]

export const talent = [...roster.filter((t) => t.image), ...roster.filter((t) => !t.image)]
