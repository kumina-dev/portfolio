import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      {title ? (
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}