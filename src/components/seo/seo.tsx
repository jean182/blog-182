import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

import { useDarkTheme } from "@src/utils/hooks"
import { DARK_THEME_PRIMARY, LIGHT_THEME_PRIMARY } from "@utils/constants"

type MetaTag = {
  name?: string
  property?: string
  content: string
}

type GetSeoQuery = {
  avatar: {
    publicURL: string
  }
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      siteUrl: string
      social: {
        devTo?: string
        instagram?: string
        github?: string
        linkedIn?: string
        twitter?: string
      }
    }
  }
}

const GET_SEO = graphql`
  query GetSeo {
    avatar: file(absolutePath: { regex: "/blog-icon.png/" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        social {
          devTo
          instagram
          github
          linkedIn
          twitter
        }
      }
    }
  }
`

function SEO({
  description,
  isBlogPost = false,
  lang,
  meta,
  keywords,
  pathname,
  title,
}: {
  description?: string
  isBlogPost?: boolean
  lang?: string
  meta?: MetaTag[]
  keywords?: string[]
  title: string
  pathname: string
}) {
  const data = useStaticQuery<GetSeoQuery>(GET_SEO)
  const [theme] = useDarkTheme()
  const { site } = data
  const canonical = site.siteMetadata.siteUrl + pathname

  const metaDescription = description || site.siteMetadata.description
  const pic = site.siteMetadata.siteUrl + data.avatar.publicURL
  const twitterUser = "@".concat(site.siteMetadata.social.twitter)
  const finalMeta: MetaTag[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: isBlogPost ? `article` : `website`,
    },
    {
      name: "twitter:site",
      content: twitterUser,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: twitterUser,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      property: `og:url`,
      content: canonical,
    },
    {
      property: `og:image`,
      content: pic,
    },
    {
      property: `og:image:width`,
      content: `396`,
    },
    {
      property: `og:image:height`,
      content: `398`,
    },
    {
      name: `twitter:image`,
      content: pic,
    },
  ].concat(
    keywords.length > 0
      ? {
          name: `keywords`,
          content: keywords.join(`, `),
        }
      : []
  )
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <link rel="canonical" href={canonical} />
      <meta
        name="theme-color"
        content={theme === "dark" ? DARK_THEME_PRIMARY : LIGHT_THEME_PRIMARY}
      />
      {finalMeta.map(m => (
        <meta
          key={`${m.name ?? m.property}-${m.content}`}
          {...(m.name ? { name: m.name } : {})}
          {...(m.property ? { property: m.property } : {})}
          content={m.content}
        />
      ))}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
