export default defineEventHandler(async (event) => {
  const db = (event.context.cloudflare?.env as any)?.DB
  if (!db) {
    throw createError({ statusCode: 500, statusMessage: 'Database not bound' })
  }

  try {
    const stmt = db.prepare('SELECT id, name, location, created_at FROM visitors ORDER BY created_at DESC LIMIT 100')
    const { results } = await stmt.all()
    return results
  } catch (err: unknown) {
    console.error('DB Select Error:', err)
    if (err instanceof Error && err.message && err.message.includes('no such table')) {
      return []
    }
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch visitors' })
  }
})
