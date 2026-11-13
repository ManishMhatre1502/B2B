import { AuthPageFrame, RegisterForm } from "@/components/auth-forms";

export default function RegisterPage() {
  return <AuthPageFrame eyebrow="Get started" title="Build your workspace" description="Create your owner account and add your first business when you’re ready."><RegisterForm /></AuthPageFrame>;
}
