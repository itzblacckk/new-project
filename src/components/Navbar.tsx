import React from 'react';
import { Link } from 'react-router-dom';
import {  Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Mountain Mirage" className="h-12 w-12" />
              <span className="ml-2 text-xl font-bold text-gray-800">Mountain Mirage</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/tours" className="text-gray-600 hover:text-blue-600">Tours</Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
            <Link to="/events" className="text-gray-600 hover:text-blue-600">Events</Link>
            <Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/tours" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Tours</Link>
            <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Blog</Link>
            <Link to="/events" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Events</Link>
            <Link to="/careers" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Careers</Link>
            <Link to="/admin" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
}