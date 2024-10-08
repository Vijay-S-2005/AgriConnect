'use client';
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { SessionProvider } from 'next-auth/react';
// import { IntlProviderWrapper } from './[locale]';


export default function HomeLayout({ children }) {
  return (
    <SessionProvider>
    <div className="flex flex-col min-h-screen">  
      <Header />
      <Navbar />
      {/* <Slider /> */}

      {children} 
      <Footer />
    </div>
    </SessionProvider>
  );
}

