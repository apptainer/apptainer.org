import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const docsVersions = [
    { version: 'master' },
    { version: '3.8' },
    { version: '3.7' },
    { version: '3.6' },
    { version: '3.5' },
    { version: '3.4' },
    { version: '3.3' },
    { version: '3.2' },
    { version: '3.1' },
    { version: '3.0' },
    { version: '2.6' },
    { version: '2.5' },
]

const DocsPage = () => (
    <Layout>
        <Seo title="Documentation" />
        <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                <h2 className="max-w-xl font-sans text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
                    Documentation
                </h2>
            </div>
        </div>
        <div className="max-w-lg mb-10 md:mx-auto sm:text-center lg:max-w-xl md:mb-12">
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
                                            Version
                                    </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">User Docs</span>
                                        </th>

                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Admin Docs</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docsVersions.map((docsVersion, docsVersionIdx) => (
                                        <tr key={docsVersion.version} className={docsVersionIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">{docsVersion.version}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/user-docs/${docsVersion.version}/`} className="text-blue-900 hover:text-blue-700">
                                                    User Documentation
                                            </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/admin-docs/${docsVersion.version}/`} className="text-blue-900 hover:text-blue-700">
                                                    Admin Documentation
                                            </Link>
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
    </Layout>
)

export default DocsPage
