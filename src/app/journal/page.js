import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Journal from '@/models/Journal';
import Link from 'next/link';

export const metadata = { title: 'Serenity — Journal' };

const moodEmojis = { great: '😊', good: '🙂', okay: '😐', bad: '😟', terrible: '😢' };

export default async function JournalPage({ searchParams }) {
  const params = await searchParams;
  let entries = [];

  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (sessionId) {
      entries = await Journal.find({ sessionId }).sort({ createdAt: -1 }).lean();
    }
  } catch (e) { /* continue */ }

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-journal-text" /> Journal</h2>
        <p>A private space for your thoughts. Write freely.</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          {params?.saved && <div className="alert alert-serenity alert-success mb-0 py-2 px-3 d-inline-block"><i className="bi bi-check-circle" /> Entry saved!</div>}
          {params?.deleted && <div className="alert alert-serenity alert-success mb-0 py-2 px-3 d-inline-block"><i className="bi bi-check-circle" /> Entry deleted.</div>}
          {params?.crisis && <div className="alert alert-serenity alert-crisis mb-0 py-2 px-3 d-inline-block"><i className="bi bi-heart-pulse" /> Please reach out: <strong>Call/text 988</strong>. <a href="/resources">Resources &rarr;</a></div>}
        </div>
        <Link href="/journal/new" className="btn btn-primary-gradient"><i className="bi bi-plus-lg" /> New Entry</Link>
      </div>

      {entries.length > 0 ? (
        <div className="journal-list">
          {entries.map(entry => (
            <div key={entry._id.toString()} className="journal-card">
              <h4><Link href={`/journal/${entry._id}`}>{entry.title}</Link></h4>
              <p className="journal-preview">{entry.content.substring(0, 150)}{entry.content.length > 150 ? '...' : ''}</p>
              <div className="journal-meta">
                {entry.mood && <span>{moodEmojis[entry.mood]} {entry.mood}</span>}
                <span><i className="bi bi-clock" /> {new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="bi bi-journal-text" />
          <h4>No journal entries yet</h4>
          <p>Start writing to track your thoughts and feelings.</p>
          <Link href="/journal/new" className="btn btn-primary-gradient mt-2">Write Your First Entry</Link>
        </div>
      )}
    </>
  );
}
