import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleContext: "owner" | "head" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    roleContext?: "owner" | "head" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roleContext?: "owner" | "head" | "admin";
  }
}
