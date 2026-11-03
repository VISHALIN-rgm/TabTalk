import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/db/schema'
const scrypt = promisify(scryptCallback)
async function verifyPassword(password: string, stored: string) { const [salt, key] = stored.split(':'); if (!salt || !key) return false; const derived = await scrypt(password, salt, 64) as Buffer; const expected = Buffer.from(key, 'hex'); return expected.length === derived.length && timingSafeEqual(expected, derived) }
export const { handlers, auth, signIn, signOut } = NextAuth({ secret: process.env.BETTER_AUTH_SECRET, trustHost: true, cookies: { sessionToken: { name: 'authjs.session-token', options: { httpOnly: true, sameSite: 'none', secure: true, path: '/' } }, csrfToken: { name: 'authjs.csrf-token', options: { httpOnly: false, sameSite: 'none', secure: true, path: '/' } } }, session: { strategy: 'jwt' }, providers: [Credentials({ credentials: { email: {}, password: {} }, async authorize(credentials) { const email = String(credentials?.email ?? '').trim().toLowerCase(); const password = String(credentials?.password ?? ''); const user = (await db.select({ id: users.id, name: users.name, email: users.email, passwordHash: users.passwordHash }).from(users).where(eq(users.email, email)).limit(1))[0]; if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) return null; return { id: user.id, name: user.name, email: user.email } } })], pages: { signIn: '/login' }, callbacks: { async jwt({ token, user }) { if (user) token.id = user.id; return token }, async session({ session, token }) { if (session.user) session.user.id = String(token.id ?? ''); return session } } })
