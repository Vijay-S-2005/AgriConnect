  import { useState } from 'react';

  const staticCartData = [
    { id: 1, name: 'Cucumber', description: 'Cucumber', category: 'Cucumber', price: 12, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727332863/product/eo3qtilbvvyv7mflpzs5.jpg' },  
    { id: 2, name: 'Steak', description: 'Steak', category: 'Steak', price: 25, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
    { id: 3, name: 'Pork', description: 'Pork', category: 'Pork', price: 36, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
    { id: 4, name: 'Beef', description: 'Beef', category: 'Beef', price: 45.6, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
    { id: 5, name: 'Lamb', description: 'Lamb', category: 'Lamb', price: 52.32, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
    { id: 6, name: 'Spinach', description: 'Spinach', category: 'Spinach', price: 65, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
    { id: 7, name: 'Eggs', description: 'Eggs', category: 'Eggs', price: 17.7, image: 'https://res.cloudinary.com/doiwijgut/image/upload/v1727766213/product/xv2x3tvllbq7ddtxqsqv.png' },
  ];

  export default function CartTable() {
    const [cartItems, setCartItems] = useState(staticCartData);

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
            <tr className="text-green-600"> {/* Green column headers */}
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Images</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left pl-52">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td> {/* S.No Column */}
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"  
                  />
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-center gap-2"> {/* Center-align buttons */}
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <span className="px-4 py-1">{item.quantity || 1}</span>
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2  pl-5"> {/* Center-align buttons */}
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 p-4 bg-green-50 rounded"> {/* Green contrast background */}
          <div className="flex justify-between items-center">
            <div>Unit Price: <span className="font-bold">${calculateTotalPrice(cartItems)}</span></div>
            <div>Delivery Charge: <span className="font-bold">$5</span></div>
            <div>Total Price: <span className="font-bold">${calculateTotalPrice(cartItems) + 5}</span></div>
          </div>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };
