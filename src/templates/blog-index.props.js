import PropTypes from "prop-types"

export const Props = {
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
          maybeAbsoluteLinks: PropTypes.arrayOf(PropTypes.PropTypes.string),
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
          maybeAbsoluteLinks: PropTypes.arrayOf(PropTypes.PropTypes.string),
        }),
      }),
      PropTypes.instanceOf(null),
    ]),
    translatedLinks: PropTypes.arrayOf(PropTypes.PropTypes.string),
    translations: PropTypes.arrayOf(PropTypes.PropTypes.string),
  }).isRequired,
}
