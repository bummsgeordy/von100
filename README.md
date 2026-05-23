# von100

**Let’s talk about risk**

von100 ist eine client-only Open-Source-Webapp fuer Hausarztpraxen und internistische Praxen.
Sie hilft, absolute Risiken, Nutzen und Nebenwirkungen als natuerliche Haeufigkeiten zu
erklaeren: zum Beispiel "8 von 100 Personen in 5 Jahren".

Die App ersetzt keine aerztliche Beratung. Sie ist eine Kommunikationshilfe.

## Features im MVP

- HomePage mit kurzer Einordnung und Einstieg in die Kernworkflows
- RiskBuilderPage mit Formular, Validierung, einfachem Text, absoluter Differenz, Icon-Arrays,
  Teach-Back-Frage und Markdown-Export
- CompareOptionsPage mit zwei oder mehr editierbaren Optionen, Nutzen- und Schadensendpunkten,
  Tabelle, Icon-Arrays und optionalem NNT/NNH
- EvidencePage mit Regeln und Links zu frei zugaenglichen Quellen
- AboutPage mit Zweck, Dank und Disclaimer
- GitHub Pages Deployment per GitHub Actions

## Installation

```bash
npm install
npm run dev
```

## Lokal auf macOS starten

Am einfachsten per Doppelklick auf:

```text
von100 starten.command
```

Das Skript prueft Node.js/npm, installiert fehlende Abhaengigkeiten bei Bedarf und oeffnet:

```text
http://127.0.0.1:5173/von100/
```

Der lokale Server laeuft, solange das Terminalfenster offen ist. Zum Beenden `Ctrl+C`
druecken oder das Fenster schliessen.

Build und Tests:

```bash
npm run test
npm run build
```

## Deployment auf GitHub Pages

Die Vite-Basis ist in `vite.config.ts` auf `/von100/` gesetzt. Der Workflow
`.github/workflows/deploy.yml` baut bei Push auf `main` und deployed `dist` nach GitHub Pages.

Wenn das Repository anders heisst, muss `base` in `vite.config.ts` angepasst werden.

## Kommunikationsprinzipien

1. **Absolute statt relative Risiken.** Relative Angaben koennen gross wirken, obwohl die
   absolute Veraenderung klein ist. Deshalb zeigt von100 zuerst Ausgangsrisiko und
   Interventionsrisiko.
2. **Natuerliche Haeufigkeiten.** "3 von 100" ist im Gespraech oft leichter zu verstehen als
   "3 %". Beim Vergleichen bleibt der Nenner gleich.
3. **Icon-Arrays.** Piktogramme zeigen Betroffene und Nicht-Betroffene in derselben
   Grundgesamtheit.
4. **Plain Language.** Kurze Saetze, konkrete Woerter, keine isolierten Fachbegriffe.
5. **Zeitangabe und Zielgruppe.** Jede Zahl braucht einen Zeitraum und eine Population.
6. **Baseline vs. Intervention.** Das Ausgangsrisiko und die Veraenderung durch eine Massnahme
   werden getrennt dargestellt.
7. **Informationsmenge begrenzen.** Im MVP stehen wenige wesentliche Endpunkte im Vordergrund;
   Tabellen helfen bei mehreren Optionen.

## Genutzte Quellen

- NICE NG197, Shared decision making, Empfehlungen zu numerischer Risikokommunikation:
  https://www.nice.org.uk/guidance/ng197/chapter/Recommendations
- NICE Evidence review D: risk communication, NCBI Bookshelf:
  https://www.ncbi.nlm.nih.gov/books/NBK572436/
- AAFP/FPM, Five Ways to Communicate Risks So That Patients Understand:
  https://www.aafp.org/fpm/2018/1100/p28.html
- AAFP/FPM, Understanding the Risks of Medical Interventions:
  https://www.aafp.org/fpm/2000/0500/p59
- AHRQ, Principles in Developing and Applying Guidance for Comparing Medical Interventions:
  https://effectivehealthcare.ahrq.gov/products/methods-guidance-principles/methods
- AHRQ, Assessing Harms when Comparing Medical Interventions:
  https://effectivehealthcare.ahrq.gov/products/methods-guidance-harms/methods
- BJGP Open / PMC, Cardiovascular disease risk communication in NHS Health Checks:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC8596312/
- NCBI Bookshelf, RICO study scientific summary:
  https://www.ncbi.nlm.nih.gov/books/NBK573191/

Weitere Leitlinienportale fuer inhaltliche Szenarien:

- AWMF Leitlinienregister: https://register.awmf.org/de/leitlinien
- AWMF Patienteninformationen: https://register.awmf.org/de/patienteninformationen
- NICE Guidance: https://www.nice.org.uk/guidance
- KDIGO Guidelines: https://kdigo.org/guidelines/
- ESC Guidelines: https://www.escardio.org/guidelines
- DDG Leitlinien und Praxisempfehlungen:
  https://www.ddg.info/behandlung-leitlinien/leitlinien-praxisempfehlungen

## Daten und Verantwortung

Die enthaltenen Szenarien sind Demo-Daten. Fuer echte Beratung muessen absolute Zahlen aus
aktuellen Leitlinien, Evidenzberichten oder Primaerstudien uebernommen und dokumentiert werden:
Quelle, Population, Zeitraum, Endpunkt, Nenner und Unsicherheit.

## Roadmap

1. MVP: HomePage, RiskBuilder, CompareOptions, EvidencePage, AboutPage, Demo-Daten.
2. Phase 2: PWA-Faehigkeit, Offline-Speicherung eigener Szenarien, Qualitaetschecker fuer Texte.
3. Phase 3: MDX-basierte Detailseiten, Mehrsprachigkeit.
4. Phase 4: Kuratierte Szenariobibliothek mit Review-Status und Pull-Request-Workflow.

## Lizenz

MIT, siehe `LICENSE`.
