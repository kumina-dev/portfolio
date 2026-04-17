import type { ReactNode } from "react";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { CmsShell } from "@/features/cms/components/admin/CmsShell/CmsShell";

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = await adminAuthService.requireUser();

  return <CmsShell email={user.email ?? ""}>{children}</CmsShell>;
}
