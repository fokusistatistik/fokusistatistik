import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session');

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(session.value, getJwtSecret());

    if (!payload.username || !payload.role || payload.role !== 'admin') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { username: payload.username },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
