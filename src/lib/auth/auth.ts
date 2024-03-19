import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { get_user_id_by_email } from "../firebase/firestore";

export const config = {
  // defined here to automatically save the user data to db
  adapter: FirestoreAdapter() as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      const db_user_id = await get_user_id_by_email(token.email);

      if (!db_user_id) {
        token.id = user.id;
        return token;
      }

      return {
        id: db_user_id,
        name: token.name,
        email: token.email,
        picture: token.picture,
      };
    },
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
