function $(sel: string) {
    return document.querySelector(sel) as HTMLElement | null;
}

function openCmdk() {
    const root = $("#cmdk");
    const input = $("#cmdk-input") as HTMLInputElement | null;
    if (!root || !input) return;

    root.classList.remove("hidden");
    root.setAttribute("aria-hidden", "false");
    input.value = "";
    filterList("");
    setTimeout(() => input.focus(), 0);
}

function closeCmdk() {
    const root = $("#cmdk");
    if (!root) return;
    root.classList.add("hidden");
    root.setAttribute("aria-hidden", "true");
}

function filterList(q: string) {
    const list = document.querySelectorAll<HTMLElement>("[data-cmdk-item]");
    const query = q.trim().toLowerCase();
    list.forEach((el) => {
        const label = el.dataset.label ?? "";
        const show = query === "" || label.includes(query);
        el.style.display = show ? "block" : "none";
    });
}

function install() {
    document.addEventListener("keydown", (e) => {
        const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
        if (isCtrlK) {
            e.preventDefault();
            const root = $("#cmdk");
            const hidden = root?.classList.contains("hidden");
            hidden ? openCmdk() : closeCmdk();
        }
        if (e.key === "Escape") closeCmdk();
    });

    document.querySelectorAll("[data-cmdk-open]").forEach((btn) => {
        btn.addEventListener("click", () => openCmdk());
    });

    document.querySelectorAll("[data-cmdk-close]").forEach((btn) => {
        btn.addEventListener("click", () => closeCmdk());
    });

    const input = $("#cmdk-input") as HTMLInputElement | null;
    input?.addEventListener("input", () => filterList(input.value));
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install);
} else {
    install();
}
