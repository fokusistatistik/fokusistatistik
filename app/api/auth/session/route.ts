import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Session token'ı decode et ve kontrol et
  try {
    const decoded = Buffer.from(session.value, 'base64').toString();
    const [username, timestamp] = decoded.split(':');

    // Token 7 günden eski mi kontrol et
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 gün

    if (tokenAge > maxAge) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { username },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
