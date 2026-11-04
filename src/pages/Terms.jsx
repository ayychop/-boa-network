import { Arrow, MagneticButton, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

// Contact inbox named inside the legal text. Matches the address used across
// the other legal pages so there is a single place people are asked to write to.
const LEGAL_EMAIL = 'info@boanetworks.com'
const LAST_UPDATED = 'November 2026'

// Numbered clause heading: a step below the page title, but still carrying the
// serif-and-gold accent so the document reads as BOA, not a bolted-on legal page.
function ClauseTitle({ index, children }) {
  return (
    <div className="mb-8 sm:mb-10">
      <SectionLabel index={index}>Terms</SectionLabel>
      <Reveal as="h2" className="display-md text-bone">
        {children}
      </Reveal>
    </div>
  )
}

export default function Terms() {
  return (
    <>
      <title>Terms of Service — BOA Network</title>
      <meta
        name="description"
        content="The terms that govern your use of the BOA HUB mobile application: your responsibilities, content ownership, account termination and the limits of our liability."
      />
      {/* A legal page should not be chased by crawlers as primary content. */}
      <meta name="robots" content="noindex, follow" />

      <PageHeader
        index="00"
        label="Legal"
        title={
          <>
            Terms of <span className="accent">Service.</span>
          </>
        }
        lede="These terms set out the agreement between you and BOA Network when you use the BOA HUB app. We have kept them as plain as a legal document can honestly be, because an agreement you cannot read is not really an agreement at all."
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
              BOA Network (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the BOA HUB mobile
              application (the &ldquo;Service&rdquo;). By creating an account or otherwise using BOA HUB, you agree to
              these Terms of Service. If you do not agree with any part of them, please do not use the Service.
            </Reveal>

            <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
              {/* 1 */}
              <Reveal as="article">
                <ClauseTitle index="01">Accepting these terms</ClauseTitle>
                <p className="prose-body">
                  These terms form a binding agreement between you and BOA Network. They apply every time you access or
                  use BOA HUB, whether or not you have finished setting up your profile. Where we have a separate
                  document that is relevant to how you use the Service — such as our{' '}
                  <Link to="/privacy-policy" className="prose-link">
                    Privacy Policy
                  </Link>{' '}
                  and our{' '}
                  <Link to="/community-guidelines" className="prose-link">
                    Community Guidelines
                  </Link>{' '}
                  — those documents are part of this agreement too, and you should read them alongside these terms.
                </p>
              </Reveal>

              {/* 2 */}
              <Reveal as="article">
                <ClauseTitle index="02">Who can use BOA HUB</ClauseTitle>
                <p className="prose-body">
                  You must be at least 18 years old, or have the permission of a parent or guardian, to create an
                  account and use the Service. By using BOA HUB you confirm that you meet this requirement and that the
                  information you give us when you sign up is accurate and genuinely your own.
                </p>
              </Reveal>

              {/* 3 */}
              <Reveal as="article">
                <ClauseTitle index="03">Your account and your responsibilities</ClauseTitle>
                <p className="prose-body">
                  Your account is yours to look after. You are responsible for keeping your login details private, for
                  everything that happens under your account, and for making sure that your use of BOA HUB is lawful and
                  respectful of the people around you. In particular, you agree that:
                </p>
                <ul className="prose-list">
                  <li>
                    <span className="prose-term">You will keep your credentials secure.</span> If you believe someone
                    else has gained access to your account, you will tell us promptly so that we can help you protect
                    it.
                  </li>
                  <li>
                    <span className="prose-term">You will act honestly.</span> You will not impersonate anyone, create
                    an account on someone else&rsquo;s behalf without their consent, or misrepresent who you are.
                  </li>
                  <li>
                    <span className="prose-term">You will follow the rules of the community.</span> Your conduct and the
                    things you post must comply with our{' '}
                    <Link to="/community-guidelines" className="prose-link">
                      Community Guidelines
                    </Link>
                    , which explain in plain terms what is and is not welcome on BOA HUB.
                  </li>
                </ul>
              </Reveal>

              {/* 4 */}
              <Reveal as="article">
                <ClauseTitle index="04">Content and ownership</ClauseTitle>
                <p className="prose-body">
                  The photos, videos, messages and other material you post to BOA HUB belong to you. We do not claim
                  ownership of your content, and nothing in these terms transfers that ownership to us.
                </p>
                <p className="prose-body">
                  To run the Service, however, we do need your permission to handle what you post. By uploading content
                  to BOA HUB you grant us a limited, non-exclusive, worldwide, royalty-free licence to host, store,
                  display and transmit that content for the sole purpose of operating and providing the Service to you
                  and to the people you have chosen to share it with. This licence exists only so the app can do its
                  job; it ends when you remove the content or delete your account, except where we are required to keep a
                  copy for a short period to comply with the law.
                </p>
                <p className="prose-body">
                  You are responsible for the content you post. You confirm that you have the right to share it and that
                  it does not break the law or infringe anyone else&rsquo;s rights.
                </p>
              </Reveal>

              {/* 5 */}
              <Reveal as="article">
                <ClauseTitle index="05">Acceptable use</ClauseTitle>
                <p className="prose-body">
                  BOA HUB is a community, and it only works if people treat it as one. You agree not to use the Service
                  to harass, threaten or abuse others, to post unlawful, hateful or sexually explicit material, to spam
                  other members, or to interfere with the security or proper working of the app. Our{' '}
                  <Link to="/community-guidelines" className="prose-link">
                    Community Guidelines
                  </Link>{' '}
                  set out these expectations in full, and they form part of these terms.
                </p>
              </Reveal>

              {/* 6 */}
              <Reveal as="article">
                <ClauseTitle index="06">Suspension and termination</ClauseTitle>
                <p className="prose-body">
                  You can stop using BOA HUB at any time, and you can delete your account whenever you wish — from the
                  settings menu inside the app, or by using our{' '}
                  <Link to="/delete-account" className="prose-link">
                    account deletion page
                  </Link>
                  .
                </p>
                <p className="prose-body">
                  We may suspend or permanently terminate your account if you break these terms or our Community
                  Guidelines, if your conduct puts other members or the Service at risk, or if we are required to do so
                  by law. Where it is reasonable and appropriate to do so, we will aim to let you know why. When an
                  account is terminated, the right to use the Service ends, and we will handle any remaining personal
                  data in line with our{' '}
                  <Link to="/privacy-policy" className="prose-link">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </Reveal>

              {/* 7 */}
              <Reveal as="article">
                <ClauseTitle index="07">Limitation of liability</ClauseTitle>
                <p className="prose-body">
                  BOA HUB is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we work hard
                  to keep the Service running well, we cannot promise that it will always be uninterrupted,
                  error-free or completely secure, and we do not control the content that other members choose to post.
                </p>
                <p className="prose-body">
                  To the fullest extent permitted by law, BOA Network will not be liable for any indirect, incidental or
                  consequential loss arising out of your use of, or inability to use, the Service. Nothing in these terms
                  limits or excludes any liability that cannot lawfully be limited or excluded, including liability for
                  death or personal injury caused by negligence, or for fraud. Because some jurisdictions do not allow
                  certain limitations, parts of this section may not apply to you, and you may have additional rights
                  under your local law.
                </p>
              </Reveal>

              {/* 8 */}
              <Reveal as="article">
                <ClauseTitle index="08">Changes to these terms</ClauseTitle>
                <p className="prose-body">
                  We may update these terms from time to time as the Service develops or as the law changes. When we make
                  a material change, we will update the &ldquo;Last updated&rdquo; date above and, where appropriate,
                  let you know within the app. If you continue to use BOA HUB after a change takes effect, you accept the
                  revised terms.
                </p>
              </Reveal>

              {/* 9 */}
              <Reveal as="article">
                <ClauseTitle index="09">Contact us</ClauseTitle>
                <p className="prose-body">
                  If anything in these terms is unclear, or you simply want to talk something through, we would like to
                  hear from you. You can reach us by email at{' '}
                  <a href={`mailto:${LEGAL_EMAIL}`} className="prose-link">
                    {LEGAL_EMAIL}
                  </a>
                  , and a real person will read what you send.
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
