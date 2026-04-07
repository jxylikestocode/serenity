import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (!sessionId) return Response.json({ checkin: null });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const checkin = await Mood.findOne({ sessionId, createdAt: { $gte: todayStart } })
      .sort({ createdAt: -1 }).lean();

    return Response.json({ checkin: checkin ? { mood: checkin.mood, note: checkin.note } : null });
  } catch (e) {
    return Response.json({ checkin: null });
  }
}
