import Link from 'next/link'
import { ArrowRight, Check, FileText, Mic, ShieldCheck, Sparkles } from 'lucide-react'

const steps = [
  { number: '01', title: 'Capture the note', text: 'Speak, take a photo, or type what happened. Keep the notebook exactly as it is.', icon: Mic },
  { number: '02', title: 'Check every detail', text: 'Review the people, items, amounts, and confidence before anything is saved.', icon: Check },
  { number: '03', title: 'Stay on top of credit', text: 'See balances clearly and create a respectful reminder when it is time to follow up.', icon: Sparkles },
]

const features = [
  ['Built for real notebooks', 'Messy pages, shorthand, and mixed notes become structured records.'],
  ['Nothing saves by surprise', 'You stay in control with a review step before every confirmed entry.'],
  ['Clear at a glance', 'See outstanding balances, settled accounts, and recent activity in one place.'],
  ['Ready for every shop', 'Use your own currency and keep the workflow simple on a phone.'],
]

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#1d2b26]">
      <nav className="sticky top-0 z-30 border-b border-[#1d2b26]/10 bg-[#f7f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-[-0.04em]" aria-label="TabTalk home">Tab<span className="text-[#dc6848]">Talk</span></Link>
          <div className="hidden items-center gap-7 text-sm text-[#607069] md:flex">
            <a href="#problem" className="transition-colors hover:text-[#1d2b26]">The problem</a>
            <a href="#how" className="transition-colors hover:text-[#1d2b26]">How it works</a>
            <a href="#why" className="transition-colors hover:text-[#1d2b26]">Why TabTalk</a>
          </div>
          <div className="flex items-center gap-3"><Link href="/trial" className="hidden text-sm font-semibold text-[#607069] sm:block">Try it first</Link><Link href="/register" className="rounded-full bg-[#1d2b26] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Create account</Link></div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dc6848]/25 bg-[#dc6848]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#a84d34]"><span className="size-1.5 rounded-full bg-[#dc6848]" /> Credit, made clear</div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-8xl">Your notebook knows the story. <span className="text-[#dc6848]">TabTalk makes it clear.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#607069]">Turn handwritten or spoken credit notes into a simple record of who owes what. Review it, save it, and follow up without the mental load.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#dc6848] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#dc6848]/20 transition-all hover:-translate-y-0.5 hover:bg-[#c85b3d]">Start keeping records <ArrowRight className="size-4" /></Link>
            <a href="#how" className="rounded-full border border-[#1d2b26]/15 px-6 py-3.5 font-semibold transition-colors hover:bg-white">See how it works</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#77847e]"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[#dc6848]" /> Review before saving</span><span className="inline-flex items-center gap-2"><Sparkles className="size-4 text-[#dc6848]" /> Built for everyday shops</span></div><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#1d2b26]/10 bg-white/70 px-3 py-2 text-xs font-medium text-[#607069]"><img src="https://thesvg.org/icons/meta/default.svg" alt="Meta" width="20" height="20" className="size-5" /> Powered by Meta AI</div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl" aria-label="TabTalk turns a notebook entry into a clear balance" role="img">
          <div className="absolute -right-5 -top-7 size-28 rounded-full bg-[#e9b35f]/30 blur-2xl" />
          <div className="relative grid gap-3 rounded-[2rem] border border-[#1d2b26]/10 bg-[#e8e0d2] p-3 shadow-2xl shadow-[#1d2b26]/10 sm:grid-cols-[0.9fr_1.1fr] sm:p-5">
            <div className="rotate-[-2deg] rounded-[1.4rem] border border-[#bba97d]/40 bg-[#f2e6c6] p-5 text-[#65553b] shadow-sm sm:p-6">
              <div className="mb-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-[#957e50]"><span>Today</span><span>Credit notes</span></div>
              <div className="space-y-5 font-serif text-xl italic leading-tight sm:text-2xl"><p>Ravi — rice + oil <span className="float-right">420</span></p><p className="border-t border-[#8e7b58]/20 pt-4">Mariam — soap <span className="float-right">180</span></p><p className="border-t border-[#8e7b58]/20 pt-4">Jon — paid <span className="float-right">200</span></p><p className="border-t border-[#8e7b58]/20 pt-4">Asha — flour <span className="float-right">780</span></p></div>
              <div className="mt-10 flex items-center gap-2 text-xs not-italic text-[#957e50]"><FileText className="size-4" /> A page from the shop notebook</div>
            </div>
            <div className="rounded-[1.4rem] bg-[#1d2b26] p-5 text-white shadow-xl sm:p-6">
              <div className="mb-6 flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.16em] text-white/50">Your ledger</p><p className="mt-1 text-lg font-semibold">Outstanding</p></div><span className="rounded-full bg-[#dc6848]/20 px-2.5 py-1 text-xs font-semibold text-[#ffb39b]">4 entries</span></div>
              <div className="space-y-3">{[['Ravi', '420'], ['Mariam', '180'], ['Asha', '780']].map(([name, amount]) => <div key={name} className="flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-3"><div><p className="font-medium">{name}</p><p className="text-xs text-white/50">Needs review</p></div><p className="font-semibold">{amount}</p></div>)}</div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm text-white/60">Total outstanding</span><span className="text-2xl font-semibold">1,380</span></div>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-[#1d2b26]/10 bg-white px-4 py-2 text-xs font-semibold shadow-lg sm:block">From a page to a plan</div>
        </div>
      </section>

      <section id="problem" className="border-y border-[#1d2b26]/10 bg-white/55">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#dc6848]">The everyday problem</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">Credit runs on trust. Records should not run on memory.</h2></div><div className="grid gap-4 sm:grid-cols-3"><article className="rounded-2xl border border-[#1d2b26]/10 bg-[#f7f5ef] p-5"><span className="text-3xl font-semibold text-[#dc6848]">01</span><h3 className="mt-10 font-semibold">Notes grow messy</h3><p className="mt-2 text-sm leading-6 text-[#68756f]">A busy day leaves behind shorthand, loose pages, and amounts that are hard to check later.</p></article><article className="rounded-2xl border border-[#1d2b26]/10 bg-[#f7f5ef] p-5"><span className="text-3xl font-semibold text-[#dc6848]">02</span><h3 className="mt-10 font-semibold">Balances get unclear</h3><p className="mt-2 text-sm leading-6 text-[#68756f]">It takes time to work out what was borrowed, what was paid, and what is still open.</p></article><article className="rounded-2xl border border-[#1d2b26]/10 bg-[#f7f5ef] p-5"><span className="text-3xl font-semibold text-[#dc6848]">03</span><h3 className="mt-10 font-semibold">Following up feels awkward</h3><p className="mt-2 text-sm leading-6 text-[#68756f]">A clear record makes a respectful conversation easier for both sides.</p></article></div></div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#dc6848]">A calmer way to keep khata</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Three steps. One clear picture.</h2></div><Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#dc6848]">Try it now <ArrowRight className="size-4" /></Link></div><div className="mt-12 grid gap-4 md:grid-cols-3">{steps.map(({ number, title, text, icon: Icon }) => <article key={number} className="group rounded-3xl bg-[#e9e3d8] p-6 transition-transform hover:-translate-y-1"><div className="flex items-start justify-between"><span className="text-sm font-semibold text-[#dc6848]">{number}</span><Icon className="size-5 text-[#dc6848]" /></div><h3 className="mt-16 text-xl font-semibold">{title}</h3><p className="mt-3 max-w-xs leading-7 text-[#68756f]">{text}</p></article>)}</div></section>

      <section id="why" className="bg-[#1d2b26] text-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffad92]">Made for the way shops actually work</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Simple enough for today. Useful tomorrow.</h2></div><div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/15 sm:grid-cols-2">{features.map(([title, text]) => <article key={title} className="bg-[#1d2b26] p-6 sm:p-8"><Check className="size-5 text-[#ffad92]" /><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-2 max-w-sm leading-7 text-white/60">{text}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="rounded-[2rem] bg-[#dc6848] px-6 py-12 text-center text-white sm:px-10"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Your next entry can be clearer</p><h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Leave the notebook as it is. Upgrade what it can do.</h2><Link href="/register" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#1d2b26] transition-transform hover:-translate-y-0.5">Start keeping records <ArrowRight className="size-4" /></Link></div></section>

      <footer className="border-t border-[#1d2b26]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#77847e] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/" className="font-bold tracking-[-0.04em] text-[#1d2b26]">Tab<span className="text-[#dc6848]">Talk</span></Link>
          <p>A clearer way to keep track of credit.</p>
          <div className="flex items-center gap-4"><span className="inline-flex items-center gap-1.5 text-xs"><img src="https://thesvg.org/icons/meta/default.svg" alt="Meta" width="14" height="14" /> Powered by Meta</span><div className="flex gap-4"><Link href="/privacy" className="hover:text-[#1d2b26]">Privacy</Link><Link href="/terms" className="hover:text-[#1d2b26]">Terms</Link></div></div>
        </div>
      </footer>
    </main>
  )
}
