import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Vent from '@/models/Vent';
import { detectCrisis } from '@/lib/crisis';
import Link from 'next/link';
import CrisisScanner from '@/components/CrisisScanner';

export const metadata = { title: 'Serenity — Community' };

async function createVent(formData) {
  'use server';
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('serenity_session')?.value;
  if (!sessionId) redirect('/community?error=No+session');
  const content = formData.get('content')?.slice(0, 2000);
  const category = formData.get('category') || 'general';
  if (!content) redirect('/community?error=Please+write+something');

  const crisisDetected = detectCrisis(content);
  await Vent.create({ sessionId, displayName: 'Anonymous', content, category, crisisDetected });
  redirect(crisisDetected ? '/community?posted=true&crisis=true' : '/community?posted=true');
}

const categories = ['general', 'school', 'relationships', 'family', 'work', 'health', 'other'];

export default async function CommunityPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || '';
  let vents = [];

  try {
    await connectDB();
    const filter = selectedCategory ? { category: selectedCategory } : {};
    vents = await Vent.find(filter).sort({ createdAt: -1 }).limit(50).lean();
  } catch (e) { /* continue */ }

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-people" /> Community</h2>
        <p>A safe, anonymous space to share and support each other.</p>
      </div>

      {params?.posted && <div className="alert alert-serenity alert-success"><i className="bi bi-check-circle" /> Your post has been shared.</div>}
      {params?.crisis && <div className="alert alert-serenity alert-crisis"><i className="bi bi-heart-pulse" /> Please reach out: <strong>Call/text 988</strong>. <a href="/resources">Resources &rarr;</a></div>}

      <div className="card-serenity mb-4">
        <h3><i className="bi bi-chat-heart" /> Share What&apos;s On Your Mind</h3>
        <CrisisScanner>
          <form action={createVent}>
            <div className="mb-3">
              <textarea className="form-control form-control-serenity" name="content" rows={3}
                placeholder="What would you like to share? This is a judgment-free zone..." maxLength={2000} required />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <select className="form-select form-control-serenity" name="category" style={{ maxWidth: 200 }}>
                {categories.map(c => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</option>)}
              </select>
              <button type="submit" className="btn btn-primary-gradient"><i className="bi bi-send" /> Share</button>
            </div>
          </form>
        </CrisisScanner>
      </div>

      <div className="mb-3 d-flex flex-wrap gap-2">
        <Link href="/community" className={`category-badge text-decoration-none ${!selectedCategory ? 'fw-bold' : ''}`}
          style={!selectedCategory ? { background: 'var(--purple)', color: '#fff' } : {}}>All</Link>
        {categories.map(cat => (
          <Link key={cat} href={`/community?category=${cat}`} className="category-badge text-decoration-none"
            style={{ textTransform: 'capitalize', ...(selectedCategory === cat ? { background: 'var(--purple)', color: '#fff' } : {}) }}>{cat}</Link>
        ))}
      </div>

      {vents.length > 0 ? vents.map(vent => (
        <div key={vent._id.toString()} className="vent-card">
          <div className="vent-header">
            <div className="vent-avatar">{vent.displayName.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{vent.displayName}</strong>
              <span className="category-badge ms-2" style={{ textTransform: 'capitalize' }}>{vent.category}</span>
            </div>
            <small className="text-muted ms-auto">{new Date(vent.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</small>
          </div>
          <div className="vent-content">{vent.content}</div>
          <div className="vent-actions">
            <form action={`/api/community/${vent._id}/support`} method="POST" style={{ display: 'inline' }}>
              <button type="submit"><i className="bi bi-heart" /> I hear you ({vent.supportCount})</button>
            </form>
            <Link href={`/community/${vent._id}`}><i className="bi bi-chat-dots" /> Replies ({vent.replies?.length || 0})</Link>
          </div>
        </div>
      )) : (
        <div className="empty-state">
          <i className="bi bi-people" />
          <h4>No posts yet</h4>
          <p>Be the first to share.</p>
        </div>
      )}
    </>
  );
}
