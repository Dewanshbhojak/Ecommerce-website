import React, { useState } from "react";
import { Package } from "lucide-react";

const ImageWithFallback = ({ src, alt, className = "", ...props }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`bg-stone-100 flex flex-col items-center justify-center p-4 text-stone-400 select-none ${className}`}
        {...props}
      >
        <Package className="w-8 h-8 stroke-[1.5] text-stone-300 mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">Vibe Edition</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Product image"}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
};

export default ImageWithFallback;
