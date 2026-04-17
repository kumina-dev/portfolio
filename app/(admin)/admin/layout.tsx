import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/features/admin/components/AdminShell/AdminShell";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await adminAuthService.requireSession();

  if (!session.user) {
    redirect("/admin/login");
  }

  return <AdminShell email={session.user.email ?? ""}>{children}</AdminShell>;
}