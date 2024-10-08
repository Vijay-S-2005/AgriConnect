"use client";
import Image from 'next/image';
import { Assets } from '../../../../public/assets/Assets'; // Assuming you're importing images from this path
import ProductCard from '@/components/ProductCard';

export default function DetailedProduct() {
    // Static Product Data
    const product = {
        title: 'Product',
        description: 'Fresh Product from farm. Product from farm. Product from farm. Product from farm. Product from farm.',
        price: '$799.99',
        rating: 4.7,
        productType: 'Electronics',
        quantity: 50,
        owner: 'TechWorld Inc.',
        image: Assets.Facebook, // Replace with actual product image
    };

    // Static Customer Reviews
    const reviews = [
        { id: 1, name: 'Alice', review: 'Excellent product! Exceeded my expectations.', rating: 5 },
        { id: 2, name: 'Bob', review: 'Great value for money. Highly recommend it!', rating: 4 },
        { id: 3, name: 'Charlie', review: 'Good phone, but battery life could be better.', rating: 3 },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Product Section */}
        <div className="w-full p-0 m-0">
            {/* Product Image at the Top */}
        <Image
            className="w-full p-0 m-0" 
            src={Assets.order_page} 
            alt="Product Image"
            layout="responsive"
            width={1080}
            height={1920}
            objectFit="cover"
            />
        </div>


        <div className="flex flex-wrap h-full">
            {/* Left Side - Full Display Image (Sticky) - Optional */}
            <div className="w-full md:w-1/2 flex justify-center items-center sticky top-0 h-screen">
                {/* This can be omitted if you want to keep only the image at the top */}
                </div>
                {/* Right Side - Product Details with Scrollable Content */}
                <div className="w-full md:w-1/2 h-full overflow-y-scroll no-scrollbar p-8 border-2">
                    {/* Title and Description */}
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    {/* Price and Rating */}
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-semibold">{product.price}</span>
                        <span className="ml-4 text-yellow-500">
                            {'⭐'.repeat(Math.floor(product.rating))}{' '}
                            {product.rating.toFixed(1)}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="mb-4">
                        <button className="bg-blue-500 text-white py-2 px-4 mr-4 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Buy Now
                        </button>
                    </div>

                    {/* About this item */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">About This Item</h2>
                        <ul className="list-disc ml-6">
                            <li><strong>Product Type:</strong> {product.productType}</li>
                            <li><strong>Description:</strong> {product.description}</li>
                            <li><strong>Quantity Available:</strong> {product.quantity}</li>
                            <li><strong>Owner:</strong> {product.owner}</li>
                        </ul>
                    </div>

                    {/* Customer Reviews */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.id} className="mb-4 border p-4 rounded">
                                    <h3 className="font-bold">{review.name}</h3>
                                    <p>{review.review}</p>
                                    <span className="text-yellow-500">
                                        {'⭐'.repeat(review.rating)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Card Grid Below the Main Product Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Display multiple product cards in a row */}
                {[...Array(4)].map((_, index) => (
                    <ProductCard
                        key={index}
                        productName={product.title} // Correctly reference the product title
                        imageUrl={product.image} // Use the actual product image
                        price={product.price} // Use the actual product price
                        weight={"1kg"} // You might want to define weight or any other details
                    />
                ))}
            </div>
        </div>
    );
}
