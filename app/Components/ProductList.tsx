import { NavLink } from "react-router";
import React from "react";

type Product = {
  id: string | number;
  name: string;
  sale: string;
  price: string;
  img: string;
  img2: string;
  discription: string;
};

type ProductListProps = {
  products: Product[];
  productSaveList: Array<string | number>;
  onSave: (id: string | number) => void;
  onUnsave: (id: string | number) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, productSaveList, onSave, onUnsave }) => {
  return (
    <>
      {products.map((product) => {
        if (product !== undefined)
          return (
            <div
              key={product.id}
              className="col-span-1 shadow-md shadow-white flex flex-col mx-2 bg-white h-[60vh] mt-2 mb-20 rounded-lg"
            >
              <NavLink to={`product/${product.id}`} className="no-underline h-3/4">
                <div className="relative rounded-lg flex flex-row gap-1 overflow-hidden group h-[40vh] w-full ">
                  {/* First Image (default) */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover  transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {/* Second Image (on hover) */}
                  <img
                    src={product.img2}
                    alt={`${product.name} alternate`}
                    className="absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </NavLink>

              <div className="flex flex-col px-2 pt-0">
                <div className="flex flex-row justify-between">
                  <p className="text-xs font-light text-gray-800 m-0 p-0">{product.sale} </p>
                  <p className="text-xs font-light text-gray-800 m-0 p-0">{product.price} </p>
                </div>

                <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-gray-800 capitalize">
                  {product.name}
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-xs font-light text-gray-800 m-0 p-0">{product.discription}</p>

                  {productSaveList.includes(String(product.id)) ? (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => onUnsave(product.id)}
                      title="Unsave"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="text-black font-light rounded-lg cursor-pointer"
                      onClick={() => onSave(product.id)}
                      title="Save"
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
              </div>
            </div>
          );
        return null;
      })}
    </>
  );
};

export default ProductList;
