

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';   
import { Input } from "@headlessui/react";
import clsx from 'clsx';
import type { AuthenticateProps } from '~/library/interface';
import supabase from 'utils/supabase';
import type { Product } from '~/library/interface';
import { motion, AnimatePresence } from "framer-motion";



export function Cart({isCartOpen, setIsCartOpen, setProfile, isAuth, setOpenAuthModal, profile, products} : AuthenticateProps) {   
    
    
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
        setUser(data.user);
        console.log("User:", data.user);
        console.log("Profile in header space:", profile);
        }
        else {
        console.log("No user is in header space.");
        }
    });
    // setMobileMenuOpen(false);
    // setIsCartOpen(false);
    // setSearchOpen(false);
    }, [isAuth]);

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
      products: Product[],
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

    <div className=' bg-black wd:w-full md:pl-64 top-0 right-0 z-30'>
        <AnimatePresence>
        {isCartOpen && (
            <motion.div
            initial={{ x: "100%" }}         // Start off-screen to the left
            animate={{ x: 0 }}               // Slide in
            exit={{ x: "100%" }}            // Slide out
            transition={{
                x: { type: "tween", duration: 0.4 }, // Applies to both animate and exit
            }}
            className=""
            >
                
                <nav className="flex  font-thin md:w-96 md:bg-white md:shadow-lg  ml-4 text-gray-900 flex-col text-left  w-screen h-screen py-2 transform transition-transform duration-500 ease-in-out  items-left space-y-8 fixed top-0 right-0 bg-white p-4 ">
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
                    <button className='cursor-pointer' onClick={()=>{setIsCartOpen(false)}} >
                        <FaTimes color=" black " size={22} /> 
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
    
                    <div className="flex  w-full relative bottom-0 p-4 left-4 flex-col items-center space-y-2 mt-4">
                    <div className="border-t-2   bg-gray-100 shadow-2xl  ">
                        <div className=" text-xs "> Chọn khuyến mại và đặt hàng </div>
                        <button
                            className="py-1 px-20 border  bg-black text-white rounded-sm text-center"
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
                </div>
                
                }
                
    
                </nav>
            </motion.div>
        )}


        </AnimatePresence>
    </div>
  );
}