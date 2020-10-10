export const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`

export const isBrowser = () => typeof window !== "undefined"

export const consoleWarning = error =>
  // eslint-disable-next-line no-console
  console.warn(
    `warning ${error.message}, you're probably not running this in the browser`
  )

export const formatPostDate = (date, lang) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  const newDate = new Date(date)
  const args = [
    lang,
    { day: "numeric", month: "long", year: "numeric" },
  ].filter(Boolean)
  return newDate.toLocaleDateString(...args)
}

export const formatReadingTime = (minutes, lang) => {
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
