"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Assets } from "../../public/assets/Assets";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import axios from "axios";

function ProductCard({
  productName,
  imageUrl,
  price,
  weight,
  productId,
  category,
}) {
  const localeActive = useLocale();
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
    if (session?.user?.userId) {
      // User is logged in, store in the database
      try {
        const response = await axios.post("/api/cart/updateCartTable", {
          userId: session?.user?.userId,
          productId: productId,
          quantity: 1,
        });
        onAddProducts();

        console.log("Product added to cart in DB", productId, productName);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      // User is not logged in, store in localStorage
      const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const newProduct = {
        id: productId,
        name: productName,
        price,
        image: imageUrl,
        quantity: 1,
        category: category,
      };

      // Check if the product already exists in the local storage cart
      const existingProductIndex = storedProducts.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex >= 0) {
        // If product exists, increase the quantity
        storedProducts[existingProductIndex].quantity += 1;
      } else {
        // Add new product to local storage
        storedProducts.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(storedProducts));
      onAddProducts();

      console.log("Product added to localStorage cart", newProduct);
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
                ₹ {price} - {weight} Kg
              </p>
            </div>
            <button className="mt-3 flex border-2 rounded-lg bg-[#20E58F] hover:bg-[#229764] border-transparent focus:border-transparent focus:ring-0 text-white items-center p-2">
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
          <Link href={`/${localeActive}/detailedProduct/${productId}`} passHref>
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
