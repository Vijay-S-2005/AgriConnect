"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Assets } from "../../../../public/assets/Assets";
import axios from "axios";
import Image from "next/image";
import { useLocale } from "next-intl";
import FilterProduct from "@/components/FilterProduct";

export default function DisplayProductPage() {
  const localeActive = useLocale();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const productsPerPage = 15; // Number of products to show per page
  const columnsToFetch = ["productName", "imageURL", "price", "weight", "id"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/fetchProductDetail`, {
          columns: columnsToFetch,
        });
        console.log("Data fetched successfully:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    // Call fetchData only once when the component is mounted
    fetchData();
  }, [localeActive]);

  // Handle errors
  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  // Pagination logic
  const totalProducts = data ? data.length : 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = data ? data.slice(startIndex, endIndex) : [];

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="w-full relative">
        {/* Product Image at the Top */}
        {/* shop title image */}
        <Image
          className="w-full"
          src={Assets.order_page}
          alt="Product Image"
          layout="responsive"
          width={1080}
          height={1920}
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold">Shop</h1>
        </div>
      </div>

      {/* Main container with flexbox layout */}
      <div className="flex">
        {/* Left side: Filter Component */}
        <div className="w-1/4 h-screen bg-gray-100 p-4">
          <FilterProduct />
        </div>

        {/* Right side: Product Cards */}
        <div className="w-3/4 p-4">
          {/* Display current range and total results */}
          <p>
            Showing {startIndex + 1}–{Math.min(endIndex, totalProducts)} of{" "}
            {totalProducts} results
          </p>

          {currentProducts.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  productName={product.productName}
                  imageUrl={product.imageURL || Assets.Apple} // Fallback image
                  price={product.price}
                  weight={product.weight}
                />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}

          {/* Pagination Buttons */}
          <div className="mt-6 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
            {/* Next button */}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="ml-4 px-3 py-1 bg-gray-200 text-black rounded"
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
