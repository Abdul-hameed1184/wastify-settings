import React,{ useState } from "react";
import { CgProfile } from "react-icons/cg";

type ImageWithFallbackProps = {
  src: string;
  alt?: string;
  size?: number; // px
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = "",
  size = 64,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="relative bg-gray-200 rounded-md overflow-hidden"
      style={{ width: size, height: size }}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      {(error || !src) && (
        <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500 text-sm">
          <CgProfile className="text-3xl" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${
          loaded && !error ? "block" : "hidden"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default ImageWithFallback;
