import Link from "next/link";
import type { CmsSkillGroupBundle } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type SkillGroupsCollectionProps = {
  groups: CmsSkillGroupBundle[];
};

export function SkillGroupsCollection({ groups }: SkillGroupsCollectionProps) {
  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Skills</p>
          <h1 className={shared.title}>Capability groups</h1>
          <p className={shared.copy}>These feed the proof-oriented capability section on the homepage.</p>
        </div>
        <Link className={shared.linkButton} href="/admin/skills/new">
          New group
        </Link>
      </div>

      <div className={shared.collectionGrid}>
        {groups.map(({ group, items }) => (
          <article key={group.id} className={shared.collection}>
            <div className={shared.collectionRow}>
              <div>
                <span className={shared.statusBadge}>{group.status}</span>
                <h2>{group.title}</h2>
                <p className={shared.copy}>{group.description}</p>
                <div className={shared.meta}>
                  <span>{items.length} items</span>
                  <span>Order {group.sort_order}</span>
                </div>
              </div>
              <Link className={shared.linkButton} href={`/admin/skills/${group.id}`}>
                Edit
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
