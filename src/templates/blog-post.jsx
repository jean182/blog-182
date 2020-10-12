import React from "react"
import get from "lodash/get"
import { graphql } from "gatsby"

import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import Translations from "../components/translations/translations"
import Newsletter from "../components/newsletter/newsletter"
import { Props } from "./blog-post.props"
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from "../utils/i18n"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import {
  DateAndTime,
  LineBreak,
  PostTitle,
  Paginator,
} from "./blog-post.styled"
import { RegularGatsbyLink } from "../components/shared/links.styled"
import { PageLayout } from "../components/layout/layout.styled"
import "../styles/blog.css"
import { GITHUB_REPO_NAME, GITHUB_USERNAME } from "../utils/constants"

function BlogPostTemplate({ data, pageContext }) {
  const post = data.markdownRemark
  const siteTitle = get(data, "site.siteMetadata.title")
  const { previous, next, slug, translatedLinks } = pageContext
  let { translations } = pageContext
  const lang = post.fields.langKey || ""

  // Replace original links with translated when available.
  let { html } = post
  translatedLinks.forEach(link => {
    // jeez
    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }
    const translatedLink = `/${lang}${link}`
    html = html.replace(
      new RegExp(`"${escapeRegExp(link)}"`, "g"),
      `"${translatedLink}"`
    )
  })

  translations = translations.slice()
  translations.sort((a, b) => {
    return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1
  })

  loadFontsForCode(lang)
  // TODO: this curried function is annoying
  const languageLink = createLanguageLink(slug, lang)
  const enSlug = languageLink("en")
  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${enSlug.slice(
    1,
    enSlug.length - 1
  )}/index${lang === "en" ? "" : `.${lang}`}.md`

  return (
    <Layout currentLanguage={lang} title={siteTitle}>
      <PageLayout>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          lang={lang}
        />
        <div>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <DateAndTime>
            {formatPostDate(post.frontmatter.date, lang)} -{" "}
            {formatReadingTime(post.fields.readingTime.minutes, lang)}
          </DateAndTime>
          {translations.length > 0 && (
            <Translations
              editUrl={editUrl}
              translations={translations}
              languageLink={languageLink}
              lang={lang}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <LineBreak />
        </div>
        <Paginator>
          <li>
            {previous && (
              <RegularGatsbyLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </RegularGatsbyLink>
            )}
          </li>
          <li>
            {next && (
              <RegularGatsbyLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </RegularGatsbyLink>
            )}
          </li>
        </Paginator>
        <Bio currentLanguage={lang} />
        <Newsletter currentLanguage={lang} />
      </PageLayout>
    </Layout>
  )
}

BlogPostTemplate.propTypes = Props

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        readingTime {
          minutes
        }
        slug
        langKey
      }
    }
  }
`
