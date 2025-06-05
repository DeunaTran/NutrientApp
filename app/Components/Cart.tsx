

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';   
import { Input } from "@headlessui/react";
import clsx from 'clsx';
import type { AuthenticateProps } from '~/library/interface';
import supabase from 'utils/supabase';
import type { Product } from '~/library/interface';
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { PiTeaBagThin } from 'react-icons/pi';
import { CiBank, CiDiscount1 } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineTruck } from 'react-icons/ai';
import { RiBankCardLine } from "react-icons/ri";

const provinces = [
  'Hà Nội',
  'Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Tĩnh',
  'Hải Dương',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];

export function Cart({isCartOpen, setIsCartOpen, setProfile, isAuth, setOpenAuthModal, profile, products} : AuthenticateProps) {   



    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState( "");
    const [address, setAddress] = useState(profile?.address || "");
    const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
    const [email, setEmail] = useState(user?.user_metadata?.email || "");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [loading, setLoading] = useState(false);
    const [province, setProvince] = useState('');
    const sizes= [ "M", "L", "XL", "XXL"]; // Add or modify sizes as needed
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
      const colors = [
    { name: "Black", value: "#000000" },
    // { name: "Light Green", value: "#90EE90" }, // pastel/light green
  ];
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const vouchers = [
    {
        title: "Voucher cho người mới (còn 17)",
        description: "Giảm 30K FreeShip cho đơn đầu tiên",
        expiry: "HSD: 30/6/2025",
        minimumPurchase: 100000, // Minimum purchase amount to apply this voucher
        discount: 30000, // Discount amount for this voucher
    },
    {
        title: "Voucher cuối tuần",
        description: "Giảm 50K cho đơn từ 299K",
        expiry: "HSD: 15/7/2025",
        minimumPurchase: 299000, // Minimum purchase amount to apply this voucher
        discount: 50000, // Discount amount for this voucher

    },
    // Add more vouchers as needed
    ];
    const [voucherCode, setVoucherCode] = useState("");
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
    if (profile) {
        // Calculate total purchase amount from the cart
        const total = Object.entries(profile.cart || {}).reduce((sum, [productId, quantity]) => {
            const product = products?.find(p => p.id === Number(productId));
            return sum + (product ? product.price * quantity : 0);
        }, 0);
        setTotalPurchase(total);
        const totalDiscount = vouchers.reduce((sum, voucher) => {
            if (total >= voucher.minimumPurchase) {
                return sum + voucher.discount;
            }
            return sum; 
        }, 0);
        setTotalDiscount(totalDiscount);


      }
    }, [profile]);




    useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
        setUser(data.user);
        console.log("User:", data.user);
        console.log("Profile in header space:", profile);
        }
        else {
        console.log("No user is in header space.");
        setOpenAuthModal();
        setProfile({cart:{}, user_id: "", created_at:"" })
        }
    });
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
      email: string,
      province: string,
    ) => {
      setLoading(true);
      if (!profile) {
        alert("Vui lòng đăng nhập trước khi đặt hàng.");
        return;
      }
    
      const { user_id, cart } = profile;
    
      // Validate fields
      if (!fullName || !address || !phone || !email || !payment || !province) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
    
      if (!/^\d{10}$/.test(phone)) {
        alert("Số điện thoại phải có đúng 10 chữ số.");
        return;
      }
    
      // Compute total cost
      let total = totalPurchase - totalDiscount;
      if (total < 0) total = 0; // Ensure total is not negative

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
          province,
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

    <div className=' bg-black/80  wd:w-full  top-0 right-0 z-30'>
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
                
                <nav className="flex  font-thin md:w-4xl bg-white md:shadow-lg  ml-4 text-gray-900 flex-col text-left  w-screen h-screen py-2 transform transition-transform duration-500 ease-in-out  items-left space-y-8 fixed top-0 right-0  ">
                
                <div className="flex  max-h-screen pb-20 overflow-y-auto flex-col items-start space-y-2 p-4">
                    <div className="flex flex-row px-2 w-full justify-between items-stretch"> 
                        {!isAuth && <button
                        className="py-1 px-2 border rounded-sm w-full text-center"
                            onClick={setOpenAuthModal} >
                        Đăng nhập tài khoản
                        </button>}
                        <button className='cursor-pointer' onClick={()=>{setIsCartOpen(false)}} >
                            <FaTimes color=" black " size={22} /> 
                        </button>
                    </div>
                    <div className=" text-sm px-3 relative md:grid grid-cols-1 md:grid-cols-2 w-full gap-4"> 
                        <div className="flex gap-8 md:pt-20 pt-4 w-full flex-col items-start space-y-2 ">
                            {products && products.map((product) => {
                            if (profile?.cart[product.id]) {
                                return (
                                <div key={product.id} className="grid px-3 md:w-full grid-cols-3 w-80  gap-4 items-center">
                                    <img src={product.img2} alt={product.name} className="h-30 w-30 object-cover " />
                                    <div className="flex flex-col col-span-2 gap-2 items-start"> 
                                    <p className="text-base font-semibold">{product.name}</p>
                                    <p className="text-sm font-light">
                                        {(product.price * profile.cart[product.id]).toLocaleString("vi-VN")} đ
                                    </p>

                                    <div className="flex flex-row gap-2 items-left bg-white text-black font-thin max-w-4xl mx-auto">
                                    { sizes.map((size) => (
                                        <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`text-xs font-thin border px-5 py-1 transition-colors duration-200 ${
                                            selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-black border"
                                        }`}
                                        >
                                        {size}
                                        </button>
                                    ))}
                                    </div>

                                    <div className="flex flex-row gap-1 items-start w-full px-2 bg-white max-w-4xl mx-auto">
                                    {colors.map((color) => (
                                        <div
                                        key={color.value}
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`w-14 h-6  cursor-pointer border-2 ${
                                            selectedColor === color.value ? "border-black scale-110" : "border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                        />
                                    ))}
                                    </div>
        
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
                            <div className="flex flex-row overflow-x-auto max-w-full px-2 py-2 font-serif bg-white gap-2 mx-auto scrollbar-hide">
                                {vouchers.map((voucher, index) => (
                                    <div
                                    key={index}
                                    className={clsx(

                                        "flex w-[360px] min-w-[300px] flex-row rounded-lg px-4 shadow-md",
                                        150000> voucher.minimumPurchase  ? "bg-gray-200" : "bg-gray-50 backdrop-blur-2xl"
                                    )}
                                    // className=
                                    >
                                    <div className="border-r border-gray-600 my-2" />
                                        <div className="flex flex-col items-start justify-center pl-2 py-3">
                                            <span className="text-sm font-medium">{voucher.title}</span>
                                            <span className="text-xs text-gray-700">{voucher.description}</span>
                                            <span className="text-xs font-light text-gray-700">{voucher.expiry}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex flex-row  gap-2 justify-between items-center w-full ">  
                                <Input
                                type="text"
                                value={voucherCode}
                                placeholder="Nhập mã giảm giá" 
                                onChange={(e) => setVoucherCode(e.target.value)}
                                required
                                className={clsx(
                                    ' block w-1/2 rounded-3xl font-semibold border text-sm bg-gray-100 px-3 py-1.5 md:py-2  text-black',
                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                )}
                                />
                                <button 
                                className={clsx(
                                    ' block w-1/2 rounded-3xl font-semibold border text-xs px-1 py-1.5 md:py-2  text-white',
                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                                    voucherCode == "" ? "bg-gray-400" : "bg-black cursor-pointer"
                                )}
                                >
                                    Áp dụng Voucher

                                </button>

                            </div>

                            <div className="flex w-full gap-2 text-sm  font-semibold flex-col px-4">
                                <div className='border w-full border-gray-200'></div>
                                <div className="flex flex-row justify-between items-center w-full px-2 py-2">
                                    <span className=" ">Tạm tính</span>
                                    <span className="">
                                        {totalPurchase.toLocaleString("vi-VN") + " đ"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center w-full px-2 py-2">
                                    <span className=" ">Giảm giá</span>
                                    <span className="">
                                        {totalDiscount.toLocaleString("vi-VN") + " đ"} 
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center w-full px-2 py-2">
                                    <span className=" ">Phí giao hàng</span>
                                    <span className="">
                                        Miễn phí
                                    </span>
                                </div>
                                <div className='border w-full border-gray-200'></div>

                                 <div className="flex flex-row justify-between items-center w-full px-2 py-2">
                                    <span className=" ">Tổng</span>
                                    <div className=" flex flex-col items-end ">
                                        <span className="text-xs text-gray-500"> (Đã bao gồm VAT) </span>
                                        <span className="font-semibold ">
                                        {totalPurchase - totalDiscount > 0 ? (totalPurchase - totalDiscount).toLocaleString("vi-VN") + " đ" : "0 đ"}
                                        </span>
                                        <span className="text-xs font-light text-red-800"> (Đã giảm {totalDiscount} trên giá gốc) </span>
                                    </div>
                                </div>


                            </div>

                        </div>
        
                        <div className="text-small md:text-lg md:font-light font-thin mt-2 gap-2 flex flex-col items-start">
                            <div className=" pt-8  md:pt-0 md:text-3xl text-xs font-bold md:font-light md:mb-5 "> Chi tiết thanh toán </div>
                            <div className='flex flex-row justify-between gap-1'>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên
                                    </label>
                                    <Input
                                    type="text"
                                    value={fullName}
                                    placeholder="Nhập họ và tên của bạn" 
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className={clsx(
                                        ' block w-full rounded-3xl border bg-white px-3 py-1.5 md:py-3 text-sm text-black',
                                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                    )}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>
                                    <Input
                                    type="text"
                                    value={phone}
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className={clsx(
                                        ' block w-full rounded-3xl border bg-white px-3 py-1.5 md:py-3 text-sm text-black',
                                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                    )}
                                    />
                                </div>
                            </div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-0">
                                Email
                            </label>
                            <Input
                            id='email'
                            type="text"
                            value={email}
                            placeholder="Theo dõi đơn hàng qua Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={clsx(
                                    ' block w-full rounded-3xl border bg-white px-3 py-1.5 md:py-3 text-sm text-black',
                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                )}
                            />

                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-0">
                                Điạ chỉ giao hàng
                            </label>
                            <Input
                            type="text"
                            value={address}
                            placeholder="Địa chỉ (ví dụ: 7 Ngô Quyền, Phường Lộc Phát, Quận 1)"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className={clsx(
                                    ' block w-full rounded-3xl border bg-white px-3 py-1.5 md:py-3 text-sm text-black',
                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                )}
                            />
                            <select
                                className=" border my-3 text-sm w-1/2 rounded-3xl px-4 py-3"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            >
                                <option value="">-- Chọn tỉnh/thành phố --</option>
                                {provinces.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                                ))}
                            </select>

                            
                            <div className="md:my-8 mt-8 mb-56 flex flex-col items-start space-y-2 w-full">
                                <div className=" text-xs md:text-2xl md:mb-5 font-bold "> Phương thức thanh toán </div>
                                
                                <div
                                className={clsx(
                                    'flex w-full flex-row items-center gap-2 p-2 border border-gray-300 rounded cursor-pointer',
                                    paymentMethod === 'cash' && 'border-2 border-gray-900'
                                )}
                                onClick={() => setPaymentMethod('cash')}
                                >
                                <TbTruckDelivery size={30} />
                                Thanh toán khi nhận hàng
                                </div>

                                <div
                                className={clsx(
                                    'flex w-full flex-row items-center gap-2 p-2 border border-gray-300 rounded cursor-pointer',
                                    paymentMethod === 'credit' && 'border-2 border-gray-900'
                                )}
                                onClick={() => setPaymentMethod('credit')}
                                >
                                    <CiBank size={30}  />
                                    Thanh toán qua thẻ tín dụng/ghi nợ
                                    <br/>
                                </div>
                                {paymentMethod === 'credit' && 
                                    <>
                                    <img src='https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//QR_Momo.jpg'
                                    className='w-1/2 h-auto rounded-lg'
                                    />
                                    <span className="text-xs text-gray-500"> Quét mã QR và chuyển khoản. Sau đó nhân viên sẽ duyệt đơn hàng của bạn </span>
                                    </>
                                }

                                {/* <select
                                    className="w-full border border-gray-300 rounded px-3 py-1"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">Thanh toán khi nhận hàng</option>
                                    <option value="credit">Thẻ tín dụng/Ghi nợ</option>
                                </select> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex  fixed w-full md:w-4xl border-t border-gray-400 py-4  bg-gray-100  bottom-0 px-4 right-0 flex-col items-center space-y-2 shadow-lg">
                        <div className=" grid md:grid-cols-4 grid-cols-2   shadow-2xl  ">
                            {/* <div className=" text-xs "> Chọn khuyến mại và đặt hàng </div> */}
                            <div className='col-span-2 flex flex-row items-center  justify-between gap-2'>
                                <button
                                    className=" cursor-pointer md:px-8 px-3 min-w-30 py-2 text-base md:text-xl font-base   border  bg-black text-white rounded-full text-center"
                                    onClick={() => {
                                    console.log("Proceed to checkout");
                                    if (products) {
                                        submitOrder(profile, products, paymentMethod, fullName, address, phone, email, province);
                                    }
                                    }}
                                >
                                    {loading?  "... Đang xử lý ..." : "Đặt hàng"}
                                </button>
                                <div className='flex flex-col items-center justify-center gap-0'>

                                    <p className='text-sm   font-light gap-2 text-gray-800'>
                                        Thành tiền
                                        <span className='text-blue-500 text-xl font-bold'>
                                        { totalPurchase - totalDiscount > 0 ? (totalPurchase - totalDiscount).toLocaleString("vi-VN") + " đ" : "0 đ"}
                                        </span>
                                    </p>
                                    <p className='text-xs text-gray-500 font-light'> Nhận ngay Voucher 20%  khi mua đơn đầu tiên</p>
                                </div>
                            </div>
                            <div className='flex col-span-2 justify-end items-center text-lg font-semibold text-gray-800'>
                                {paymentMethod === 'credit' &&
                                <>
                                    < RiBankCardLine  size={40} color='gray' /> 
                                    <span className='text-base font-normal'> <span className='font-black'> Chuyển khoản ngân hàng </span>  </span>
                                </>}
                                {
                                paymentMethod === 'cash' &&
                                <>
                                    <AiOutlineTruck size={40} color='gray' /> 
                                    <span className='text-base font-normal'> <span className='font-black'> COD </span> Thanh toán khi nhận hàng </span>
                                </>

                                }


                            </div>
                        </div>
                    </div>
    
                </div>
                
                
    
                </nav>
            </motion.div>
        )}


        </AnimatePresence>
    </div>
  );
}