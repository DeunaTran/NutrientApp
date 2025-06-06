import { useEffect, useRef, useState } from "react";

const carouselImages = [
  "https://i.ibb.co/q4tz5C0/Untitled-design.png",
  "https://i.ibb.co/233WdTrh/Gapz-Empowering-Greatness-1.png",
];

const carouselImagesMobile = [
  "https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//MobileThumbnail1.png",
  "https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//MobileThumbnail2.png",
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 4000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const images = isMobile ? carouselImagesMobile : carouselImages;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length]);

  return (
    <div className="relative overflow-hidden w-full bg-white md:p-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="min-w-full flex-shrink-0" key={idx}>
            <img
              src={src}
              className="w-screen h-auto object-cover "
              alt={`carousel-${idx}`}
            />
          </div>
        ))}
      </div>
      
      <div className="  flex flex-col font-light text-sm px-1 text-center rounded-sm py-1  absolute md:bottom-10 bottom-1/3 left-1/2 transform -translate-x-1/2  space-x-2">
        <p className="text-xs">
          Latest exclusive offers just for you!
        </p>
        <button
          onClick={() => {
            window.scrollTo({ top: 700, behavior: "smooth" });
          }}
         className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
