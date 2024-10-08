import { useState } from 'react';

export default function Navbar() {
  return (
    <nav className="bg-[#86efac] shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center space-x-12">
        {/* Nav Links */}
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">Home</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">About</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">Order</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">Services</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">News</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">Shop</a>
        </div>
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-700 transition-colors text-gray-800">Contact</a>
        </div>
      </div>
    </nav>
  );
}
