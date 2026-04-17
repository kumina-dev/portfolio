import Link from "next/link";
import type { CmsExperienceRecord } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type ExperienceCollectionProps = {
  experience: CmsExperienceRecord[];
};

export function ExperienceCollection({ experience }: ExperienceCollectionProps) {
  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Experience</p>
          <h1 className={shared.title}>Timeline entries</h1>
          <p className={shared.copy}>Keep these concise. They are supporting proof, not a full resume dump.</p>
        </div>
        <Link className={shared.linkButton} href="/admin/experience/new">
          New entry
        </Link>
      </div>

      <div className={shared.collectionGrid}>
        {experience.map((item) => (
          <article key={item.id} className={shared.collection}>
            <div className={shared.collectionRow}>
              <div>
                <span className={shared.statusBadge}>{item.status}</span>
                <h2>{item.role}</h2>
                <p className={shared.copy}>
                  {item.company} · {item.period}
                </p>
                <div className={shared.meta}>
                  <span>{item.highlights.length} highlights</span>
                  <span>Order {item.sort_order}</span>
                </div>
              </div>
              <Link className={shared.linkButton} href={`/admin/experience/${item.id}`}>
                Edit
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
