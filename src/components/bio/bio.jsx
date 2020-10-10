import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { translate } from "../../utils/i18n"
import { DivWrapper, ImageWrapper } from "./bio.styled"

const GET_BIO = graphql`
  query GetBio {
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
          devTo
          instagram
          github
          linkedIn
        }
      }
    }
  }
`

function Bio({ currentLanguage }) {
  const data = useStaticQuery(GET_BIO)
  const { author, social } = data.site.siteMetadata

  return (
    <DivWrapper>
      <ImageWrapper
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
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
    </DivWrapper>
  )
}

Bio.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Bio
