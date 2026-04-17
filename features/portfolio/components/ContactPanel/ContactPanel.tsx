import type { PortfolioContact } from "../../types/portfolio";
import styles from "./ContactPanel.module.css";

type ContactPanelProps = {
  contact: PortfolioContact;
};

export function ContactPanel({ contact }: ContactPanelProps) {
  return (
    <section className={styles.panel}>
      <p className={styles.eyebrow}>Contact</p>
      <h2 className={styles.title}>Get in touch</h2>
      <p className={styles.description}>
        Hiring, collaboration, or other professionally acceptable reasons.
      </p>

      <div className={styles.cardGrid}>
        <a className={styles.card} href={`mailto:${contact.email}`}>
          <span className={styles.cardLabel}>Email</span>
          <strong>{contact.email}</strong>
        </a>

        <a
          className={styles.card}
          href={contact.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.cardLabel}>GitHub</span>
          <strong>github.com/kumina-dev</strong>
        </a>
      </div>
    </section>
  );
}