
type Product = {
  id: string | number;
  name: string;
  serial: string;
  textBook: string;
  conclusion: string;
  duration: string | number;
};

type ProductCardProps = {
  product: Product;
  productSaveList: Array<string | number>;
  handleSaveProduct: (id: string | number) => void;
  handleUnSaveProduct: (id: string | number) => void;
};

const ProductCard = ({
  product,
  productSaveList,
  handleSaveProduct,
  handleUnSaveProduct,
}: ProductCardProps) => {
  const isSaved = productSaveList.includes(`${product.id}`);

  return (
    <div className= {`w-full h-[49vh] my-3 rounded-2xl bg-yellow-200 grid grid-cols-7 overflow-hidden hover:shadow-lg  cursor-pointer duration-700 `}>
        <div className="  relative bg-white col-span-3"> 
            <img src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/May2025/Shortss.jpg" alt="bgIMG" className="object-cover h-full ">
            </img>
        </div>
        <div className="p-3 flex justify-between flex-col col-span-4">
        <div>
            <p
            className="text-xl font-bold"
            data-tooltip-content="🎓 Product Name"
            data-tooltip-id="product-tooltip"
            >
            {product.name}
            </p>

            <p
            className="text-sm font-extralight text-black text-left"
            data-tooltip-content="📘 Product Series"
            data-tooltip-id="product-tooltip"
            data-tooltip-place="left"
            >
            {product.serial} - {product.id}
            </p>

            <p className="text-base m-0 p-0">
            Text Book: <span className="font-semibold">{product.textBook}</span>
            </p>

            <p
            className="text-xs mt-2 text-gray-800"
            data-tooltip-content="🏁 Product Conclusion"
            data-tooltip-id="product-tooltip"
            data-tooltip-place="bottom"
            >
            {product.conclusion}
            </p>
        </div>

        <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-xs font-light text-color-secondary m-0 p-0">
            <span className="text-sm">{product.duration}</span> sessions
            </p>

            {isSaved ? (
            <button
                className="text-black font-light rounded-lg"
                onClick={() => handleUnSaveProduct(product.id)}
                title="Unsave Product"
            >
                {/* Filled Bookmark Icon */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                </svg>
            </button>
            ) : (
            <button
                className="text-black font-light rounded-lg"
                onClick={() => handleSaveProduct(product.id)}
                title="Save Product"
            >
                {/* Outline Bookmark Icon */}
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
};

export default ProductCard;
