import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import MoodSelector from '@/components/MoodSelector';
import CrisisScanner from '@/components/CrisisScanner';
import { moodEmoji } from '@/components/MoodSelector';
import { redirect } from 'next/navigation';
import { detectCrisis } from '@/lib/crisis';

async function submitCheckin(formData) {
  'use server';
  await connectDB();
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('serenity_session')?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set('serenity_session', sessionId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60, sameSite: 'lax' });
  }

  const mood = formData.get('mood');
  const note = formData.get('note') || '';
  if (!['great', 'good', 'okay', 'bad', 'terrible'].includes(mood)) {
    redirect('/?error=Please+select+a+mood');
  }

  const crisisDetected = detectCrisis(note);
  await Mood.create({ sessionId, mood, note: note.slice(0, 500), crisisDetected });

  redirect(crisisDetected ? '/?saved=true&crisis=true' : '/?saved=true');
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  let todayCheckin = null;

  try {
    await connectDB();
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('serenity_session')?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookieStore.set('serenity_session', sessionId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60, sameSite: 'lax' });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayCheckin = await Mood.findOne({ sessionId, createdAt: { $gte: todayStart } })
      .sort({ createdAt: -1 }).lean();
  } catch (e) { /* continue */ }

  return (
    <>
      <div className="page-header">
        <h2>Welcome back 💜</h2>
        <p>How are you feeling today? Let&apos;s check in with yourself.</p>
      </div>

      {params?.saved && (
        <div className="alert alert-serenity alert-success">
          <i className="bi bi-check-circle" /> Check-in saved! Keep it up.
        </div>
      )}
      {params?.crisis && (
        <div className="alert alert-serenity alert-crisis">
          <i className="bi bi-heart-pulse" /> It sounds like you might be going through something difficult.
          Please reach out: <strong>Call/text 988</strong> or <strong>Kids Help Phone: 1-800-668-6868</strong>.{' '}
          <a href="/resources">More resources &rarr;</a>
        </div>
      )}
      {params?.error && (
        <div className="alert alert-serenity alert-danger">
          <i className="bi bi-exclamation-circle" /> {params.error}
        </div>
      )}

      <div className="card-serenity">
        <h3>💜 Daily Check-in</h3>
        <p className="card-subtitle">Track your emotional well-being. No judgment, just awareness.</p>
        <CrisisScanner>
          <form action={submitCheckin}>
            <label className="form-label fw-semibold mb-3">How are you feeling?</label>
            <MoodSelector name="mood" required />
            <div className="mb-3">
              <label htmlFor="note" className="form-label fw-semibold">Anything on your mind?</label>
              <input type="text" className="form-control form-control-serenity" id="note" name="note"
                placeholder="Optional — share what's on your mind" maxLength={500} />
            </div>
            <button type="submit" className="btn btn-primary-gradient">Save Check-in</button>
          </form>
        </CrisisScanner>
      </div>

      {todayCheckin && (
        <div className="card-serenity" style={{ background: 'var(--bg-light)' }}>
          <h3><i className="bi bi-check-circle text-success" /> Today&apos;s Check-in</h3>
          <p>You checked in feeling <strong>{todayCheckin.mood}</strong>
            {todayCheckin.note && <> &mdash; &quot;{todayCheckin.note}&quot;</>}
          </p>
          <a href="/mood" className="btn-outline-purple btn btn-sm">View Mood History &rarr;</a>
        </div>
      )}
    </>
  );
}
