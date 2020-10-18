import React from "react"
import PropTypes from "prop-types"

import Panel from "@components/panel/panel"
import {
  FallbackGatsbyLink,
  FallbackLink,
} from "@components/shared/links.styled"
import { translate, codeToLanguage } from "@utils/i18n"

import { Props } from "./translations.props"

function Translations({ translations, lang, languageLink, editUrl }: Props) {
  return (
    <Panel>
      {translations.length > 0 && (
        <span>
          <span>{translate(lang, "translations.translationAvailable")}: </span>
          {translations.map((l, i) => (
            <React.Fragment key={l}>
              {l === lang ? (
                <b>{codeToLanguage(l)}</b>
              ) : (
                <FallbackGatsbyLink to={`/${languageLink(l)}`}>
                  {codeToLanguage(l)}
                </FallbackGatsbyLink>
              )}
              {i === translations.length - 1 ? "" : " ⋮ "}
            </React.Fragment>
          ))}
        </span>
      )}
      {lang !== "en" && (
        <>
          <br />
          <br />
          <FallbackGatsbyLink to={languageLink("en")}>
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

Translations.propTypes = {
  editUrl: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  languageLink: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Translations
