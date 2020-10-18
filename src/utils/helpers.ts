export const isBrowser = () => typeof window !== "undefined"

export const consoleWarning = (error: Error) =>
  // eslint-disable-next-line no-console
  console.warn(
    `warning ${error.message}, you're probably not running this in the browser`
  )

export const formatPostDate = (date: string, lang: string) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  const newDate = new Date(date)
  return newDate.toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const formatReadingTime = (minutes: number, lang: string) => {
  const roundMinutes = Math.ceil(minutes)
  switch (lang) {
    case "es":
      return `${roundMinutes} min de lectura`
    case "fr":
      return `${roundMinutes} min de lecture`
    case "it":
      return `${roundMinutes} min di lettura`
    case "pt-br":
      return `${roundMinutes} min de leitura`
    default:
      return `${roundMinutes} min read`
  }
}
