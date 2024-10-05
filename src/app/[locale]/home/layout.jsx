'use client';
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';
// import { IntlProviderWrapper } from './[locale]';


export default function HomeLayout({ children }) {
  return (
    <SessionProvider>
    <div className="flex flex-col min-h-screen">  
      <Header />
      <Slider />

      {children} {/* This will render the content of the Home page */}
      <Footer />
    </div>
    </SessionProvider>
  );
}

