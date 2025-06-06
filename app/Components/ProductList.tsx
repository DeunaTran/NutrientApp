import { NavLink } from "react-router";
import React, { useState } from "react";
import { type Product } from "~/library/interface";

type ProductListProps = {
  products: Product[];
  cart: Record<string | number, number>; // Cart is an object like { "123": true }
  onAddToCart: (id: string | number) => void;
  onRemoveFromCart: (id: string | number) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, cart, onAddToCart, onRemoveFromCart }) => {
  // console.log("Rendering ProductList with products:", products);
  const sizes= [ "M", "L", "XL", "XXL"]; // Add or modify sizes as needed
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <>
      {products.map((product) => {
        if (product !== undefined)
          return (
            <div
              key={product.id}
              className="col-span-1 mt-20 shadow-md justify-between shadow-white flex group flex-col mx-0 bg-white h-[60vh]  mb-10 rounded-lg"
            >
              <NavLink to={`product/${product.id}`} className="no-underline h-full">
                <div className="relative rounded-lg flex flex-row gap-1 overflow-hidden h-[40vh] w-full ">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover  transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={product.img2}
                    alt={`${product.name} alternate`}
                    className="absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </NavLink>

              <div className="flex relative text-gray-700 flex-col">

                <div className="text-sm font-light mb-0 text-center rounded-lg capitalize">
                  {product?.code ? `${product.code} ` : ""}{product?.name || "Unnamed Product"}
                </div>

                <div className="flex  group-hover:opacity-0 font-light flex-col items-center gap-0 ">
                  <p className="text-xs  text-gray-400 m-0 p-0 line-through">
                    {(product.price * 110 / 100).toLocaleString("vi-VN")} Vnđ
                  </p>
                  {/* <p className="text-xs font-light text-white m-0 p-0">{(product.price*90/100).toLocaleString("vi-VN")} đ</p>  */}
                  {/* sale {product.sale}%  */}
                  <p className="text-sm  text-gray-500 m-0 p-0">{(product.price).toLocaleString("vi-VN")} Vnđ </p>
                </div>
                 <div className="flex items-center justify-center absolute bottom-0 left-0 w-full transition duration-800 ease-in-out flex-row gap-1 opacity-0  group-hover:opacity-100">
                    {sizes.map((size) => (
                        <button
                        key={size}
                        onClick={() => 
                        {   
                        setSelectedSize(size)
                           }
                        }
                        className={`text-xs font-thin hover:border-black  ease-in-out cursor-pointer border border-gray-200 px-3 py-1 transition-colors duration-200 ${
                            selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border"
                        }`}
                        >
                        {size}
                        </button>
                    ))}

                </div>
                

               
              </div>
            </div>
          );
        return null;
      })}
    </>
  );
};

export default ProductList;


 {/* <div className="flex flex-row justify-between">
                  <p className="text-xs font-light text-gray-800 m-0 p-0"></p>

                  {cart[product.id] ? (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => onRemoveFromCart(product.id)}
                      title="Remove from Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => onAddToCart(product.id)}
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
                </div> */}