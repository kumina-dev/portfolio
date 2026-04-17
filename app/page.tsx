import { HomePage } from "@/features/site/components/HomePage/HomePage";
import { getHomePageViewModel } from "@/features/site/queries/site-content.queries";

export const revalidate = 300;

export default async function Page() {
  const data = await getHomePageViewModel();
  return <HomePage data={data} />;
}
