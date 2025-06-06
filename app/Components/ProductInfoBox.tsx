import { SiMaterialformkdocs } from "react-icons/si";
import { IoWaterOutline } from "react-icons/io5";
import { PiVectorThreeThin } from "react-icons/pi";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { GiFeather } from "react-icons/gi";

function descriptionToJson(description: string): { title: string; description: string }[] {
  return description
    .split("•")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((entry) => {
      const [key, ...rest] = entry.split(":");
      return {
        title: key.trim(),
        description: rest.join(":").trim(),
      };
    });
}

// Define icons for the first 4 features
const icons = [
  SiMaterialformkdocs,
  IoWaterOutline,
  PiVectorThreeThin,
  MdOutlineFiberSmartRecord,
  GiFeather,
];

export const ProductInfoBox = ({ description }: { description: string }) => {
  const features = descriptionToJson(description);

  return (
    <div className="flex md:text-lg md:col-span-2 md:grid md:grid-cols-2 md:gap-4 md:px-30 p-4 md:text-center flex-col items-center text-sm justify-center relative bg-white py-4">
      <div className="bg-white md:col-span-2 text-sm text-black font-thin max-w-4xl mx-auto p-6 py-4">
        <p>Technical Features of GapZ Compression Wear</p>
      </div>

      {features.map((feature, index) => {
        const Icon = icons[index] ?? SiMaterialformkdocs; // Use default if out of range

        return (
          <div key={index} className="md:py-10 flex flex-col text-gray-800 mb-2 border p-4 border-gray-400 rounded-lg shadow-md">
            <div className="flex flex-row items-start justify-center gap-2">
              <Icon className="text-4xl mb-2" />
              <h2 className="font-semibold">{feature.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};
