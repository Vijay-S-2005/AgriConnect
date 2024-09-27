"use client";
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Assets } from '../../../../public/assets/Assets';
import axios from 'axios';
import { useLocale } from 'next-intl';

export default function DisplayProductPage() {
  const localeActive = useLocale();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const columnsToFetch = ['productName', 'imageURL', 'price', 'weight']; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/${localeActive}/api/fetchProductDetail`, {
          columns: columnsToFetch,
        });
        setData(response.data); 
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      }
    };

    // Call fetchData only once when the component is mounted
    fetchData();
  }, [localeActive]);

  // Handle errors
  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  // Render the product cards dynamically after data is fetched
  return (
    <div className="flex flex-wrap gap-6">
      {data ? (
        data.map((product, index) => (
          <ProductCard
            key={index}
            productName={product.productName}
            imageUrl={product.imageURL || Assets.Apple} // Fallback image
            price={product.price}
            weight={product.weight}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


// "use client";

// import { useState } from 'react';
// import axios from 'axios';
// import { useLocale } from 'next-intl';

// export default function Home() {
//   const localeActive = useLocale();
//   const [data, setData] = useState(null); // Initialize data to null
//   const [error, setError] = useState(null);

//   // Array of column names to fetch from the server
//   const columnsToFetch = ['type', 'price']; // Example: specify which columns to fetch

//   // Function to fetch data once when the component is rendered
//   const fetchData = async () => {
//     try {
//       const response = await axios.post(`/${localeActive}/api/fetchProductDetail`, {
//         columns: columnsToFetch
//       });
//       setData(response.data); // Set the data received from the API
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err); // Handle errors
//     }
//   };

//   // Fetch data once when the component mounts
//   if (!data && !error) {
//     fetchData();
//   }

//   // Render the data or an error message
//   if (error) return <p>Error fetching data: {error.message}</p>;

//   return (
//     <div>
//       <h1>Data from API:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data as formatted JSON */}
//     </div>
//   );
// }
