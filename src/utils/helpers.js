export const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`

export const isRunningInBrowser = () =>
  typeof window !== "undefined" ? true : false

export const formatPostDate = (date, lang) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  date = new Date(date)
  const args = [
    lang,
    { day: "numeric", month: "long", year: "numeric" },
  ].filter(Boolean)
  return date.toLocaleDateString(...args)
}
