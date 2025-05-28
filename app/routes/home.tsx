import HeaderBanner from "~/Components/HeaderBanner";
import HomeCarousel from "~/Components/HomeCarousel";


import { useState } from "react";
import ProductList from "../Components/ProductList";
import ScrollVideo from "~/Components/ScrollVideo";
import ScrollVideo2 from "~/Components/ScrollVideo2";
import Footer from "~/Components/Footer";


const products = [
  {
    id: 1,
    name: "Quần Short Nam Thể Thao", 
    sale: "Giảm giá 50%",
    price: "200.000đ",
    img: "https://i.ibb.co/LdqM1mPh/z6616912695609-22155da151bb1f019b0de90c95-1.jpg",
    img2: "https://i.ibb.co/TB5p5Mw8/z6616912878639-3b8f3e70ee0618a129e6bb97537cbbb3.jpg",   
    discription: "Quần thể thao cao cấp, thoáng mát, thấm hút mồ hôi",
  },
  {
    id: 2,
    name: "Áo Thun Nam Basic",
    sale: "Giảm giá 30%",
    price: "150.000đ",  

    img: "https://i.postimg.cc/PrVrytfb/z6626644819163-1ee5280a965f0df4f3a2e7de00b02e7e-1.jpg",
    // img2: "https://i.ibb.co/TqMrk0jc/sdf.jpg",
    img2: "https://i.postimg.cc/SNBHk5gF/z6620247367397-db3c171475d9b86f46110c730e5eae81.jpg",

    discription: "Áo thun basic, dễ phối đồ, chất liệu cotton",
  },
];

export default function Home() {
  const [productSaveList, setProductSaveList] = useState<Array<string | number>>([]);

  const handleSave = (id: string | number) => {
    setProductSaveList((prev) => [...prev, id]);
  };

  const handleUnsave = (id: string | number) => {
    setProductSaveList((prev) => prev.filter((pid) => pid !== id));
  };

  return (
    <div className="bg-white">
      <HeaderBanner />
      <HomeCarousel />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 px-4">
        <ProductList
          products={products}
          productSaveList={productSaveList}
          onSave={handleSave}
          onUnsave={handleUnsave}
        />
      </div>
      <ScrollVideo/>
      <ScrollVideo2/>
      <Footer/>
    </div>
  );
}
