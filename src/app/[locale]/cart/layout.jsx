import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
// import { IntlProviderWrapper } from './[locale]';


export default function CartLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">  
      <Header />
      <Navbar />
      {children} 
      <Footer />
    </div>
  );
}