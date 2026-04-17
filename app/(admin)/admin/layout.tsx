import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/AdminShell/AdminShell";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = await adminAuthService.requireUser();

  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
