import Link from "next/link";
import styles from "./DashboardCard.module.css";

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  href: string;
};

export function DashboardCard({
  title,
  value,
  description,
  href,
}: DashboardCardProps) {
  return (
    <Link className={styles.card} href={href}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <strong className={styles.value}>{value}</strong>
      </div>
      <p className={styles.description}>{description}</p>
    </Link>
  );
}