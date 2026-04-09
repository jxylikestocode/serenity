import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import { cookies } from 'next/headers';
import { detectCrisis } from '@/lib/crisis';

export async function POST(request) {
  try {
    await connectDB();
    const { mood, note } = await request.json();

    if (!['great', 'good', 'okay', 'bad', 'terrible'].includes(mood)) {
      return Response.json({ error: 'Invalid mood' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (!sessionId) {
      return Response.json({ error: 'No session' }, { status: 400 });
    }

    const crisisDetected = detectCrisis(note);
    await Mood.create({ sessionId, mood, note: (note || '').slice(0, 500), crisisDetected });

    return Response.json({ success: true, crisis: crisisDetected });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
