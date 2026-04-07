import { cookies } from 'next/headers';

export async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('serenity_session')?.value;
  return sessionId || null;
}

export function generateSessionId() {
  return crypto.randomUUID();
}
