import { prisma } from '@/app/lib/prisma';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Get the Nextauth secret from environment variables
  secret: process.env.NEXTAUTH_SECRET,
  // Set the session strategy and max age
  session: {
    strategy: 'jwt',
    maxAge: 300000,
  },
  // Set which providers we support for authentication
  providers: [
    // Credentials provider for email and password authentication
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Authorize function to validate user credentials
      authorize: async (credentials) => {
        // Check if credentials are provided
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find the user by email in the database
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        // If user does not exist or password does not match, throw an error
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error(
            JSON.stringify({ errors: 'Authentication Failed.', status: false }),
          );
        }

        // Return user object if authentication is successful
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    // Callback to handle session and JWT token
    async session({ session, token }) {
      if (!session?.user) {
        return session;
      }

      return {
        ...session,
        user: {
          id: token.id,
          name: session.user.name,
          email: session.user.email,
        },
      };
    },
    // Callback to handle JWT token creation and updates
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
};
