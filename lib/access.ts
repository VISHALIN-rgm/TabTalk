import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { memberships, shops } from '@/db/schema'
import { apiError } from '@/lib/errors'
import { auth } from '@/lib/auth'

export type Role = 'owner' | 'staff' | 'viewer'
const rank: Record<Role, number> = { viewer: 0, staff: 1, owner: 2 }
export async function requireShopAccess(shopId: string, minRole: Role = 'viewer') {
  const session = await auth()
  if (!session?.user?.id) throw apiError('UNAUTHORIZED', 'Sign in to continue.', 401)
  const rows = await db.select({ shop: shops, membership: memberships }).from(shops).innerJoin(memberships, eq(memberships.organizationId, shops.organizationId)).where(and(eq(shops.id, shopId), eq(memberships.userId, session.user.id))).limit(1)
  const access = rows[0]
  if (!access || rank[access.membership.role] < rank[minRole]) throw apiError('FORBIDDEN', 'You do not have access to this shop.', 403)
  return { session, shop: access.shop, membership: access.membership }
}
