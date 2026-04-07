import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import MoodChart from './MoodChart';

export const metadata = { title: 'Serenity — Mood History' };

export default async function MoodPage() {
  let moods = [];

  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (sessionId) {
      moods = await Mood.find({ sessionId }).sort({ createdAt: -1 }).limit(50).lean();
    }
  } catch (e) { /* continue */ }

  const moodEmojis = { great: '😊', good: '🙂', okay: '😐', bad: '😟', terrible: '😢' };

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-emoji-smile" /> Mood History</h2>
        <p>Track your emotional patterns over time.</p>
      </div>

      {moods.length > 0 ? (
        <>
          <MoodChart />
          <div className="card-serenity">
            <h3>Recent Check-ins</h3>
            <div className="journal-list">
              {moods.map(m => (
                <div key={m._id.toString()} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <span className="fs-4">{moodEmojis[m.mood]}</span>
                  <div className="flex-grow-1">
                    <strong style={{ textTransform: 'capitalize' }}>{m.mood}</strong>
                    {m.note && <span className="text-muted"> — {m.note}</span>}
                  </div>
                  <small className="text-muted">
                    {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <i className="bi bi-emoji-smile" />
          <h4>No check-ins yet</h4>
          <p>Go to the <a href="/">Home page</a> to log your first mood check-in!</p>
        </div>
      )}
    </>
  );
}
