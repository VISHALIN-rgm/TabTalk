import { NextResponse } from 'next/server'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { customers, entries, sandboxSessions, shops } from '@/db/schema'
import { auth } from '@/lib/auth'
import { apiError } from '@/lib/errors'

export async function GET() {
  try {
  const session = await auth()
  if (!session?.user?.id) return apiError('UNAUTHORIZED', 'Please sign in to continue.', 401)
  const sessionId = (await cookies()).get('tabtalk_demo')?.value
  if (!sessionId) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Please sign in to continue.' } }, { status: 401 })
  const rows = await db.select({ shop: shops }).from(sandboxSessions).innerJoin(shops, eq(shops.organizationId, sandboxSessions.organizationId)).where(and(eq(sandboxSessions.id, sessionId), sql`${sandboxSessions.expiresAt} > now()`)).limit(1)
  const shop = rows[0]?.shop
  if (!shop) return NextResponse.json({ error: { code: 'SESSION_EXPIRED', message: 'Your workspace session expired. Start again.' } }, { status: 410 })
  const people = await db.select({ id: customers.id, name: customers.name, count: sql<number>`count(${entries.id})`, balance: sql<number>`coalesce(sum(case when ${entries.type} = 'credit' then ${entries.amount} else -${entries.amount} end), 0)` }).from(customers).leftJoin(entries, and(eq(entries.customerId, customers.id), isNull(entries.deletedAt))).where(eq(customers.shopId, shop.id)).groupBy(customers.id, customers.name)
  return NextResponse.json({ shop: { id: shop.id, name: shop.name, currency: shop.currency }, customers: people.map((person) => ({ ...person, count: Number(person.count), balance: Number(person.balance) })) })
  } catch (error) {
    return apiError('SERVICE_UNAVAILABLE', 'Dashboard data is temporarily unavailable.', 503)
  }
}
