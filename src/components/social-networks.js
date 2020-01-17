import React from "react"
import PropTypes from "prop-types"
import {
  FaDev,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"

const SocialNetworks = props => {
  const { devTo, iconSize, instagram, linkedIn, github, twitter } = props
  return (
    <div
      style={{
        textDecoration: "inherit",
      }}
    >
      <a
        href={`https://dev.to/${devTo}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          marginRight: `0.5rem`,
        }}
      >
        <FaDev />
      </a>
      <a
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          marginRight: `0.5rem`,
        }}
      >
        <FaGithub />
      </a>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          marginRight: `0.5rem`,
        }}
      >
        <FaInstagram />
      </a>
      <a
        href={`https://www.linkedin.com/in/${linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          marginRight: `0.5rem`,
        }}
      >
        <FaLinkedinIn />
      </a>
      <a
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          marginRight: `0.5rem`,
        }}
      >
        <FaTwitter />
      </a>
    </div>
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
