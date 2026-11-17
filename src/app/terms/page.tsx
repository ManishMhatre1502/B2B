import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <LegalPage title="Terms" description="Terms for creating an account and using the Grolyx business workspace." checklist={["Identify the legal operator, governing law, and support contact.", "Define account eligibility, acceptable use, and owner or business-head responsibilities.", "Confirm plan limits, subscription billing, cancellations, and refund terms before paid plans launch.", "Explain account suspension, data access, service availability, and termination.", "Review liability, dispute resolution, and required consumer disclosures with qualified counsel."]} />;
}
