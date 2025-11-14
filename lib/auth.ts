import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UserRole, getDefaultRole } from '@/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/giris',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        // Add user ID
        if (token.sub) {
          (session.user as any).id = token.sub;
        }

        // Add user role (from token or default to 'Standart')
        (session.user as any).role = (token.role as UserRole) || getDefaultRole();
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        // Set default role for new users
        // Backend can update this via API call later
        token.role = getDefaultRole();
      }

      // Allow role updates from backend via session update
      if (trigger === 'update' && session?.role) {
        token.role = session.role;
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      console.log('🔐 signIn callback triggered');
      console.log('👤 User:', { email: user.email, name: user.name, id: user.id });
      console.log('🔗 Account:', { provider: account?.provider, type: account?.type });
      console.log('📋 Profile:', { email_verified: profile?.email_verified });

      try {
        // Webhook'a kullanıcı bilgilerini gönder
        const webhookUrl = process.env.NEXT_PUBLIC_AUTH_WEBHOOK_URL || 'https://n8n.fokusistatistik.com/webhook/userauth';
        console.log('🎯 Webhook URL:', webhookUrl);

        const webhookData = {
          event: 'user_signin',
          timestamp: new Date().toISOString(),
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          },
          account: {
            provider: account?.provider,
            type: account?.type,
            providerAccountId: account?.providerAccountId,
          },
          profile: {
            email_verified: profile?.email_verified,
          },
          isNewUser: !profile?.email_verified, // Basit bir kontrol
        };

        console.log('📤 Sending webhook data:', JSON.stringify(webhookData, null, 2));

        // Webhook'u çağır ve response'u kontrol et
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        })
          .then(async response => {
            console.log('📥 Webhook response status:', response.status);
            const responseText = await response.text();
            console.log('📥 Webhook response body:', responseText);

            if (response.ok) {
              console.log('✅ Webhook sent successfully to:', webhookUrl);
            } else {
              console.error('⚠️ Webhook returned non-OK status:', response.status);
            }
          })
          .catch(error => {
            console.error('❌ Webhook fetch error:', error);
            console.error('❌ Error details:', {
              message: error.message,
              name: error.name,
              stack: error.stack
            });
          });

        console.log('✅ User signin event initiated for:', user.email);
      } catch (error) {
        console.error('❌ Critical error in signIn callback:', error);
        if (error instanceof Error) {
          console.error('❌ Error message:', error.message);
          console.error('❌ Error stack:', error.stack);
        }
        // Webhook hatası kullanıcının giriş yapmasını engellemez
      }

      console.log('✅ signIn callback completed, returning true');
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
