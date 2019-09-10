import React from "react"
import Panel from "./panel"
import { Link } from "gatsby"
import { translate, codeToLanguage } from "../utils/i18n"
import { systemFont } from "../utils/helpers"

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props
    let readerTranslations = translations.filter(lang => lang !== "ru")

    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              <span>
                {translate(lang, "translations.translationAvailable")}:{" "}
              </span>
              {readerTranslations.map((l, i) => (
                <React.Fragment key={l}>
                  {l === lang ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                    <Link
                      style={{ color: "var(--fallBackLink)" }}
                      to={`/${languageLink(l)}`}
                    >
                      {codeToLanguage(l)}
                    </Link>
                  )}
                  {i === readerTranslations.length - 1 ? "" : " ⋮ "}
                </React.Fragment>
              ))}
            </span>
          )}
          {lang !== "en" && (
            <>
              <br />
              <br />
              <Link
                style={{ color: "var(--fallBackLink)" }}
                to={languageLink("en")}
              >
                {translate(lang, "translations.readOriginal")}
              </Link>
              {" ⋮ "}
              <a
                style={{ color: "var(--fallBackLink)" }}
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {translate(lang, "translations.improveTranslation")}
              </a>
              {" ⋮ "}
              <Link style={{ color: "var(--fallBackLink)" }} to={`/${lang}`}>
                {translate(lang, "translations.viewAll")}
              </Link>{" "}
            </>
          )}
        </Panel>
      </div>
    )
  }
}

export default Translations
