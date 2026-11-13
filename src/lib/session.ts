import { auth } from "@/auth";
import User from "@/models/User";

export async function requireRoleContext(role: "owner" | "head") {
  const session = await auth();
  if (!session?.user?.id || session.user.roleContext !== role) return null;
  const user = await User.findById(session.user.id).select("roles email fullName");
  if (!user || !user.roles.includes(role)) return null;
  return { session, user };
}
