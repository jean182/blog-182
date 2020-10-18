import { supportedLanguages } from "../../i18n"
import locales from "../locales/locales.json"

export const codeToLanguage = (code: string) =>
  supportedLanguages[code].replace(/ /g, " " /* nbsp */)

export const createLanguageLink = (slug: string, lang: string) => {
  const rawSlug = slug.replace(`${lang}/`, "")

  return targetLang =>
    targetLang === "en" ? rawSlug : `${targetLang}${rawSlug}`
}

export const loadFontsForCode = (code: string) => {
  switch (code) {
    case "es":
    case "fr":
    case "it":
    case "pt-br":
    default:
      break
  }
}

export const translate = (lang: string, value: string) => {
  const path = value.split(".")
  if (lang !== "en") path.unshift(lang)
  return path.reduce((previous, current) => {
    const translation = previous ? previous[current] : null
    return translation !== undefined
      ? translation
      : `Missing translation for ${lang}.${value}`
  }, locales)
}
