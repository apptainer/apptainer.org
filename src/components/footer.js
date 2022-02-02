import * as React from "react"
import { Link } from "gatsby"

const Footer = () => {
    const navigation = {
        main: [
          { name: 'Home', href: '/' },
          { name: 'Security', href: '/security-policy' },
          { name: 'News', href: '/news' },
          { name: 'Getting Help', href: '/help' },
          { name: 'Contact', href: '/contact' },
          { name: 'Technical Charter', href: '/technical-charter' },
        ],
      }


    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                {navigation.main.map((item) => (
                    <div key={item.name} className="px-5 py-2">
                    <Link to={item.href} className="text-base font-medium tracking-wide text-gray-700 hover:text-blue-900">
                        {item.name}
                    </Link>
                    </div>
                ))}
                </nav>
                <p className="mt-8 text-center text-base text-gray-500">Copyright &copy; Contributors to the Apptainer project, established as Apptainer a Series of LF Projects LLC.</p>
                <p className="text-center text-base text-gray-500">For website terms of use, trademark policy, privacy policy and other project policies please see <a className="text-blue-900" href="https://lfprojects.org/policies">https://lfprojects.org/policies</a>.</p>
            </div>
        </footer>
    );
}

export default Footer;
