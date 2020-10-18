import PropTypes from "prop-types"
import { Node } from "./shared-types"

export interface Props {
  data: {
    allMarkdownRemark: {
      edges: Node[]
    }
    site: {
      siteMetadata: {
        author: string
        title: string
      }
    }
  }
  pageContext: {
    langKey: string
  }
}

export const BlogIndexPropTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.oneOfType([
      PropTypes.shape({
        fields: PropTypes.shape({
          directoryName: PropTypes.string,
          langKey: PropTypes.string,
          maybeAbsoluteLinks: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      PropTypes.instanceOf(null),
    ]),
    slug: PropTypes.string,
    previous: PropTypes.oneOfType([
      PropTypes.shape({
        fields: PropTypes.shape({
          directoryName: PropTypes.string,
          langKey: PropTypes.string,
          maybeAbsoluteLinks: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      PropTypes.instanceOf(null),
    ]),
    translatedLinks: PropTypes.arrayOf(PropTypes.string),
    translations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
