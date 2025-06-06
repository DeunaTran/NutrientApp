import { SiMaterialformkdocs } from "react-icons/si";
import { IoWaterOutline } from "react-icons/io5";
import { PiVectorThreeThin } from "react-icons/pi";
import { MdOutlineFiberSmartRecord } from "react-icons/md";

export const HomeInfoBox = () => {  
    return(
        <div className="flex flex-col md:grid md:gap-3 md:mb-30 md:grid-cols-2 md:px-20 items-center text-sm justify-center relative bg-white py-4 ">

            <img src="https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//Gapz%20----Embrace%20Relentles%20---.jpg" 
            alt="GapZ Logo" className="w-screen md:col-span-1 md:row-span-4 md:w-2xl  h-auto mb-4 hover:opacity-90" />
            {/* <div className="absolute md:grid md:grid-cols-2 w-full top-0 left-0 backdrop-blur-2xl hover:backdrop-blur-none"> */}
                <div className=" flex flex-col text-gray-800 mb-3 border p-4 border-gray-400 rounded-lg shadow-md">
                    <div className="flex flex-row items-start justify-center gap-2">
                        <SiMaterialformkdocs className="text-4xl mb-2 " size={20} />
                        <h2 className=" font-semibold">CoreFlex Compression</h2>
                    </div>
                    <p className="text-sm text-gray-600">Ôm gọn cơ thể, hỗ trợ tối đa hiệu suất.</p>
                </div>
                <div className=" flex flex-col text-gray-800 mb-1 border p-4 border-gray-400 rounded-lg shadow-md">
                    <div className="flex flex-row items-start justify-center gap-2">
                        <IoWaterOutline className="text-4xl mb-2 " size={20} />
                        <h2 className=" font-semibold">SweatSense™ fabric</h2>
                    </div>
                    <p className="text-sm text-gray-600">Khô nhanh, nhẹ, mát mịn như không khí.</p>
                </div>
                <div className=" flex flex-col text-gray-800 mb-0 border p-4 border-gray-400 rounded-lg shadow-md">
                    <div className="flex flex-row items-start justify-center gap-2">
                        <PiVectorThreeThin className="text-4xl mb-2 " size={20} />
                        <h2 className=" font-semibold">4-way stretch</h2>
                    </div>
                    <p className="text-sm text-gray-600">Co giãn đa chiều, thoải mái mọi động tác.</p>
                </div>
                <div className=" flex flex-col text-gray-800 mb-0 border p-4 border-gray-400 rounded-lg shadow-md">
                    <div className="flex flex-row items-start justify-center gap-2">
                        <MdOutlineFiberSmartRecord className="text-4xl mb-2 " size={20} />
                        <h2 className=" font-semibold"> Nylon-rich finish </h2>
                    </div>
                    <p className="text-sm text-gray-600">Bền bỉ, mượt nhẹ, ôm trọn cơ thể </p>
                {/* </div> */}
            </div>
        </div>
    )
}