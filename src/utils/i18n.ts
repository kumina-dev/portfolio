import { content, defaultLanguage } from "../data/content";

type Language = keyof typeof content;

export const getLocalizedString = (
  keyPath: string,
  language: Language = defaultLanguage,
): string => {
  const value = keyPath.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, content[language] as unknown);

  return typeof value === "string" ? value : "";
};
