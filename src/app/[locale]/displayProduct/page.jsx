"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import this to get the search params
import ProductCard from "@/components/ProductCard";
import { Assets } from "../../../../public/assets/Assets";
import axios from "axios";
import Image from "next/image";
import { useLocale } from "next-intl";
import FilterProduct from "@/components/FilterProduct";


export default function DisplayProductPage() {
  const localeActive = useLocale();
  const searchParams = useSearchParams(); // To get the search query from the URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""; // Get 'search' param from URL

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/fetchProductDetail`, {
          columns: [
            "productName",
            "imageURL",
            "price",
            "weight",
            "productId",
            "type",
          ],
        });

        const products = response.data;

        // Extract min and max prices
        const prices = products.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setData(products);

        // Apply search filter if a search query exists
        const filteredProducts = products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery)
        );

        setFilteredData(filteredProducts); // Set filtered products based on search
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [localeActive, searchQuery]); // Re-run the effect when locale or search query changes

  const handleFilterApply = (selectedMin, selectedMax, category) => {
    // Filter products by both price and category
    const filtered = data.filter((product) => {
      const matchesPrice =
        product.price >= selectedMin && product.price <= selectedMax;
      const matchesCategory = category
        ? product.type.toLowerCase() === category.toLowerCase()
        : true;
      return matchesPrice && matchesCategory;
    });

    // Apply the search filter as well
    const finalFilteredProducts = filtered.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery)
    );
    setFilteredData(finalFilteredProducts);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleFilterApply(minPrice, maxPrice, category); // Reapply filters when category changes
  };

  const totalProducts = filteredData ? filteredData.length : 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredData
    ? filteredData.slice(startIndex, endIndex)
    : [];

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <>
      <div className="w-full relative">
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

      <div className="flex">
        <div className="w-1/4 h-screen bg-gray-100 p-4">
          <FilterProduct
            minPrice={minPrice}
            maxPrice={maxPrice}
            onFilterApply={handleFilterApply}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="w-3/4 p-4">
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
                  imageUrl={product.imageURL || Assets.Apple}
                  price={product.price}
                  weight={product.weight}
                  productId={product.productId}
                  category={product.type}
                />
              ))}
            </div>
          ) : (
            <p>no data found...</p>
          )}

          <div className="mt-6 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-2 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
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
