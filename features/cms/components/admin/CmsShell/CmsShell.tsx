import type { ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "@/features/admin/actions/auth.actions";
import styles from "./CmsShell.module.css";

type CmsShellProps = {
  children: ReactNode;
  email: string;
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
];

export function CmsShell({ children, email }: CmsShellProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div>
          <p className={styles.eyebrow}>Structured CMS</p>
          <h1 className={styles.title}>Portfolio control room</h1>
          <p className={styles.copy}>
            Draft content, publish with intent, and preview the public site without leaking work in progress.
          </p>
        </div>

        <nav className={styles.nav} aria-label="CMS navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <p className={styles.user}>{email}</p>
          <form action={logoutAction}>
            <button className={styles.logoutButton} type="submit">
              Logout
            </button>
          </form>
        </div>
      </aside>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
