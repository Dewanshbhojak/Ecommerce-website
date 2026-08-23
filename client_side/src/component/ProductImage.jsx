import { useState, useEffect } from "react";

export default function ProductImage({ product }) {

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product?.length > 0) {
      setSelectedImage(product[0].imageUrl);
    }
  }, [product]);

  if (!product || product.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full lg:w-1/2">

      <img
        src={selectedImage}
        alt=""
        className="w-full rounded-xl"
      />

      <div className="flex gap-4 mt-4">
        {product.map((img) => (
          <img
            key={img.imageId}
            src={img.imageUrl}
            alt=""
            onClick={() =>
              setSelectedImage(img.imageUrl)
            }
            className="w-24 h-24 object-cover rounded-lg border cursor-pointer"
          />
        ))}
      </div>

    </div>
  );
}