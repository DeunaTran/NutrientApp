// routes/product.tsx

import { useParams } from "react-router";
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
            console.log("orders of user: ", data)
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



//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         const { data, error } = await supabase
//           .from("Product")
//           .select("*")
//           .eq("id", id)
//           .single();

//         if (error) {
//           console.error("Failed to fetch product:", error.message);
//         } else {
//           setProduct(data);
//           console.log("Product fetched successfully:", data);
//         }

//         setLoading(false);
//       };

//       fetchProduct();
//     }
//   }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [product]);
  const [isAdd, setIsAdd] = useState(true);


  const [isCartOpen, setIsCartOpen] = useState(false);


  return (

    <div className="md:pt-24 pt-16 md:grid md:px-4 md:grid-cols-2 md:gap-4 lg:gap-0 xl:gap-12 2xl:gap-16 bg-white min-h-screen">
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

        {orders?.map((order, index)=> {
        return <div className=" px-40 mt-9 min-h-screen col-span-2 grid grid-cols-2 justify-center items-center">
            <div className=" flex flex-row items-end col-span-1 ">
                <img 
                    className="w-auto h-96 py-10 object-contain"
                    src="https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//Order%20Tracking.jpg"
                />
            </div>
            <div className="grid grid-cols-2 mt-20 text-black">
                {/* <div className="flex flex-col">
                    <GiPositionMarker />
                    <p>
                        {order.address}
                    </p>
                </div>
                <div className="flex flex-col">
                    <MdOutlinePayment /> 
                    <p>
                        {order.payment}
                    </p>
                </div>
                
                <div className="flex flex-col">
                    <AiOutlineTruck />
                    <p>
                        {order.status}
                    </p>
                </div>
                <div className="flex flex-col">
                    <FaBarcode />
                    <p>
                        {order.tracking_order_code}
                    </p>
                </div> */}
                <div className=" text-xs gap-2 font-light flex flex-col">
                    <div className="text-base font-semibold capitalize">{order.full_name}</div>
                    {order.status !== "rejected" && <div className="flex mb-4 flex-row justify-start items-center "> <RiVerifiedBadgeFill color={"green"} /> Verified Shop </div>}
                    <div> <span className="font-semibold"> Trạng thái:</span> {order.status}</div>
                    <div> <span className="font-semibold">  Điạ chi:</span> {order.address}</div>
                    <div>   <span className="font-semibold"> Thành tiền: </span> {order.cost}</div>

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
