import { useState } from 'react'

function ProductShots(){
  const defaults = [
    {
      title: 'Ingestion workspace',
      desc: 'Drag in .xlsx/.csv and email exports. Auto-clean, normalize, and deduplicate on import.',
      img: 'https://images.unsplash.com/photo-1551281044-8e8b5f1cf3df?q=80&w=1400&auto=format&fit=crop'
    },
    {
      title: 'AI themes map',
      desc: 'Clustered topics with adjustable granularity, summaries, and sentiment overlays.',
      img: 'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1400&auto=format&fit=crop'
    },
    {
      title: 'Prioritization matrix',
      desc: 'RICE, MoSCoW, Kano, and weighted models. Tie impact to ARR, churn, and NPS.',
      img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1400&auto=format&fit=crop'
    },
    {
      title: 'PRD & story generator',
      desc: 'Generate epics, stories, and acceptance criteria. One-click sync to Jira/Azure DevOps.',
      img: 'https://images.unsplash.com/photo-1531973971439-DirectusPlaceholder?q=80&w=1400&auto=format&fit=crop'
    },
    {
      title: 'Integrations hub',
      desc: 'Bi-directional links to Jira, Azure DevOps, Slack, and Microsoft Teams.',
      img: 'https://images.unsplash.com/photo-1515871204537-9dc77f3b36e2?q=80&w=1400&auto=format&fit=crop'
    }
  ]

  const [uploads, setUploads] = useState([])

  const onFiles = (files) => {
    const list = Array.from(files || [])
    const readers = list.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ name: file.name, url: reader.result })
        reader.readAsDataURL(file)
      })
    })
    Promise.all(readers).then((items) => setUploads((prev) => [...prev, ...items]))
  }

  return (
    <section id="shots" className="bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Product shots</h2>
          <p className="mt-3 text-slate-300">See Wingman PM in action — from raw feedback to aligned delivery.</p>
        </div>

        {/* Default showcase */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {defaults.map((card) => (
            <div key={card.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={card.img} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Uploader */}
        <div className="mt-14">
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-6 flex-col sm:flex-row">
              <div>
                <h4 className="text-xl font-semibold">Add your screenshots</h4>
                <p className="text-slate-300 text-sm mt-1">Drop multiple images or select files to showcase your product UI.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5">
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e)=> onFiles(e.target.files)} />
                <span>Upload images</span>
              </label>
            </div>

            {uploads.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uploads.map((u, idx) => (
                  <div key={`${u.name}-${idx}`} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="relative aspect-[16/10]">
                      <img src={u.url} alt={u.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-slate-400 truncate" title={u.name}>{u.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShots
