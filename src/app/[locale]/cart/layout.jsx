// src/app/layout.js
// 'use client';
// import '../styles/globals.css';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
export const metadata = {
  title: 'Cart Page',
  description: 'A simple cart page with static data',
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body>
    <Header />
        {children}
    <Footer />

        </body>
    </html>
  );
}
