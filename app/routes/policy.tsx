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
import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type { User } from "@supabase/supabase-js";



export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [authOpen, setAuthOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        cart: {},
        created_at: "",
        user_id: "",
    }); 
    const [user, setUser] = useState<User>();
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [orders, setOrders] = useState<Order[]>();



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

    <div className="md:pt-30 pt-16 md:px-4  md:gap-4 lg:gap-0 xl:gap-12 2xl:gap-16 bg-white  min-h-screen">
        <HeaderBannerPage isAuth={isAuthenticated} setOpenAuthModal={() => setAuthOpen(true)} setAuth={setIsAuthenticated} profile={profile} setProfile={setProfile} products={products} isCartOpen={isCartOpen}
    setIsCartOpen={setIsCartOpen} />
        <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <div className="text-black font-extralight text-sm  w-full px-4 pt-2">
        <div className=" w-full md:px-28 divide-y rounded-xl  bg-white/10">
            <HeadlessDisclosure
              as="div"
              className="w-full col-span-full p-6"
              defaultOpen={true}
            >
              <DisclosureButton className="group flex lg:px-3 min-w-full  lg:min-w-lg w-full items-center justify-between">
                <span className="text-base font-light uppercase">
                  QUY TRÌNH ĐỐI HÀNG
                </span>
                <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-data-open:rotate-180 group-open:rotate-180 transition-transform duration-500" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2  text-left text-base text-black">
                <p>
                  1.	Trường hợp bạn muốn đổi mẫu, đổi size vui lòng gửi lại sản phẩm để chúng mình kiểm tra tình trạng hàng. (Thời điểm gửi lại sản phẩm không được quá 2 ngày kể từ khi GapZ tiếp nhận nhu cầu đổi hàng từ bạn) Sau đó GapZ sẽ tiến hành gửi sản phẩm mới trong thời gian sớm nhất. Khách hàng sẽ chịu toàn bộ phí ship 2 chiều.
                </p>
                <p>
                  2. Trường hợp sản phẩm bị lỗi do nhà sản xuất, hoặc do GapZ gửi nhầm mẫu, nhầm size, chúng mình sẵn sàng hỗ trợ đổi 2 chiều và chịu toàn bộ phí ship đổi hàng 2 chiều.</p>
                <p>

                3.	Thời gian đổi hàng sẽ giao động từ 1–2 ngày (nội thành TP.HCM) và từ 3–5 ngày (ngoại thành và các tỉnh khác).
                </p>
              </DisclosurePanel>
            </HeadlessDisclosure>

            <HeadlessDisclosure
              as="div"
              className="w-full col-span-full p-6"
              defaultOpen={true}
            >
              <DisclosureButton className="group flex lg:px-3 min-w-full  lg:min-w-lg w-full items-center justify-between">
                <span className="text-base uppercase font-light ">
                  Chính sách đổi hàng
                </span>
                <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-data-open:rotate-180 group-open:rotate-180 transition-transform duration-500" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2  text-left text-base text-black">
                <p>
                  1.	Khi nhận được hàng bạn vui lòng kiểm tra kỹ lại sản phẩm, GapZ sẽ tiếp nhận hỗ trợ đổi size, đổi hàng trong vòng 3 ngày (tính từ ngày bạn nhận được đơn hàng).
                </p>
                <p>
                  2.	Đối với các sản phẩm đổi, bạn vui lòng không tháo tag, mác. Sản phẩm ở trạng thái mới, chưa qua sử dụng, chưa giặt ủi, không có mùi lạ.
                </p>
                <p>
                  3.	GapZ chỉ nhận đổi hàng, không nhận trả hàng (trừ trường hợp lỗi do nhà sản xuất).
                </p>
                <p>
                 4.  Khi bạn có nhu cầu đổi vui lòng chọn sản phẩm có giá trị ngang bằng hoặc cao hơn giá trị sản phẩm cũ. GapZ sẽ hỗ trợ hoàn tiền chênh lệch giữa 2 sản phẩm.
                </p>
              </DisclosurePanel>
            </HeadlessDisclosure>

             <HeadlessDisclosure
              as="div"
              className="w-full col-span-full p-6"
              defaultOpen={true}
            >
              <DisclosureButton className="group flex lg:px-3 min-w-full  lg:min-w-lg w-full items-center justify-between">
                <span className="text-base uppercase font-light ">
                  Lưu ý từ GapZ
                </span>
                <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-data-open:rotate-180 group-open:rotate-180 transition-transform duration-500" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2  text-left text-base text-black">
                <p>
                  GapZ xin phép không chịu trách nhiệm với trường hợp nhân viên tư vấn sai, việc tư vấn chỉ mang tính chất tham khảo, không thể chính xác tuyệt đối vì còn phụ thuộc vào sở thích, thói quen của mỗi cá nhân.
                  Vậy nên bạn vui lòng tham khảo thêm số đo sản phẩm để chọn được size phù hợp và đồng ý nhất nhé!!!
                </p>
              </DisclosurePanel>
            </HeadlessDisclosure>
        </div>
      </div>

        



        <div className="col-span-2">
          <Footer/>
        </div>
    </div>
    
  );
}
