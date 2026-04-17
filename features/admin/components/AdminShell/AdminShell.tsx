import type { ReactNode } from "react";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { AdminHeader } from "../AdminHeader/AdminHeader";
import styles from "./AdminShell.module.css";

type AdminShellProps = {
  children: ReactNode;
  email: string;
};

export function AdminShell({ children, email }: AdminShellProps) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <div className={styles.contentArea}>
        <AdminHeader email={email} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}