import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        nick: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        isSignup: { type: "boolean" },
        user: { type: "object" },
      },
      async authorize(credentials, req) {
        const loginBody = {
          nick: credentials?.nick,
          password: credentials?.password,
        };

        if (credentials?.isSignup) {
          return JSON.parse(credentials.user);
        }

        let urlLogin = "https://super-ligadaslendas.vercel.app/api/auth/login";

        if (process.env.NODE_ENV == "development") {
          urlLogin = "http://localhost:3000/api/auth/login";
        }

        const res = await fetch(urlLogin, {
          method: "POST",
          body: JSON.stringify(loginBody),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger }) {
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        // Note that this if condition is needed
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/?login=1",
    signOut: "/",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
