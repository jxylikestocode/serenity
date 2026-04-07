import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Vent from '@/models/Vent';
import Link from 'next/link';

async function addReply(formData) {
  'use server';
  const id = formData.get('ventId');
  const content = formData.get('content')?.slice(0, 1000);
  if (!content) redirect(`/community/${id}?error=Reply+cannot+be+empty`);

  await connectDB();
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('serenity_session')?.value;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set('serenity_session', sessionId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60, sameSite: 'lax' });
  }

  await Vent.findByIdAndUpdate(id, { $push: { replies: { sessionId, displayName: 'Anonymous', content } } });
  redirect(`/community/${id}?replied=true`);
}

async function addSupport(formData) {
  'use server';
  const id = formData.get('ventId');
  await connectDB();
  await Vent.findByIdAndUpdate(id, { $inc: { supportCount: 1 } });
  redirect(`/community/${id}`);
}

export default async function ThreadPage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;
  await connectDB();
  const vent = await Vent.findById(id).lean();
  if (!vent) notFound();

  return (
    <>
      <div className="page-header"><h2><i className="bi bi-chat-dots" /> Thread</h2></div>

      {query?.replied && <div className="alert alert-serenity alert-success"><i className="bi bi-check-circle" /> Reply added!</div>}

      <div className="vent-card">
        <div className="vent-header">
          <div className="vent-avatar">{vent.displayName.charAt(0).toUpperCase()}</div>
          <div><strong>{vent.displayName}</strong><span className="category-badge ms-2" style={{ textTransform: 'capitalize' }}>{vent.category}</span></div>
          <small className="text-muted ms-auto">{new Date(vent.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</small>
        </div>
        <div className="vent-content">{vent.content}</div>
        <div className="vent-actions">
          <form action={addSupport}><input type="hidden" name="ventId" value={vent._id.toString()} /><button type="submit"><i className="bi bi-heart" /> I hear you ({vent.supportCount})</button></form>
        </div>
      </div>

      <h4 className="mt-4 mb-3">Replies ({vent.replies?.length || 0})</h4>
      {vent.replies?.length > 0 ? vent.replies.map((r, i) => (
        <div key={i} className="reply-card">
          <div className="reply-header"><strong>{r.displayName}</strong><span>&bull;</span><span>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span></div>
          <div className="reply-content">{r.content}</div>
        </div>
      )) : <p className="text-muted">No replies yet. Be the first to show support.</p>}

      <div className="card-serenity mt-3">
        <h4 className="mb-3"><i className="bi bi-reply" /> Leave a supportive reply</h4>
        <form action={addReply}>
          <input type="hidden" name="ventId" value={vent._id.toString()} />
          <div className="mb-3"><textarea className="form-control form-control-serenity" name="content" rows={3} placeholder="Share some kind words..." maxLength={1000} required /></div>
          <button type="submit" className="btn btn-primary-gradient"><i className="bi bi-send" /> Reply</button>
        </form>
      </div>
      <div className="mt-3"><Link href="/community" className="btn btn-outline-purple"><i className="bi bi-arrow-left" /> Back to Community</Link></div>
    </>
  );
}
