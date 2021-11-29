import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
          <a href="/" className="mb-6 sm:mx-auto">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50">
              <svg
                className="w-16 h-16 text-blue-900"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </a>
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="text-6xl">404</span><br />
              Something's wrong.
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Remember the old 404 pages from the 90s that said something like "Something's gone wrong, but don't worry; our webmasters have been notified." But were the webmasters ever notified? I mean, were they really?
            </p>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
            >
              Back to life, back to reality
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
