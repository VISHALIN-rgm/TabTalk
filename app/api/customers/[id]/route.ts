import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers, entries } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) { const { id } = await context.params; const customer = (await db.select().from(customers).where(eq(customers.id, id)).limit(1))[0]; if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 }); const ledger = await db.select().from(entries).where(eq(entries.customerId, id)).orderBy(desc(entries.createdAt)); const balance = ledger.reduce((sum, row) => sum + (row.type === 'credit' ? Number(row.amount) : -Number(row.amount)), 0); return NextResponse.json({ customer, ledger, balance }) }
