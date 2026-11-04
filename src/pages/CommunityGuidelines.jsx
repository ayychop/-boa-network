import { Arrow, MagneticButton, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

const LEGAL_EMAIL = 'info@boanetworks.com'
const LAST_UPDATED = 'November 2026'

function ClauseTitle({ index, children }) {
  return (
    <div className="mb-8 sm:mb-10">
      <SectionLabel index={index}>Community</SectionLabel>
      <Reveal as="h2" className="display-md text-bone">
        {children}
      </Reveal>
    </div>
  )
}

export default function CommunityGuidelines() {
  return (
    <>
      <title>Community Guidelines — BOA Network</title>
      <meta
        name="description"
        content="The standards everyone agrees to when they use BOA HUB: what is welcome, what is not allowed, how we enforce it, and how to report content."
      />
      <meta name="robots" content="noindex, follow" />

      <PageHeader
        index="00"
        label="Community"
        title={
          <>
            Community <span className="accent">Guidelines.</span>
          </>
        }
        lede="BOA HUB only works if it feels safe to be in. These guidelines are the shared ground everyone stands on: the things that keep this a place worth showing up to, and the lines that are not ours to cross."
      >
        <Reveal className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-center" delay={0.2}>
          <MagneticButton to="/" variant="ghost">
            Back to home <Arrow />
          </MagneticButton>
          <p className="hud-label !text-mist">BOA HUB · Last updated {LAST_UPDATED}</p>
        </Reveal>
      </PageHeader>

      <section className="section !pt-0">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal as="p" className="lede !text-bone/80">
              When you use BOA HUB, you join a community of people who are here to create, connect and be seen. These
              guidelines apply to everyone, everywhere in the app — your profile, your posts, your messages and your
              calls. They exist to protect the people around you, and to protect you.
            </Reveal>

            <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
              {/* 1 */}
              <Reveal as="article">
                <ClauseTitle index="01">What we stand for</ClauseTitle>
                <p className="prose-body">
                  BOA HUB is built on one simple idea: talent was never the problem — access was. That means this is a
                  place for opening doors, not slamming them. Treat the people you meet here with the same respect you
                  would want for yourself. Assume good faith, give others room, and remember that there is a real person
                  on the other side of every profile.
                </p>
              </Reveal>

              {/* 2 */}
              <Reveal as="article">
                <ClauseTitle index="02">What&rsquo;s welcome here</ClauseTitle>
                <p className="prose-body">
                  Most of what makes BOA HUB good is obvious once you are in it. You are encouraged to:
                </p>
                <ul className="prose-list">
                  <li>
                    <span className="prose-term">Be yourself.</span> Share your work, your talent and your story
                    honestly, as the person you actually are.
                  </li>
                  <li>
                    <span className="prose-term">Lift others up.</span> Encourage, collaborate and make genuine
                    connections with the people you meet.
                  </li>
                  <li>
                    <span className="prose-term">Keep it real.</span> Post content that is your own, or that you have
                    the right to share.
                  </li>
                </ul>
              </Reveal>

              {/* 3 */}
              <Reveal as="article">
                <ClauseTitle index="03">What&rsquo;s not allowed</ClauseTitle>
                <p className="prose-body">
                  To keep BOA HUB safe for everyone, the following are never permitted — anywhere in the app, in posts or
                  in private messages:
                </p>
                <ul className="prose-list">
                  <li>
                    <span className="prose-term">Harassment and bullying.</span> No targeting, threatening, intimidating
                    or repeatedly contacting someone who does not want to hear from you. This includes stalking and
                    coordinated pile-ons.
                  </li>
                  <li>
                    <span className="prose-term">Nudity and sexual content.</span> No pornographic or sexually explicit
                    images or video, and no sexual content involving anyone who is, or appears to be, a minor — which we
                    report and act on without exception.
                  </li>
                  <li>
                    <span className="prose-term">Hate speech.</span> No attacks on people based on race, ethnicity,
                    national origin, religion, disability, sex, gender identity, sexual orientation or any other
                    protected characteristic. Slurs and dehumanising language are not welcome here.
                  </li>
                  <li>
                    <span className="prose-term">Spam and deception.</span> No bulk, repetitive or unsolicited messaging,
                    no scams or fraud, no fake accounts, and no impersonating other people or organisations.
                  </li>
                  <li>
                    <span className="prose-term">Violence and illegal activity.</span> No threats of violence, no
                    incitement of harm, and no using BOA HUB to organise or promote anything illegal.
                  </li>
                </ul>
              </Reveal>

              {/* 4 */}
              <Reveal as="article">
                <ClauseTitle index="04">How we enforce these rules</ClauseTitle>
                <p className="prose-body">
                  When something breaks these guidelines, we act. Depending on how serious it is, and whether it happens
                  again, we may remove the content, issue a warning, or suspend an account. Serious or repeated
                  violations result in your account being permanently terminated, and the most serious cases — such as
                  content that endangers a child — are reported to the relevant authorities.
                </p>
                <p className="prose-body">
                  These guidelines work together with our{' '}
                  <Link to="/terms" className="prose-link">
                    Terms of Service
                  </Link>
                  , which set out the full agreement for using BOA HUB.
                </p>
              </Reveal>

              {/* 5 */}
              <Reveal as="article">
                <ClauseTitle index="05">Reporting content</ClauseTitle>
                <p className="prose-body">
                  If you see something that breaks these guidelines, tell us. Anywhere in the app, you can report a post,
                  a message or a profile using the{' '}
                  <span className="prose-term">flag icon</span>. Choose the flag, tell us briefly what is wrong, and the
                  report comes straight to our team. Reports are confidential — the person you report is not told who
                  raised it — and a real person reviews every one.
                </p>
                <p className="prose-body">
                  If something is urgent, or you would rather reach us directly, you can email{' '}
                  <a href={`mailto:${LEGAL_EMAIL}`} className="prose-link">
                    {LEGAL_EMAIL}
                  </a>{' '}
                  at any time.
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
