import { CmsDashboard } from "@/features/cms/components/admin/CmsDashboard/CmsDashboard";
import { getCmsDashboardSummary } from "@/features/cms/queries/cms-admin.queries";

export default async function AdminDashboardPage() {
  const summary = await getCmsDashboardSummary();
  return <CmsDashboard summary={summary} />;
}
