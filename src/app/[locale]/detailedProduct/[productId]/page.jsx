"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Assets } from "../../../../../public/assets/Assets"; // Ensure the correct path for asset
import axios from "axios";
import Rating from "@mui/material/Rating"; // Import Material UI Rating
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function DetailedProduct({ params }) {
  const localeActive = useLocale();
  const { productId } = params;
  const { data: session, status } = useSession();
  const [productDetail, setProductDetail] = useState({});
  const [reviews, setReviews] = useState([]); // Existing reviews state
  const [newReview, setNewReview] = useState(""); // Review text state
  const [rating, setRating] = useState(0); // Star rating state
  const [averageRating, setAverageRating] = useState(0);

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
        productId,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/fetchProductDetail", {
          columns: [
            "productName",
            "ProductDescription",
            "quantity",
            "ownerName",
            "review",
            "imageURL",
            "price",
            "weight",
            "productId",
            "type",
          ],
          where: {
            noOfConditions: 1,
            linkage: "",
            conditions: [
              {
                field: "productId",
                operator: "in",
                value: [parseInt(productId)],
              },
            ],
          },
        });

        // Fetch reviews for the specific productId
        const reviewsResponse = await axios.get(
          `/api/reviews?productId=${productId}` // Ensure you pass the productId here
        );

        setProductDetail(response.data[0]);
        setReviews(reviewsResponse.data);
        // Calculate the average rating
        const totalRating = reviewsResponse.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = totalRating / reviewsResponse.data.length || 0;
        setAverageRating(avgRating.toFixed(1));
        console.log("reviewsResponse", reviewsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview || rating === 0) return;

    try {
      const review = {
        userId: session?.user?.userId, // Replace with actual user ID from your auth system
        productId: parseInt(productId),
        content: newReview,
        rating,
      };
      const response = await axios.post("/api/reviews", review);

      // Optionally update the local state if you want to see the review immediately without waiting for a page reload
      setReviews([...reviews, response.data]);
      setNewReview("");
      setRating(0);

      // Reload the reviews for the updated product
      const updatedReviewsResponse = await axios.get(
        `/api/reviews?productId=${productId}`
      );
      setReviews(updatedReviewsResponse.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
        <div className="w-full md:max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row p-8">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <Image
                className="rounded-lg shadow-md"
                src={productDetail.imageURL}
                alt="Product Image"
                width={400}
                height={400}
                objectFit="cover"
              />
            </div>

            <div className="w-full md:w-2/3 md:pl-8 flex flex-col justify-between">
              <h1 className="text-3xl font-bold mb-2">
                {productDetail.productName}
              </h1>
              <p className="text-gray-700 mb-4">
                {productDetail.ProductDescription}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-semibold text-blue-600 mr-4">
                  ₹ {productDetail.price}
                </span>
                <Rating
                  name="product-rating"
                  value={averageRating}
                  precision={0.5}
                  readOnly
                />
                <span className="ml-2 text-gray-700">
                  ({averageRating} stars)
                </span>
              </div>

              <div className="mb-6">
                <button
                  className={`bg-blue-500 text-white py-2 px-4 mr-4 rounded hover:bg-blue-600 ${
                    !session ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  // onClick={() => session}
                  onClick={() => session && handleAddToCart()}
                  disabled={!session}
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-4 border-t pt-4">
                <h2 className="text-2xl font-bold mb-4">About This Item</h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    <strong>Product Type:</strong> {productDetail.type}
                  </li>
                  <li>
                    <strong>Quantity Available:</strong>{" "}
                    {productDetail.quantity}
                  </li>
                  <li>
                    <strong>Owner:</strong> {productDetail.ownerName}
                  </li>
                  <li>
                    <strong>Weight:</strong> {productDetail.weight}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="mb-4 p-4 border rounded-lg bg-gray-50"
                >
                  <h3 className="font-semibold">
                    {review.user ? review.user.firstName : "Anonymous"}
                  </h3>
                  <p className="text-gray-700">{review.content}</p>
                  <Rating
                    name={`user-rating-${review.reviewId}`}
                    value={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}

            <form
              className="mt-6 p-4 bg-white rounded-lg shadow-md"
              onSubmit={handleReviewSubmit}
            >
              <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
              <textarea
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows="3"
                placeholder="Write your feedback here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <div className="flex items-center mb-4">
                <span className="mr-2">Rating:</span>
                <Rating
                  name="new-review-rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 mr-4 rounded hover:bg-blue-600 ${
                  !session ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => session}
                // onClick={() => session && handleAddToCart()}
                disabled={!session}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
