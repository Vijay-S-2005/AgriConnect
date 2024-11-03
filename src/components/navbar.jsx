"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function Navbar() {
  const router = useRouter();
  const localeActive = useLocale();

  return (
    <nav className="bg-[#86efac] shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center space-x-12">
        {/* Nav Links */}
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            Home
          </a>
        </div>
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            About
          </a>
        </div>
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}/yourOrders`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            Order
          </a>
        </div>
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            Services
          </a>
        </div>
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            News
          </a>
        </div>
        <div className="text-lg font-semibold">
          <a
            onClick={() => {
              router.push(`/${localeActive}/displayProduct`);
            }}
            className="hover:text-gray-700 transition-colors text-gray-800 cursor-pointer"
          >
            Shop
          </a>
        </div>
      </div>
    </nav>
  );
}
