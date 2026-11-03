import type { Metadata, Viewport } from 'next'
import { Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Tamil, Noto_Sans_Arabic, Caveat } from 'next/font/google'
import './globals.css'
const noto = Noto_Sans({ subsets: ['latin'], variable: '--font-noto' })
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari' })
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil' })
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })
export const metadata: Metadata = { title: 'TabTalk: a clearer way to keep credit', description: 'Turn handwritten or spoken credit notes into a clear record of who owes what.', openGraph: { title: 'TabTalk: a clearer way to keep credit', description: 'Turn everyday credit notes into a clear record for your shop.' }, twitter: { card: 'summary_large_image', title: 'TabTalk: a clearer way to keep credit' } }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f7f3eb' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${noto.variable} ${devanagari.variable} ${tamil.variable} ${arabic.variable} ${caveat.variable}`}>{children}</body></html> }
