const KEY = "boot_seen_v1";

function qs<T extends HTMLElement>(sel: string): T | null {
    return document.querySelector(sel) as T | null;
}

function show() {
    const root = qs<HTMLElement>("#boot");
    const bar = qs<HTMLElement>("#boot-bar");
    const pct = qs<HTMLElement>("#boot-pct");
    if (!root || !bar || !pct) return;

    // If already shown this session, do nothing
    if (sessionStorage.getItem(KEY) === "1") return;
    sessionStorage.setItem(KEY, "1");

    root.classList.remove("hidden");
    root.setAttribute("aria-hidden", "false");

    let done = false;

    const close = () => {
        if (done) return;
        done = true;
        root.classList.add("hidden");
        root.setAttribute("aria-hidden", "true");
        cleanup();
    };

    // Animate ~1s with a smooth-ish bar fill
    const start = performance.now();
    const DURATION = 1000;

    const tick = (t: number) => {
        if (done) return;
        const p = Math.min(1, (t - start) / DURATION);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const v = Math.round(eased * 100);

        bar.style.width = `${v}%`;
        pct.textContent = `${v}%`;

        if (p < 1) requestAnimationFrame(tick);
        else setTimeout(close, 80); // tiny settle
    };
    requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
    };

    const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        if (target.closest("[data-boot-skip]")) close();
    };

    // Optional: click outside to skip
    const onBackdrop = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        if (target.id === "boot") close();
    };

    const cleanup = () => {
        document.removeEventListener("keydown", onKey);
        root.removeEventListener("click", onClick);
        root.removeEventListener("click", onBackdrop);
    };

    document.addEventListener("keydown", onKey);
    root.addEventListener("click", onClick);
    root.addEventListener("click", onBackdrop);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", show);
} else {
    show();
}
