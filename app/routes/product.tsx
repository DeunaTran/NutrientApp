// routes/product.tsx

import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import supabase from "utils/supabase";
import { type CartItem, type Product, type Stock } from "~/library/interface";
import HeaderBanner from "~/Components/HeaderBanner";
import { type UserProfile } from "~/library/interface";
import JsonDisclosure from "~/Components/JsonDisclosure";
import Footer from "~/Components/Footer";
import { HomeInfoBox } from "~/Components/HomeInfoBox";
import { ProductInfoBox } from "~/Components/ProductInfoBox";
import LoginSale from "~/Components/LoginSale";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import { ProductIntroBox } from "~/Components/ProductIntroBox";
import Authenticate from "~/Components/Authenticate";
import SizeChart from "~/Components/SizeChart";
import { ReviewComponent } from "~/Components/Review";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
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
  const [stock, setStock] = useState<Record<string, number>>()
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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


  const handleAddToCart = async (id: string | number, size: string, color: string) => {

    const cartKey = `${id}_${size}`;
    // If item already exists, do nothing
    if (profile.cart[cartKey]) {
      console.log("Item already in cart:", cartKey);
      return;
    }

    const updatedCart = {
      ...profile.cart,
      [cartKey]: {
        quantity: 1,
        color: color
      }
    };
    console.log("Product added to cart: ____ ", cartKey);

    setProfile({ ...profile, cart: updatedCart });
    updateProfile(updatedCart)

    if (isAuthenticated) {
      fetchProfile(profile.user_id); // Optionally refresh profile
    }
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
      // setCart(data.cart || {}); // Ensure cart is set from profile
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

      };

      const fetchStock = async () => {
        const { data, error } = await supabase
          .from("Stock")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Failed to fetch stock:", error.message);
        } else {
          setStock({
            "L" : data.L,
            "M": data.M,
            "XL": data.XL,
            "XXL": data.XXL,
          })
          console.log("Stock fetched successfully:", data);
        }
        setLoading(false);
      };
      fetchProduct();
      fetchStock();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [product]);
  const [isAdd, setIsAdd] = useState(true);
  
  const sizesShort = [ "M", "L", "XL", "XXL"]; // Add or modify sizes as needed

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },        // or "#808080" for standard gray
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
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        <div className=" ">
            <div
              className=" w-full flex-shrink-0 snap-center"
            >
              <img src={product?.imgList[imgIndex]} className="w-full" alt={`product-${imgIndex}`} />
            </div>
        </div>
        <div className="md:mt-0 md:grid md:grid-cols-3 bg-white text-black items-center font-thin gap-1 flex flex-col text-center max-w-4xl mx-auto p-6 py-1">
          <div className="flex gap-1 md:row-span-2 flex-row md:flex-col">
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
                <h2 className="text-xs  text-center text-white bg-black font-bold p-1 w-18">{product.code}</h2>
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
                {sizesShort.map((size) => (
                  <div className = "group flex flex-col gap-2">
                    <button
                      key={size}
                      onClick={() => {
                        if(stock && stock[size]> 0){
                          setSelectedSize(size)
                        }
                      }}
                      className={`text-xs font-thin border px-5 py-1 transition-colors duration-200 
                        ${selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border"}
                        ${ stock && stock[size] > 0 
                          ? ""
                          : " text-gray-400 " }`
                        }
                    >
                      {size} 
                    </button>
                    <p className= {` text-sm group-hover:opacity-100  text-black max-w-20 ${selectedSize === size ? "opacity-100" : "opacity-0"} `}  > Còn { stock ?  stock[size]: ""} sản phẩm  </p>
                  </div>

                ))}
              </div>
              <SizeChart productName={product.name} />
              <div className="bg-black text-white text-center p-3 text-xs mt-5 cursor-pointer"
                onClick={() => {
                  if (!selectedSize || !selectedColor) {
                    alert("Please select a size and color before adding to cart.");
                    return;
                  }
                  handleAddToCart(product.id, selectedSize, selectedColor);
                  setIsCartOpen(true);
                }}
                > ADD TO CART 
              </div>
            </div>
          </div>
          <div className="col-span-3">
          <JsonDisclosure json={product?.sideInfo} />
          </div>
        </div>


        <ProductInfoBox description={product.description}/>
        <ProductIntroBox introduction={product.introduction} />
        <ReviewComponent/>
        <div className="col-span-2">
          <Footer/>
        </div>
    </div>
    
  );
}
