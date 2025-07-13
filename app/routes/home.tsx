import { useState, useEffect } from "react";
import Footer from "~/Components/Footer";
import Authenticate from "~/Components/Authenticate";
import Cookies from "~/Components/Cookies";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import HomeReport from "~/Components/HomeReport";




export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  return (
    <div className="bg-white">
      <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
      <Cookies  />
      <img src="https://eos.com/wp-content/uploads/2023/11/components-of-different-types-of-fertilizers.jpg.webp"
      className="w-screen"
      
      alt="..."/>


      <div className="flex justify-center items-center  mt-30">
        <HomeReport/>
      </div>

      <Footer />
    </div>
  );
}