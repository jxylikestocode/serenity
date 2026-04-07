import connectDB from '@/lib/mongodb';
import Mood from '@/models/Mood';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('serenity_session')?.value;
    if (!sessionId) return Response.json([]);

    const moods = await Mood.find({ sessionId }).sort({ createdAt: 1 }).limit(30).select('mood createdAt -_id').lean();
    const moodValues = { great: 5, good: 4, okay: 3, bad: 2, terrible: 1 };
    const data = moods.map(m => ({
      date: new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: moodValues[m.mood], mood: m.mood
    }));
    return Response.json(data);
  } catch (e) {
    return Response.json([]);
  }
}
