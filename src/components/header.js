import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline"

import logo from "../images/logo.png"

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="bg-blue-900">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-md bg-blue-700">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">Singularity is now Apptainer!</span>
              <span className="hidden md:inline">You're in the right place! Singularity has joined the Linux Foundation and is now Apptainer!</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              to="/news/community-announcement-20211130"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-sm shadow-sm text-sm font-medium text-blue-900 bg-white hover:bg-blue-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Apptainer"
            title="Apptainer"
            className="inline-flex items-center mr-10"
          >
            <img src={logo} className="h-14" />
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/docs"
                aria-label="Documentation"
                title="Documentation"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                aria-label="Getting Help"
                title="Getting Help"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
              >
                Getting Help
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                aria-label="News"
                title="News"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/usecases"
                aria-label="Use Cases"
                title="Use Cases"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
              >
                Use Cases
              </Link>
            </li>
            <li>
              <Link
                to="/talks"
                aria-label="Talks"
                title="Talks"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
              >
                Talks
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              to="https://github.com/hpcng/Apptainer"
              aria-label="GitHub"
              title="GitHub"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </Link>
          </li>
          <li>
            <Link
              to="/getting-started"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-800 focus:shadow-outline focus:outline-none"
              aria-label="Get Started"
              title="Get Started"
            >
              Get Started
            </Link>
          </li>
        </ul>

        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-blue-50 focus:bg-blue-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-20">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      to="/"
                      aria-label="Apptainer"
                      title="Apptainer"
                      className="inline-flex items-center mr-10"
                    >
                      <img src={logo} className="w-10" />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Apptainer
                        </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/docs"
                        aria-label="Documentation"
                        title="Documentation"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
                      >
                        Documentation
                        </Link>
                    </li>
                    <li>
                      <Link
                        to="/help"
                        aria-label="Getting Help"
                        title="Getting Help"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
                      >
                        Getting Help
                        </Link>
                    </li>
                    <li>
                      <Link
                        to="/news"
                        aria-label="News"
                        title="News"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
                      >
                        News
                        </Link>
                    </li>
                    <li>
                      <Link
                        to="/usecases"
                        aria-label="Use Cases"
                        title="Use Cases"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
                      >
                        Use Cases
                        </Link>
                    </li>
                    <li>
                      <Link
                        to="/talks"
                        aria-label="Talks"
                        title="Talks"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-900"
                      >
                        Talks
                        </Link>
                    </li>
                    <li>
                      <Link
                        to="/getting-started"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                        aria-label="Get Started"
                        title="Get Started"
                      >
                        Get Started
                        </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;