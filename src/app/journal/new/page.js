import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Journal from '@/models/Journal';
import { detectCrisis } from '@/lib/crisis';
import MoodSelector from '@/components/MoodSelector';
import CrisisScanner from '@/components/CrisisScanner';

export const metadata = { title: 'Serenity — New Journal Entry' };

async function createEntry(formData) {
  'use server';
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  if (!sessionId) redirect('/journal/new?error=No+session');

  const title = formData.get('title')?.slice(0, 200);
  const content = formData.get('content')?.slice(0, 5000);
  const mood = formData.get('mood') || '';
  if (!title || !content) redirect('/journal/new?error=Title+and+content+are+required');

  const crisisDetected = detectCrisis(title + ' ' + content);
  await Journal.create({ sessionId, title, content, mood, crisisDetected });

  redirect(crisisDetected ? '/journal?saved=true&crisis=true' : '/journal?saved=true');
}

export default function NewJournalPage() {
  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-pencil" /> New Journal Entry</h2>
        <p>Express yourself freely. This is your private space.</p>
      </div>
      <div className="card-serenity">
        <CrisisScanner>
          <form action={createEntry}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">Title</label>
              <input type="text" className="form-control form-control-serenity" id="title" name="title" placeholder="Give your entry a title" maxLength={200} required />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">What&apos;s on your mind?</label>
              <textarea className="form-control form-control-serenity" id="content" name="content" rows={8} placeholder="Write freely..." maxLength={5000} required />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">How are you feeling? (optional)</label>
              <MoodSelector name="mood" />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary-gradient">Save Entry</button>
              <a href="/journal" className="btn btn-outline-purple">Cancel</a>
            </div>
          </form>
        </CrisisScanner>
      </div>
    </>
  );
}
