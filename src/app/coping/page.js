import Link from 'next/link';
import exercises from '../../../data/coping-exercises.json';

export const metadata = { title: 'Serenity — Coping Tools' };

export default function CopingPage() {
  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-tools" /> Coping Tools</h2>
        <p>Evidence-based exercises to help you feel grounded and calm.</p>
      </div>
      <div className="row g-3">
        {exercises.exercises.map(ex => (
          <div key={ex.slug} className="col-md-6">
            <Link href={`/coping/${ex.slug}`} className="tool-card">
              <div className="tool-icon" style={{ background: ex.color }}>
                <i className={`bi bi-${ex.icon}`} />
              </div>
              <h4>{ex.name}</h4>
              <p>{ex.description}</p>
              <span className="category-badge">{ex.duration}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
