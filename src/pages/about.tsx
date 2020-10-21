import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "@components/layout/layout"
import { PageLayout } from "@components/layout/layout.styled"
import { AboutStyled, TitleContainer } from "@components/shared/about.styled"
import { rhythm } from "@utils/typography"

const About = ({ data, pageContext }) => {
  const { author } = data.site.siteMetadata
  return (
    <Layout currentLanguage={pageContext.langKey}>
      <PageLayout>
        <AboutStyled>
          <TitleContainer>
            <h1>Me myself and Irene</h1>
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
          </TitleContainer>
          <p>
            Hi my name is <strong>{author}</strong>, I&apos;m studying software
            engineering and I&apos;m a react developer.
          </p>
          <p>
            Currently I&apos;m working with react only but I do have experience
            with ruby on rails applications, this was my first tech stack so I
            have a lot of love for it.
          </p>
          <p>
            I did this blog in order to share the knowledge I&apos;m getting
            from working and playing with web technologies, but I also will be
            using this to share some of my hobbies outside work, most of them
            should be also tech stuff but bear in mind it can be something
            completely different.
          </p>
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
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    langKey: PropTypes.string,
  }).isRequired,
}

export default About
