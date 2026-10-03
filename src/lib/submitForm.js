import { site } from '../data/site'

// Set VITE_FORM_ENDPOINT (e.g. a Formspree / Basin / your own API URL) to
// receive submissions as JSON. Without it, the form hands off to the
// visitor's email app with the message pre-filled.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export async function submitForm({ form, subject, to = site.email, fields }) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form, subject, ...fields }),
    })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return 'sent'
  }

  const body = Object.entries(fields)
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return 'mailto'
}
