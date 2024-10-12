"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Assets } from "../../public/assets/Assets";
import { useSession } from "next-auth/react";
import axios from "axios";

function ProductCard({ productName, imageUrl, price, weight, productId }) {
  const { data: session, status } = useSession();

  // Add productId or slug
  const onAddProducts = () => {
    toast.success("Added product successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };
  const handleAddToCart = async () => {
    try {
      console.log("session user id", session?.user?.userId);

      const response = await axios.post("/api/updateCartTable", {
        userId: session?.user?.userId,
        productId: productId,
        quantity: 1,
      });

      console.log("session user id", session?.user?.userId);
      console.log("Product added to cart", productId, productName);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="`w-[calc(20%-1.5rem)] h-[370px] border border-[#ac7d87] rounded-xl shadow-md">
      <div className="relative w-full h-[170px]">
        <Image
          src={imageUrl}
          alt={productName}
          className="rounded-t-xl"
          layout="fill"
          objectFit="cover" // Ensures the image maintains aspect ratio and covers the container
        />
      </div>
      <div className="">
        <div className="flex justify-between p-4 font-roboto">
          <div className="flex flex-col">
            <h3 className="font-extrabold text-lg">{productName}</h3>
            <div className="flex items-center">
              <p className="text-lg font-light">
                ₹ {price} - {weight}
              </p>
            </div>
            <button
              className="mt-3 flex border-2 rounded-lg bg-[#20E58F] hover:bg-[#229764] border-transparent focus:border-transparent focus:ring-0 text-white items-center p-2"
              onClick={onAddProducts}
            >
              <Image
                src={Assets.Cart}
                width={20}
                height={20}
                alt="shopping cart"
              />
              <p onClick={handleAddToCart} className="ml-3 font-normal">
                Add to cart
              </p>
            </button>
          </div>
        </div>
        <div className="p-4">
          <Link href={`/product/${productId}`} passHref>
            {" "}
            {/* Dynamic route for "See More" */}
            <a className="text-blue-600 hover:underline">See More</a>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductCard;
