import { useEffect, useRef } from "react";

const ScrollVideo2: React.FC = () => {
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
    <>
    <div className="w-full max-w-4xl mx-auto p-4">
      <video
        ref={videoRef}
        src="/videos/GAPZ-1H-0418.mp4"
        muted
        loop
        playsInline
        className="w-full rounded-lg shadow-lg"
        controls={false}
      />
    </div>
    </>
  );
};

export default ScrollVideo2;
