import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function NavBar(){
  const [open, setOpen] = useState(false)
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-500 via-blue-500 to-amber-400 shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
          <span className="text-sm md:text-base font-medium tracking-tight text-white/90">Wingman PM</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#shots" className="hover:text-white transition-colors">Product</a>
          <a href="#cta" className="hover:text-white transition-colors">Waitlist</a>
        </div>
        <button className="md:hidden text-slate-300" onClick={()=>setOpen(!open)}>{open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 text-sm text-slate-300 space-y-2">
          <a href="#how" className="block">How it works</a>
          <a href="#features" className="block">Features</a>
          <a href="#shots" className="block">Product</a>
          <a href="#cta" className="block">Waitlist</a>
        </div>
      )}
    </div>
  )
}
