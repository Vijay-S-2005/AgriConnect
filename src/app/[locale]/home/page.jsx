"use client";
import { useRef, useState } from "react";
import { Assets } from "../../../../public/assets/Assets";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";

export default function HomePage() {
  const newsSectionRef = useRef(null);

  const scrollToNewsSection = () => {
    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-[100vw] h-[80vh] overflow-hidden">
        {" "}
        {/* Adjusted height to 80vh */}
        {/* Full-screen background image but constrained to viewport */}
        <Image
          src={Assets.home01} // Replace with your image asset
          alt="Agriconnect background"
          layout="fill" // Ensures the image takes the entire width and height of the container
          objectFit="cover" // Ensures the image covers the container while maintaining aspect ratio
          quality={100} // High-quality rendering
          className="max-w-full max-h-full" // Ensures no overflow beyond desktop size
        />
        {/* Overlay content: Text and Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          {/* Welcome Text */}
          <h1 className="text-4xl font-bold md:text-6xl leading-tight mb-4">
            Welcome to <span className="text-[#f8f9fa]">AgriConnect</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-6">
            Empowering Farmers. Connecting Communities. Revolutionizing
            Agriculture.
          </p>

          {/* Button */}
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
            Discover More
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-16">
        {/* Our Services Section */}
        <div className="text-center mb-12">
          <p className="text-yellow-500 text-lg">Our Services</p>
          <h2 className="text-4xl font-bold">What We Offer</h2>
        </div>
      </div>

      {/* product display card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 lg:px-24">
        {/* Card 1: Agriculture Products */}
        <div className="relative group">
          <Image
            src={Assets.home02} // Replace with your actual image
            alt="Agriculture Products"
            className="rounded-lg object-cover"
            layout="responsive"
            width={300}
            height={400}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4">
            {/* Box for Agriculture Products */}
            <div className="bg-white py-6 px-6 rounded-md shadow-lg text-center w-3/4 h-40 relative">
              {/* Small Image (Logo) */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Image
                  src={Assets.home02a} // Replace with your small logo/image
                  alt="Small Logo"
                  className="w-16 h-16 shadow-md rounded-lg" // Adjusted size, no longer rounded
                />
              </div>
              <p className="text-green-600 font-bold text-2xl mt-10">
                Agriculture Products
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Organic Products */}
        <div className="relative group">
          <Image
            src={Assets.home03} // Replace with your actual image
            alt="Organic Products"
            className="rounded-lg object-cover"
            layout="responsive"
            width={300}
            height={400}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4">
            <div className="bg-white py-6 px-6 rounded-md shadow-lg text-center w-3/4 h-40 relative">
              {/* Small Image (Logo) */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Image
                  src={Assets.home03a} // Replace with your small logo/image
                  alt="Small Logo"
                  className="w-16 h-16 shadow-md rounded-lg"
                />
              </div>
              <p className="text-green-600 font-bold text-2xl mt-10">
                Organic Products
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Fresh Vegetables */}
        <div className="relative group">
          <Image
            src={Assets.home04} // Replace with your actual image
            alt="Fresh Vegetables"
            className="rounded-lg object-cover"
            layout="responsive"
            width={300}
            height={400}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4">
            <div className="bg-white py-6 px-6 rounded-md shadow-lg text-center w-3/4 h-40 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Image
                  src={Assets.home04a} // Replace with your small logo/image
                  alt="Small Logo"
                  className="w-16 h-16 shadow-md rounded-lg"
                />
              </div>
              <p className="text-green-600 font-bold text-2xl mt-10">
                Fresh Vegetables
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Dairy Products */}
        <div className="relative group">
          <Image
            src={Assets.home05} // Replace with your actual image
            alt="Dairy Products"
            className="rounded-lg object-cover"
            layout="responsive"
            width={300}
            height={400}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4">
            <div className="bg-white py-6 px-6 rounded-md shadow-lg text-center w-3/4 h-40 relative">
              {/* Small Image (Logo) */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Image
                  src={Assets.home05a} // Replace with your small logo/image
                  alt="Small Logo"
                  className="w-16 h-16 shadow-md rounded-lg"
                />
              </div>

              <p className="text-green-600 font-bold text-2xl mt-10">
                Dairy <br /> Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* feature boxes */}
      <div className="flex justify-center py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center w-64">
            <h2 className="text-yellow-500 font-bold mb-2">Feature 01</h2>
            <h3 className="text-xl font-semibold mb-4">
              Direct Farmer-to-Consumer Sales
            </h3>
            <Image
              src={Assets.home06} // Replace with the actual image path
              alt="Direct Farmer-to-Consumer Sales"
              className="w-16 h-16 rounded-md mb-2 object-cover"
            />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center w-64">
            <h2 className="text-yellow-500 font-bold mb-2">Feature 02</h2>
            <h3 className="text-xl font-semibold mb-4">
              Seamless Order Management
            </h3>
            <Image
              src={Assets.home07} // Replace with the actual image path
              alt="Seamless Order Management"
              className="w-16 h-16 rounded-md mb-2 object-cover"
            />
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center w-64">
            <h2 className="text-yellow-500 font-bold mb-2">Feature 03</h2>
            <h3 className="text-xl font-semibold mb-4">
              Sustainable & Transparent Sourcing
            </h3>
            <Image
              src={Assets.home08} // Replace with the actual image path
              alt="Sustainable & Transparent Sourcing"
              className="w-16 h-16 rounded-md mb-2 object-cover"
            />
          </div>
        </div>
      </div>

      {/* round image section */}
      <div className="flex items-center justify-center p-10  bg-white">
        {/* Container for the images and text */}
        <div className="flex items-start max-w-6xl pl-52">
          {/* Image section */}
          <div className="relative w-1/2 ">
            {/* Main large circle image */}
            <div className="relative">
              <div className="w-80 h-80 bg-gray-200 rounded-full overflow-hidden">
                <Image
                  src={Assets.home09} // Replace with actual path or import
                  alt="Harvest Image"
                  width={320} // Direct width and height instead of layout fill
                  height={320} // Matching the container size for proper rendering
                  className="object-cover rounded-full" // Ensure the image is round
                />
              </div>
            </div>

            {/* Small circle image overlapping */}
            <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={Assets.home10} // Replace with actual path or import
                  alt="Small Image"
                  width={128} // Direct width and height instead of layout fill
                  height={128} // Matching the container size for proper rendering
                  className="object-cover rounded-full" // Ensure the image is round
                />
              </div>
            </div>
          </div>

          {/* Text section */}
          <div className="w-1/2  ">
            {" "}
            {/* Reduced padding on the left side */}
            <h1 className="text-4xl font-bold text-gray-800">
              Agriculture & Organic Product Farm
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              {" "}
              {/* Reduced margin-top */}
              <span className="font-bold text-green-600">AgriConnect</span> is
              the largest global organic farm. At AgriConnect, we bridge the gap
              between farmers and consumers...
            </p>
            <ul className="mt-4 space-y-2">
              {" "}
              {/* Reduced margin-top and list item spacing */}
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Reach more
                buyers, expand your market.
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Choose from a
                variety of fresh products.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* video part */}
      <div className="relative w-full max-w-4xl mx-auto py-20">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg"
          src={"/assets/video/agri_video.mp4"} // Replace with the path to your video
          type="video/mp4"
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay for play/pause button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition-all"
          >
            {isPlaying ? (
              <FaPause className="text-3xl text-black" />
            ) : (
              <FaPlay className="text-3xl text-black" />
            )}
          </button>
        </div>
      </div>

      {/*  why article */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="relative">
            <Image
              src={Assets.home11}
              alt="Agriculture Landscape"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-yellow-500 mb-2">
              Our Farm Benefits
            </h4>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose AgriConnect Market
            </h2>
            <p className="text-gray-600 mb-6">
              There are many variations of passages of available but the
              majority have suffered alteration in some form by injected humor
              or random words which don't look even.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <span className="bg-green-500 text-white rounded-full p-2">
                  {/* Check Icon */}
                  ✔️
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Quality Organic Food
                  </h4>
                  <p className="text-sm text-gray-600">
                    There are variation. You need to be sure there is anything
                    hidden in the middle of text.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-green-500 text-white rounded-full p-2">
                  {/* Check Icon */}
                  ✔️
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Professional Farmers
                  </h4>
                  <p className="text-sm text-gray-600">
                    There are variation. You need to be sure there is anything
                    hidden in the middle of text.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-green-500 text-white rounded-full p-2">
                  {/* Check Icon */}
                  ✔️
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Quality Products
                  </h4>
                  <p className="text-sm text-gray-600">
                    There are variation. You need to be sure there is anything
                    hidden in the middle of text.
                  </p>
                </div>
              </li>
            </ul>

            {/* Discover More Button */}
            <div className="mt-8">
              <button className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* news article image placement  */}

      <div className="bg-white py-10">
        {/* Header Text */}
        <div className="text-center mb-10">
          <p className="text-yellow-500 font-bold text-lg">From the Blog</p>
          <h2 className="text-3xl font-extrabold mt-2">News & Articles</h2>
        </div>

        {/* news Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-16">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <Image
              src={Assets.home13} // Replace with the actual image path
              alt="Blog image 1"
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  05 Oct 2024
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                Bringing Food Production Back To Cities
              </h3>
              <p className="text-gray-500 text-sm mt-2">MSD · 1 Comment</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <Image
              src={Assets.home14}
              alt="Blog image 2"
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  05 Oct 2024
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                The Future of Farming, Smart Irrigation Solutions
              </h3>
              <p className="text-gray-500 text-sm mt-2">MSD · 0 Comments</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <Image
              src={Assets.home15}
              alt="Blog image 3"
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  05 Oct 2024
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                Agronomy and relation to Other Sciences
              </h3>
              <p className="text-gray-500 text-sm mt-2">MSD · 0 Comments</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
