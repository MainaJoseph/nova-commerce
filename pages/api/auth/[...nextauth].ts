import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

// Define extended user type
interface ExtendedUser {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  active: boolean;
  role: string;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with same email
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid Email or Password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            accounts: true,
          },
        });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // Check if user has a password set
        if (!user.hashedPassword) {
          // User might have OAuth account only
          if (user.accounts.length > 0) {
            const providers = user.accounts
              .map((acc) => acc.provider)
              .join(", ");
            throw new Error(
              `This email is registered with ${providers}. Please sign in using that method or set a password first.`,
            );
          }
          throw new Error("Invalid Email or Password");
        }

        // Check if email is verified
        if (!user.active) {
          throw new Error("Please verify your email before logging in");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Email or Password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          active: user.active,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google), automatically verify email
      if (account?.provider === "google" && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (existingUser) {
            // Update existing user to mark as active
            await prisma.user.update({
              where: { email: user.email },
              data: {
                active: true,
                emailVerified: new Date(),
              },
            });
          }
        } catch (error) {
          console.error("Error updating OAuth user:", error);
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      // Initial sign in - cast user to ExtendedUser
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.email = extendedUser.email ?? "";
        token.name = extendedUser.name ?? "";
        token.active = extendedUser.active ?? true;
        token.role = extendedUser.role ?? "USER";
      }

      // Update token if needed
      if (trigger === "update" && token.email) {
        const updatedUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (updatedUser) {
          token.active = updatedUser.active;
          token.role = updatedUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).active = token.active;
        (session.user as any).role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
