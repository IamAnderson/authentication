import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"  
import authConfig from "@/auth.config"
import { db } from "./lib/db";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER"
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider !== "credentials") {
        return true;
      }   
      
      const existingUser = await getUserById(user?.id);

      if(!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ session, token }) {
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },
    async jwt({ token }) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;

      return token;
    }
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  //@ts-ignore
    adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
    ...authConfig,
})