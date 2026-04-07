import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Journal from '@/models/Journal';
import { detectCrisis } from '@/lib/crisis';
import MoodSelector from '@/components/MoodSelector';
import CrisisScanner from '@/components/CrisisScanner';

async function updateEntry(formData) {
  'use server';
  const id = formData.get('id');
  const title = formData.get('title')?.slice(0, 200);
  const content = formData.get('content')?.slice(0, 5000);
  const mood = formData.get('mood') || '';
  if (!title || !content) redirect(`/journal/${id}/edit?error=required`);

  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  const crisisDetected = detectCrisis(title + ' ' + content);
  await Journal.findOneAndUpdate({ _id: id, sessionId }, { title, content, mood, crisisDetected });
  redirect(`/journal/${id}?updated=true`);
}

export default async function EditJournalPage({ params }) {
  const { id } = await params;
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  const entry = await Journal.findOne({ _id: id, sessionId }).lean();
  if (!entry) notFound();

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-pencil" /> Edit Entry</h2>
      </div>
      <div className="card-serenity">
        <CrisisScanner>
          <form action={updateEntry}>
            <input type="hidden" name="id" value={entry._id.toString()} />
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">Title</label>
              <input type="text" className="form-control form-control-serenity" id="title" name="title" defaultValue={entry.title} maxLength={200} required />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">Content</label>
              <textarea className="form-control form-control-serenity" id="content" name="content" rows={8} maxLength={5000} required defaultValue={entry.content} />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">How are you feeling? (optional)</label>
              <MoodSelector name="mood" selected={entry.mood} />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary-gradient">Update Entry</button>
              <a href={`/journal/${entry._id}`} className="btn btn-outline-purple">Cancel</a>
            </div>
          </form>
        </CrisisScanner>
      </div>
    </>
  );
}
