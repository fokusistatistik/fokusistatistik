// Google OAuth Configuration and Utilities

export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_URL}/api/auth/callback`
    : 'http://localhost:3000/api/auth/callback',
  scope: 'openid email profile',
  webhookUrl: process.env.NEXT_PUBLIC_AUTH_WEBHOOK_URL || 'https://n8n.fokusistatistik.com/webhook-test/fokuswebuserauth'
};

/**
 * Google Authorization URL oluştur
 */
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CONFIG.clientId,
    redirect_uri: GOOGLE_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_CONFIG.scope,
    access_type: 'offline',
    prompt: 'select_account',
    include_granted_scopes: 'true',
    state: state || 'web_login'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Authorization code'u webhook'a gönder ve token al
 */
export async function exchangeCodeForToken(code: string): Promise<any> {
  console.log('🔐 Exchanging code for token...');
  console.log('📤 Webhook URL:', GOOGLE_CONFIG.webhookUrl);

  const tokenData = {
    code: code,
    client_id: GOOGLE_CONFIG.clientId,
    redirect_uri: GOOGLE_CONFIG.redirectUri,
    scope: GOOGLE_CONFIG.scope,
    timestamp: Date.now(),
    environment: process.env.NODE_ENV
  };

  console.log('📤 Sending to webhook:', tokenData);

  const response = await fetch(GOOGLE_CONFIG.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenData)
  });

  console.log('📥 Webhook response status:', response.status);

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  console.log('📥 Webhook response text:', text);

  try {
    const parsed = JSON.parse(text);

    // N8N array döndürebilir
    let data;
    if (Array.isArray(parsed)) {
      data = parsed[0];
    } else {
      data = parsed.json || parsed;
    }

    console.log('✅ Parsed webhook response:', data);
    return data;

  } catch (e) {
    console.error('❌ JSON parse error:', e);
    throw new Error('Invalid webhook response format');
  }
}

/**
 * Session data oluştur
 */
export function createSessionData(userInfo: any, userId: string) {
  const sessionData = {
    user: userInfo.name,
    email: userInfo.email,
    userId: userId,
    picture: userInfo.picture,
    token: generateSecureToken(),
    timestamp: Date.now(),
    isLoggedIn: true,
    authMethod: 'google',

    // Backend'den gelen tüm bilgiler
    ...userInfo
  };

  return sessionData;
}

/**
 * Güvenli token oluştur
 */
function generateSecureToken(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte =>
      byte.toString(16).padStart(2, '0')).join('');
  } else {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
