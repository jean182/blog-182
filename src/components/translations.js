import React from "react"
import Panel from "./panel"
import { Link } from "gatsby"
import { codeToLanguage } from "../utils/i18n"

const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink } = this.props
    let readerTranslations = translations.filter(lang => lang !== "ru")

    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              <span>Translated by me into: </span>
              {readerTranslations.map((l, i) => (
                <React.Fragment key={l}>
                  {l === lang ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                      <Link style={{ color: "var(--fallBackLink)" }} to={languageLink(l)}>{codeToLanguage(l)}</Link>
                    )}
                  {i === readerTranslations.length - 1 ? "" : " ⋮ "}
                </React.Fragment>
              ))}
            </span>
          )}
          {lang !== "en" && (
            <>
              <br />
              <div style={{ justifyContent: "space-around" }}>
                <Link style={{ color: "var(--fallBackLink)" }} to={languageLink("en")}>Read the original</Link>
                {" ⋮ "}
                <Link style={{ color: "var(--fallBackLink)" }} to={`/${lang}`}>View all translated posts</Link>{" "}
              </div>
            </>
          )}
        </Panel>
      </div>
    )
  }
}

export default Translations
