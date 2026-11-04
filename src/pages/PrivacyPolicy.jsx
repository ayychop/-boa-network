import { Arrow, MagneticButton, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { site } from '../data/site'

// Contact address for privacy matters. Kept separate from site.email on
// purpose: this is the inbox named in the policy text, not the general one.
const PRIVACY_EMAIL = 'jo@boanetworks.com'
const LAST_UPDATED = 'November 2026'

// Heading used for each numbered clause. Sits a step below the page title but
// still carries the serif-and-gold accent so the document reads as BOA, not as
// a bolted-on legal page.
function ClauseTitle({ index, children }) {
  return (
    <div className="mb-8 sm:mb-10">
      <SectionLabel index={index}>Privacy</SectionLabel>
      <Reveal as="h2" className="display-md text-bone">
        {children}
      </Reveal>
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <title>Privacy Policy — BOA Network</title>
      <meta
        name="description"
        content="How BOA Network collects, uses, stores and deletes the personal data of people who use the BOA HUB mobile application."
      />
      {/* A legal page should not be chased by crawlers as primary content. */}
      <meta name="robots" content="noindex, follow" />

      <PageHeader
        index="00"
        label="Legal"
        title={
          <>
            Privacy <span className="accent">Policy.</span>
          </>
        }
        lede="This policy explains, in plain terms, exactly what information the BOA HUB app collects about you, why we collect it, who we trust to help us run the service, and the control you keep over your own data at every step."
      >
        <Reveal className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-center" delay={0.2}>
          <MagneticButton to="/" variant="ghost">
            Back to home <Arrow />
          </MagneticButton>
          <p className="hud-label !text-mist">
            BOA HUB · Last updated {LAST_UPDATED}
          </p>
        </Reveal>
      </PageHeader>

      <section className="section !pt-0">
        <div className="container-x">
          {/* A single comfortable reading column: long-form legal copy wants a
              measured line length, not the full-bleed grid the other pages use. */}
          <div className="mx-auto max-w-3xl">
            <Reveal as="p" className="lede !text-bone/80">
              BOA Network (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the BOA HUB mobile
              application. This page is here to inform you, openly and honestly, of our policies regarding the
              collection, use, and disclosure of personal data whenever you choose to use our app. We have tried to
              keep the language clear and free of jargon, because you deserve to understand what happens to your
              information without needing a lawyer to translate it for you.
            </Reveal>

            <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
              {/* 1 */}
              <Reveal as="article">
                <ClauseTitle index="01">Information we collect</ClauseTitle>
                <p className="prose-body">
                  To make BOA HUB work the way it should, we gather a limited amount of information from and about you.
                  We only ever collect what we genuinely need in order to run the service and give you a good
                  experience. That information falls into three broad categories:
                </p>
                <ul className="prose-list">
                  <li>
                    <span className="prose-term">Account data.</span> When you sign up and create your profile, we
                    collect your email address, your name, and the profile details you choose to share with us. This is
                    the information that lets us recognise you, keep your account secure, and give you a presence that
                    other members of the community can actually see and connect with.
                  </li>
                  <li>
                    <span className="prose-term">User content.</span> We store the photos, videos, chat messages, and
                    voice notes that you upload to the app. This content is the heart of what BOA HUB is for, and we
                    hold on to it so that it is there waiting for you — and for the people you have chosen to share it
                    with — whenever you come back to the app.
                  </li>
                  <li>
                    <span className="prose-term">Usage data.</span> We collect information about how you interact with
                    the app, such as which features you use and how often you use them. Understanding how the app is
                    actually used, rather than how we imagine it is used, is what allows us to fix what is broken, invest
                    in what is working, and keep improving the experience over time.
                  </li>
                </ul>
              </Reveal>

              {/* 2 */}
              <Reveal as="article">
                <ClauseTitle index="02">How we use your data</ClauseTitle>
                <p className="prose-body">
                  We use the information described above for a small and specific set of purposes, all of them aimed at
                  running BOA HUB well and serving you better. In particular, we use your data:
                </p>
                <ul className="prose-list">
                  <li>
                    To provide and maintain the BOA HUB service, keeping it running reliably and available to you day to
                    day.
                  </li>
                  <li>
                    To allow you to communicate with other users, so that the conversations, messages, and connections
                    that make the community worthwhile can actually take place.
                  </li>
                  <li>
                    To personalise your experience and to improve the app, tailoring what you see to be more relevant to
                    you and refining the product with every release.
                  </li>
                </ul>
              </Reveal>

              {/* 3 */}
              <Reveal as="article">
                <ClauseTitle index="03">Third-party services</ClauseTitle>
                <p className="prose-body">
                  Building a modern app means relying on a handful of trusted specialist partners to handle particular
                  pieces of the technology for us. We have chosen each of these partners deliberately, and we only work
                  with services that take the security of your information seriously:
                </p>
                <ul className="prose-list">
                  <li>
                    <span className="prose-term">Supabase.</span> We use Supabase for secure database hosting and for
                    authentication — in other words, for safely storing your data and for confirming that you are who
                    you say you are when you sign in.
                  </li>
                  <li>
                    <span className="prose-term">Agora.</span> We use Agora to power the video and voice calling
                    features inside the app, so that you can see and hear the people you connect with in real time.
                  </li>
                </ul>
                <p className="prose-body">
                  Each of these services operates under its own privacy policy, which governs how it handles any data it
                  processes on our behalf. We would encourage you to review those policies directly if you would like to
                  understand their practices in full.
                </p>
              </Reveal>

              {/* 4 */}
              <Reveal as="article">
                <ClauseTitle index="04">Data retention and deletion</ClauseTitle>
                <p className="prose-body">
                  You remain in control of your information, and you are never locked in. You can delete your account at
                  any time, directly from the settings menu within the app — there is no form to fill in, no waiting
                  period, and no need to ask our permission.
                </p>
                <p className="prose-body">
                  When you delete your account, we permanently delete your personal data, your photos, and your chat
                  history from our servers. When we say permanently, we mean it: this is a genuine removal, not a case of
                  your information being quietly tucked away out of sight.
                </p>
              </Reveal>

              {/* 5 */}
              <Reveal as="article">
                <ClauseTitle index="05">Contact us</ClauseTitle>
                <p className="prose-body">
                  If you have any questions at all about this Privacy Policy, or about how your personal data is handled
                  within BOA HUB, we would genuinely like to hear from you. Please do not hesitate to get in touch, and a
                  real person will read what you send and reply.
                </p>
                <p className="prose-body">
                  You can reach us by email at{' '}
                  <a href={`mailto:${PRIVACY_EMAIL}`} className="prose-link">
                    {PRIVACY_EMAIL}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-24 flex flex-col gap-5 border-t border-white/[0.07] pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-mist">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </p>
              <MagneticButton to="/" variant="ghost" className="!min-h-11 !px-5 !py-2 !text-sm">
                Back to home <Arrow />
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
