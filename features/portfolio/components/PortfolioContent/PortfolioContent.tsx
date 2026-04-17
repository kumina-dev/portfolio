import type { PortfolioPageData, PortfolioSectionKey } from "../../types/portfolio";
import { AboutPanel } from "../AboutPanel/AboutPanel";
import { ProjectsPanel } from "../ProjectsPanel/ProjectsPanel";
import { SkillsPanel } from "../SkillsPanel/SkillsPanel";
import { ExperiencePanel } from "../ExperiencePanel/ExperiencePanel";
import { ContactPanel } from "../ContactPanel/ContactPanel";
import styles from "./PortfolioContent.module.css";

type PortfolioContentProps = {
  data: PortfolioPageData;
  activeSection: PortfolioSectionKey;
};

export function PortfolioContent({ data, activeSection }: PortfolioContentProps) {
  return (
    <div className={styles.content}>
      {activeSection === "about" ? <AboutPanel profile={data.profile} /> : null}
      {activeSection === "projects" ? <ProjectsPanel projects={data.projects} /> : null}
      {activeSection === "skills" ? <SkillsPanel skillGroups={data.skillGroups} /> : null}
      {activeSection === "experience" ? <ExperiencePanel experience={data.experience} /> : null}
      {activeSection === "contact" ? <ContactPanel contact={data.contact} /> : null}
    </div>
  );
}