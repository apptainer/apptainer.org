import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function Template({
    data,
                                 }) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
        <Seo title={frontmatter.title} />
        <div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-center">
                    {frontmatter.date}
                </p>
                <div className="max-w-xl mb-5 md:mx-auto lg:max-w-2xl">
                    <div className="mb-10 sm:text-center">
                        <h1
                            className="inline-block max-w-xl font-sans text-3xl font-extrabold leading-none tracking-tight text-black sm:text-4xl"
                        >
                            {frontmatter.title}
                        </h1>
                    </div>
                    <div className="text-base text-black prose"
                       dangerouslySetInnerHTML={{__html: html }}
                    />
                </div>
            </div>
        </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                slug
                title
            }
        }
    }
`