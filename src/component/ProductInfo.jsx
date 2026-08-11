import React, { useState } from "react";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();

  if (!product) return null;

  const productId = product.productId || product.id;
  const name = product.name || "Luxury Item";
  const price = product.price || 0;
  const originalPrice = Math.round(price * 1.25);
  const stock = product.stock !== undefined ? product.stock : 20;
  const isOutOfStock = stock <= 0;
  const inWishlist = isInWishlist(productId);

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    await addToCart(product, qty);
    showSuccess(`Added ${qty} x "${name}" to Cart`);
  };

  const handleWishlistToggle = async () => {
    const isAdded = await toggleWishlist(product);
    showSuccess(isAdded ? `Added "${name}" to Wishlist` : `Removed "${name}" from Wishlist`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5A6B5C]">
            {product.category?.categoryName || "Bespoke Collection"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
          {name}
        </h1>

        <div className="flex items-baseline gap-4 mt-4">
          <span className="text-4xl font-bold text-stone-900">${price}</span>
          {originalPrice > price && (
            <span className="line-through text-stone-400 text-xl">${originalPrice}</span>
          )}
          <span className="bg-[#C75C5C]/10 text-[#C75C5C] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            20% OFF
          </span>
        </div>

        <div className="mt-4">
          {isOutOfStock ? (
            <span className="text-xs font-bold text-[#C75C5C] uppercase tracking-wider">
              Currently Out of Stock
            </span>
          ) : (
            <span className="text-xs font-bold text-[#7C8B68] uppercase tracking-wider">
              In Stock ({stock} available)
            </span>
          )}
        </div>

        <p className="mt-6 text-stone-600 leading-relaxed text-sm sm:text-base font-light">
          {product.description || "Crafted with exceptional materials and modern tailorship for enduring elegance."}
        </p>

        {/* Quantity Controls */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
            Quantity
          </h3>

          <div className="flex items-center border border-stone-200 rounded-xl w-fit bg-white">
            <button
              className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-bold"
              onClick={() => qty > 1 && setQty(qty - 1)}
            >
              -
            </button>

            <span className="px-6 text-sm font-semibold text-stone-900">{qty}</span>

            <button
              className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-bold"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10">
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 h-14 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
              isOutOfStock
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : "bg-[#171717] text-white hover:bg-[#7C8B68] active:scale-98"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? "Sold Out" : "Add To Cart"}</span>
          </button>

          <button
            onClick={handleWishlistToggle}
            aria-label="Wishlist Toggle"
            className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${
              inWishlist
                ? "bg-[#C75C5C] text-white border-[#C75C5C]"
                : "border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-4 mt-8 border-t border-stone-200/80 pt-6">
          <div className="flex flex-col items-center text-center">
            <Truck className="w-5 h-5 text-[#5A6B5C] mb-1" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Complimentary Shipping</h4>
            <p className="text-[10px] text-stone-500">Orders over $150</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <RotateCcw className="w-5 h-5 text-[#5A6B5C] mb-1" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Easy Returns</h4>
            <p className="text-[10px] text-stone-500">30-day window</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-5 h-5 text-[#5A6B5C] mb-1" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Guaranteed Authentic</h4>
            <p className="text-[10px] text-stone-500">Certified Luxury</p>
          </div>
        </div>
      </div>
    </div>
  );
}