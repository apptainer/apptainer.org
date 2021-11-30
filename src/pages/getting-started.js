import * as React from "react"
import { Link } from "gatsby"

import { NewspaperIcon, DownloadIcon, SupportIcon } from '@heroicons/react/outline'

import Layout from "../components/layout"
import Seo from "../components/seo"

const gettingStartedLinks = [
    {
        name: 'GitHub Project',
        href: 'https://github.com/apptainer/singularity',
        description:
            'Grab the latest stable release of Apptainer, submit issues, and contribute to the project at the official GitHub repository.',
        icon: DownloadIcon,
        button: 'GitHub'
    },
    {
        name: 'Quick Start Guide',
        href: 'https://apptainer.org/user-docs/master/quick_start.html',
        description:
            'Check out the quick start documentation to get Apptainer installed and set up in a hurry.',
        icon: NewspaperIcon,
        button: 'Get Started'
    },
    {
        name: 'Supported Binary Packages',
        href: 'https://repo.ctrliq.com',
        description:
            'CIQ is freely providing binary packages for non-production use; you can also find them in EPEL for RHEL dervitives.',
        icon: SupportIcon,
        button: 'Repos'
    },
]

const GettingStartedPage = () => (
    <Layout>
        <Seo title="Getting Started" />
        <div>
            <div className="relative pb-32">
                <div className="px-4 pt-8 pb-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-10 lg:pb-20">
                    <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                        <h2 className="mb-6 max-w-xl font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
                            Getting Started
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            Until the release of Apptainer-1.0, these links will point to the current Singularity repo and releases. Stay tuned for the official first release of Apptainer!
                        </p>
                    </div>
                </div>
            </div>

            <section
                className="-mt-32 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
                aria-labelledby="contact-heading"
            >
                <h2 className="sr-only" id="contact-heading">
                    Contact us
                </h2>
                <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
                    {gettingStartedLinks.map((link) => (
                        <div key={link.name} className="flex mt-10 mb-10 flex-col bg-white rounded-2xl shadow-xl border border-gray-200">
                            <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                                <div className="absolute top-0 p-5 inline-block bg-blue-900 rounded-xl shadow-lg transform -translate-y-1/2">
                                    <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                                <p className="mt-4 text-base text-gray-700">{link.description}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                                <Link to={link.href} className="text-base font-medium text-blue-900 hover:text-blue-700">
                                    {link.button}<span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10 mt-20 md:mx-auto sm:text-center lg:max-w-3xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        Looking for help?
                    </h2>

                    <Link
                        to="/help"
                        class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-800 focus:shadow-outline focus:outline-none"
                        aria-label="View Support Options"
                        title="View Support Options"
                    >
                        Get Help
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
)

export default GettingStartedPage
