import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy" description="Information about how Grolyx collects, uses, stores, and protects account and workspace data." checklist={["Identify the legal operator and a working privacy contact.", "Describe the personal and business information collected and why it is used.", "Name hosting, database, analytics, and email providers that process data.", "Explain retention, deletion, security practices, and how users can make privacy requests.", "Review applicable privacy requirements for the regions where Grolyx operates."]} />;
}
