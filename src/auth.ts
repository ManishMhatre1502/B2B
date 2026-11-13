import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        roleContext: { label: "Sign in as", type: "text" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        const roleContext = credentials?.roleContext === "head" ? "head" : "owner";
        if (!email || !password) return null;
        await dbConnect();
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user || !user.roles.includes(roleContext)) return null;
        if (!(await bcrypt.compare(password, user.passwordHash))) return null;
        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          roleContext,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.roleContext) token.roleContext = user.roleContext;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.roleContext = token.roleContext === "head" ? "head" : "owner";
      }
      return session;
    },
  },
});
