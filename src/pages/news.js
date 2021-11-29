import React from "react"
import { graphql } from "gatsby"
import PostLink from "../components/post-link"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NewsPage = ({
                       data: {
                           allMarkdownRemark: { edges },
                       },
                   }) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
        .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
    return (
        <Layout>
            <Seo title="News" />
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                    <h2 className="max-w-xl font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
                        News
                    </h2>
                </div>
            </div>
            <div className="max-w-2xl mb-10 md:mx-auto lg:max-w-3xl md:mb-12">
                <div>{Posts}</div>
            </div>
        </Layout>
    )
}

export default NewsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`