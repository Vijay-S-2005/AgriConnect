"use client";
import { useState, useEffect } from "react";
import { Assets } from "../../../../public/assets/Assets";
import Image from "next/image";
import axios from "axios";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CartTable() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const localeActive = useLocale();

  const getCartData = async () => {
    try {
      if (session?.user?.userId) {
        const response = await axios.post("/api/cart", {
          userId: session?.user?.userId,
        });
        const cartData = response.data;

        // Transform the data if needed
        const transformedCartItems = cartData.map((item) => ({
          id: item.product.productId,
          name: item.product.productName,
          category: item.product.type,
          price: item.product.price,
          image: item.product.imageURL || "",
          quantity: item.quantity,
        }));

        setCartItems(transformedCartItems);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.userId) {
      getCartData();
    }
  }, [session]);

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post("/api/checkout", {
      items: cartItems,
    });
    const session = await response.data;
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-green-600">
            <th className="px-4 py-2 text-center">S.No</th>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Images</th>
            <th className="px-4 py-2 text-center">Category</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2 text-center">{item.name}</td>
              <td className="px-4 py-2 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="px-4 py-2 text-center">{item.category}</td>
              <td className="px-4 py-2 text-center">
                ₹{item.price.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-white-500 text-white rounded"
                    onClick={() => removeItem(item.id)}
                  >
                    <Image src={Assets.bin} alt="Delete" className="w-5 h-6" />
                  </button>
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
            {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
            items):
            <span className="font-bold">
              ₹ {calculateTotalPrice(cartItems)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 pb-6">
        <button
          onClick={handleCheckout}
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

const calculateTotalPrice = (items) => {
  return items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};
