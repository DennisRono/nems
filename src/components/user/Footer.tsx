import Link from 'next/link'
import {
  Facebook,
  Twitter,
  LinkedinIcon as LinkedIn,
  Instagram,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CareerHub</h3>
            <p className="text-gray-400">
              Connecting talent with opportunities
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/browse-jobs" className="hover:text-blue-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/career-advice" className="hover:text-blue-400">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="/resume-tips" className="hover:text-blue-400">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link href="/job-alerts" className="hover:text-blue-400">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="hover:text-blue-400">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/browse-resumes" className="hover:text-blue-400">
                  Browse Resumes
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="hover:text-blue-400"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <LinkedIn size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CareerHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
