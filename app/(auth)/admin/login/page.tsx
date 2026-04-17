import { redirect } from "next/navigation";
import { LoginForm } from "@/features/admin/components/forms/LoginForm/LoginForm";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import styles from "./page.module.css";

export default async function AdminLoginPage() {
  const user = await adminAuthService.getVerifiedUser();

  if (user) {
    redirect("/admin");
  }
  
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Admin</p>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.description}>Sign in to manage portfolio content.</p>
        <LoginForm />
      </section>
    </main>
  );
}