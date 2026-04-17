import { PortfolioShell } from "@/features/portfolio/components/PortfolioShell/PortfolioShell";
import { portfolioService } from "@/features/portfolio/server/portfolio.service";
import styles from "./page.module.css";

export const revalidate = 300;

export default async function Page() {
  const portfolio = await portfolioService.getPortfolioPageData();
  
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PortfolioShell data={portfolio} />
      </div>
    </main>
  );
}
