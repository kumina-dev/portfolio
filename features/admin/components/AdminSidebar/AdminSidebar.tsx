"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "../../lib/admin.constants";
import styles from "./AdminSidebar.module.css";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandBlock}>
        <p className={styles.eyebrow}>Admin</p>
        <h1 className={styles.title}>Portfolio CMS</h1>
      </div>

      <nav className={styles.nav} aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? styles.linkActive : styles.link}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}