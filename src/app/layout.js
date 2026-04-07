import './globals.css';
import './style.css';
import Sidebar from '@/components/Sidebar';
import CrisisModal from '@/components/CrisisModal';

export const metadata = {
  title: 'Serenity — Your safe space for mental wellness',
  description: 'Anonymous mental health support with mood tracking, journaling, coping tools, and peer support.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <div className="app-wrapper">
          <Sidebar />
          <main id="main-content" className="main-content">
            <div className="top-bar">
              <button className="btn btn-link d-lg-none sidebar-toggle" aria-label="Toggle navigation">
                <i className="bi bi-list fs-4" />
              </button>
              <div className="ms-auto">
                <button className="btn btn-crisis" data-bs-toggle="modal" data-bs-target="#crisisModal">
                  <i className="bi bi-heart-pulse" /> Crisis Help
                </button>
              </div>
            </div>
            <div className="page-content">
              {children}
            </div>
            <footer className="app-footer" role="contentinfo">
              <p>
                <i className="bi bi-info-circle" />{' '}
                <strong>Disclaimer:</strong> Serenity is not a substitute for professional mental health care.
                If you are in crisis, please contact <a href="tel:988">988</a> or visit your nearest emergency room.
              </p>
              <p className="text-muted small">&copy; 2026 Serenity &mdash; Built with care for Sheridan College</p>
            </footer>
          </main>
        </div>
        <CrisisModal />
      </body>
    </html>
  );
}
