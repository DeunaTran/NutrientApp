import { useEffect, useRef, useState } from "react";
import supabase from "utils/supabase";

const ScrollVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const { data, error } = supabase
        .storage
        .from("videos")
        .getPublicUrl("GAPZ-2-0418.mp4");

      if (data?.publicUrl) {
        setVideoUrl(data.publicUrl);
      } else {
        console.error("Failed to get public URL", error);
      }
    };

    fetchVideoUrl();
  }, []);

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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoUrl]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {isLoading && (
        <div className="w-full flex justify-center items-center mb-4">
          <progress className="progress w-56" />
          <span className="ml-3 text-sm text-gray-500">Đang tải video...</span>
        </div>
      )}

      {videoUrl && (
        <video
          ref={videoRef}
          src= "https://kmaxqaqeyvcvuizuagqi.supabase.co/storage/v1/object/public/videos//GAPZ-2-0418.mp4" //{videoUrl}
          autoPlay
          muted
          playsInline
          loop
          className={`w-full rounded-lg shadow-lg transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
          controls={false}
          onLoadedData={handleLoadedData}
        />
      )}
    </div>
  );
};

export default ScrollVideo;
