import { useEffect, useRef, useState } from "react";
import supabase  from "utils/supabase"; // Make sure this is a named import, not default

const ScrollVideo2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchVideoUrl = async () => {
  //     const { data } = supabase
  //       .storage
  //       .from("videos")
  //       .getPublicUrl("GAPZ-1H-0418.mp4");

  //     if (data && data.publicUrl) {
  //       setVideoUrl(data.publicUrl);
  //     } else {
  //       console.error("Failed to get public URL");
  //     }
  //   };

  //   fetchVideoUrl();
  // }, []);

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
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <video
        ref={videoRef}
        src="https://kmaxqaqeyvcvuizuagqi.supabase.co/storage/v1/object/public/videos//GAPZ-1H-0418.mp4"
        autoPlay       // ✅ Necessary to allow autoplay behavior
        muted          // ✅ Required for autoplay to work
        playsInline    // ✅ Prevents full-screen on iOS
        loop
        className="w-full rounded-lg shadow-lg"
        controls={false}
      />
      
    </div>
  );
};

export default ScrollVideo2;
