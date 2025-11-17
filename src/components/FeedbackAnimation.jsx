import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Sparkles, Gauge, Wand2, Truck } from 'lucide-react'

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

export default function FeedbackAnimation() {
  const controls = useAnimation()
  const cardFocus = useAnimation()

  // Autoplay loop between scatter -> cluster
  useEffect(() => {
    let mounted = true
    const loop = async () => {
      while (mounted) {
        await controls.start('cluster')
        await new Promise((r) => setTimeout(r, 1400))
        await controls.start('scatter')
        await new Promise((r) => setTimeout(r, 1200))
      }
    }
    loop()
    return () => {
      mounted = false
    }
  }, [controls])

  // Pulse focus across theme cards in sequence
  useEffect(() => {
    let mounted = true
    const seq = async () => {
      while (mounted) {
        await cardFocus.start({ active: 0 })
        await new Promise((r) => setTimeout(r, 900))
        await cardFocus.start({ active: 1 })
        await new Promise((r) => setTimeout(r, 900))
        await cardFocus.start({ active: 2 })
        await new Promise((r) => setTimeout(r, 900))
      }
    }
    seq()
    return () => {
      mounted = false
    }
  }, [cardFocus])

  const variants = {
    scatter: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    cluster: (i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const baseX = [-220, 0, 220][col]
      const baseY = -80 + row * 40
      return {
        x: baseX,
        y: baseY,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      }
    },
  }

  const themeCards = [
    {
      title: 'Performance',
      bullets: ['Slow search', 'Mobile lag'],
      icon: Gauge,
      gradient: 'from-purple-500 via-blue-500 to-emerald-400',
    },
    {
      title: 'Usability',
      bullets: ['Confusing onboarding', 'Duplicate tickets'],
      icon: Wand2,
      gradient: 'from-fuchsia-500 via-violet-500 to-sky-400',
    },
    {
      title: 'Delivery',
      bullets: ['Priorities unclear', 'Roadmap visibility'],
      icon: Truck,
      gradient: 'from-amber-400 via-orange-500 to-pink-500',
    },
  ]

  // Util classes
  const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:animate-[shimmer_2s_infinite]'

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
          <p className="mt-3 text-slate-300">
            Wingman ingests messy notes, emails, and spreadsheets and auto-clusters them into actionable themes you can prioritize.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: dynamic scatter -> cluster */}
          <div className="relative h-[420px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] overflow-hidden backdrop-blur">
            <div className="absolute inset-0">
              {/* scattered notes */}
              {rawNotes.map((n, i) => {
                const x = 20 + ((i * 37) % 520)
                const y = 20 + ((i * 53) % 320)
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
              {['Performance', 'Usability', 'Delivery'].map((h) => (
                <div key={h} className="border-white/5 first:border-r last:border-l border-l border-r" />
              ))}
            </div>
            <div className="absolute top-4 left-0 right-0 grid grid-cols-3 text-center text-xs">
              {['Performance', 'Usability', 'Delivery'].map((h, idx) => (
                <div key={h} className="flex items-center justify-center gap-2 text-slate-300">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${themeCards[idx].gradient}`}
                  />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* Ambient edge glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-b from-purple-500/10 via-transparent to-amber-400/10 blur-xl" />
          </div>

          {/* Right: elevated theme panels */}
          <div className="grid gap-5">
            {themeCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ y: 8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={cardFocus}
                  custom={idx}
                >
                  {/* Gradient frame */}
                  <div className={`p-[1px] rounded-2xl bg-gradient-to-r ${card.gradient} shadow-[0_20px_80px_-24px_rgba(59,130,246,0.25)]`}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-5 overflow-hidden"
                      style={{
                        boxShadow:
                          '0 10px 25px -10px rgba(2,6,23,0.6), 0 40px 80px -40px rgba(168,85,247,0.25)'
                      }}
                    >
                      {/* corner glows */}
                      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br ${card.gradient} text-slate-900`}> 
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-300">
                            {card.title}
                          </h3>
                        </div>

                        {/* reactive pulse ring when active */}
                        <motion.div
                          animate={{
                            boxShadow:
                              idx === (cardFocus.get() && cardFocus.get().active)
                                ? '0 0 0 10px rgba(168,85,247,0.10)'
                                : '0 0 0 0 rgba(168,85,247,0)'
                          }}
                          transition={{ duration: 0.5 }}
                          className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_24px_2px_rgba(52,211,153,0.6)]"
                        />
                      </div>

                      {/* bullets -> badges */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {card.bullets.map((b) => (
                          <span
                            key={b}
                            className="text-[11px] leading-5 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-200/90 hover:border-white/20 hover:bg-white/10 transition-colors"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* impact bar + tiny bars */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Impact</span>
                          <span>Trending</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: ['65%', '72%', '68%'] }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: 'easeInOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                          />
                        </div>
                        <div className="mt-3 flex items-end gap-1 h-8">
                          {[6, 12, 9, 14, 10, 16, 8].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 4 }}
                              whileInView={{ height: h }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                              className="w-2 rounded-sm bg-white/10"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
