import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className='text-gray-600 hover:text-blue-500'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register-business" className="text-gray-600 hover:text-blue-500">
                  Register Business
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blue-500">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/report" className="text-gray-600 hover:text-blue-500">
                  Report a Business
                </Link>
              </li>
              <li>
                <a href="mailto:garaven.camilo@gmail.com" className="text-gray-600 hover:text-blue-500">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook/>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400">
                <Twitter/>
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram/>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Business Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};