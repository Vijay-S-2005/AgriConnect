"use client";
import { useState, useEffect } from "react";
import { Assets } from "../../../../public/assets/Assets";
import Image from "next/image";
import axios from "axios";
import { useLocale } from "next-intl";

const staticCartData = [
  {
    id: 1,
    name: "Cucumber",
    description: "Cucumber",
    category: "Cucumber",
    price: 12,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727332863/product/eo3qtilbvvyv7mflpzs5.jpg",
  },
  {
    id: 2,
    name: "Steak",
    description: "Steak",
    category: "Steak",
    price: 25,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
  {
    id: 3,
    name: "Pork",
    description: "Pork",
    category: "Pork",
    price: 36,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
  {
    id: 4,
    name: "Beef",
    description: "Beef",
    category: "Beef",
    price: 45.6,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
  {
    id: 5,
    name: "Lamb",
    description: "Lamb",
    category: "Lamb",
    price: 52.32,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
  {
    id: 6,
    name: "Spinach",
    description: "Spinach",
    category: "Spinach",
    price: 65,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
  {
    id: 7,
    name: "Eggs",
    description: "Eggs",
    category: "Eggs",
    price: 17.7,
    image:
      "https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png",
  },
];

export default function CartTable() {
  const [cartItems, setCartItems] = useState(staticCartData);
  const localeActive = useLocale();

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: (item.quantity || 1) - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-green-600">
            {" "}
            {/* Green column headers */}
            <th className="px-4 py-2 text-center">S.No</th>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Images</th>
            {/* <th className="px-4 py-2 text-center">Description</th> */}
            <th className="px-4 py-2 text-center">Category</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2 text-center">{index + 1}</td>{" "}
              {/* S.No Column */}
              <td className="px-4 py-2 text-center">{item.name}</td>
              <td className="px-4 py-2 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
              </td>
              {/* <td className="px-4 py-2 text-center">{item.description}</td> */}
              <td className="px-4 py-2 text-center">{item.category}</td>
              <td className="px-4 py-2 text-center">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {" "}
                  {/* Center-align buttons */}
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity || 1}</span>
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <div className="flex items-center gap-2">
                    {" "}
                    <div className="flex items-center gap-2">
                      {" "}
                      {/* Center-align buttons */}
                      <button
                        className="px-2 py-1 bg-white-500 text-white rounded"
                        onClick={() => removeItem(item.id)}
                      >
                        <Image
                          src={Assets.bin}
                          alt="Delete"
                          className="w-5 h-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 p-4">
        <div className="flex justify-end items-center pr-24 pb-2">
          <div className="text-right border border-gray-300 p-2 w-56 pr-3">
            Subtotal (
            {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}{" "}
            items):
            <span className="font-bold">
              ₹ {calculateTotalPrice(cartItems) + 5}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 pb-6">
        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded ">
          Place Order
        </button>
      </div>
    </div>
  );
}

const calculateTotalPrice = (items) => {
  return items
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toFixed(2);
};
