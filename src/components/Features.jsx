function Features(){
  const features = [
    {
      title: 'AI clustering & themes',
      points: ['Adjustable granularity', 'Summaries & sentiment', 'Noise filtering'],
    },
    {
      title: 'Prioritization frameworks',
      points: ['RICE, MoSCoW, Kano', 'Weighted & custom models', 'Link ARR, churn, NPS'],
    },
    {
      title: 'Auto PRDs & stories',
      points: ['Epics & user stories', 'Acceptance criteria', 'Synced to Jira/Azure DevOps'],
    },
    {
      title: 'Integrations',
      points: ['Azure DevOps & Jira', 'Microsoft Teams & Slack', 'Public roadmap & changelog'],
    },
  ]

  return (
    <section id="features" className="bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">Everything you need</h2>
        <p className="text-slate-300 mt-3 text-center max-w-2xl mx-auto">Powerful, opinionated features designed for modern product teams.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
