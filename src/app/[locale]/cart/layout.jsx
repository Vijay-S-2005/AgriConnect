import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { IntlProviderWrapper } from './[locale]';


export default function CartLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">  
      <Header />
    

      {children} {/* This will render the content of the Home page */}
      <Footer />
    </div>
  );
}