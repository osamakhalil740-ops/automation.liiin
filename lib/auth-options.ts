/**
 * NextAuth Configuration for Gmail OAuth
 * Secure authentication - only Gmail accounts allowed
 */

import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow Gmail accounts
      if (user.email && !user.email.endsWith('@gmail.com')) {
        return false; // Reject non-Gmail accounts
      }
      return true;
    },
    
    async session({ session, user }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  
  events: {
    async createUser({ user }) {
      // Auto-create default settings for new user
      try {
        await prisma.settings.create({
          data: {
            userId: user.id,
            maxCommentsPerDay: 50,
            maxProfileViewsPerDay: 100,
            minLikes: 10,
            maxLikes: 10000,
            minComments: 2,
            maxComments: 1000,
            minDelayMins: 15,
            maxDelayMins: 45,
            systemActive: false,
            linkedinSessionCookie: ''
          }
        });
      } catch (error) {
        console.error('Error creating default settings:', error);
      }
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};
