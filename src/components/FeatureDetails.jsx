function FeatureDetails(){
  const details = [
    {
      name: 'Ingestion',
      headline: 'Bring feedback from everywhere',
      body: 'Upload spreadsheets, export emails, drag in CSVs — we auto-map columns, OCR attachments, normalize fields, and remove duplicates so you can start with clean data.',
      bullets: ['.xlsx/.csv/.tsv + .eml/.msg', 'AI column mapping', 'OCR + normalization + dedupe'],
    },
    {
      name: 'AI Theming',
      headline: 'Clarity from chaos',
      body: 'We cluster feedback by topic with adjustable granularity. Each theme has a concise summary, sentiment, and representative quotes you can trace back to the source.',
      bullets: ['Adjustable granularity', 'Summaries + sentiment', 'Traceability to source'],
    },
    {
      name: 'Prioritization',
      headline: 'Decide with confidence',
      body: 'Apply RICE, MoSCoW, Kano, or weighted models. Link each theme to business metrics like ARR, retention, churn, and NPS for grounded decisions.',
      bullets: ['RICE, MoSCoW, Kano', 'Weighted + custom models', 'Link to ARR, churn, NPS'],
    },
    {
      name: 'Document Generation',
      headline: 'Ship with crisp specs',
      body: 'Turn chosen themes into PRDs, epics, and user stories with acceptance criteria. Keep engineering synced in Azure DevOps and Jira with one click.',
      bullets: ['Epics + stories + ACs', 'PRD templates', 'Sync to Azure DevOps + Jira'],
    },
    {
      name: 'Communication',
      headline: 'Close the loop',
      body: 'Push updates to stakeholders via email, Slack, and Teams. Publish a public roadmap and changelog to keep contributors informed.',
      bullets: ['Email, Slack, Teams', 'Public roadmap + changelog', 'Contributor updates'],
    },
  ]

  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Feature deep dive</h2>
          <p className="mt-3 text-slate-300">A closer look at the flow from ingestion to communication.</p>
        </div>

        <div className="mt-12 space-y-10">
          {details.map((d, i) => (
            <div key={d.name} className="grid gap-6 md:grid-cols-2 items-center">
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-semibold">{d.headline}</h3>
                  <p className="mt-2 text-slate-300">{d.body}</p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-300">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
                  <div className="absolute inset-0 grid place-items-center text-slate-400">
                    <div className="text-center p-6">
                      <p className="text-sm">Illustrative mock panel</p>
                      <p className="text-xs mt-1">This area can showcase a short clip, chart, or annotated screenshot.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureDetails
