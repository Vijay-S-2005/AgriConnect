import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function YoursOrders({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}
