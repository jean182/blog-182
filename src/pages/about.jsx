import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout/layout"
import { rhythm } from "../utils/typography"
import SocialNetworks from "../components/social-networks/social-networks"
import { PageLayout } from "../components/layout/layout.styled"
import { AboutStyled } from "../components/shared/about.styled"

const About = ({ data, pageContext }) => {
  const { author, social } = data.site.siteMetadata
  return (
    <Layout title="About" currentLanguage={pageContext.langKey}>
      <PageLayout>
        <AboutStyled>
          <h1>About</h1>
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
            Hi my name is <strong>{author}</strong>, I&apos;m studying software
            engineering and I&apos;m a rails developer
          </p>
          <p>
            This is just for fun, I&apos;ll try to make a nice UI that goes
            along with the blog and myself
          </p>
          <h3>Follow me on my social networks</h3>
          <SocialNetworks
            devTo={social.devTo}
            instagram={social.instagram}
            linkedIn={social.linkedIn}
            github={social.github}
            twitter={social.twitter}
          />
        </AboutStyled>
      </PageLayout>
    </Layout>
  )
}

export const aboutQuery = graphql`
  query AboutQuery {
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
          twitter
        }
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.oneOfType([PropTypes.object]),
      }),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        social: PropTypes.shape({
          devTo: PropTypes.string,
          instagram: PropTypes.string,
          github: PropTypes.string,
          linkedIn: PropTypes.string,
          twitter: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    langKey: PropTypes.string,
  }).isRequired,
}

export default About
