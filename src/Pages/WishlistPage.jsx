import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import FooterComponent from "../component/FooterComponent";
import ProductCard from "../component/ProductCard";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      <Navbar />

      {/* Banner Header */}
      <div className="bg-white border-b border-stone-200/80 py-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F0] text-[#C85A48] text-xs font-semibold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Saved Items
            </div>
            <h1 className="text-4xl font-serif font-medium text-stone-900">My Wishlist</h1>
            <p className="text-stone-500 text-sm mt-1 font-light">
              Your curated collection of saved luxury pieces
            </p>
          </div>
          <div className="text-sm font-semibold text-stone-600 bg-stone-100 px-4 py-2 rounded-full w-fit">
            {wishlistCount} {wishlistCount === 1 ? "Item" : "Items"} Saved
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 py-12">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-stone-200/80 p-8 my-8 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FDF2F0] text-[#C85A48] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900">Your Wishlist is Empty</h3>
            <p className="text-stone-500 text-sm mt-2 max-w-xs mx-auto">
              Explore our collections and tap the heart icon to save your favorite products.
            </p>
            <Link
              to="/home"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5A6B5C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#4A584C] transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product, idx) => (
              <ProductCard key={product.productId || idx} product={product} />
            ))}
          </div>
        )}
      </main>

      <FooterComponent />
    </div>
  );
};

export default WishlistPage;
