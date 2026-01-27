import { getCollection } from "astro:content";

export async function getProjects() {
    const items = await getCollection("projects");
    return items
        .map((p) => ({
            ...p,
            data: {
                ...p.data,
                // normalize date so sorting is stable
                date: p.data.date
            }
        }))
        .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

export async function getProjectBySlug(slug: string) {
    const projects = await getProjects();
    return projects.find((p) => p.data.slug === slug) ?? null;
}
