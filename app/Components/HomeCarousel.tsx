import { useEffect, useRef, useState } from "react";

const carouselImages = [
  "https://i.ibb.co/q4tz5C0/Untitled-design.png",
  "https://i.ibb.co/233WdTrh/Gapz-Empowering-Greatness-1.png",
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 4000; // 4 seconds

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full bg-white p-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((src, idx) => (
          <div className="min-w-full flex-shrink-0" key={idx}>
            <img src={src} className="w-screen h-auto object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
