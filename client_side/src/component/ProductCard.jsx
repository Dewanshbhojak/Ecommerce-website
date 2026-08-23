import React from "react";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  const prod = product.product || product;
  const productId = prod.productId || prod.id;
  const name = prod.name || "Luxury Item";
  
  let categoryName = "Collection";
  if (typeof prod.category === "string") {
    categoryName = prod.category;
  } else if (prod.category && prod.category.categoryName) {
    categoryName = prod.category.categoryName;
  }

  const price = prod.price || 0;
  const originalPrice = price ? Math.round(price * 1.2) : price + 40;
  const stock = prod.stock !== undefined ? prod.stock : 20;
  const isOutOfStock = stock <= 0;
  const rating = prod.rating || 4.8;

  // Extract primary image URL safely
  let imageUrl = null;
  if (product.list && product.list.length > 0 && product.list[0].imageurl) {
    imageUrl = product.list[0].imageurl;
  } else if (prod.imageUrl) {
    imageUrl = prod.imageUrl;
  } else if (prod.imageUrl) {
    imageUrl = prod.imageUrl;
  } else if (prod.image) {
    imageUrl = prod.image;
  }

  const inWishlist = isInWishlist(productId);

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    if (productId) {
      navigate(`/ProductPage/${productId}`);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    const isAdded = await toggleWishlist(product);
    showSuccess(isAdded ? `Added "${name}" to Wishlist` : `Removed "${name}" from Wishlist`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    await addToCart(product, 1);
    showSuccess(`Added "${name}" to Cart`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-200/60 hover:border-stone-300"
    >
      {/* 13. Image Container with aspect-ratio: 4/5 and object-fit: contain */}
      <div className="relative w-full aspect-[4/5] bg-[#F8F8F6] overflow-hidden flex items-center justify-center p-3">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badge: Out of Stock or Sale */}
        <div className="absolute top-3 left-3 z-10">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 rounded-full bg-[#171717] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Out of Stock
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-[#C75C5C] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              20% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            inWishlist
              ? "bg-[#C75C5C] text-white shadow-md scale-105"
              : "bg-white/80 text-[#171717] hover:bg-white hover:text-[#C75C5C] hover:scale-110 shadow-sm"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider">
              {categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-medium text-[#171717] group-hover:text-[#7C8B68] transition-colors line-clamp-1">
            {name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#171717]">${price}</span>
              {originalPrice > price && (
                <span className="text-xs text-[#737373] line-through">${originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm active:scale-95 ${
              isOutOfStock
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : "bg-[#171717] text-white hover:bg-[#7C8B68]"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? "Sold Out" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
