// routes/product.tsx

import { NavLink, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import supabase from "utils/supabase";
import { type CartItem, type Order, type Product } from "~/library/interface";
import { type UserProfile } from "~/library/interface";
import Footer from "~/Components/Footer";
import LoginSale from "~/Components/LoginSale";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import Authenticate from "~/Components/Authenticate";
import { GiPositionMarker } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineTruck } from "react-icons/ai";
import { FaBarcode } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import type { User } from "@supabase/supabase-js";



export default function ProductPage() {
    // const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [authOpen, setAuthOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        cart: {},
        created_at: "",
        user_id: "",
    }); 
    const [user, setUser] = useState<User>();
    const sizes= [ "M", "L", "XL", "XXL"]; // Add or modify sizes as needed

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [orders, setOrders] = useState<Order[]>();

    function updateProfile(newCart: Record<string, CartItem>){
        setProfile({ ...profile, cart: newCart });
        if(isAuthenticated){
            supabase
                .from("Profile")
                .update({ cart: newCart })
                .eq("user_id", profile.user_id)
                .then(({ error }) => {
                if (error) console.error("Failed to update cart:", error.message);
                });
            console.log("Updated cart:", newCart);
        }
    }

    const fetchProducts = async () => {
        setLoadingProducts(true);
        const { data, error } = await supabase
        .from("Product") // Adjust table name if different
        .select("*");

        if (error) {
        console.error("Error fetching products:", error.message);
        } else {
        setProducts(data);
        }
        setLoadingProducts(false);
    };
    const fetchOrder = async (uid: string) => {
        const { data, error } = await supabase
        .from("Order")
        .select("*")
        .eq("user_id", uid);

        if (error) {
        console.error("Error fetching orders:", error);
        } else {
            setOrders(data);
            console.log("orders of user: ", data);
        }
        setLoading(false);
    };



  useEffect(() => {
    fetchProducts(); // Always fetch product list on load
    if(!isAuthenticated) {
      // Check if user is authenticated on initial load
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setIsAuthenticated(true);
          fetchOrder(data.user.id)
          fetchProfile(data.user.id);
          setUser(data.user)
          console.log("User is logged in:", data.user);
        } else {
          console.log("No user is logged in.");
          setProfile({
            cart: {},
            created_at: "",
            user_id: "",
          });
        }
      });
    }
    // Check if user is authenticated on initial load 
  }, [isAuthenticated]);
  

  // Function to fetch Profile from supabase
  const fetchProfile = async (userId: string) => {
    setLoadingProfile(true);
    const { data, error } = await supabase
      .from("Profile")
      .select("*") // or select('role, cart, ...') if you want specific columns
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error); // Reset profile if there's an error
      
    } else {
      setProfile(data);
      // setCart(data.cart || {}); // Ensure cart is set from profile
      console.log("Profile fetched successfully:", data);
    }
    setLoadingProfile(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [product]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (

    <div className="md:pt-0 pt-4 md:grid grid-cols-1 md:px-4 md:grid-cols-2 md:gap-4 lg:gap-0 xl:gap-12 2xl:gap-16 bg-white  min-h-screen">
        <HeaderBannerPage isAuth={isAuthenticated} setOpenAuthModal={() => setAuthOpen(true)} setAuth={setIsAuthenticated} profile={profile} setProfile={setProfile} products={products} isCartOpen={isCartOpen}
    setIsCartOpen={setIsCartOpen} />
        <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        
        {!isAuthenticated && 
            <>
            <div className="w-full ml-30 cursor-pointer h-screen col-span-1"
            onClick={()=> {setAuthOpen(true)}}
            >
                <img 
                    className="w-auto h-full object-contain"
                    src="https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//Order%20Tracking.jpg"
                />
            </div>
            <div className="text-black pt-30 text-2xl  font-thin">
                <p>
                    Bạn hiện tại chưa đăng nhập vào hệ thống của Gapz.
                    <br/>
                    Hãy đăng nhập để biết về những kiện hàng mà Gapz đang vận chuyển tới bạn

                </p>
                <button
                 className="text-white mt-5 cursor-pointer bg-black p-6 py-3 text-lg rounded-full"
                 onClick={()=> {setAuthOpen(true)}}
                 > Đăng nhập</button>
            </div>

            </>
        }

          <div className=" md:col-span-2 mt-30 text-black md:px-30 px-4 ">
                <div className=" text-xs gap-2 font-light flex flex-col ">
                    <div className="text-base font-semibold capitalize">Theo giõi tiến độ đơn hàng của bạn</div>
                    <div> <span className="font-semibold"> Khách hàng: </span> {user?.user_metadata.full_name}</div>
                    <div> <span className="font-semibold">ID: </span> {user?.id}</div>
                    <div> <span className="font-semibold"> Email: </span> {user?.user_metadata.email}</div>
                    <div> <span className="font-semibold"> Phone: </span> {user?.user_metadata.email}</div>
                <div/>
              </div>
          </div>
        

        {orders?.map((order, index)=> {
        return <div className="mt-1  col-span-2 grid grid-cols-1 md:grid-cols-3 justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 items-end justify-end col-span-2">
              {Object.entries(order.cart).map(([productKey, item]) => {
                const [productId, size] = productKey.split('_');
                const product = products.find((p) => p.id.toString() === productId);

                if (!product) return null;

                return (
                  <div
                    key={productKey}
                    className="col-span-1 mt-20  shadow-md justify-between shadow-white flex group flex-col gap-2 bg-white  mb-10 rounded-lg"
                  >
                    <NavLink to={`product/${product.id}`} className="no-underline h-full">
                      <div className="relative flex flex-row gap-1 overflow-hidden h-full w-full">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                          src={product.img2}
                          alt={`${product.name} alternate`}
                          className="absolute top-0 left-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>
                    </NavLink>

                    <div className="flex relative text-gray-700 flex-col">
                      <div className="text-base font-light text-gray-500 mb-0 text-center rounded-lg uppercase">
                        {product.code ? `${product.code} ` : ""}{product.name || "Unnamed Product"}
                      </div>

                      <div className="flex font-light flex-col items-center gap-0">
                        <p className="text-xs text-gray-400 m-0 p-0 line-through">
                          {(product.price * 110 / 100).toLocaleString("vi-VN")} Vnđ
                        </p>
                        <p className="text-sm text-gray-500 m-0 p-0">
                          {product.price.toLocaleString("vi-VN")} Vnđ
                        </p>
                      </div>

                      <div className="flex items-center justify-center w-full transition duration-800 ease-in-out flex-row gap-1">
                        <button
                          className="text-xs font-thin bg-black text-white border-black border px-3 py-1"
                        >
                          {size}
                        </button>
                        <button
                          className="text-xs font-thin bg-black text-white border-black border px-3 py-1"
                        >
                          số lượng: {item.quantity}
                        </button>

                      </div>
                      <div className="flex flex-row justify-center items-center"> màu: 
                        {[
                          { name: "black", value: "#000000" },
                          { name: "white", value: "#FFFFFF" },        // or "#808080" for standard gray
                        ].map((color) => (
                          <div
                            key={color.value}
                            className={`w-10 h-3 m-1  cursor-pointer border-2 ${
                              item.color === color.name ? "border-black scale-110 " : "border-gray-300 hidden"
                            }`}
                            style={{ backgroundColor: color.value }}
                          />
                        ))}

                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid px-3 grid-cols-1 md:grid-cols-2 mt-20 text-black ">
                
                <div className=" mb-36 text-xs gap-2 font-light flex flex-col">
                    <div className="text-base font-mono capitalize"> <span className=" text-sm font-semibold">Nguời nhận :</span> {order.full_name}</div>
                    {order.status !== "rejected" && <div className="flex mb-4 flex-row justify-start items-center "> <RiVerifiedBadgeFill color={"green"} /> Verified Shop </div>}
                    <div> <span className="font-semibold"> Trạng thái:</span> {order.status}</div>
                    <div> <span className="font-semibold">  Điạ chi:</span> {order.address}</div>
                    <div> <span className="font-semibold">  Số điện thoại:</span> {order.phone}</div>
                    <div>   <span className="font-semibold"> Thành tiền: </span> 
                    {(order.cost).toLocaleString("vi-VN")} Vnđ</div>
                    <div>   <span className="font-semibold"> Mã giao hàng: </span> 
                    {order.tracking_order_code}
                    </div>
                    <button className="rounded-lg bg-black p-2 text-white font-black cursor-pointer"
                    // onClick={}
                    onClick={() => {
                        window.open(`https://i.ghtk.vn/${order.tracking_order_code}`, '_blank');
                      }}
                    > Theo giõi đơn hàng</button>
                </div>

            </div>
        </div>

        })}
        


        


        
        <div className="col-span-2">
          <Footer/>
        </div>
    </div>
    
  );
}
