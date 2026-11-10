import { Arrow, MagneticButton, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

const SAFETY_EMAIL = 'jo@boanetworks.com'
const LAST_UPDATED = 'November 2026'

function ClauseTitle({ index, children }) {
  return (
    <div className="mb-8 sm:mb-10">
      <SectionLabel index={index}>Child Safety</SectionLabel>
      <Reveal as="h2" className="display-md text-bone">
        {children}
      </Reveal>
    </div>
  )
}

export default function ChildSafety() {
  return (
    <>
      <title>Child Safety Standards — BOA Network</title>
      <meta
        name="description"
        content="BOA HUB's child safety standards: our zero-tolerance policy against child sexual abuse and exploitation (CSAE), how to report concerns, and how we comply with the law."
      />
      <meta name="robots" content="noindex, follow" />

      <PageHeader
        index="00"
        label="Child Safety"
        title={
          <>
            Child Safety <span className="accent">Standards.</span>
          </>
        }
        lede="Keeping children safe is not negotiable. These standards set out how BOA HUB protects minors from abuse and exploitation, how anyone can report a concern, and the obligations we hold ourselves to under the law."
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
              BOA HUB is a place for people to be seen, to connect and to be lifted up. That promise means nothing if the
              people on it are not safe — and it means the most for the youngest among them. These standards describe
              how we guard against child sexual abuse and exploitation across everything we build.
            </Reveal>

            <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
              {/* 1 */}
              <Reveal as="article">
                <ClauseTitle index="01">Zero tolerance</ClauseTitle>
                <p className="prose-body">
                  BOA HUB has a zero-tolerance policy against Child Sexual Abuse and Exploitation (CSAE). We prohibit the
                  sharing, solicitation, or promotion of Child Sexual Abuse Material (CSAM). There are no exceptions to
                  this, anywhere in the app — in profiles, posts, messages or calls.
                </p>
              </Reveal>

              {/* 2 */}
              <Reveal as="article">
                <ClauseTitle index="02">Reporting a concern</ClauseTitle>
                <p className="prose-body">
                  Users can report any child safety concerns directly within the BOA HUB app using the{' '}
                  <span className="prose-term">flag / report icon</span>. All reports are reviewed promptly. Reporting is
                  confidential — the person you report is not told who raised it — and a real person reviews every report
                  we receive.
                </p>
                <p className="prose-body">
                  If a concern is urgent, or you would rather reach us directly, you can email{' '}
                  <a href={`mailto:${SAFETY_EMAIL}`} className="prose-link">
                    {SAFETY_EMAIL}
                  </a>{' '}
                  at any time.
                </p>
              </Reveal>

              {/* 3 */}
              <Reveal as="article">
                <ClauseTitle index="03">Compliance and the law</ClauseTitle>
                <p className="prose-body">
                  We comply with all relevant child safety laws and report confirmed CSAM to the National Center for
                  Missing &amp; Exploited Children (NCMEC) or relevant local authorities. These standards work alongside
                  our{' '}
                  <Link to="/community-guidelines" className="prose-link">
                    Community Guidelines
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" className="prose-link">
                    Terms of Service
                  </Link>
                  , which set out the full agreement for using BOA HUB.
                </p>
              </Reveal>

              {/* 4 */}
              <Reveal as="article">
                <ClauseTitle index="04">Contact</ClauseTitle>
                <p className="prose-body">
                  For child safety inquiries, contact us at{' '}
                  <a href={`mailto:${SAFETY_EMAIL}`} className="prose-link">
                    {SAFETY_EMAIL}
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
