import React from "react"
import PropTypes from "prop-types"
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi"

const SocialNetworks = props => {
  const { iconSize, instagram, linkedIn, github } = props
  return (
    <div
      style={{
        textDecoration: "inherit",
      }}
    >
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          boxShadow: "none",
          marginRight: `0.5rem`,
        }}
      >
        <FiInstagram />
      </a>
      <a
        href={`https://www.linkedin.com/in/${linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          boxShadow: "none",
          marginRight: `0.5rem`,
        }}
      >
        <FiLinkedin />
      </a>
      <a
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: `${iconSize}rem`,
          color: "inherit",
          boxShadow: "none",
          marginRight: `0.5rem`,
        }}
      >
        <FiGithub />
      </a>
    </div>
  )
}

SocialNetworks.propTypes = {
  iconSize: PropTypes.number.isRequired,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
  github: PropTypes.string,
}

export default SocialNetworks
