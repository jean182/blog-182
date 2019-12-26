import { supportedLanguages } from "./../../i18n"
import locales from "../locales/locales"

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
  let path = value.split(".")
  lang !== "en" && path.unshift(lang)
  return path.reduce(function(previous, current) {
    const translation = previous ? previous[current] : null
    return translation !== undefined
      ? translation
      : `Missing translation for ${lang}.${value}`
  }, locales)
}
