import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
    <div>
        <ul className="mb-2">
            <li
                className="relative bg-gray-100 rounded-lg py-5 px-4 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
            >
                <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                        <Link to={post.frontmatter.slug} className="block focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900 truncate">{post.frontmatter.title}</p>
                        </Link>
                    </div>
                    <time dateTime={post.frontmatter.date} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        {post.frontmatter.date}
                    </time>
                </div>
                <div className="mt-1">
                </div>
            </li>
        </ul>
    </div>
)

export default PostLink