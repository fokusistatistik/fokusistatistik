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
      // Here you can add logic to fetch user role from backend
      // For now, all new users get 'Standart' role by default
      // Example:
      // const userRole = await fetchUserRoleFromBackend(user.email);
      // user.role = userRole || getDefaultRole();

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
