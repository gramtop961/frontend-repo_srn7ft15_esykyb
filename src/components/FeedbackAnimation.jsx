import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'
import { Sparkles, Gauge, Wand2, Truck } from 'lucide-react'

// Keep the sample small to limit DOM + layout work
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

export default function FeedbackAnimation() {
  const prefersReduced = useReducedMotion()
  const controls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)

  // Only animate when the section is in view
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px', amount: 0.3 })

  // Precompute positions to avoid recalculation on renders
  const positions = useMemo(() =>
    rawNotes.map((_, i) => ({
      x: 20 + ((i * 37) % 520),
      y: 20 + ((i * 53) % 320),
      idx: i,
    })),
  [])

  // Scatter <-> cluster loop (paused if reduced motion or not in view)
  useEffect(() => {
    if (prefersReduced || !inView) return
    let mounted = true
    const loop = async () => {
      while (mounted) {
        await controls.start('cluster')
        await new Promise((r) => setTimeout(r, 1600)) // slightly slower, fewer keyframes/sec
        await controls.start('scatter')
        await new Promise((r) => setTimeout(r, 1400))
      }
    }
    loop()
    return () => {
      mounted = false
    }
  }, [controls, prefersReduced, inView])

  // Cycle focus across cards (pause when not in view to save work)
  useEffect(() => {
    if (prefersReduced || !inView) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 1400) // slower cycle
    return () => clearInterval(id)
  }, [prefersReduced, inView])

  const variants = {
    scatter: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
    cluster: (i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const baseX = [-200, 0, 200][col] // slightly tighter to reduce travel distance
      const baseY = -70 + row * 38
      return {
        x: baseX,
        y: baseY,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
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

  // Use motion-safe so shimmer doesn't run for users who reduce motion
  const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent motion-safe:before:animate-[shimmer_2.4s_infinite]'

  return (
    <section ref={sectionRef} className="relative bg-slate-950 text-white py-24">
      {/* Background glows downgraded to reduce blur GPU cost */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)] blur-xl" />
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-purple-500/10 blur-lg" />
        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-amber-400/10 blur-lg" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
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

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: dynamic scatter -> cluster */}
          <div className="relative h-[400px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0">
              {positions.map(({ x, y }, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="scatter"
                  animate={controls}
                  variants={variants}
                  className="absolute will-change-transform"
                  style={{ left: x, top: y }}
                >
                  <div className={`rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-100 shadow-[0_8px_26px_-12px_rgba(2,6,23,0.7)] ${shimmer}`}>
                    {rawNotes[i]}
                  </div>
                </motion.div>
              ))}
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
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${themeCards[idx].gradient}`} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: elevated theme panels with lighter effects */}
          <div className="grid gap-5">
            {themeCards.map((card, idx) => {
              const Icon = card.icon
              const isActive = idx === activeIndex
              return (
                <motion.div
                  key={card.title}
                  initial={{ y: 6, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {/* Thin gradient frame (no heavy shadow anims) */}
                  <div className={`p-[1px] rounded-2xl bg-gradient-to-r ${card.gradient}`}>
                    <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-white/10 p-5 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br ${card.gradient} text-slate-900`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-300">
                            {card.title}
                          </h3>
                        </div>

                        {/* simple ring opacity instead of boxShadow animation */}
                        <span
                          className={`h-2 w-2 rounded-full bg-emerald-400 ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
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

                      {/* impact bar + tiny bars (transform-only, no shadows) */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Impact</span>
                          <span>Trending</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: '68%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
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
                              transition={{ duration: 0.5, delay: i * 0.04 }}
                              className="w-2 rounded-sm bg-white/10"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
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
