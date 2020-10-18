export interface Node {
  node: {
    excerpt: string
    fields: {
      langKey: string
      readingTime: {
        minutes: number
      }
      slug: string
    }
    frontmatter: {
      date: string
      description: string
      title: string
    }
  }
}
