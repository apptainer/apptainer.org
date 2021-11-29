import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const contacts = [
    {
        name: 'Project Leads',
        email: 'singularity-leads@hpcng.org',
    },
    {
        name: 'Web',
        email: 'singularity-web@hpcng.org',
    },
    {
        name: 'Security',
        email: 'singularity-security@hpcng.org',
    },
    // More teams...
]

const ContactPage = () => (
    <Layout>
        <Seo title="Contact Us" />
        <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                <h2 className="max-w-xl font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
                    Contact Us
                </h2>
            </div>
        </div>
        <div className="max-w-3xl mb-10 md:mx-auto lg:max-w-4xl md:mb-12">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Team
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Email</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact) => (
                                    <tr key={contact.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                                    <a href={`mailto:${contact.email}`}><div className="text-sm text-gray-500">{contact.email}</div></a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href={`mailto:${contact.email}`} className="text-blue-900 hover:text-blue-700">
                                                Send Email
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-2xl mb-10 mt-20 md:mx-auto sm:text-center lg:max-w-3xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Looking for the mailing list?
            </h2>

            <Link
                to="https://groups.google.com/a/lbl.gov/g/singularity"
                class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-blue-800 focus:shadow-outline focus:outline-none"
                aria-label="Join Mailing List"
                title="Join Mailing List"
            >
                Join Mailing List
            </Link>

        </div>
    </Layout>
)

export default ContactPage
