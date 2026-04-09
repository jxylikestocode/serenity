import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const sessionId = request.cookies.get('serenity_session')?.value;

  if (!sessionId) {
    const newId = crypto.randomUUID();
    response.cookies.set('serenity_session', newId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
