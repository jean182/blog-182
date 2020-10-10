import { supportedLanguages } from "../../i18n"
import locales from "../locales/locales.json"

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
    case "fr":
    case "it":
    case "pt-br":
    default:
      break
  }
}

export const translate = (lang, value) => {
  const path = value.split(".")
  if (lang !== "en") path.unshift(lang)
  return path.reduce((previous, current) => {
    const translation = previous ? previous[current] : null
    return translation !== undefined
      ? translation
      : `Missing translation for ${lang}.${value}`
  }, locales)
}
