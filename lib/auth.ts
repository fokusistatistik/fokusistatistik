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
      try {
        // Webhook'a kullanıcı bilgilerini gönder
        const webhookUrl = process.env.NEXT_PUBLIC_AUTH_WEBHOOK_URL || 'https://n8n.fokusistatistik.com/webhook/userauth';

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

        // Webhook'u non-blocking şekilde çağır
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        }).catch(error => {
          console.error('Webhook error (non-blocking):', error);
        });

        console.log('✅ User signin event sent to webhook:', user.email);
      } catch (error) {
        console.error('❌ Error in signIn callback:', error);
        // Webhook hatası kullanıcının giriş yapmasını engellemez
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
