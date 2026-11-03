import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq } from 'drizzle-orm'
export async function GET(request: Request) { const id = new URL(request.url).searchParams.get('id'); if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 }); const shop = await db.select().from(shops).where(eq(shops.id, id)).limit(1); return NextResponse.json(shop[0] ?? null) }
