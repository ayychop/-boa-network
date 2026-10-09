import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow, MagneticButton, PageHeader, Reveal } from '../components/ui'
import { submitForm } from '../lib/submitForm'
import { site } from '../data/site'
import { DISCIPLINES } from '../data/talent'

function Field({ label, name, optional, children, className = '' }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={name}>
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-60">optional</span>}
      </label>
      {children}
    </div>
  )
}

// Shared submit handling: idle → sending → sent | mailto | error
function useFormSubmit(build) {
  const [state, setState] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.company_website) return // honeypot
    delete data.company_website
    setState('sending')
    try {
      const result = await submitForm(build(data))
      setState(result)
      if (result === 'sent') form.reset()
    } catch {
      setState('error')
    }
  }
  return [state, onSubmit]
}

function FormStatus({ state, to }) {
  const messages = {
    sent: 'Received. A real person will read this. Thank you.',
    mailto: `Your email app should have opened with your message ready to send. If it did not, email us directly at ${to}.`,
    error: `Something went wrong sending that. Please try again, or email ${to}.`,
  }
  return (
    <p role="status" aria-live="polite" className={`text-sm leading-relaxed ${state === 'error' ? 'text-red-300' : 'text-amber'}`}>
      {messages[state] ?? ''}
    </p>
  )
}

function Honeypot() {
  return <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
}

function GeneralForm({ subject }) {
  const [state, onSubmit] = useFormSubmit((fields) => ({
    form: 'general',
    subject: fields.Subject || 'General enquiry',
    to: site.email,
    fields,
  }))
  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <Honeypot />
      <Field label="Name" name="g-name">
        <input id="g-name" name="Name" className="input" required autoComplete="name" />
      </Field>
      <Field label="Email" name="g-email">
        <input id="g-email" name="Email" type="email" className="input" required autoComplete="email" />
      </Field>
      <Field label="Company" name="g-company" optional>
        <input id="g-company" name="Company" className="input" autoComplete="organization" />
      </Field>
      <Field label="Subject" name="g-subject">
        <input id="g-subject" name="Subject" className="input" required defaultValue={subject} placeholder="Press, partnership, booking…" />
      </Field>
      <Field label="Message" name="g-message" className="sm:col-span-2">
        <textarea id="g-message" name="Message" rows={6} className="input resize-y" required />
      </Field>
      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center">
        <MagneticButton type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send enquiry'} <Arrow />
        </MagneticButton>
        <FormStatus state={state} to={site.email} />
      </div>
    </form>
  )
}

function TalentForm({ role }) {
  const [state, onSubmit] = useFormSubmit((fields) => ({
    form: 'talent',
    subject: `Talent submission: ${fields.Name}${fields['Applying for'] ? ` — ${fields['Applying for']}` : ''}`,
    to: site.castingEmail,
    fields,
  }))
  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <Honeypot />
      <Field label="Full name" name="t-name">
        <input id="t-name" name="Name" className="input" required autoComplete="name" />
      </Field>
      <Field label="Email" name="t-email">
        <input id="t-email" name="Email" type="email" className="input" required autoComplete="email" />
      </Field>
      <Field label="Phone" name="t-phone" optional>
        <input id="t-phone" name="Phone" type="tel" className="input" autoComplete="tel" />
      </Field>
      <Field label="Where are you based?" name="t-location">
        <input id="t-location" name="Location" className="input" required placeholder="Town or city" />
      </Field>
      <Field label="I am an" name="t-discipline">
        <select id="t-discipline" name="Discipline" className="input" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {DISCIPLINES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </Field>
      <Field label="Applying for" name="t-role" optional>
        <input id="t-role" name="Applying for" className="input" defaultValue={role} placeholder="A casting call, or leave blank" />
      </Field>
      <Field label="Link to a photo" name="t-photo">
        <input id="t-photo" name="Photo link" type="url" className="input" required placeholder="https://" />
      </Field>
      <Field label="Link to a self tape or reel" name="t-tape" optional>
        <input id="t-tape" name="Tape link" type="url" className="input" placeholder="https://" />
      </Field>
      <p className="text-sm leading-relaxed text-mist sm:col-span-2">
        Any link works: Google Drive, iCloud, Instagram, YouTube. A phone photo by a window is fine. No professional
        headshots needed.
      </p>
      <Field label="Tell us about you" name="t-about" className="sm:col-span-2">
        <textarea
          id="t-about"
          name="About"
          rows={6}
          className="input resize-y"
          required
          placeholder="Who you are, what you want to do, and anything that has stood in your way."
        />
      </Field>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-mist sm:col-span-2">
        <input type="checkbox" name="Consent" value="Yes" required className="mt-1 h-4 w-4 accent-[var(--color-gold)]" />
        <span>
          I am 18 or over (or have a parent or guardian’s permission) and I am happy for BOA Network to keep these
          details to consider me for casting.
        </span>
      </label>
      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center">
        <MagneticButton type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Submit to casting'} <Arrow />
        </MagneticButton>
        <FormStatus state={state} to={site.castingEmail} />
      </div>
    </form>
  )
}

const TABS = [
  { id: 'general', label: 'General enquiry', blurb: 'Press, partnerships, bookings and everything else.' },
  { id: 'talent', label: 'Talent submission', blurb: 'Actors and models. Free to submit, and every one is watched.' },
]

export default function Contact() {
  const [params, setParams] = useSearchParams()
  const active = params.get('form') === 'talent' ? 'talent' : 'general'
  const select = (id) => {
    const next = new URLSearchParams(params)
    next.set('form', id)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <title>Contact — BOA Network</title>
      <meta name="description" content="Contact BOA Network: send a general enquiry, or submit yourself as an actor or model." />
      <PageHeader
        index="05"
        label="Contact"
        title={
          <>
            Say <span className="accent">hello.</span>
          </>
        }
        lede="Two ways in. One for business, one for talent. Both go to a person."
      />

      <section className="container-x pb-28 sm:pb-44">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <div role="tablist" aria-label="Choose a form" className="grid gap-3">
              {TABS.map((t) => {
                const on = active === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => select(t.id)}
                    className={`rounded-2xl border p-6 text-left transition-colors duration-500 ${
                      on ? 'border-gold/70 bg-gold/[0.07]' : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    <span className={`hud-label ${on ? '!text-gold' : '!text-mist'}`}>{on ? 'Selected' : 'Switch to'}</span>
                    <span className="mt-3 block text-2xl font-semibold tracking-[-0.03em]">{t.label}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-mist">{t.blurb}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-8 space-y-2 text-sm">
              <p className="hud-label !text-mist">Or email</p>
              <p>
                <a href={`mailto:${site.email}`} className="text-bone/85 hover:text-gold">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.castingEmail}`} className="text-bone/85 hover:text-gold">
                  {site.castingEmail}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              role="tabpanel"
              id={`panel-${active}`}
              aria-labelledby={`tab-${active}`}
              className="glass glow-border rounded-3xl p-6 sm:p-10 lg:p-12"
            >
              <h2 className="mb-8 text-3xl font-semibold tracking-[-0.035em] sm:mb-10 sm:text-4xl">
                {active === 'talent' ? 'Show us who you are.' : 'What can we do for you?'}
              </h2>
              {active === 'talent' ? (
                <TalentForm key="talent" role={params.get('role') ?? ''} />
              ) : (
                <GeneralForm key="general" subject={params.get('subject') ?? ''} />
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
