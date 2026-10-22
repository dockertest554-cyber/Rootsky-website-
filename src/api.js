/* Form submissions go to the API on Render (proxied via /api in vercel.json).
   The free Render plan sleeps when idle and takes ~30-60s to wake, so we ping
   it as soon as a form page opens and retry once if the first request fails. */

const FALLBACK = 'We couldn\'t send your message right now. Please email us at sales@rootskysystem.com.'

export function wakeApi() {
  fetch('/api/health').catch(() => {})
}

async function attempt(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  // The proxy returns HTML/plain text on timeouts, so don't assume JSON
  const data = await res.json().catch(() => ({}))
  return { res, data }
}

export async function postForm(path, body) {
  let result
  try {
    result = await attempt(path, body)
  } catch {
    result = null
  }
  // Network error or gateway timeout while the server was waking: try once more
  if (!result || [502, 503, 504].includes(result.res.status)) {
    try {
      result = await attempt(path, body)
    } catch {
      throw new Error(FALLBACK)
    }
  }
  const { res, data } = result
  if (!res.ok) throw new Error(res.status < 500 && data.message ? data.message : FALLBACK)
  return data
}
