// routes/product.tsx

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import supabase from "utils/supabase";
import { type Product } from "~/library/interface";
import HeaderBanner from "~/Components/HeaderBanner";
import { type UserProfile } from "~/library/interface";
import JsonDisclosure from "~/Components/JsonDisclosure";
import Footer from "~/Components/Footer";


export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
    const [authOpen, setAuthOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>({
    cart: {},
    created_at: "",
    user_id: "",
  }); 
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Record<string | number, number>>({});

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



  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from("Product")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Failed to fetch product:", error.message);
        } else {
          setProduct(data);
          console.log("Product fetched successfully:", data);
        }

        setLoading(false);
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (

    <div className="bg-white">
        <HeaderBanner isAuth={isAuthenticated} setOpenAuthModal={() => setAuthOpen(true)} setAuth={setIsAuthenticated} profile={profile} setProfile={setProfile} products={products} />
        <div className="flex flex-col items-center bg-black backdrop-blur-3xl pt-14">
            <div className="carousel  w-screen h-auto">
                {product.imgList.map((img, index) => (
                <div className="carousel-item w-full" key={index}>
                    <img
                    src={img}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
                </div>
                ))}
            </div>
        </div>
        <div className="bg-white text-black items-center font-thin gap-1 flex flex-col text-center max-w-4xl mx-auto p-6">
          <div className="flex flex-row justify-between items-center w-full px-4">
              <div></div>
              <h2 className="text-xs text-white bg-black font-bold p-1 w-18">VSPGAP-{product.id}</h2>
                    {cart[product.id] ? (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => handleRemoveFromCart(product.id)}
                      title="Remove from Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => handleAddToCart(product.id)}
                      title="Add to Cart"
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                        />
                      </svg>
                    </button>
                  )}
            </div>
            <h1 className=" text-2xl font-thin">{product.name}</h1>
            <h1 className=" text-sm font-thin ">{product.nickname}</h1>
            <h2 className="text-sm p-1 ">{product.price.toLocaleString("vi-VN")} đ</h2>
            <JsonDisclosure json={[
                {
                    title: "Mô tả sản phẩm",
                    content: product.description,
                    defaultOpen: true
                },
                // {
                //     title: "Product Details",
                //     content: (
                //         <div className="text-left">
                //             <p>Sale: {product.sale}</p>
                //             <p>Price: {product.price.toLocaleString("vi-VN")} đ</p>
                //         </div>
                //     ),
                //     defaultOpen: false
                // }
            ]} />

        </div>
        <Footer/>
    </div>
    
  );
}
