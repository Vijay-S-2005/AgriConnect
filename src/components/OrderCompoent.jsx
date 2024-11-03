// components/OrderList.js
import { useState } from "react";
import Image from "next/image";
import { TextField, Autocomplete } from "@mui/material";

const OrderList = ({ orders }) => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayOrders = showMore ? filteredOrders : filteredOrders.slice(0, 10);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 space-x-4">
        <Autocomplete
          freeSolo
          options={orders.map((order) => order.name)}
          onInputChange={(e, newValue) => setSearchTerm(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search your orders here"
              variant="outlined"
              style={{ width: "1300px" }}
            />
          )}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Search Orders
        </button>
      </div>
      {displayOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
      {filteredOrders.length > 10 && !showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="w-full mt-4 text-blue-600"
        >
          See More
        </button>
      )}
    </div>
  );
};

// OrderItem Component within the same file
const OrderItem = ({ order }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <Image
          src={order.image}
          alt={order.name}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="ml-4">
          <h2 className="font-semibold">{order.name}</h2>
          <p>Quantity: {order.quantity}</p>
          <p>Payment Mode: {order.paymentMode}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">₹{order.price}</p>
        <p>{order.deliveryDate}</p>
        <p>{order.status}</p>
      </div>
    </div>
  );
};

export default OrderList;
