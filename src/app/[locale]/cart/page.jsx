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

  // console.log("session", session?.user);
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
        console.log("cart items", transformedCartItems);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.userId) {
      getCartData(); // Fetch from the database if logged in
    } else {
      // Fetch from localStorage if not logged in
      const localCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCartItems);
    }
  }, [session]);

  const increaseQuantity = async (id) => {
    if (session?.user?.userId) {
      // Handle the logged-in case with the database
      try {
        const updatedItems = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);

        await axios.post("/api/cart/updateCartQuantity", {
          userId: session?.user?.userId,
          productId: id,
          quantity: 1, // Increment by 1
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Handle localStorage for not logged-in users
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  const decreaseQuantity = async (id) => {
    if (session?.user?.userId) {
      // Handle the logged-in case with the database
      try {
        const item = cartItems.find((item) => item.id === id);
        if (item.quantity > 1) {
          const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
          setCartItems(updatedItems);

          await axios.post("/api/cart/updateCartQuantity", {
            userId: session?.user?.userId,
            productId: id,
            quantity: -1, // Decrement by 1
          });
        } else {
          removeItem(id); // Remove the item if quantity becomes 0
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Handle localStorage for not logged-in users
      const item = cartItems.find((item) => item.id === id);
      if (item.quantity > 1) {
        const updatedItems = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
      } else {
        removeItem(id); // Remove the item if quantity becomes 0
      }
    }
  };

  const removeItem = async (id) => {
    if (session?.user?.userId) {
      // Handle the logged-in case with the database
      try {
        const item = cartItems.find((item) => item.id === id);
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);

        await axios.post("/api/cart/updateCartQuantity", {
          userId: session?.user?.userId,
          productId: id,
          quantity: -item.quantity, // Effectively remove item
        });
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      // Handle localStorage for not logged-in users
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  // New function to clear the cart
  const clearCart = async () => {
    try {
      await axios.post("/api/cart/updateCartQuantity", {
        userId: session?.user?.userId,
        quantity: 0, // No productId means clearing the entire cart
      });
      setCartItems([]); // Clear the cart in the frontend
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
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
      <div className="flex justify-center mt-4 pb-6 gap-4">
        {/* Clear Cart button */}
        <button
          onClick={clearCart}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={session?.user ? handleCheckout : null} // Prevent click when no user session
          className={`${
            session?.user
              ? "bg-orange-500 cursor-pointer"
              : "bg-orange-300 cursor-not-allowed"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={!session?.user} // Disable the button when no user session
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
