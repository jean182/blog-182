import { supportedLanguages } from "./../../i18n"

export const codeToLanguage = code =>
  supportedLanguages[code].replace(/ /g, " " /* nbsp */)

export const createLanguageLink = (slug, lang) => {
  const rawSlug = slug.replace(`${lang}/`, "")

  return targetLang =>
    targetLang === "en" ? rawSlug : `${targetLang}${rawSlug}`
}

export const loadFontsForCode = code => {
  switch (code) {
    case "es":
    default:
      break
  }
}
