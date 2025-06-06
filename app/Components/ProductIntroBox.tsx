function descriptionToJson(description?: string): { title: string; description: string }[] {
  if (typeof description !== "string") return [];

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


export const ProductIntroBox = ({ introduction }: { introduction: string }) => {
  const features = descriptionToJson(introduction);

  return (
    <>
      {features.map((feature, index) => (
        <div
          key={index}
          id={`intro-feature-${index}`}
          className="bg-gray-300 md:col-span-2 my-2 text-sm text-center text-black font-extralight max-w-4xl mx-auto p-6 py-10 rounded-md shadow-md"
        >
          <h2 className="text-lg font-light mb-2">{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
      <div
          
          className=" md:col-span-2 my-2 text-lg text-center text-black font-serif max-w-4xl mx-auto p-6 py-10 rounded-md "
        >
          " Vì với GapZ, mỗi sợi vải không chỉ tạo nên sản phẩm – mà là tạo nên cảm hứng chuyển động "
        </div>
      
    </>
  )
};
