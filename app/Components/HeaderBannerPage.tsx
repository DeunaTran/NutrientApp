import { useEffect, useState } from "react";
import {  FaBars, FaTimes } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import {  type AuthenticateProps} from "~/library/interface";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import SignOut from "./SignOut";



const HeaderBannerPage = ({ setOpenAuthModal }: AuthenticateProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const listLink = ["/", "/tracuu", "/sanpham", "/nghiencuu", "/linkkien"];


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
          <MdManageAccounts /> Tài khoản
        </div>
        <div className="border border-gray-200 p-1">Blog</div>
        <div className="border border-gray-200 p-1">Trợ Giúp</div>
        <div className="border border-gray-200 p-1">Email</div>
        <div className="border border-gray-200 p-1">Ngôn ngữ</div>
      </div>

      {/* Desktop Main Header */}
      <div className="hidden md:grid max-w-8xl text-sm py-1 mx-auto px-4 grid-cols-8 items-center gap-4">
        {/* Navigation */}
        <nav className="col-span-4">
          <ul className="grid grid-cols-5 gap-0 ">
            {["Trang Chủ","Tra Cứu Đất ", "Sản phẩm", "Nghiên Cứu", "Linh Kiện"].map((label, index) => (
              <li
                key={label}
                className="hover:border-b-4 font-thin hover:border-gray-300 py-2 transition duration-200 transform hover:scale-105"
              >
                <a
                  href={listLink[index]}
                  className="block text-center uppercase px-2 py-1 rounded-md cursor-pointer text-black font-light"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo */}
        <div className="col-span-1 items-center flex justify-center mb-2">
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
          <SignOut/>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               <FaBars color="gray" size={22} />
            </button>
        </div>
      
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
                        {["Cửa hàng", "Bộ sưu tập", "Điều khoản", "Theo giõi đơn hàng "].map((label, index) => (
                          <a
                            key={label}
                            href={listLink[index]}
                            className=" py-1 px-2 border-b border-gray-300  w-full"
                          >
                            {label}
                          </a>
                        ))}  
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

            <button onClick={() => { }}>
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
                {["Cửa hàng", "Sản phẩm", "điều khoản", "Đơn hàng"].map((label, idx) => (
                  <a
                    key={label}
                    href={listLink[idx]}
                    className=" py-1 px-2 border-b border-gray-300  w-full"
                  >
                    {label}
                  </a>
                ))}
          
        

              </nav>
            </motion.div>
          </AnimatePresence>

        )}

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
