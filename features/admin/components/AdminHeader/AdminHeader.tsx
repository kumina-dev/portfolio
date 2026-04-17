import { logoutAction } from "../../actions/auth.actions";
import styles from "./AdminHeader.module.css";

type AdminHeaderProps = {
  email: string;
};

export function AdminHeader({ email }: AdminHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.userBlock}>
        <div>
          <p className={styles.label}>Signed in</p>
          <strong className={styles.email}>{email || "Unknown user"}</strong>
        </div>

        <form action={logoutAction}>
          <button className={styles.logoutButton} type="submit">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}