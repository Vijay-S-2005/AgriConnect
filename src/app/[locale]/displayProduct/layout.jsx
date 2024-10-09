import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function DisplayProduct({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      {/* <div className="flex flex-grow"> */}
        {children}
      {/* </div> */}
      <Footer />
    </div>
  );
}
