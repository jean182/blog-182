import React from "react"
import PropTypes from "prop-types"
import {
  FaDev,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"
import { DivWrapper, LinkWrapper } from "./social-networks.styled"

function SocialNetworks(props) {
  const { devTo, iconSize, instagram, linkedIn, github, twitter } = props
  return (
    <DivWrapper>
      <LinkWrapper
        href={`https://dev.to/${devTo}`}
        target="_blank"
        rel="noopener noreferrer"
        iconSize={iconSize}
      >
        <FaDev />
      </LinkWrapper>
      <LinkWrapper
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
        iconSize={iconSize}
      >
        <FaGithub />
      </LinkWrapper>
      <LinkWrapper
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        iconSize={iconSize}
      >
        <FaInstagram />
      </LinkWrapper>
      <LinkWrapper
        href={`https://www.linkedin.com/in/${linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
        iconSize={iconSize}
      >
        <FaLinkedinIn />
      </LinkWrapper>
      <LinkWrapper
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noopener noreferrer"
        iconSize={iconSize}
      >
        <FaTwitter />
      </LinkWrapper>
    </DivWrapper>
  )
}

SocialNetworks.propTypes = {
  devTo: PropTypes.string,
  iconSize: PropTypes.number.isRequired,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
  github: PropTypes.string,
  twitter: PropTypes.string,
}

export default SocialNetworks
