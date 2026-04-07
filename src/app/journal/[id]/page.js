import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Journal from '@/models/Journal';
import Link from 'next/link';

const moodEmojis = { great: '😊', good: '🙂', okay: '😐', bad: '😟', terrible: '😢' };

async function deleteEntry(formData) {
  'use server';
  const id = formData.get('id');
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  await Journal.findOneAndDelete({ _id: id, sessionId });
  redirect('/journal?deleted=true');
}

export default async function JournalEntryPage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  const entry = await Journal.findOne({ _id: id, sessionId }).lean();
  if (!entry) notFound();

  return (
    <>
      <div className="page-header">
        <h2>{entry.title}</h2>
        <p>
          {entry.mood && <>{moodEmojis[entry.mood]} Feeling {entry.mood} &bull; </>}
          {new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      {query?.updated && <div className="alert alert-serenity alert-success"><i className="bi bi-check-circle" /> Entry updated!</div>}
      <div className="card-serenity">
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#374151' }}>{entry.content}</div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <Link href={`/journal/${entry._id}/edit`} className="btn btn-outline-purple"><i className="bi bi-pencil" /> Edit</Link>
        <form action={deleteEntry}>
          <input type="hidden" name="id" value={entry._id.toString()} />
          <button type="submit" className="btn btn-outline-purple" style={{ borderColor: '#f87171', color: '#ef4444' }}
            onClick="return confirm('Delete this entry?')"><i className="bi bi-trash" /> Delete</button>
        </form>
        <Link href="/journal" className="btn btn-outline-purple"><i className="bi bi-arrow-left" /> Back</Link>
      </div>
    </>
  );
}
