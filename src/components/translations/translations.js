import React, { Component } from "react"
import Panel from "../panel/panel"
import { FallbackGatsbyLink, FallbackLink } from "../shared/links.styled"
import { translate, codeToLanguage } from "../../utils/i18n"

class Translations extends Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props
    let readerTranslations = translations.filter(lang => lang !== "ru")

    return (
      <Panel>
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
                  <FallbackGatsbyLink
                    to={`/${languageLink(l)}`}
                  >
                    {codeToLanguage(l)}
                  </FallbackGatsbyLink>
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
            <FallbackGatsbyLink
              to={languageLink("en")}
            >
              {translate(lang, "translations.readOriginal")}
            </FallbackGatsbyLink>
            {" ⋮ "}
            <FallbackLink
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate(lang, "translations.improveTranslation")}
            </FallbackLink>
            {" ⋮ "}
            <FallbackGatsbyLink to={`/${lang}`}>
              {translate(lang, "translations.viewAll")}
            </FallbackGatsbyLink>{" "}
          </>
        )}
      </Panel>
    )
  }
}

export default Translations
