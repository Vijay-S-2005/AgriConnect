import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from "@/components/navbar";
import FilterProduct from '@/components/FilterProduct';

export default function DisplayProduct({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays at the top */}
      <Header />
      <Navbar/>
      
      {/* Main content area takes up the remaining space */}
      {/* <div className="flex-grow p-6"> */}
        {children}
      {/* </div> */}

      {/* Footer will always be at the bottom */}
      <Footer />
    </div>
  );
}
