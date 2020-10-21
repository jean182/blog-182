import React from "react"
import PropTypes from "prop-types"
import {
  FaDev,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"

import { Props } from "./social-networks.props"

function SocialNetworks({
  devTo,
  github,
  instagram,
  linkedIn,
  twitter,
}: Props) {
  return (
    <ol>
      <li>
        <a
          href={`https://dev.to/${devTo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="DevTo link"
        >
          <FaDev />
        </a>
      </li>
      <li>
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github link"
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram link"
        >
          <FaInstagram />
        </a>
      </li>
      <li>
        <a
          href={`https://www.linkedin.com/in/${linkedIn}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn link"
        >
          <FaLinkedinIn />
        </a>
      </li>
      <li>
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter link"
        >
          <FaTwitter />
        </a>
      </li>
    </ol>
  )
}

SocialNetworks.propTypes = {
  devTo: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  linkedIn: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
}

export default SocialNetworks
