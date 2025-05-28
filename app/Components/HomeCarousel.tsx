import { useEffect, useRef, useState } from "react";

const carouselImages = [
  "https://i.ibb.co/q4tz5C0/Untitled-design.png",
  "https://i.ibb.co/233WdTrh/Gapz-Empowering-Greatness-1.png",
];

const carouselImagesMobile = [
  "https://i.ibb.co/hFq76h2S/1.png",
  "https://i.ibb.co/0RtKvMnR/2.png",
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
    </div>
  );
}
