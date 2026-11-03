import { NextResponse } from 'next/server'
import { and, eq, sql } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { customers, entries, sandboxSessions, shops } from '@/db/schema'
import { auth } from '@/lib/auth'
import { saveEntriesSchema } from '@/lib/schemas'
import { languageTier } from '@/lib/languages'
import { apiError } from '@/lib/errors'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return apiError('UNAUTHORIZED', 'Please sign in to continue.', 401)
    const body = saveEntriesSchema.parse(await request.json())
    const sessionId = (await cookies()).get('tabtalk_demo')?.value
    const ownedShop = sessionId ? await db.select({ id: shops.id }).from(sandboxSessions).innerJoin(shops, eq(shops.organizationId, sandboxSessions.organizationId)).where(and(eq(sandboxSessions.id, sessionId), eq(shops.id, body.shopId), sql`${sandboxSessions.expiresAt} > now()`)).limit(1) : []
    if (!ownedShop[0]) return apiError('FORBIDDEN', 'Your workspace session is missing or expired.', 403)
    await db.transaction(async (tx) => {
      for (const [index, entry] of body.entries.entries()) {
        const idempotencyKey = body.idempotencyKey ? `${body.idempotencyKey}:${index}` : undefined
        if (idempotencyKey) {
          const duplicate = await tx.select({ id: entries.id }).from(entries).where(and(eq(entries.shopId, body.shopId), eq(entries.idempotencyKey, idempotencyKey))).limit(1)
          if (duplicate.length > 0) continue
        }
        const normalizedName = entry.customer.trim()
        const existing = await tx.select().from(customers).where(and(eq(customers.shopId, body.shopId), sql`lower(trim(${customers.name})) = lower(trim(${normalizedName}))`)).limit(1)
        const customer = existing[0] ?? (await tx.insert(customers).values({ shopId: body.shopId, name: normalizedName, reminderLanguage: entry.detected_language }).returning())[0]
        await tx.insert(entries).values({ shopId: body.shopId, customerId: customer.id, item: entry.item, amount: entry.amount.toFixed(2), type: entry.type, source: entry.source, detectedLanguage: entry.detected_language, languageTier: languageTier(entry.detected_language), confidence: entry.confidence, sourceLine: entry.source_line, idempotencyKey })
      }
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') return apiError('BAD_REQUEST', 'Please check the submitted entries.', 400)
    return apiError('INTERNAL_ERROR', 'Could not save entries. Please try again.', 500)
  }
}
