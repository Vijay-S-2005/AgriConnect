import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterProduct from '@/components/FilterProduct';

export default function DisplayProduct({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <FilterProduct className="w-1/4" />
        <div className="flex-grow p-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
