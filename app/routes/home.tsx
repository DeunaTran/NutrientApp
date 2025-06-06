import HomeCarousel from "~/Components/HomeCarousel";

import { useState, useEffect } from "react";
import ProductList from "../Components/ProductList";
import ScrollVideo from "~/Components/ScrollVideo";
import ScrollVideo2 from "~/Components/ScrollVideo2";
import Footer from "~/Components/Footer";
import supabase from "utils/supabase";
import Authenticate from "~/Components/Authenticate";
import { type Product } from "~/library/interface";
import Cookies from "~/Components/Cookies";
import LoginSale from "~/Components/LoginSale";
import { HomeInfoBox } from "~/Components/HomeInfoBox";
import HeaderBannerPage from "~/Components/HeaderBannerPage";


interface UserProfile {
  cart: Record<string, any>; // or a more specific type if you know cart shape
  created_at: string;
  user_id: string;
}



export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile >({
    cart: {},
    created_at: "",
    user_id: "",
  }); 
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Record<string | number, number>>({});
  const [isCookiesOpen, setIsCookiesOpen] = useState(true)

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
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


  const handleAddToCart = async (id: string | number) => {
    if (!profile) return;

    const updatedCart = {
      ...(profile.cart || {}),
      [id]: 1, // or you can use true or a quantity
    };

    const { error } = await supabase
      .from("Profile")
      .update({ cart: updatedCart })
      .eq("user_id", profile.user_id);

    if (error) {
      console.error("Error updating cart:", error.message);
      return;
    }

    setProfile({ ...profile, cart: updatedCart }); // update local state
    console.log("Product added to cart:", id);
    fetchProfile(profile.user_id); // Refresh profile to get updated cart
    setCart(updatedCart); // Update local cart state
  };


  const handleRemoveFromCart = async (id: string | number) => {
    if (!profile) return;

    const updatedCart = { ...(profile.cart || {}) };
    delete updatedCart[id];

    const { error } = await supabase
      .from("Profile")
      .update({ cart: updatedCart })
      .eq("user_id", profile.user_id);

    if (error) {
      console.error("Error removing from cart:", error.message);
      return;
    }

    setProfile({ ...profile, cart: updatedCart }); // update local state
    console.log("Product removed from cart:", id);
    fetchProfile(profile.user_id); // Refresh profile to get updated cart
    setCart(updatedCart); // Update local cart state
  };

  useEffect(() => {
    fetchProducts(); // Always fetch product list on load
    if(!isAuthenticated) {
      // Check if user is authenticated on initial load
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setIsAuthenticated(true);
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
      setCart(data.cart || {}); // Ensure cart is set from profile
      console.log("Profile fetched successfully:", data);
    }
    setLoadingProfile(false);
  };
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginSaleOpen, setIsLoginSaleOpen] = useState(true);


  
  return (
    <div className="bg-white">
      <LoginSale isOpen={isLoginSaleOpen} setIsOpen={setIsLoginSaleOpen} setAuthOpen={setAuthOpen} />
      <HeaderBannerPage isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} isAuth={isAuthenticated} setOpenAuthModal={() => setAuthOpen(true)} setAuth={setIsAuthenticated} profile={profile} setProfile={setProfile} products={products} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
      <Cookies isOpen={isCookiesOpen} setIsOpen={setIsCookiesOpen} />
      <HomeCarousel />

      <div id="/products" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4 px-4">
        <ProductList
        products={products}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      </div>
      <div className="flex justify-center items-center  mb-10">
        <button
          className="bg-gray-800 md:w-sm w-full mx-8 cursor-pointer text-white px-10 py-2  font-semibold transition-colors hover:bg-black"
          onClick={() => setIsCartOpen(true)}
        >
          View Cart
        </button>
      </div>
      <HomeInfoBox/>

      <ScrollVideo />
      <ScrollVideo2 />
      <Footer />
    </div>
  );
}