export type NavItem = { label: string; href: string; key?: string };

export const NAV: NavItem[] = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
    { label: "Now", href: "/now" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
];

export function commandPaletteEntries() {
    return NAV.map((n) => ({
        label: n.label,
        href: n.href,
        kind: "page"
    }));
}
