import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import supabase from "utils/supabase";
import SignOut from "./SignOut";
import { IoCartOutline } from "react-icons/io5";
import {  type AuthenticateProps, type Product } from "~/library/interface";
import { Link } from "react-router";
import { Cart } from "./Cart";
import { motion, AnimatePresence } from "framer-motion";



const HeaderBannerPage = ({ isAuth, setOpenAuthModal, setAuth, setProfile, profile, products, isCartOpen, setIsCartOpen }: AuthenticateProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        console.log("User:", data.user);
        console.log("Profile in header space:", profile);
      }
      else {
        console.log("No user is in header space.");
      }
    });
    setMobileMenuOpen(false);
    // setIsCartOpen(false);
    setSearchOpen(false);
  }, [isAuth]);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-md"
      }`}
    >
      {/* Top Bar - Desktop Only */}
      <div className="hidden md:flex text-sm bg-gray-100 justify-end text-gray-700 px-6">
        <div className="border border-gray-200 p-1 flex items-center gap-1">
          <MdManageAccounts /> Account
        </div>
        <div className="border border-gray-200 p-1">Blog</div>
        <div className="border border-gray-200 p-1">Help</div>
        <div className="border border-gray-200 p-1">Email sign up</div>
        <div className="border border-gray-200 p-1">Language</div>
      </div>

      {/* Desktop Main Header */}
      <div className="hidden md:grid max-w-7xl text-sm py-1 mx-auto px-4 grid-cols-8 items-center gap-4">
        {/* Navigation */}
        <nav className="col-span-3">
          <ul className="grid grid-cols-4 gap-0 ">
            {["SHOP", "COLLECTION", "FABRIC TECH", "EXPLORE"].map((label) => (
              <li
                key={label}
                className="hover:border-b-4 font-thin hover:border-gray-300 py-2 transition duration-200 transform hover:scale-105"
              >
                <a
                  href="#"
                  className="block text-center px-2 py-1 rounded-md cursor-pointer text-black font-light"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo */}
        <div className="col-span-2 items-center flex justify-center mb-2">
          {/* <img
            src={
               "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
            }
            alt="MyLogo"
            className="h-12 w-auto rounded-lg"
          /> */}
          <Link to="/" className="flex items-center">
            <img
              src={
                "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
              }
              alt="MyLogo"
              className="h-8 w-auto"
            />
          </Link>
        </div>



        {/* Search Bar - Hidden on mobile */}
        

        <form className="col-span-2  px-4 rounded-lg hidden md:block">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="block w-full p-2 pl-10 text-sm text-black bg-white rounded-lg"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-1/2 translate-y-1/2 hover:bg-gray-200 cursor-pointer font-medium rounded-lg text-sm px-4 py-2"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>


        {/* Icons - Computer */}
        <div className="col-span-1 hidden md:flex justify-start items-center space-x-4">
          <button onClick={() => { console.log(">>>"); setIsCartOpen(!isCartOpen) }}>
              <IoCartOutline color="gray" size={22} />
            </button>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               <FaBars color="gray" size={22} />
            </button>
        </div>
        {/* Mobile Cart Bar */}
        {isCartOpen && 
          <Cart isAuth={isAuth} setOpenAuthModal={setOpenAuthModal} products={products} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} profile={profile} setProfile={setProfile} />
        }  
        {mobileMenuOpen && (
                  <AnimatePresence>
                  <motion.div
                    initial={{ x: "-100%", y: "0%" }}         // Start off-screen to the left
                    animate={{ x: 0 }}               // Slide in
                    exit={{ x: "-100%", y: "0%" }}            // Slide out
                    transition={{
                        x: { type: "tween", duration: 0.4 }, // Applies to both animate and exit
                    }}
                    className=""
                    >
                      <nav className="flex font-thin text-gray-900 flex-col text-left md:w-lg w-96 h-screen py-4 transform transition-transform duration-500 ease-in-out  items-left space-y-8 fixed top-0 left-0 bg-gray-100 p-4 mr-10 ">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                          {mobileMenuOpen ? <FaTimes color="gray" size={30} /> : <FaBars color="gray" size={22} />}
                        </button>
                        {["Cửa hàng", "Bộ sưu tập", "Chất liệu", "Theo giõi đơn hàng "].map((label) => (
                          <a
                            key={label}
                            href="order"
                            className=" py-1 px-2 border-b border-gray-300  w-full"
                          >
                            {label}
                          </a>
                        ))}
                        {!isAuth && 
                        <button
                          className="py-1 px-2 border rounded-sm w-full text-center"
                          onClick={setOpenAuthModal} >
                          Đăng nhập tài khoản
                        </button>
                        }
                        {isAuth && 
                        <div className="flex flex-col items-start space-y-2">
                        <div className=" mt-4 "> Tài Khoản của bạn </div>
                        <div className="  font-serif" >Chào mừng trở lại, {user?.user_metadata.full_name} </div>
                        <div className=" text-sm"> 
                          <div className=" "> Số điện thọai: {user?.user_metadata.phone} </div>
                          <div className=" "> Email: {user?.user_metadata.email} </div>
                        </div>
        
                        
                        <SignOut onSignOut={() => {
                          setUser(null);
                          setAuth?.(false); // Update parent/global state if needed
                          setMobileMenuOpen(false);
                          console.log("User signed out");
                        }} />
                        </div>
                        
                        }
                        
        
                      </nav>
                    </motion.div>
                  </AnimatePresence>
        
                )} 

      </div>
{/* _______________________________________________________________________________ */}
      {/* Mobile Header */}
      <div className="md:hidden flex flex-col px-4 py-2 shadow-md bg-transparent">
        {/* Top Row: Logo + Hamburger */}
        <div className="flex justify-between items-center mb-2">
          <Link to="/" className="flex items-center">
            <img
              src={
                "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
              }
              alt="MyLogo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex flex-row gap-4">
            <button onClick={() => { setSearchOpen(!searchOpen) }}>
              {searchOpen ? <FaTimes color="gray" size={22} /> : <CiSearch color="gray" size={22} />}
            </button>

            <button onClick={() => { setIsCartOpen(!isCartOpen) }}>
              <IoCartOutline color="gray" size={22} />
            </button>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               <FaBars color="gray" size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <AnimatePresence>
          <motion.div
            initial={{ x: "-100%", y: "0%" }}         // Start off-screen to the left
            animate={{ x: 0 }}               // Slide in
            exit={{ x: "-100%", y: "0%" }}            // Slide out
            transition={{
                x: { type: "tween", duration: 0.4 }, // Applies to both animate and exit
            }}
            className=""
            >
              <nav className="flex font-thin text-gray-900 flex-col text-left w-96 h-screen py-4 transform transition-transform duration-500 ease-in-out  items-left space-y-8 fixed top-0 left-0 bg-gray-100 p-4 mr-10 ">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <FaTimes color="gray" size={30} /> : <FaBars color="gray" size={22} />}
                </button>
                {["Cửa hàng", "Bộ sưu tập", "Chất liệu", "Khám phá"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className=" py-1 px-2 border-b border-gray-300  w-full"
                  >
                    {label}
                  </a>
                ))}
                {!isAuth && 
                <button
                  className="py-1 px-2 border rounded-sm w-full text-center"
                  onClick={setOpenAuthModal} >
                  Đăng nhập tài khoản
                </button>
                }
                {isAuth && 
                <div className="flex flex-col items-start space-y-2">
                <div className=" mt-4 "> Tài Khoản của bạn </div>
                <div className="  font-serif" >Chào mừng trở lại, {user?.user_metadata.full_name} </div>
                <div className=" text-sm"> 
                  <div className=" "> Số điện thọai: {user?.user_metadata.phone} </div>
                  <div className=" "> Email: {user?.user_metadata.email} </div>
                </div>

                
                <SignOut onSignOut={() => {
                  setUser(null);
                  setAuth?.(false); // Update parent/global state if needed
                  setMobileMenuOpen(false);
                  console.log("User signed out");
                }} />
                </div>
                
                }
                

              </nav>
            </motion.div>
          </AnimatePresence>

        )}
        {/* Mobile Cart Bar */}
        {isCartOpen && 
          <Cart isAuth={isAuth} setOpenAuthModal={setOpenAuthModal} products={products} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} profile={profile} setProfile={setProfile} />
        }

        {searchOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ x: "100%" }}         // Start off-screen to the left
            animate={{ x: 0 }}               // Slide in
            exit={{ x: "100%" }}            // Slide out
            transition={{
                x: { type: "tween", duration: 0.4 }, // Applies to both animate and exit
            }}
            className=""
            >

              <form className="col-span-2  px-4 rounded-lg">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full p-2 pl-10 text-sm text-black bg-white rounded-lg"
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-1/2 translate-y-1/2 hover:bg-gray-200 cursor-pointer font-medium rounded-lg text-sm px-4 py-2"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
            </motion.div>
        </AnimatePresence>
        )}

      </div>
    </header>
  );
};

export default HeaderBannerPage;
