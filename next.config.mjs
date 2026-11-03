/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://api.meta.ai https://*.vercel.app; frame-ancestors 'none';" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=()' },
]
const nextConfig = { typescript: { ignoreBuildErrors: false }, images: { unoptimized: true }, async headers() { return [{ source: '/(.*)', headers: securityHeaders }] } }
export default nextConfig
