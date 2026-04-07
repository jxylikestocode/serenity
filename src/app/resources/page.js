import resourcesData from '../../../data/resources.json';

export const metadata = { title: 'Serenity — Resources' };

export default function ResourcesPage() {
  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-heart-pulse" /> Resources</h2>
        <p>Free, confidential help is available 24/7. You are not alone.</p>
      </div>
      <div className="alert alert-serenity alert-crisis mb-4"><strong>If you are in immediate danger, call 911.</strong></div>

      <h3 className="mb-3">Crisis Hotlines</h3>
      {resourcesData.crisisLines.map((r, i) => (
        <div key={i} className="resource-card">
          <h4>{r.name}</h4>
          <p><strong>{r.contact}</strong></p>
          <p className="text-muted mb-1">{r.description}</p>
          <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url} <i className="bi bi-box-arrow-up-right" /></a>
        </div>
      ))}

      <h3 className="mt-4 mb-3">Self-Help Resources</h3>
      {resourcesData.selfHelp.map((r, i) => (
        <div key={i} className="resource-card" style={{ borderLeftColor: 'var(--purple)' }}>
          <h4>{r.name}</h4>
          <p className="text-muted mb-1">{r.description}</p>
          <a href={r.url} target="_blank" rel="noopener noreferrer">Visit &rarr;</a>
        </div>
      ))}

      <h3 className="mt-4 mb-3">Campus Resources</h3>
      {resourcesData.campus.map((r, i) => (
        <div key={i} className="resource-card" style={{ borderLeftColor: 'var(--teal)' }}>
          <h4>{r.name}</h4>
          <p className="text-muted mb-1">{r.description}</p>
          {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer">Learn more &rarr;</a>}
        </div>
      ))}
    </>
  );
}
