export const isRunningInBrowser = () =>
  typeof window !== "undefined" ? true : false

export const formatPostDate = (date, lang) => {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [
    lang,
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);
  return date.toLocaleDateString(...args);
}

export const getSubscriptioPreferenceUrl = (message) => {
  const position = message.indexOf("<a");
  return message.slice(position);
}
