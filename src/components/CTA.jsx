import { useState } from 'react'

function CTA(){
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try{
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if(res.ok){
        setSubmitted(true)
      }
    }catch(err){
      setSubmitted(true)
    }
  }

  return (
    <section id="cta" className="relative bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">Get early access</h3>
              <p className="mt-3 text-slate-300">Join the waitlist and be the first to try Wingman PM. Were inviting early adopters and AI enthusiasts.</p>
            </div>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button type="submit" className="rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400 px-6 py-3 font-semibold shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)]">
                {submitted ? 'Thanks! 389' : 'Join waitlist'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
