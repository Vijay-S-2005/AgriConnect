"use client";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Range } from "react-range";

const SidebarFilter = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("price-low-high");
  const [values, setValues] = useState([20, 100]); // Starting and ending price

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const applyPriceFilter = () => {
    console.log(`Price range applied: ₹${values[0]} - ₹${values[1]}`);
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search product"
          className="w-full p-3 bg-black bg-opacity-70 text-white placeholder-gray-300 rounded-md focus:outline-none hover:bg-opacity-80"
        />
      </div>

      {/* Price Range Filter */}
      <div className="p-4 border border-gray-300 rounded-lg shadow-md mb-6">
        <h1 className="text-xl font-bold mb-4">Filter</h1>
        <h2 className="text-lg font-semibold mb-2">Price</h2>

        <div className="mb-4">
          {/* Display current range values */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">₹{values[0]}</span>
            <span className="mx-2 text-gray-500">-</span>
            <span className="text-gray-700">₹{values[1]}</span>
          </div>

          {/* Single slider with two dots */}
          <Range
            step={1}
            min={20}
            max={100}
            values={values}
            onChange={(newValues) => setValues(newValues)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  background: "#FCD34D", // Yellow bar
                  borderRadius: "5px",
                }}
                className="w-full"
              >
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981", // Green dots
                  border: "2px solid white",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
          />
        </div>

        <button
          onClick={applyPriceFilter}
          className="mt-3 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Apply
        </button>
      </div>

      {/* Categories */}
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <ul className="space-y-2">
          {[
            "Agriculture",
            "Farming",
            "Fresh Vegetables",
            "Harvest",
            "Organic Food",
          ].map((category, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{category}</span>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarFilter;
