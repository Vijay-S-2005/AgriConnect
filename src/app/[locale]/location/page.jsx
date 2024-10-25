"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LocationDisplay() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Example with OpenCage API
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json`,
              {
                params: {
                  q: `${latitude}+${longitude}`,
                  key: "41562869a2a845bc9208d334f619432d", // Replace with your API key
                },
              }
            );
            const { components } = response.data.results[0];
            setLocation({
              district: components.county || components.state_district,
              pincode: components.postcode,
            });
          } catch (err) {
            setError("Unable to fetch location details");
          }
        },
        () => setError("Location access denied")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="p-4 text-center">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : location ? (
        <p className="text-lg">
          {location.district} {location.pincode}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
