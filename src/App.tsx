import { NavLink, Route, Routes } from 'react-router-dom';
import { Activity, GitCompareArrows, HeartPulse, Info, Library, ShieldCheck } from 'lucide-react';
import AboutPage from './pages/AboutPage';
import CompareOptionsPage from './pages/CompareOptionsPage';
import EvidencePage from './pages/EvidencePage';
import HomePage from './pages/HomePage';
import RiskBuilderPage from './pages/RiskBuilderPage';

const navItems = [
  { to: '/', label: 'Home', icon: HeartPulse },
  { to: '/risk-builder', label: 'Risiko erklären', icon: Activity },
  { to: '/compare', label: 'Optionen vergleichen', icon: GitCompareArrows },
  { to: '/evidence', label: 'Evidenz', icon: Library },
  { to: '/about', label: 'Über', icon: Info },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 overflow-hidden px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xl font-semibold leading-tight">von100</span>
              <span className="block text-sm text-muted">Let&apos;s talk about risk</span>
            </span>
          </NavLink>

          <nav className="flex w-full min-w-0 max-w-full gap-1 overflow-x-auto md:w-auto" aria-label="Hauptnavigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-ink',
                    ].join(' ')
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/risk-builder" element={<RiskBuilderPage />} />
          <Route path="/compare" element={<CompareOptionsPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
