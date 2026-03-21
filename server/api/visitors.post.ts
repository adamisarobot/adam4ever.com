import { Filter } from 'bad-words'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = body?.name?.trim()

  if (!name || name.length > 50) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name provided' })
  }

  // Sanitization: Profanity check
  const filter = new Filter()
  if (filter.isProfane(name)) {
    throw createError({ statusCode: 400, statusMessage: 'Name contains inappropriate language' })
  }

  // Location from Cloudflare or fallback
  let location = 'Unknown location'
  const cf = event.context.cf || event.context.cloudflare?.request?.cf || event.node.req.headers['cf-ipcountry']
  
  if (cf && (cf.city || cf.country)) {
    if (cf.city && cf.country) {
      location = `${cf.city}, ${cf.country}`
    } else {
      location = cf.city || cf.country
    }
  } else if (typeof cf === 'string') {
    // If it's just the country header
    location = String(cf)
  }

  // Safe HTML stripping for basic XSS protection (Vue also handles this, but good practice)
  const safeName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Insert into DB
  const db = (event.context.cloudflare?.env as any)?.DB
  if (!db) {
    console.error('Database binding not found on context', Object.keys(event.context))
    // Fallback for purely local dev if CF binding isn't injected, but Nitro should provide it
    throw createError({ statusCode: 500, statusMessage: 'Database not bound' })
  }

  try {
    const stmt = db.prepare('INSERT INTO visitors (name, location) VALUES (?, ?)')
    await stmt.bind(safeName, location).run()
    return { success: true, name: safeName, location }
  } catch (err: unknown) {
    console.error('DB Insert Error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to insert visitor' })
  }
})
