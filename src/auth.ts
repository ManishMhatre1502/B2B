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
        const requestedRole = credentials?.roleContext;
        const roleContext = requestedRole === "head" || requestedRole === "admin" ? requestedRole : "owner";
        if (!email || !password) return null;
        await dbConnect();
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user) return null;
        if (roleContext === "admin") {
          const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
          if (!adminEmails.includes(email)) return null;
        } else if (!user.roles.includes(roleContext)) return null;
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
        session.user.roleContext = token.roleContext === "admin" ? "admin" : token.roleContext === "head" ? "head" : "owner";
      }
      return session;
    },
  },
});
