import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import Journal from '@/models/Journal';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (!sessionId) return Response.json({ moodCount: 0, journalCount: 0 });

    const [moodCount, journalCount] = await Promise.all([
      Mood.countDocuments({ sessionId }),
      Journal.countDocuments({ sessionId }),
    ]);
    return Response.json({ moodCount, journalCount });
  } catch (e) {
    return Response.json({ moodCount: 0, journalCount: 0 });
  }
}
