"use client";
import Image from "next/image";
import OrderList from "../../../components/OrderCompoent";
import { Assets } from "../../../../public/assets/Assets"; // Ensure the correct path

const YourOrders = () => {
  const sampleOrders = [
    {
      id: 1,
      image: "/path/to/image.jpg",
      name: "Grocery Order",
      quantity: 10,
      price: 372,
      paymentMode: "Cash on Delivery",
      deliveryDate: "Sep 12",
      status: "Delivered",
    },
    {
      id: 2,
      image: "/path/to/image.jpg",
      name: "Electronics",
      quantity: 1,
      price: 15000,
      paymentMode: "UPI",
      deliveryDate: "Sep 14",
      status: "Shipped",
    },
    {
      id: 3,
      image: "/path/to/image.jpg",
      name: "Clothes",
      quantity: 3,
      price: 2500,
      paymentMode: "Credit Card",
      deliveryDate: "Sep 10",
      status: "Delivered",
    },
    // Add more sample orders here, totaling 20 as per your requirement
  ];

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
          <h1 className="text-white text-6xl font-bold">Order</h1>
        </div>
      </div>
      <OrderList orders={sampleOrders} />
    </>
  );
};

export default YourOrders;
