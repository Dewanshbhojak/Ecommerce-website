import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";
import HeroSlideshow from "./HeroSlideshow";
import CategorySection from "./CategorySection";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";
import { getNewArrivals, getBestSellers } from "../Services/productService";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const [newRes, bestRes] = await Promise.all([
          getNewArrivals(),
          getBestSellers(),
        ]);

        if (newRes && newRes.data) {
          const list = Array.isArray(newRes.data) ? newRes.data : newRes.data.body || [];
          setNewArrivals(list.slice(0, 4));
        }

        if (bestRes && bestRes.data) {
          const list = Array.isArray(bestRes.data) ? bestRes.data : bestRes.data.body || [];
          setBestSellers(list.slice(0, 8));
        }
      } catch (err) {
        console.error("Failed to load homepage products", err);
        setErrorMsg("Unable to load products. Please check connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Slideshow Banner */}
        <HeroSlideshow />

        {/* Value Proposition Highlights */}
        <div className="bg-white border-y border-stone-200/80 py-8 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-6 h-6 text-[#5A6B5C] mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Complementary Express Shipping</h4>
              <p className="text-xs text-stone-500 mt-0.5">On all luxury orders over $150</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-6 h-6 text-[#5A6B5C] mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">30-Day Bespoke Returns</h4>
              <p className="text-xs text-stone-500 mt-0.5">Seamless & hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 text-[#5A6B5C] mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Guaranteed Authenticity</h4>
              <p className="text-xs text-stone-500 mt-0.5">100% verified luxury materials</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-6 h-6 text-[#5A6B5C] mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Premium Aftercare</h4>
              <p className="text-xs text-stone-500 mt-0.5">Dedicated concierge support</p>
            </div>
          </div>
        </div>

        {/* 2. Categories Section (8 Categories from backend API) */}
        <CategorySection />

        {/* 3. New Arrivals Showcase */}
        <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white border-t border-stone-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-stone-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5A6B5C]">Fresh Release</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 mt-1">New Arrivals</h2>
              </div>
              <a
                href="#categories"
                className="mt-4 sm:mt-0 text-xs font-semibold uppercase tracking-wider text-[#5A6B5C] hover:text-[#4A584C] inline-flex items-center gap-1 group"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse h-96" />
                ))}
              </div>
            ) : newArrivals.length === 0 ? (
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-sm">
                No new arrivals available right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newArrivals.map((product, idx) => (
                  <ProductCard key={product.productId || product.id || idx} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Banner Break */}
        <section className="relative py-24 px-6 sm:px-12 bg-stone-900 text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1800"
            alt="Craftsmanship"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-200 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Artisanal Quality
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium leading-tight">
              Designed For Distinguishability. Crafted For Longevity.
            </h2>
            <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Every detail is meticulously refined to elevate your personal style with quiet confidence.
            </p>
          </div>
        </section>

        {/* 4. Best Products / Best Sellers */}
        <section className="py-20 px-6 sm:px-12 lg:px-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5A6B5C]">Community Favorites</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 mt-1">Best Sellers</h2>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse h-96" />
                ))}
              </div>
            ) : bestSellers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
                No best sellers available right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bestSellers.map((product, idx) => (
                  <ProductCard key={product.productId || product.id || idx} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <FooterComponent />
    </div>
  );
};

export default Home;
