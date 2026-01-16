import { content, defaultLanguage } from "../data/content";

declare global {
	interface Window {
		__preferredLanguage?: string;
	}
}

const contentData = content;
const supportedLanguages = Object.keys(contentData);
const storedLanguage = localStorage.getItem("language");
const resolvedLanguage =
	storedLanguage && supportedLanguages.includes(storedLanguage)
		? storedLanguage
		: defaultLanguage;

document.documentElement.lang = resolvedLanguage;
document.title = contentData[resolvedLanguage]?.meta?.title ?? document.title;
window.__preferredLanguage = resolvedLanguage;

const languageButtons = document.querySelectorAll<HTMLButtonElement>("[data-lang]");
const i18nElements = document.querySelectorAll<HTMLElement>("[data-i18n]");
const localizedBlocks = document.querySelectorAll<HTMLElement>("[data-locale]");
const modal = document.querySelector<HTMLDialogElement>("#project-modal");
const openButtons = document.querySelectorAll<HTMLButtonElement>("[data-project-open]");
const modalClose = modal?.querySelector<HTMLButtonElement>("[data-modal-close]");
const modalTitle = modal?.querySelector<HTMLElement>("[data-modal='title']");
const modalSummary = modal?.querySelector<HTMLElement>("[data-modal='summary']");
const modalHighlights = modal?.querySelector<HTMLUListElement>("[data-modal='highlights']");
const modalTech = modal?.querySelector<HTMLElement>("[data-modal='tech']");
const modalShare = modal?.querySelector<HTMLAnchorElement>("[data-modal='share']");
const projectHashPrefix = "#project-";
const contactForm = document.querySelector<HTMLFormElement>("[data-contact-form]");
const formStatus = document.querySelector<HTMLElement>("[data-form-status]");
let activeLanguage = defaultLanguage;
let activeProjectId: string | null = null;

const getValue = (lang: string, key: string) =>
	key.split(".").reduce<unknown>((acc, part) => {
		if (acc && typeof acc === "object" && part in acc) {
			return (acc as Record<string, unknown>)[part];
		}
		return undefined;
	}, contentData[lang as keyof typeof contentData]);

const getProject = (lang: string, id: string) =>
	contentData[lang as keyof typeof contentData]?.projects?.items?.find(
		(item) => item.id === id,
	);

const renderModal = (
	project?: (typeof contentData)[keyof typeof contentData]["projects"]["items"][number],
) => {
	if (!project || !modalTitle || !modalSummary || !modalHighlights || !modalTech) return;
	modalTitle.textContent = project.title;
	modalSummary.textContent = project.summary;
	modalTech.textContent = project.tech;
	modalHighlights.innerHTML = "";
	project.highlights.forEach((highlight) => {
		const item = document.createElement("li");
		item.textContent = highlight;
		modalHighlights.appendChild(item);
	});
	if (modalShare) {
		modalShare.href = `${projectHashPrefix}${project.id}`;
	}
};

const applyLanguage = (lang: string) => {
	activeLanguage = lang;
	document.documentElement.lang = lang;
	document.title = contentData[lang as keyof typeof contentData]?.meta?.title ?? document.title;
	i18nElements.forEach((el) => {
		const key = el.dataset.i18n;
		if (!key) return;
		const value = getValue(lang, key);
		if (typeof value !== "string") return;
		const attrList = el.dataset.i18nAttr;
		if (attrList) {
			attrList.split(",").forEach((attr) => {
				if (attr.trim()) {
					el.setAttribute(attr.trim(), value);
				}
			});
		}
		if (el.dataset.i18nMode !== "attr") {
			el.textContent = value;
		}
	});
	localizedBlocks.forEach((el) => {
		const locale = el.dataset.locale;
		if (!locale) return;
		el.hidden = locale !== lang;
	});
	languageButtons.forEach((button) => {
		const isActive = button.dataset.lang === lang;
		button.setAttribute("aria-pressed", String(isActive));
		button.classList.toggle("is-active", isActive);
	});
	if (activeProjectId && modal?.open) {
		const project = getProject(lang, activeProjectId);
		renderModal(project);
	}
};

const openModal = (projectId: string) => {
	const project = getProject(activeLanguage, projectId);
	if (!project || !modal) return;
	activeProjectId = projectId;
	renderModal(project);
	modal.showModal();
	history.replaceState(null, "", `${projectHashPrefix}${projectId}`);
};

const closeModal = () => {
	if (!modal) return;
	modal.close();
	if (window.location.hash.startsWith(projectHashPrefix)) {
		history.replaceState(null, "", "#projects");
	}
	activeProjectId = null;
};

const savedLanguage = window.__preferredLanguage ?? defaultLanguage;
applyLanguage(savedLanguage);

const handleProjectHash = () => {
	const hash = window.location.hash;
	if (hash.startsWith(projectHashPrefix)) {
		const projectId = hash.replace(projectHashPrefix, "");
		if (projectId) {
			openModal(projectId);
		}
		return;
	}
	if (modal?.open) {
		closeModal();
	}
};

languageButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const nextLang = button.dataset.lang;
		if (!nextLang) return;
		localStorage.setItem("language", nextLang);
		applyLanguage(nextLang);
	});
});

openButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const projectId = button.dataset.projectOpen;
		if (projectId) {
			openModal(projectId);
		}
	});
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("cancel", closeModal);
modal?.addEventListener("click", (event) => {
	if (event.target === modal) {
		closeModal();
	}
});

window.addEventListener("hashchange", handleProjectHash);
handleProjectHash();

const setFieldError = (field: HTMLInputElement | HTMLTextAreaElement, message: string) => {
	const error = document.querySelector<HTMLElement>(`[data-error-for="${field.id}"]`);
	if (error) {
		error.textContent = message;
	}
};

const validateField = (field: HTMLInputElement | HTMLTextAreaElement) => {
	if (field.checkValidity()) {
		setFieldError(field, "");
		return true;
	}
	setFieldError(field, field.validationMessage);
	return false;
};

contactForm?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach(
	(field) => {
		field.addEventListener("blur", () => validateField(field));
		field.addEventListener("input", () => formStatus?.classList.remove("is-visible"));
	},
);

contactForm?.addEventListener("submit", (event) => {
	event.preventDefault();
	const fields = contactForm.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
		"input, textarea",
	);
	let isValid = true;
	fields.forEach((field) => {
		if (!validateField(field)) {
			isValid = false;
		}
	});
	if (!isValid) return;
	fields.forEach((field) => setFieldError(field, ""));
	if (formStatus) {
		formStatus.classList.add("is-visible");
	}
	contactForm.reset();
});
