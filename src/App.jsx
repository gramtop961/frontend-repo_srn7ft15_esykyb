import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
      <footer className="bg-slate-950 text-slate-400 py-10 text-center border-t border-white/10">
        <p>© {new Date().getFullYear()} Wingman PM • Built for early adopters and AI enthusiasts</p>
      </footer>
    </div>
  )
}

export default App
