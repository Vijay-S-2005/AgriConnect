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
    <footer className="flex flex-col md:flex-row justify-between items-center p-4 bg-green-600 text-white shadow-md mt-auto">
      <div className="flex items-center">
        <Image
          src={Assets.Agriconnect_logo}
          alt="Agriconnect Logo"
          width={80}
          height={80}
        />
        <p className="ml-4 text-sm">
          © 2024 Agriconnect. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6">
        <p className="cursor-pointer hover:underline transition duration-300" onClick={() => handleNavigation('/')}>
          Home
        </p>

        <p className="cursor-pointer hover:underline transition duration-300" onClick={() => handleNavigation('/contact')}>
          Contact Us
        </p>
        <p className="cursor-pointer hover:underline transition duration-300" onClick={() => handleNavigation('/privacy')}>
          Privacy Policy
        </p>
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <Image
          src={Assets.Facebook}
          alt="Facebook"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 transition duration-300"
        />
        <Image
          src={Assets.Instagram}
          alt="Twitter"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 transition duration-300"
        />
        <Image
          src={Assets.WhatsApp}
          alt="Instagram"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 transition duration-300"
        />
      </div>
    </footer>
  );
};

export default Footer;
