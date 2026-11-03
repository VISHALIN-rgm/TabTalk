import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers, entries, memberships, organizations, sandboxSessions, shops, users } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { auth } from '@/lib/auth'

async function ensureDemoSchema() {
  await db.execute(sql.raw('create extension if not exists pgcrypto'))
  await db.execute(sql.raw(`alter table users add column if not exists shop_name varchar(160)`))
  await db.execute(sql.raw(`alter table users add column if not exists shop_country varchar(80)`))
  await db.execute(sql.raw(`alter table users add column if not exists shop_currency char(3)`))
  await db.execute(sql.raw(`alter table users add column if not exists shop_language varchar(16)`))
  await db.execute(sql.raw(`alter table users add column if not exists shop_timezone varchar(64)`))
  await db.execute(sql.raw(`create table if not exists organizations (id uuid primary key, name varchar(160) not null, plan text not null default 'free', created_at timestamptz not null default now())`))
  await db.execute(sql.raw(`create table if not exists memberships (id uuid primary key default gen_random_uuid(), user_id uuid not null, organization_id uuid not null, role text not null default 'staff', created_at timestamptz not null default now())`))
  await db.execute(sql.raw(`create table if not exists shops (id uuid primary key, organization_id uuid not null, name varchar(160) not null, currency char(3) not null, country varchar(80), default_reminder_language char(2) not null default 'en', timezone varchar(64) not null default 'UTC', locale varchar(16) not null default 'en')`))
  await db.execute(sql.raw(`create table if not exists customers (id uuid primary key default gen_random_uuid(), shop_id uuid not null, name varchar(160) not null, phone varchar(40), reminder_language varchar(16), created_at timestamptz not null default now())`))
  await db.execute(sql.raw(`create table if not exists entries (id uuid primary key default gen_random_uuid(), shop_id uuid not null, customer_id uuid not null, created_by uuid, edited_by uuid, item text not null, amount numeric(14,2) not null, type text not null, source text not null, detected_language varchar(16) not null, language_tier text not null default 'best_effort', confidence real not null, source_line text not null, idempotency_key varchar(128), deleted_at timestamptz, created_at timestamptz not null default now())`))
  await db.execute(sql.raw(`create unique index if not exists entries_shop_idempotency_unique on entries (shop_id, idempotency_key)`))
  await db.execute(sql.raw(`create table if not exists sandbox_sessions (id uuid primary key, organization_id uuid not null, expires_at timestamptz not null, extraction_count integer not null default 0, reminder_count integer not null default 0, created_at timestamptz not null default now())`))
}

export async function POST(request: Request) {
  const session = await auth()
  const body = await request.json().catch(() => ({})) as { trial?: boolean }
  const isTrial = body.trial === true && !session?.user?.id
  const userId = session?.user?.id
  if (!userId && !isTrial) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Please sign in to continue.' } }, { status: 401 })
  const organizationId = crypto.randomUUID()
  const sessionId = crypto.randomUUID()
  const shopId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + (isTrial ? 30 * 60 * 1000 : 24 * 60 * 60 * 1000))
  try {
    await ensureDemoSchema()
    const profile = userId ? (await db.select({ shopName: users.shopName, country: users.shopCountry, currency: users.shopCurrency, language: users.shopLanguage, timezone: users.shopTimezone }).from(users).where(eq(users.id, userId)).limit(1))[0] : null
    await db.transaction(async (tx) => {
      await tx.insert(organizations).values({ id: organizationId, name: isTrial ? 'Trial Shop' : 'TabTalk Shop', plan: 'free' })
      if (userId) await tx.insert(memberships).values({ userId, organizationId, role: 'owner' })
      await tx.insert(shops).values({ id: shopId, organizationId, name: profile?.shopName ?? 'TabTalk Shop', currency: profile?.currency ?? 'USD', country: profile?.country ?? 'US', timezone: profile?.timezone ?? 'UTC', locale: profile?.language ?? 'en', defaultReminderLanguage: profile?.language ?? 'en' })
      const seeded = await tx.insert(customers).values([{ shopId, name: 'Arun', reminderLanguage: 'en' }, { shopId, name: 'Mariam', reminderLanguage: 'en' }, { shopId, name: 'Asha', reminderLanguage: 'en' }]).returning({ id: customers.id, name: customers.name })
      const byName = new Map(seeded.map((customer) => [customer.name, customer.id]))
      await tx.insert(entries).values([
        { shopId, customerId: byName.get('Arun')!, item: 'Rice and cooking oil', amount: '420.00', type: 'credit', source: 'manual', detectedLanguage: 'en', languageTier: 'verified', confidence: 1, sourceLine: 'Rice and cooking oil — 420' },
        { shopId, customerId: byName.get('Mariam')!, item: 'Household supplies', amount: '180.00', type: 'credit', source: 'manual', detectedLanguage: 'en', languageTier: 'verified', confidence: 1, sourceLine: 'Household supplies — 180' },
        { shopId, customerId: byName.get('Asha')!, item: 'Flour', amount: '780.00', type: 'credit', source: 'manual', detectedLanguage: 'en', languageTier: 'verified', confidence: 1, sourceLine: 'Flour — 780' },
      ])
      await tx.insert(sandboxSessions).values({ id: sessionId, organizationId, expiresAt })
    })
    const response = NextResponse.json({ shopId, expiresAt, shopName: profile?.shopName ?? 'TabTalk Shop', language: profile?.language ?? 'en', currency: profile?.currency ?? 'USD' })
    response.cookies.set('tabtalk_demo', sessionId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24, path: '/' })
    return response
  } catch (error) {
    console.error('[demo-start]', error instanceof Error ? error.message : 'unknown error')
    return NextResponse.json({ error: { code: 'DATABASE_UNAVAILABLE', message: 'Your workspace could not be prepared. Please try again.' } }, { status: 503 })
  }
}
