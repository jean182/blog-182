import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { translate } from "../utils/i18n"

import { rhythm } from "../utils/typography"

function Bio({ currentLanguage }) {
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
              {translate(currentLanguage, "bio.main")}
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
              {translate(currentLanguage, "bio.secondary")}
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

Bio.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Bio
