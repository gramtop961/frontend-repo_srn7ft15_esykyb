import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Navbar */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-500 via-blue-500 to-amber-400 shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
            <span className="text-xl font-semibold tracking-tight">Wingman PM</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#cta" className="hover:text-white transition-colors">Get early access</a>
          </div>
          <a href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 transition-colors md:ml-6">Join waitlist</a>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 md:pt-16">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-Assisted Product Management
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Turn feedback chaos into aligned delivery
            </h1>
            <p className="mt-5 text-slate-300 text-lg md:text-xl max-w-xl">
              Transform messy spreadsheets, emails, and tickets into organized insights, prioritized work, and synced engineering plans — in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="inline-flex justify-center rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400 px-6 py-3 text-white font-semibold shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)]">Get early access</a>
              <a href="#how" className="inline-flex justify-center rounded-xl border border-white/15 px-6 py-3 text-white/90 hover:bg-white/5">See the flow</a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Integrates with</span>
              <div className="flex items-center gap-3 opacity-90">
                <span className="rounded-md bg-white/5 px-2 py-1">Jira</span>
                <span className="rounded-md bg-white/5 px-2 py-1">Azure DevOps</span>
                <span className="rounded-md bg-white/5 px-2 py-1">Slack</span>
                <span className="rounded-md bg-white/5 px-2 py-1">Teams</span>
              </div>
            </div>
          </div>

          {/* Spline Canvas */}
          <div className="relative h-[420px] md:h-[560px] w-full rounded-3xl overflow-hidden border border-white/10 bg-black/30">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
