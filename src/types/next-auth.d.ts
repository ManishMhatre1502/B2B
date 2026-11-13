import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleContext: "owner" | "head";
    } & DefaultSession["user"];
  }

  interface User {
    roleContext?: "owner" | "head";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roleContext?: "owner" | "head";
  }
}
