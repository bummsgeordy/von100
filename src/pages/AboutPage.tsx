export default function AboutPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="panel panel-pad h-fit">
        <h1 className="section-title">Ueber von100</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          von100 ist eine Open-Source-Webapp für Praxisteams, die Nutzen, Risiken und
          Nebenwirkungen im Gespräch klarer darstellen wollen.
        </p>
      </section>

      <section className="space-y-5">
        <article className="panel panel-pad">
          <h2 className="text-xl font-semibold text-ink">Zweck</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Die App ist eine Kommunikationshilfe. Sie ersetzt keine Leitlinie, keine klinische
            Entscheidung und keine individuelle ärztliche Beratung. Nutzer:innen müssen die
            eingegebenen Daten selbst fachlich prüfen.
          </p>
        </article>

        <article className="panel panel-pad">
          <h2 className="text-xl font-semibold text-ink">Dank</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Danke an Leitlinien-Autor:innen, Methodiker:innen, Evidence-Review-Teams und
            Primärforscher:innen, die Nutzen und Schaden medizinischer Maßnahmen transparent
            dokumentieren. von100 soll diese Arbeit im Sprechzimmer besser nutzbar machen.
          </p>
        </article>

        <article className="rounded-lg border border-amber-300 bg-amber-50 p-5">
          <h2 className="text-xl font-semibold text-amber-950">Disclaimer</h2>
          <p className="mt-3 leading-7 text-amber-900">
            Keine ärztliche Beratung; nur Kommunikationshilfe. Die Demo-Daten sind nicht für
            Therapieentscheidungen geeignet.
          </p>
        </article>
      </section>
    </div>
  );
}
