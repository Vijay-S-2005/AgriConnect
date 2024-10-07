'use client';
import * as React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Assets } from '../../public/assets/Assets';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import SideBar from './SideBar';
import UserLoginDialog from '../app/[locale]/Login/userLogin/page'; 
import FarmerLoginDialog from '../app/[locale]/Login/farmerLogin/page'; 
import RegisterDialog from '@/app/[locale]/register/userRegister/page';
import { useSession } from "next-auth/react";

// import 

const Header = () => {
  const t = useTranslations("Header");
  const localeActive = useLocale();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userLoginOpen, setUserLoginOpen] = React.useState(false);
  const [farmerLoginOpen, setFarmerLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const username = session?.user?.firstName || undefined;
  
  // State for Translate Menu (now Profile)
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);

  // State for Profile Menu (now Translation)
  const [translateAnchorEl, setTranslateAnchorEl] = React.useState(null);
  const translateMenuOpen = Boolean(translateAnchorEl);

  const router = useRouter();

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handlers for Profile Menu (previously Translate)
  const handleProfileClick = (event) => {
    if(!username)
      setProfileAnchorEl(event.currentTarget);
    else
      setRegisterOpen(true)
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
// user Login Dialog open 
  const handleUserLoginOpen = () => {
    setUserLoginOpen(true);
  };

  const handleFarmerLoginOpen = () => {
    setFarmerLoginOpen(true);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  // Close Login Dialog
  const handleUserLoginClose = () => {
    setUserLoginOpen(false);
  };

  const handleFarmerLoginClose = () => {
    setFarmerLoginOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  // Handlers for Translate Menu (previously Profile)
  const handleTranslateClick = (event) => {
    setTranslateAnchorEl(event.currentTarget);
  };

  const handleTranslateClose = (newLocale) => {
    setTranslateAnchorEl(null);
    const localeRegex = /^\/(en|ta)(\/|$)/;
    const newPath = pathname.replace(localeRegex, `/${newLocale}/`);
    router.replace(newPath);
  };

  const handleEnTranslateClose = () => handleTranslateClose("en");
  const handleTaTranslateClose = () => handleTranslateClose("ta");

  return (
    <header className="flex justify-between items-center p-4 bg-green-600 shadow-md relative">
      {/* <button
        onClick={toggleSideBar}
        className="absolute left-0 ml-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 z-50"
      >
        <Image src={Assets.sideBar} alt="Sidebar" width={25} height={25} />
      </button>
      <SideBar sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar} /> */}
{/* logo */}
      <div className="flex items-center space-x-4">
        {/* Agriconnect Logo */}
        <Image
          src={Assets.Agriconnect_logo}
          alt="Agriconnect Logo"
          width={120}
          height={100}
          className="border-2 border-gray-300"
        />
      </div>

      <div className="w-full max-w-lg mx-4">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition duration-300">
            {t("search")}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-white">
        
        {/* Profile section (previously Translation) */}
        <div className="flex items-center cursor-pointer">
          <Image
            src={session?.user ? Assets.profile : Assets.login}
            alt="Profile"
            width={24}
            height={24}
            className="rounded-full hover:opacity-80 transition duration-300"
          />
          <Button
            id="profile-button"
            aria-controls={profileMenuOpen ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen ? 'true' : undefined}
            onClick={handleProfileClick}
            className="text-white normal-case"
          >
            <p className="ml-2 hover:underline transition duration-300">
              {session?.user ? t("profile") : t("login")}
            </p>
          </Button>

          <Menu
            id="profile-menu"
            anchorEl={profileAnchorEl}
            open={profileMenuOpen}
            onClose={handleProfileClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            {/* User */}
            <MenuItem>
              <div className="flex justify-between w-full">
                <div className="space-x-2">
                <span>User .. </span>
                  <Button onClick={handleUserLoginOpen}>LOGIN</Button> | <Button onClick={handleRegisterOpen}>REGISTER</Button>
                </div>
              </div>
            </MenuItem>

            {/* Farmer */}
            <MenuItem>
              <div className="flex justify-between w-full">
                
                <div className="space-x-2">
                <span>Farmer</span>
                  <Button onClick={handleFarmerLoginOpen}>LOGIN</Button> | <Button onClick={handleRegisterOpen}>REGISTER</Button>
                </div>
              </div>
            </MenuItem>

            {/* Admin */}
            <MenuItem>
              <div className="flex justify-between w-full">
              <div className="space-x-2">
                <span>Admin </span>
                <Button onClick={handleUserLoginOpen}>LOGIN</Button>
              </div>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Translation section (previously Profile) */}
        <div className="flex items-center cursor-pointer">
          <Image
            src={Assets.languageIcon}
            alt="Language Icon"
            width={24}
            height={24}
            className="hover:opacity-80 transition duration-300"
          />
          <Button
            id="translate-button"
            aria-controls={translateMenuOpen ? 'translate-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={translateMenuOpen ? 'true' : undefined}
            onClick={handleTranslateClick}
            className="text-white normal-case"
          >
            <p className="ml-2 hover:underline transition duration-300">
              {t("translate")}
            </p>
          </Button>

          <Menu
            id="translate-menu"
            anchorEl={translateAnchorEl}
            open={translateMenuOpen}
            onClose={handleEnTranslateClose}
            MenuListProps={{
              'aria-labelledby': 'translate-button',
            }}
          >
            <MenuItem onClick={handleEnTranslateClose}>English</MenuItem>
            <MenuItem onClick={handleTaTranslateClose}>தமிழ்</MenuItem>
          </Menu>
        </div>

        <div className="flex items-center cursor-pointer">
          <Image
            src={Assets.Cart}
            alt="Cart"
            width={24}
            height={24}
            className="hover:opacity-80 transition duration-300"
          />
          <p className="ml-2 hover:underline transition duration-300">
          {t("cart")}
          </p>
        </div>
      </div>

      <UserLoginDialog open={userLoginOpen} onClose={handleUserLoginClose} />
      <FarmerLoginDialog open={farmerLoginOpen} onClose={handleFarmerLoginClose} />
      <RegisterDialog Open={registerOpen} onClose={handleRegisterClose} />  
    </header>
  );
};

export default Header;
