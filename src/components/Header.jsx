"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Assets } from "../../public/assets/Assets";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import UserLoginDialog from "../app/[locale]/Login/userLogin/page";
import FarmerLoginDialog from "../app/[locale]/Login/farmerLogin/page";
import RegisterDialog from "@/app/[locale]/register/userRegister/page";
import { useSession } from "next-auth/react";
import { Autocomplete, TextField } from "@mui/material";

const Header = () => {
  const t = useTranslations("Header");
  const localeActive = useLocale();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userLoginOpen, setUserLoginOpen] = React.useState(false);
  const [farmerLoginOpen, setFarmerLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const username = session?.user?.firstName || undefined;

  // State for Translate Menu (now Profile)
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const profileMenuOpen = Boolean(profileAnchorEl);

  // State for Profile Menu (now Translation)
  const [translateAnchorEl, setTranslateAnchorEl] = React.useState(null);
  const translateMenuOpen = Boolean(translateAnchorEl);
  // for search and suggesion
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.length === 0) {
        setFilteredSuggestions([]); // Clear suggestions if input is empty
        return;
      }

      setError(""); // Reset error state

      try {
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prefix: query }), // Send the query to the API
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setFilteredSuggestions(data); // Set the received product names
        } else {
          setError(data.error || "Unexpected error occurred");
        }
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchProducts();
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(
        `/${localeActive}/displayProduct?search=${encodeURIComponent(
          query.trim()
        )}`
      );
    }
  };

  const handleInputChange = (event, value) => {
    setQuery(value); // Update query based on user input
  };

  // for therla
  const router = useRouter();

  const handleCart = () => {
    router.push(`/${localeActive}/cart`);
  };

  const handleFarmerLogin = () => {
    console.log("hit");
    router.push(`/${localeActive}/farmer/home`);
  };

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handlers for Profile Menu (previously Translate)
  const handleProfileClick = (event) => {
    if (!username) setProfileAnchorEl(event.currentTarget);
    else setRegisterOpen(true);
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
    <header className="flex justify-between items-center p-2 bg-green-600 shadow-md relative">
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
          height={50}
          className="border-2 border-gray-300"
        />
      </div>

      {/* <div className="flex items-center space-x-4">
        <div className="p-4 text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : location ? (
            <p className="text-lg">
              {location.district} {location.pincode}
            </p>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      </div> */}

      {/* search bar */}
      <div className="w-full max-w-lg mx-4 relative">
        <Autocomplete
          freeSolo
          options={filteredSuggestions}
          inputValue={query}
          onInputChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              placeholder="Search..."
              error={!!error}
              helperText={error || ""}
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: {
                  backgroundColor: "white", // Sets the background to white
                },
                endAdornment: (
                  <button
                    onClick={handleSearch}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Search
                  </button>
                ),
              }}
            />
          )}
        />
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
            aria-controls={profileMenuOpen ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen ? "true" : undefined}
            onClick={handleProfileClick}
            className="text-white normal-case"
          >
            <p className="ml-2 hover:underline transition duration-300">
              {session?.user ? session.user.name : t("login")}
            </p>
          </Button>

          <Menu
            id="profile-menu"
            anchorEl={profileAnchorEl}
            open={profileMenuOpen}
            onClose={handleProfileClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
          >
            {/* User */}
            <MenuItem>
              <div className="flex justify-between w-full">
                <div className="space-x-2">
                  <span>User </span>
                  <Button onClick={handleUserLoginOpen}>LOGIN</Button> |{" "}
                  <Button onClick={handleRegisterOpen}>REGISTER</Button>
                </div>
              </div>
            </MenuItem>

            {/* Farmer */}
            {/* <MenuItem>
              <div className="flex justify-between w-full">
                
                <div className="space-x-2">
                <span>Farmer</span>
                  <Button onClick={handleFarmerLoginOpen}>LOGIN</Button> | <Button onClick={handleRegisterOpen}>REGISTER</Button>
                </div>
              </div>
            </MenuItem> */}

            {/* Admin */}
            {/* <MenuItem>
              <div className="flex justify-between w-full">
                <div className="space-x-12">
                  <span>Admin </span>
                  <Button onClick={handleUserLoginOpen}>LOGIN</Button>
                </div>
              </div>
            </MenuItem> */}
          </Menu>
        </div>

        {/* Translation section (previously Profile) */}
        <div className="flex items-center cursor-pointer px-4">
          <Image
            src={Assets.languageIcon}
            alt="Language Icon"
            width={24}
            height={24}
            className="hover:opacity-80 transition duration-300"
          />
          <Button
            id="translate-button"
            aria-controls={translateMenuOpen ? "translate-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={translateMenuOpen ? "true" : undefined}
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
              "aria-labelledby": "translate-button",
            }}
          >
            <MenuItem onClick={handleEnTranslateClose}>English</MenuItem>
            <MenuItem onClick={handleTaTranslateClose}>தமிழ்</MenuItem>
          </Menu>
        </div>

        <div className="flex items-center cursor-pointer px-4">
          <Image
            src={Assets.shopping}
            onClick={handleFarmerLogin}
            alt="shoping"
            width={24}
            height={24}
            className="hover:opacity-80 transition duration-300"
          />
          <p
            className="ml-2 hover:underline transition duration-300"
            onClick={handleFarmerLogin}
          >
            Become a Farmer
          </p>
        </div>

        <div className="flex items-center cursor-pointer px-4">
          <Image
            onClick={handleCart}
            src={Assets.Cart}
            alt="Cart"
            width={24}
            height={24}
            className="hover:opacity-80 transition duration-300"
          />
          <p
            onClick={handleCart}
            className="ml-2 hover:underline transition duration-300"
          >
            {t("cart")}
          </p>
        </div>
      </div>

      <UserLoginDialog open={userLoginOpen} onClose={handleUserLoginClose} />
      <FarmerLoginDialog
        open={farmerLoginOpen}
        onClose={handleFarmerLoginClose}
      />
      <RegisterDialog Open={registerOpen} onClose={handleRegisterClose} />
    </header>
  );
};

export default Header;
