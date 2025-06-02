// routes/product.tsx

import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import supabase from "utils/supabase";
import { type Product } from "~/library/interface";
import HeaderBanner from "~/Components/HeaderBanner";
import { type UserProfile } from "~/library/interface";
import JsonDisclosure from "~/Components/JsonDisclosure";
import Footer from "~/Components/Footer";
import { HomeInfoBox } from "~/Components/HomeInfoBox";
import { ProductInfoBox } from "~/Components/ProductInfoBox";
import LoginSale from "~/Components/LoginSale";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import { ProductIntroBox } from "~/Components/ProductIntroBox";


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
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [product]);
  const [isAdd, setIsAdd] = useState(true);
  
  const sizes = ["XS", "S", "M", "L", "XL"]; // Add or modify sizes as needed

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#A9A9A9" },        // or "#808080" for standard gray
    { name: "Light Green", value: "#90EE90" }, // pastel/light green
  ];

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);


  if (loading) return <div></div>;
  if (!product) return <div>Product not found</div>;
  return (

    <div className="md:pt-24 pt-16 md:grid md:px-4 md:grid-cols-2 md:gap-4 lg:gap-0 xl:gap-12 2xl:gap-16 bg-white min-h-screen">
      <LoginSale isOpen={isAdd} setIsOpen={setIsAdd} setAuthOpen={setAuthOpen} />
      <HeaderBannerPage isAuth={isAuthenticated} setOpenAuthModal={() => setAuthOpen(true)} setAuth={setIsAuthenticated} profile={profile} setProfile={setProfile} products={products} isCartOpen={isCartOpen}
  setIsCartOpen={setIsCartOpen} />
        {/* <div id="item" className=" md:hidden  flex flex-col items-center bg-white/10 backdrop-blur-3xl pt-14">
            <div className="carousel carousel-center bg-white space-x-2 px-4 py-10 ">
              {product.imgList.map((img: string, index: number) => (
                <div
                  key={index}
                  
                  className="carousel-item w-full flex-shrink-0 snap-center"
                  id={`item${index + 1}`}
                  data-index={index}
                >
                  <img src={img} className="w-full" alt={`product-${index}`} />
                </div>
              ))}
            </div>
        </div> */}
        <div className=" ">
            <div
              className=" w-full flex-shrink-0 snap-center"
            >
              <img src={product?.imgList[imgIndex]} className="w-full" alt={`product-${imgIndex}`} />
            </div>
        </div>
        <div className="md:mt-0 md:grid md:grid-cols-3 bg-white text-black items-center font-thin gap-1 flex flex-col text-center max-w-4xl mx-auto p-6 py-1">
            <div className="flex gap-1 flex-row md:flex-col">
              {product.imgList.map((img: string, index: number) => (
                <div
                  key={index}
                  className=" md:w-full my-4 flex-shrink-0 snap-center"
                  id={`item${index + 1}`}
                  data-index={index}
                  onClick={() => {
                    setImgIndex(index);
                  }}

                > 
                  {index === imgIndex ? (
                    <img src={img} className="w-16 md:w-24 h-auto border-2 border-black" alt={`product-${index}`} />  
                  ) : ( 
                  <img src={img} className= "md:w-24 w-16 h-auto" alt={`product-${index}`} />
                  )
                }
                </div>
              ))}
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-row justify-center items-center w-full">
                  {/* <div></div> */}
                  <h2 className="text-xs  text-center text-white bg-black font-bold p-1 w-18">VSPGAP-{product.id}</h2>
                      {/* {cart[product.id] ? (
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
                    )} */}
              </div>
              <h1 className=" text-2xl font-thin ">{product.name}</h1>
              <h1 className=" text-sm font-thin ">{product.nickname}</h1>
              <div className="flex flex-row gap-2 justify-center">
                <h2 className="text-sm  ">{product.price.toLocaleString("vi-VN")} đ</h2>
                <p className="text-sm font-light text-gray-400  line-through">
                  {(product.price * 110 / 100).toLocaleString("vi-VN")} đ
                </p>
              </div>
          
              <div className=" bg-white  p-4">
                <p className="text-sm font-light mt-0 mb-2 text-left text-gray-400">Color: </p>
                <div className="flex flex-row gap-1 items-left bg-white max-w-4xl mx-auto">
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
                <p className="text-sm font-light mt-4 mb-2 text-left text-gray-400">Size: </p>
                <div className="flex flex-row gap-2 items-left bg-white text-black font-thin max-w-4xl mx-auto">
                  {sizes.map((size) => (
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
                <p className="text-sm font-light mt-4 mb-2 text-left text-gray-400 underline cursor-pointer">Size Guide</p>
                <div className="bg-black text-white text-center p-3 text-xs mt-5 cursor-pointer"
                  onClick={() => {
                    if (!selectedSize || !selectedColor) {
                      alert("Please select a size and color before adding to cart.");
                      return;
                    }
                    handleAddToCart(product.id);
                    // setIsAdd(true);
                    setIsCartOpen(true);
                    // setTimeout(() => {
                    //   setIsAdd(false);
                    // }, 2000);
                  }}
                  > ADD TO CART 
                </div>
              </div>
            </div>
        </div>


        <ProductInfoBox description={product.description}/>
        <ProductIntroBox introduction={product.introduction} />
        {/* <div className="bg-gray-300 col-span-2 text-sm text-center  text-black font-thin max-w-4xl mx-auto p-6 py-10">
            <h2 className="text-lg font-light mb-2">Ice-Skin™ Fabrication</h2>
            <p>
              Ice-Skin™ is a performance fabric utilizing Creora® Coolwave technology, an innovative performance fabric developed by Hyosung®. Featuring advanced hydrophilic polymer technology for superior moisture management. Designed to absorb moisture 1.5 times more efficiently than nylon, it ensures rapid evaporation and a cooling effect during high-intensity activities. Ice-Skin™ offers all-season temperature regulation, making it the ultimate choice for athletes seeking comfort and performance in any climate.
            </p>
        </div> */}

        {/* <JsonDisclosure json={[
            {
                title: "Mô tả sản phẩm",
                content: product.description,
                defaultOpen: true
            },
        ]} /> */}
        <div className="col-span-2">
          <Footer/>
        </div>
    </div>
    
  );
}
