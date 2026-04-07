'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MoodSelector from '@/components/MoodSelector';
import CrisisScanner from '@/components/CrisisScanner';

export default function Home() {
  const searchParams = useSearchParams();
  const saved = searchParams.get('saved');
  const crisis = searchParams.get('crisis');
  const error = searchParams.get('error');

  const [todayCheckin, setTodayCheckin] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/today-checkin').then(r => r.json()).then(d => setTodayCheckin(d.checkin)).catch(() => {});
  }, [saved]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.target);
    const mood = form.get('mood');
    const note = form.get('note') || '';

    if (!mood) { setSubmitting(false); return; }

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, note })
      });
      const data = await res.json();
      if (data.crisis) {
        window.location.href = '/?saved=true&crisis=true';
      } else {
        window.location.href = '/?saved=true';
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>Welcome back 💜</h2>
        <p>How are you feeling today? Let&apos;s check in with yourself.</p>
      </div>

      {saved && (
        <div className="alert alert-serenity alert-success">
          <i className="bi bi-check-circle" /> Check-in saved! Keep it up.
        </div>
      )}
      {crisis && (
        <div className="alert alert-serenity alert-crisis">
          <i className="bi bi-heart-pulse" /> It sounds like you might be going through something difficult.
          Please reach out: <strong>Call/text 988</strong> or <strong>Kids Help Phone: 1-800-668-6868</strong>.{' '}
          <a href="/resources">More resources &rarr;</a>
        </div>
      )}
      {error && (
        <div className="alert alert-serenity alert-danger">
          <i className="bi bi-exclamation-circle" /> {error}
        </div>
      )}

      <div className="card-serenity">
        <h3>💜 Daily Check-in</h3>
        <p className="card-subtitle">Track your emotional well-being. No judgment, just awareness.</p>
        <CrisisScanner>
          <form onSubmit={handleSubmit}>
            <label className="form-label fw-semibold mb-3">How are you feeling?</label>
            <MoodSelector name="mood" required />
            <div className="mb-3">
              <label htmlFor="note" className="form-label fw-semibold">Anything on your mind?</label>
              <input type="text" className="form-control form-control-serenity" id="note" name="note"
                placeholder="Optional — share what's on your mind" maxLength={500} />
            </div>
            <button type="submit" className="btn btn-primary-gradient" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Check-in'}
            </button>
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
