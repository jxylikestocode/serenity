'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ moodCount = 0, journalCount = 0 }) {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home', icon: 'bi-house-heart' },
    { href: '/mood', label: 'Mood', icon: 'bi-emoji-smile' },
    { href: '/journal', label: 'Journal', icon: 'bi-journal-text' },
    { href: '/coping', label: 'Tools', icon: 'bi-tools' },
    { href: '/community', label: 'Community', icon: 'bi-people' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="sidebar-overlay" onClick={() => document.querySelector('.sidebar')?.classList.remove('show')} />
      <aside className="sidebar" role="navigation" aria-label="Main navigation">
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <div className="logo-icon"><i className="bi bi-heart-pulse-fill" /></div>
            <div className="logo-text">
              <h1>Serenity</h1>
              <p>Your safe space for mental wellness</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={isActive(l.href) ? 'active' : ''}>
                    <i className={`bi ${l.icon}`} /><span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sidebar-anonymous">
            <div className="anon-status"><span className="anon-dot" /><strong>Anonymous Mode</strong></div>
            <p>Your data stays private.<br />No account needed.</p>
          </div>
          <div className="sidebar-stats">
            <p className="stats-label">You&apos;re doing great!</p>
            <div className="stat-row"><span>Check-ins</span><span className="stat-value">{moodCount}</span></div>
            <div className="stat-row"><span>Journal entries</span><span className="stat-value">{journalCount}</span></div>
          </div>
        </div>
      </aside>
    </>
  );
}
