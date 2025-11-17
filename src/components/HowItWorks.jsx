function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Ingestion',
      desc: 'Import .xlsx/.csv/.tsv & .eml/.msg. AI column mapping, OCR, normalization, and deduplication.',
    },
    {
      id: 2,
      title: 'AI Theming',
      desc: 'Cluster similar feedback with adjustable granularity, generate summaries and sentiment.',
    },
    {
      id: 3,
      title: 'Prioritization',
      desc: 'Score with RICE, MoSCoW, Kano, Weighted, or custom — link to ARR, retention, churn, and NPS.',
    },
    {
      id: 4,
      title: 'Document Generation',
      desc: 'Create PRDs, epics, user stories, and acceptance criteria. Sync to Azure DevOps and Jira.',
    },
    {
      id: 5,
      title: 'Communication',
      desc: 'Notify via email, Teams, Slack. Publish public roadmap, changelog, and send contributor updates.',
    },
  ]

  return (
    <section id="how" className="relative bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
        <p className="mt-3 text-center text-slate-300 max-w-2xl mx-auto">
          Five steps from noisy feedback to aligned delivery.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.id} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur group overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-amber-400/20 blur-2xl group-hover:opacity-80 transition-opacity" />
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold">{s.id}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
