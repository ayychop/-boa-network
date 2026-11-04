import { useState } from 'react'
import { Arrow, MagneticButton, PageHeader, Reveal } from '../components/ui'

// The Supabase Edge Function that processes account-deletion requests.
const DELETE_ENDPOINT = 'https://kxuksllxxxqomntfgiiz.supabase.co/functions/v1/delete-account'

// Supabase Edge Functions verify a JWT by default. A public, unauthenticated
// page like this one must either call a function deployed with
// `--no-verify-jwt`, or send the project's *anon* (public) key — which is safe
// to ship in frontend code. If VITE_SUPABASE_ANON_KEY is set at build time we
// forward it; otherwise we send the request without it and rely on the function
// being public. Set the env var in your host (e.g. Vercel) if the call 401s.
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const CONFIRMATION = 'If an account exists for this email, it will be permanently deleted within 24 hours.'
const SUPPORT_EMAIL = 'info@boanetworks.com'

function Field({ label, name, children }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  )
}

export default function DeleteAccount() {
  // idle → sending → done | error
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.company_website) return // honeypot: silently drop bot submissions
    const email = String(data.email || '').trim()
    if (!email) return

    setState('sending')
    try {
      const headers = { 'Content-Type': 'application/json' }
      if (ANON_KEY) {
        headers.apikey = ANON_KEY
        headers.Authorization = `Bearer ${ANON_KEY}`
      }
      const res = await fetch(DELETE_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email }),
      })
      // A well-built deletion function returns a success status whether or not
      // the email matches an account, so the response never reveals which
      // emails are registered. We surface the same neutral confirmation on any
      // completed request, and only treat a network/server failure as an error.
      if (!res.ok) throw new Error(`Deletion endpoint responded ${res.status}`)
      setState('done')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <>
      <title>Delete Your Account — BOA Network</title>
      <meta
        name="description"
        content="Request permanent deletion of your BOA HUB account and personal data. Enter your email and we will remove your account within 24 hours."
      />
      <meta name="robots" content="noindex, follow" />

      <PageHeader
        index="00"
        label="Account"
        title={
          <>
            Delete your <span className="accent">account.</span>
          </>
        }
        lede="You are always free to leave, and to take your data with you when you go. Enter the email address tied to your BOA HUB account below and we will permanently delete the account and the personal data attached to it."
      >
        <Reveal className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-center" delay={0.2}>
          <MagneticButton to="/" variant="ghost">
            Back to home <Arrow />
          </MagneticButton>
          <p className="hud-label !text-mist">BOA HUB · Account deletion</p>
        </Reveal>
      </PageHeader>

      <section className="section !pt-0">
        <div className="container-x">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <div className="glass glow-border relative overflow-hidden rounded-3xl p-6 sm:p-12">
                {state === 'done' ? (
                  <div role="status" aria-live="polite" className="text-center">
                    <p className="hud-label !text-gold">Request received</p>
                    <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-bone sm:text-3xl">
                      {CONFIRMATION}
                    </h2>
                    <p className="mt-6 text-sm leading-relaxed text-mist">
                      There is nothing more you need to do. If you did not mean to request this, simply contact us at{' '}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="prose-link">
                        {SUPPORT_EMAIL}
                      </a>{' '}
                      before the 24 hours are up.
                    </p>
                    <div className="mt-10">
                      <MagneticButton to="/" variant="ghost">
                        Back to home <Arrow />
                      </MagneticButton>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold tracking-[-0.035em] text-bone sm:text-3xl">
                      Request account deletion
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-mist">
                      This permanently removes your profile, your uploads and your messages from BOA HUB. It cannot be
                      undone.
                    </p>

                    <form onSubmit={onSubmit} className="mt-10 grid gap-8">
                      {/* Honeypot: hidden from people, tempting to bots. */}
                      <input
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden"
                      />

                      <Field label="Account email" name="email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          className="input"
                        />
                      </Field>

                      <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center">
                        <MagneticButton type="submit" disabled={state === 'sending'}>
                          {state === 'sending' ? 'Submitting…' : 'Delete my account'} <Arrow />
                        </MagneticButton>
                        {state === 'error' && (
                          <p role="status" aria-live="polite" className="text-sm leading-relaxed text-red-300">
                            Something went wrong sending that request. Please try again, or email us at{' '}
                            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-red-200">
                              {SUPPORT_EMAIL}
                            </a>
                            .
                          </p>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 text-sm leading-relaxed text-mist">
                Prefer to do it in the app? You can also delete your account at any time from the settings menu inside
                BOA HUB. Either route removes the same data. For anything else, see our{' '}
                <a href="/privacy-policy" className="prose-link">
                  Privacy Policy
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
