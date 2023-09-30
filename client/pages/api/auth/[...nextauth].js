import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/clientPromise";
import { verifyPassword } from "@/utils/hash";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // retrive user from db
        const client = await clientPromise;
        const db = await client.db();

        const user = await db
          .collection("Users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    authorized({ req, token }) {
      if (token) return true; // If there is a token, the user is authenticated
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  adapter: MongoDBAdapter(clientPromise),
});
