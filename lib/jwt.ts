let cachedSecret: Uint8Array | null = null;

export function getJwtSecret(): Uint8Array {
  if (cachedSecret) {
    return cachedSecret;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_SECRET tanımlı değil. .env.local dosyasına en az 32 karakterlik rastgele bir JWT_SECRET ekleyin.'
    );
  }

  cachedSecret = new TextEncoder().encode(secret);
  return cachedSecret;
}
