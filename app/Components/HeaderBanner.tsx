import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";

const HeaderBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-md"
      }`}
    >
      <div className="text-sm bg-gray-100 flex flex-row justify-end text-gray-700 px-6 "> 
        <div className="border border-gray-200 p-1 flex flex-row items-center gap-1" > <MdManageAccounts /> Account</div>
        <div className="border border-gray-200 p-1" > Blog </div>
        <div className="border border-gray-200 p-1" > Help </div>
        <div className="border border-gray-200 p-1" > Email sign up </div>
        <div className="border border-gray-200 p-1" > Language </div>
      </div>
      <div className="max-w-7xl text-sm py-1 mx-auto px-4  grid grid-cols-8 items-center gap-4">
        {/* Logo */}
        <div className="col-span-2">
          <img
            src="https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png"
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

        {/* Search Bar */}
        <form className="col-span-2 bg-white px-4 rounded-lg">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-white"
              placeholder="Search..."
              required
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

        {/* Cart Icon */}
        <div className="col-span-1 flex justify-start items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 6.35 6.35"
            fill="black"
            className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <path d="M 3.1708661,3.2974124 C 1.907863,3.2997936 0.86304935,4.299744 0.79995125,5.5634239 A 0.26460945,0.26460945 0 0 0 1.0655682,5.8404096 H 5.2864993 A 0.26460945,0.26460945 0 0 0 5.5500489,5.5634239 C 5.48687,4.2981438 4.4396051,3.2975523 3.1750001,3.2974124 Z" />
            <path d="m 3.1750901,0.5095872 c -0.669506,0 -1.2153281,0.54839 -1.2153321,1.21864 -1.9e-6,0.6702501 0.5458221,1.2205301 1.2153321,1.2205301 0.6695099,0 1.217222,-0.55028 1.2172191,-1.2205301 -4e-6,-0.67025 -0.5477132,-1.21864 -1.2172191,-1.21864 z" />
          </svg>
          <FaShoppingCart
            size={25}
            color="black"
            className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <IoIosHeart
            size={25}
            color="black"
            className="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
           />
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
