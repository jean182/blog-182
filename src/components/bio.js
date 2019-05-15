import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import i18n from "../locales/i18n"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(1.5),
              marginTop: rhythm(1),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              {i18n.t("bio.main")}
              {` `}
              <strong>
                {` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://instagram.com/${social.instagram}`}
                >
                  {author}
                </a>
              </strong>
              <br />
              {i18n.t("bio.secondary")}
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          instagram
        }
      }
    }
  }
`

export default Bio
