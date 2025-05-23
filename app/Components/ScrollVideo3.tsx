import { useEffect, useRef } from "react";

const ScrollVideo3: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((e) => console.error("Autoplay failed:", e));
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.5, // Play when 50% of the video is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="aspect-[9/16]  w-full overflow-hidden rounded-lg shadow-lg">
        <video
          ref={videoRef}
          src="/videos/1st 09_02_25.mp4"
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
          controls={false}
        />
      </div>
    </div>
  );
};

export default ScrollVideo3;
