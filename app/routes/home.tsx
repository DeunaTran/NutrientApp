import HomeCarousel from "~/Components/HomeCarousel";
import { useState, useEffect } from "react";
import Footer from "~/Components/Footer";
import Authenticate from "~/Components/Authenticate";
import Cookies from "~/Components/Cookies";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import HomeReport from "~/Components/HomeReport";




export default function Home() {
  const [isCookiesOpen, setIsCookiesOpen] = useState(true)
  const [isLoginSaleOpen, setIsLoginSaleOpen] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  return (
    <div className="bg-white">
      <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
      <Cookies  />
      <HomeCarousel />

      <div id="/products" className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-4 mb-4 px-4">
       
      </div>
      <div className="flex justify-center items-center  mb-10">
        
      </div>
      <HomeReport/>
      {/* <HomeInfoBox/>

      <ScrollVideo />
      <ScrollVideo2 /> */}
      <Footer />
    </div>
  );
}