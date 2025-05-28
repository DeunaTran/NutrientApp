import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";

const HeaderBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : ""
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
        {/* Logo */}
        <div className="col-span-2">
          <img
            src={
              isScrolled
                ? "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
                : "https://i.ibb.co/d0sN71VG/dsa.png"         // Logo when NOT scrolled
            }
            alt="MyLogo"
            className="h-8 w-auto rounded-lg"
          />
        </div>

        {/* Navigation */}
        <nav className="col-span-3">
          <ul className="grid grid-cols-4 gap-0">
            {["Nam", "Nữ", "Áo", "Quần"].map((label) => (
              <li
                key={label}
                className="hover:border-b-4 hover:border-gray-300 py-2 transition duration-200 transform hover:scale-105"
              >
                <a
                  href="#"
                  className="block text-center px-3 py-1 rounded-md cursor-pointer text-black font-semibold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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


        {/* Icons - Hidden on mobile */}
        <div className="col-span-1 hidden md:flex justify-start items-center space-x-4">
          <FaShoppingCart
            color="gray"
            size={25}
            className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <IoIosHeart
            color="gray"
            size={25}
            className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col px-4 py-2 shadow-md bg-transparent">
        {/* Top Row: Logo + Hamburger */}
        <div className="flex justify-between items-center mb-2">
          <img
            src={
              isScrolled
                ? "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
                : "https://i.ibb.co/d0sN71VG/dsa.png"         // Logo when NOT scrolled
            }
            alt="MyLogo"
            className="h-8 w-auto"
          />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes color="gray" size={22} /> : <FaBars color="gray" size={22} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <nav className="flex flex-col items-center space-y-2 mt-2 bg-gray-100 p-4 rounded-lg">
            {["Nam", "Nữ", "Áo", "Quần"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-black font-medium py-1 px-2 border rounded-sm w-full text-center"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderBanner;
