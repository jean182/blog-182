import React from 'react';
import { Link, graphql } from 'gatsby';
import {
  codeToLanguage,
} from '../utils/i18n';

const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props;

    let readerTranslations = translations.filter(lang => lang !== 'ru');
    let hasRussianTranslation = translations.indexOf('ru') !== -1;

    return (
      <div className="translations">
        <div style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              {hasRussianTranslation && (
                <span>
                  Originally written in:{' '}
                  {'en' === lang ? (
                    <b>{codeToLanguage('en')}</b>
                  ) : (
                      <Link to={languageLink('en')}>English</Link>
                    )}
                  {' • '}
                  {'ru' === lang ? (
                    <b>Русский (авторский перевод)</b>
                  ) : (
                      <Link to={languageLink('ru')}>
                        Русский (авторский перевод)
                    </Link>
                    )}
                  <br />
                  <br />
                </span>
              )}
              <span>Translated by readers into: </span>
              {readerTranslations.map((l, i) => (
                <React.Fragment key={l}>
                  {l === lang ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                      <Link to={languageLink(l)}>{codeToLanguage(l)}</Link>
                    )}
                  {i === readerTranslations.length - 1 ? '' : ' • '}
                </React.Fragment>
              ))}
            </span>
          )}
          {lang !== 'en' && (
            <>
              <br />
              <br />
              {lang !== 'ru' && (
                <>
                  <Link to={languageLink('en')}>Read the original</Link>
                  {' • '}
                  <a href={editUrl} target="_blank" rel="noopener noreferrer">
                    Improve this translation
                  </a>
                  {' • '}
                </>
              )}
              <Link to={`/${lang}`}>View all translated posts</Link>{' '}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Translations
