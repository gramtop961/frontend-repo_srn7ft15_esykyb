import { useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const rawNotes = [
  '“Search is slow on mobile”',
  'Export to CSV please',
  'Dark mode when?',
  'Onboarding is confusing',
  'Slack notifications noisy',
  'Need SSO for enterprise',
  'Priorities unclear',
  'Roadmap visibility',
  'Duplicate tickets',
  'Churn spike after trial',
]

function FloatingNote({ text, delay, x, y }){
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="absolute select-none"
      style={{ left: x, top: y }}
    >
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 backdrop-blur shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]">
        {text}
      </div>
    </motion.div>
  )
}

export default function FeedbackAnimation(){
  const controls = useAnimation()
  const controls2 = useAnimation()

  // Simple autoplay loop between scatter -> cluster
  useEffect(() => {
    let mounted = true
    const loop = async () => {
      while(mounted){
        await controls.start('cluster')
        await new Promise(r => setTimeout(r, 1400))
        await controls.start('scatter')
        await new Promise(r => setTimeout(r, 1200))
      }
    }
    loop()
    return () => { mounted = false }
  }, [controls])

  useEffect(() => {
    let mounted = true
    const loop2 = async () => {
      while(mounted){
        await controls2.start('focus')
        await new Promise(r => setTimeout(r, 900))
        await controls2.start('idle')
        await new Promise(r => setTimeout(r, 900))
      }
    }
    loop2()
    return () => { mounted = false }
  }, [controls2])

  const variants = {
    scatter: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } },
    cluster: (i) => {
      // cluster into 3 columns
      const col = i % 3
      const row = Math.floor(i / 3)
      const baseX = [-220, 0, 220][col]
      const baseY = -80 + row * 40
      return { x: baseX, y: baseY, rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } }
    }
  }

  const themeCards = [
    { title: 'Performance', bullets: ['Slow search', 'Mobile lag'] },
    { title: 'Usability', bullets: ['Confusing onboarding', 'Duplicate tickets'] },
    { title: 'Delivery', bullets: ['Priorities unclear', 'Roadmap visibility'] },
  ]

  const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:animate-[shimmer_2s_infinite]'

  return (
    <section className="relative bg-slate-950 text-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            From chaos to clarity
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
            Watch unstructured feedback organize itself
          </h2>
          <p className="mt-3 text-slate-300">Wingman ingests messy notes, emails, and spreadsheets and auto-clusters them into actionable themes you can prioritize.</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: dynamic scatter -> cluster */}
          <div className="relative h-[420px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] overflow-hidden backdrop-blur">
            <div className="absolute inset-0">
              {/* scattered notes */}
              {rawNotes.map((n, i) => {
                const x = 20 + (i * 37) % 520
                const y = 20 + (i * 53) % 320
                return (
                  <motion.div
                    key={n}
                    custom={i}
                    initial="scatter"
                    animate={controls}
                    variants={variants}
                    className="absolute"
                    style={{ left: x, top: y }}
                  >
                    <div className={`rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-100 shadow-[0_12px_40px_-12px_rgba(2,6,23,0.8)] ${shimmer}`}>
                      {n}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* cluster headers */}
            <div className="absolute inset-0 grid grid-cols-3">
              {['Performance','Usability','Delivery'].map((h) => (
                <div key={h} className="border-white/5 first:border-r last:border-l border-l border-r" />
              ))}
            </div>
            <div className="absolute top-4 left-0 right-0 grid grid-cols-3 text-center text-xs text-slate-400">
              {['Performance','Usability','Delivery'].map((h) => (
                <div key={h}>{h}</div>
              ))}
            </div>
          </div>

          {/* Right: themed cards with pulse */}
          <div className="grid gap-4">
            {themeCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial="idle"
                animate={controls2}
                variants={{
                  idle: { scale: 1, boxShadow: '0 0 0 0 rgba(168,85,247,0.0)' },
                  focus: { scale: 1.02, boxShadow: '0 0 0 8px rgba(168,85,247,0.08)' }
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <ul className="mt-3 text-sm text-slate-300 grid sm:grid-cols-2 gap-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
