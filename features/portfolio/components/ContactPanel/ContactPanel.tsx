import { Button } from "@/shared/components/Button/Button";
import { Section } from "@/shared/components/Section/Section";
import type { PortfolioContact } from "../../types/portfolio";
import styles from "./ContactPanel.module.css";

type ContactPanelProps = {
  contact: PortfolioContact;
};

export function ContactPanel({ contact }: ContactPanelProps) {
  return (
    <Section
      title="Get in touch"
      description="Hiring, collaboration, or other professionally acceptable reasons."
    >
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Contact</p>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Email</span>
            <strong>{contact.email}</strong>
            <Button href={`mailto:${contact.email}`}>Send email</Button>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>GitHub</span>
            <strong>github.com/kumina-dev</strong>
            <Button href={contact.githubUrl} target="_blank" rel="noreferrer" variant="secondary">
              Open profile
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
