import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import supabase from "utils/supabase";
import SignOut from "./SignOut";
import { IoCartOutline } from "react-icons/io5";
import {  type AuthenticateProps, type Product } from "~/library/interface";
import { Input } from "@headlessui/react";
import clsx from 'clsx';
import { Link } from "react-router";


const HeaderBanner = ({ isAuth, setOpenAuthModal, setAuth, setProfile, profile, products }: AuthenticateProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [fullName, setFullName] = useState( "");
  const [address, setAddress] = useState(profile?.address || "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
  const [email, setEmail] = useState(user?.user_metadata?.email || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        console.log("User is in header space", data.user);
        setUser(data.user);
        console.log("User:", data.user);
        console.log("Profile in header space:", profile);
      }
      else {
        console.log("No user is in header space.");
      }
    });
    setMobileMenuOpen(false);
    setIsCartOpen(false);
    setSearchOpen(false);
  }, [isAuth]);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateProductQuantity = (productId: string | number, quantity: number) => {
    if (!profile) return;

    const newCart = { ...profile.cart };

    if (quantity <= 0) {
      delete newCart[productId];
    } else {
      newCart[productId] = quantity;
    }

    setProfile({ ...profile, cart: newCart });

    // Optionally update in Supabase:
    supabase
      .from("Profile")
      .update({ cart: newCart })
      .eq("user_id", profile.user_id)
      .then(({ error }) => {
        if (error) console.error("Failed to update cart:", error.message);
      });
    console.log("Updated cart:", newCart);
  };

const submitOrder = async (
  profile: { user_id: string; cart: Record<string, number> } | null | undefined,
  products: Product[] ,
  payment: string,
  fullName: string,
  address: string,
  phone: string,
  email: string
) => {
  setLoading(true);
  if (!profile) {
    alert("Vui lòng đăng nhập trước khi đặt hàng.");
    return;
  }

  const { user_id, cart } = profile;

  // Validate fields
  if (!fullName || !address || !phone || !email || !payment) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Số điện thoại phải có đúng 10 chữ số.");
    return;
  }

  // Compute total cost
  let total = 0;
  for (const [id, quantity] of Object.entries(cart)) {
    const product = products.find(p => p.id === Number(id));
    if (product) {
      total += product.price * quantity;
    }
  }
  if(total == 0){
    alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
    setLoading(false);
    return;
  }

  // Create order in Supabase
  const { error } = await supabase.from("Order").insert([
    {
      user_id,
      cart,
      cost: total,
      payment,
      full_name: fullName,
      address,
      phone,
      email,
      status: "pending",
    }
  ]);

  if (error) {
    console.error("Error submitting order:", error.message);
    alert("Lỗi khi đặt hàng. Vui lòng thử lại.");
  } else {
    alert("Đặt hàng thành công!");
  }
  setLoading(false);
  setFullName("");
  setAddress("");
  setPhone("");
  setEmail("");
  setPaymentMethod("");
  setIsCartOpen(false);

};

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
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
        <div className="col-span-2 mb-2">
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
          <Link to="/" className="flex items-center">
            <img
              src={
                isScrolled
                  ? "https://i.ibb.co/zg5RPFD/Logo-Th-ng-4.png" // Logo when scrolled
                  : "https://i.ibb.co/d0sN71VG/dsa.png"         // Logo when NOT scrolled
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
        )}
        {isCartOpen && (
          <nav className="flex  font-thin  ml-10 text-gray-900 flex-col text-left w-96 h-screen py-2 transform transition-transform duration-500 ease-in-out  items-left space-y-8 fixed top-0 left-0 bg-white p-4 ">
            {!isAuth && 
            <>
              <button onClick={() => setIsCartOpen(!isCartOpen)}>
                <FaTimes color="gray" size={22} /> 
              </button>
              <button
                className="py-1 px-2 border rounded-sm w-full text-center"
                onClick={setOpenAuthModal} >
                Đăng nhập tài khoản
              </button>
            </>
            }
            {isAuth && 
            <div className="flex max-h-screen pb-20 overflow-y-auto flex-col items-start space-y-2 p-4">
              <div className="flex flex-row w-full justify-between items-stretch"> 
                <div className=" font-light "> Giỏ hàng </div>
                <button onClick={() => setIsCartOpen(!isCartOpen)}>
                  <FaTimes color="gray" size={22} /> 
                </button>
              </div>
              <div className=" text-sm"> 
                <div className="flex w-full flex-col items-start space-y-2 mt-2">
                  {products && products.map((product) => {
                    if (profile?.cart[product.id]) {
                      return (
                        <div key={product.id} className="grid px-3 grid-cols-3 w-80  gap-4 items-center">
                          <img src={product.img2} alt={product.name} className="h-30 w-30 object-cover " />
                          <div className="flex flex-col col-span-2 gap-2 items-start"> 
                            <p className="text-sm font-thin">{product.name}</p>
                            <p className="text-sm font-thin">
                              {(product.price * profile.cart[product.id]).toLocaleString("vi-VN")} đ
                            </p>

                            <div className="flex flex-row justify-between w-full">
                              <div className="relative w-30 mt-1">
                                <button
                                  className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center justify-center bg-white rounded hover:bg-slate-200"
                                  type="button"
                                  onClick={() =>
                                    updateProductQuantity(product.id, (profile.cart[product.id] || 0) - 1)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                  </svg>
                                </button>

                                <input
                                  type="number"
                                  className="w-full pl-4 h-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                  placeholder="0"
                                  value={profile.cart[product.id] || 0}
                                  onChange={(e) =>
                                    updateProductQuantity(product.id, parseInt(e.target.value) || 0)
                                  }
                                />

                                <button
                                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center justify-center bg-white rounded hover:bg-slate-200"
                                  type="button"
                                  onClick={() =>
                                    updateProductQuantity(product.id, (profile.cart[product.id] || 0) + 1)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <button
                                className="text-gray-500 underline text-xs"
                                onClick={() => {
                                  const newCart = { ...profile.cart };
                                  delete newCart[product.id];
                                  setProfile({ ...profile, cart: newCart });
                                }}
                              >
                                Xóa 
                              </button>
                            </div>
                          </div>
                          <div className="border border-gray-300 pl-2 col-span-3"> </div>
                        </div>
                      );
                    }
                    return null;
                  })}


                </div>

              <div className="text-small font-thin mt-2 ">
                <div className=" text-xs "> Chi tiết thanh toán: </div>

                  <Input
                    type="text"
                    value={fullName}
                    placeholder="Họ và tên"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={clsx(
                        'mt-0 block w-full rounded-lg border-none bg-white/30 px-3 py-1.5 text-sm text-black',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                  <Input
                    type="text"
                    value={phone}
                    placeholder="Số điện thoại"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={clsx(
                        'mt-0 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-black',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                  <Input
                    type="text"
                    value={address}
                    placeholder="Địa chỉ giao hàng"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={clsx(
                        'mt- block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-black',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                  <Input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={clsx(
                        ' block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-black',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                  <div className="mb-8">
                    <label>Phương thức thanh toán:</label>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-1"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="cash">Thanh toán khi nhận hàng</option>
                      <option value="credit">Thẻ tín dụng/Ghi nợ</option>
                    </select>
                  </div>
                  {/* <div className=" "> Số điện thọai: {user?.user_metadata.phone} </div>
                  <div className=" ">Đia chi giao hang </div>
                  <div className=" "> Họ tên </div>
                  <div className=" "> Email: {user?.user_metadata.email} </div> */}
                  {/* <div className=" "> Số sản phẩm trong giỏ hàng: {Object.keys(profile?.cart || {}).length} </div> */}
                </div>
              </div>

              <div className="flex  w-80 fixed p-4 bottom-0 flex-col items-start space-y-2 mt-4">
                <div className="border w-full border-gray-300 pl-2 col-span-3"> </div>
                <div className=" text-xs "> Chọn khuyến mại và đặt hàng </div>
                <button
                  className="py-1 px-2 border gi bg-black text-white rounded-sm w-full text-center"
                  onClick={() => {
                    console.log("Proceed to checkout");
                    if (products) {
                      submitOrder(profile, products, paymentMethod, fullName, address, phone, email);
                    }
                  }}
                >
                  
                  {loading?  "... Đang xử lý ..." : "Thanh toán"}
                </button>
              </div>
            </div>
            
            }
            

          </nav>
        )}
        {searchOpen && (
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
        )}

      </div>
    </header>
  );
};

export default HeaderBanner;
