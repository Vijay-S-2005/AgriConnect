"use client";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Range } from "react-range";

const SidebarFilter = ({
  minPrice,
  maxPrice,
  onFilterApply,
  onCategorySelect,
}) => {
  const [values, setValues] = useState([minPrice, maxPrice]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const applyPriceFilter = () => {
    onFilterApply(values[0], values[1], selectedCategory); // Pass category as well
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Notify parent of category selection
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="p-4 border border-gray-300 rounded-lg shadow-md mb-6">
        <h1 className="text-xl font-bold mb-4">Filter</h1>
        <h2 className="text-lg font-semibold mb-2">Price</h2>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">₹{values[0]}</span>
            <span className="mx-2 text-gray-500">-</span>
            <span className="text-gray-700">₹{values[1]}</span>
          </div>

          <Range
            step={1}
            min={minPrice}
            max={maxPrice}
            values={values}
            onChange={(newValues) => setValues(newValues)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  background: "#FCD34D",
                  borderRadius: "5px",
                }}
                className="w-full"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
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
          {["Vegetable", "Fruit", "Grain", "Millet"].map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`flex justify-between items-center p-2 bg-white rounded-lg hover:bg-gray-100 transition cursor-pointer ${
                selectedCategory === category ? "bg-green-200" : ""
              }`}
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
