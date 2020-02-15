import React from "react"
import Layout from "../components/layout/layout"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import SocialNetworks from "../components/social-networks/social-networks"

const About = props => {
  const { data } = props
  const { author, social } = data.site.siteMetadata
  return (
    <div>
      <Layout location={props.location} title="About">
        <h1>About</h1>
        <div
          style={{
            display: `flex`,
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
            Hi my name is <strong>{author}</strong>, I'm studying software
            engineering and I'm a rails developer
          </p>
        </div>
        <p>
          This is just for fun, I'll try to make a nice UI that goes along with
          the blog and myself
        </p>
        <SocialNetworks
          iconSize={2}
          instagram={social.instagram}
          linkedIn={social.linkedIn}
          github={social.github}
        />
      </Layout>
    </div>
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
          instagram
          github
          linkedIn
        }
      }
    }
  }
`

export default About
