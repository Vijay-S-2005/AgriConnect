'use client';
import * as React from 'react';
import Image from 'next/image';
import { Assets } from '../../public/assets/Assets';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <footer className="bg-[#1c1c1c] text-white p-10">
      {/* Container for the entire footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left section with logo, text, and social icons */}
        <div>
          <Image
            src={Assets.Agriconnect_logo}
            alt="Agriconnect Logo"
            width={100}
            height={100}
          />
          <p className="mt-4 text-sm">
            Empowering Farmers. Connecting Communities. Revolutionizing Agriculture.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social media icons */}
            <Image
              src={Assets.Facebook}
              alt="Facebook"
              width={24}
              height={24}
              className="cursor-pointer hover:opacity-80 transition duration-300"
            />
            <Image
              src={Assets.x}
              alt="Twitter"
              width={24}
              height={24}
              className="cursor-pointer hover:opacity-80 transition duration-300"
            />

            <Image
              src={Assets.Instagram}
              alt="Instagram"
              width={24}
              height={24}
              className="cursor-pointer hover:opacity-80 transition duration-300"
            />
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:underline" onClick={() => handleNavigation('/about')}>About</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleNavigation('/services')}>Services</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleNavigation('/projects')}>Our Projects</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleNavigation('/meet-the-farmers')}>Meet the Farmers</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleNavigation('/news')}>Latest News</li>
          </ul>
        </div>

        {/* News Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">News</h3>
          <div className="flex items-center space-x-4 mb-4">
            {/* Placeholder for image */}
            <div className="w-16 h-16 bg-gray-300"></div>
            <div>
              <p className="text-sm font-medium">Bringing Food Production Back to Cities</p>
              <span className="text-xs text-gray-400">July 5, 2024</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Placeholder for image */}
            <div className="w-16 h-16 bg-gray-300"></div>
            <div>
              <p className="text-sm font-medium">The Future of Farming: Smart Irrigation Solutions</p>
              <span className="text-xs text-gray-400">Oct 3, 2024</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">📞 9876543210</p>
          <p className="text-sm">✉️ needhelp@agriconnect.com</p>
          <p className="text-sm">📍 Chennai, Tamil Nadu, 600044</p>

          {/* Email subscription field */}
          {/* <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-2 w-full text-gray-900 rounded"
            />
            <button className="mt-2 w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">
              Subscribe
            </button>
          </div> */}
        </div>
      </div>

      {/* Footer bottom area with copyright and links */}
      <div className="mt-8 flex justify-between items-center text-sm text-gray-400">
        <p>© All Copyright 2024 by Agriconnect</p>
        <div className="flex space-x-4">
          <p className="cursor-pointer hover:underline" onClick={() => handleNavigation('/terms')}>Terms of Use</p>
          <p className="cursor-pointer hover:underline" onClick={() => handleNavigation('/privacy')}>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
