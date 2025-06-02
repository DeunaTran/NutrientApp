import { SiMaterialformkdocs } from "react-icons/si";
import { IoWaterOutline } from "react-icons/io5";
import { PiVectorThreeThin } from "react-icons/pi";
import { MdOutlineFiberSmartRecord } from "react-icons/md";

export const ProductInfoBox = () => {  
    return(
        <div className="flex flex-col items-center text-sm justify-center relative bg-white py-4 ">

            {/* <img src="https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//Gapz%20----Embrace%20Relentles%20---.jpg" 
            alt="GapZ Logo" className="w-screen h-auto mb-4 hover:opacity-90" /> */}

            <div className="bg-white text-sm  text-black font-thin max-w-4xl mx-auto p-6 py-4">
                <p>
                    Techninal Features of GapZ Compression Wear
                </p>
            </div>

            <div className=" flex flex-col text-gray-800 mb-2 border p-4 border-gray-400 rounded-lg shadow-md">
                <div className="flex flex-row items-start justify-center gap-2">
                    <SiMaterialformkdocs className="text-4xl mb-2 " size={20} />
                    <h2 className=" font-semibold">CoreFlex Compression</h2>
                </div>
                <p className="text-sm text-gray-600">Ôm gọn cơ thể, hỗ trợ tối đa hiệu suất.</p>
            </div>
            <div className=" flex flex-col text-gray-800 mb-2 border p-4 border-gray-400 rounded-lg shadow-md">
                <div className="flex flex-row items-start justify-center gap-2">
                    <IoWaterOutline className="text-4xl mb-2 " size={20} />
                    <h2 className=" font-semibold">SweatSense™ fabric</h2>
                </div>
                <p className="text-sm text-gray-600">Khô nhanh, nhẹ, mát mịn như không khí.</p>
            </div>
            <div className=" flex flex-col text-gray-800 mb-2 border p-4 border-gray-400 rounded-lg shadow-md">
                <div className="flex flex-row items-start justify-center gap-2">
                    <PiVectorThreeThin className="text-4xl mb-2 " size={20} />
                    <h2 className=" font-semibold">4-way stretch</h2>
                </div>
                <p className="text-sm text-gray-600">Co giãn đa chiều, thoải mái mọi động tác.</p>
            </div>
            <div className=" flex flex-col text-gray-800 mb-2 border p-4 border-gray-400 rounded-lg shadow-md">
                <div className="flex flex-row items-start justify-center gap-2">
                    <MdOutlineFiberSmartRecord className="text-4xl mb-2 " size={20} />
                    <h2 className=" font-semibold"> Nylon-rich finish </h2>
                </div>
                <p className="text-sm text-gray-600">Bền bỉ, mượt nhẹ, ôm trọn cơ thể </p>
            </div>
        </div>
    )
}