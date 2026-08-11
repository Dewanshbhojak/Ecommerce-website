import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import { getCategories } from "../Services/categoryService";

const defaultCategories = [
  {
    id: "women",
    title: "Women",
    subtitle: "Elegance defined by contemporary cuts & luxury fabrics",
    path: "/Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    badge: "Featured",
    featured: true,
  },
  {
    id: "men",
    title: "Men",
    subtitle: "Refined essentials & tailored outerwear",
    path: "/Men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800",
    badge: "Popular",
    featured: false,
  },
  {
    id: "shoes",
    title: "Shoes",
    subtitle: "Iconic footwear engineered for luxury comfort",
    path: "/Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    badge: "Trending",
    featured: false,
  },
  {
    id: "kids",
    title: "Kids",
    subtitle: "Vibrant styles built for everyday play",
    path: "/Kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
    badge: "New",
    featured: false,
  },
  {
    id: "watches",
    title: "Watches",
    subtitle: "Precision timepieces & luxury chronographs",
    path: "/Watches",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    badge: "Precision",
    featured: false,
  },
  {
    id: "perfumes",
    title: "Perfumes",
    subtitle: "Signature scents & artisanal fragrance blends",
    path: "/Perfumes",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    badge: "Artisanal",
    featured: false,
  },
  {
    id: "glasses",
    title: "Glasses",
    subtitle: "Designer eyewear & classic frame silhouettes",
    path: "/Glasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    badge: "Eyewear",
    featured: false,
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "Leather goods, bags & statement details",
    path: "/Accessories",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800",
    badge: "Essentials",
    featured: false,
  },
];

const CategorySection = () => {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const fetchBackendCategories = async () => {
      try {
        const response = await getCategories();
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
          const mapped = response.data.map((cat, idx) => ({
            id: cat.id || cat.category_id || idx,
            title: cat.name || cat.categoryName,
            subtitle: cat.description || "Curated luxury collection",
            path: `/${cat.name || cat.categoryName}`,
            image: cat.imageUrl || defaultCategories[idx % defaultCategories.length].image,
            badge: idx === 0 ? "Featured" : "Collection",
            featured: idx === 0,
          }));
          setCategories(mapped);
        }
      } catch (err) {
        console.log("Using default category list");
      }
    };

    fetchBackendCategories();
  }, []);

  return (
    <section id="categories" className="w-full bg-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-12 text-stone-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0EC] text-[#5A6B5C] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Selection
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-stone-900">
              Shop by Category
            </h2>
            <p className="text-stone-500 text-base sm:text-lg mt-3 max-w-xl font-light">
              Explore our 8 signature collections designed for every style, crafted with uncompromising quality.
            </p>
          </div>
        </div>

        {/* 8-Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={category.path}
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-200/80 min-h-[280px] flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-300 ${
                category.featured ? "sm:col-span-2 sm:row-span-2 min-h-[380px] sm:min-h-[440px]" : ""
              }`}
            >
              {/* Background Image */}
              <ImageWithFallback
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-stone-950/5 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-wider uppercase">
                  {category.badge}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-white">
                <h3 className={`font-serif font-medium text-white group-hover:text-amber-200 transition-colors ${
                  category.featured ? "text-3xl sm:text-4xl" : "text-2xl"
                }`}>
                  {category.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm mt-1 font-light line-clamp-2">
                  {category.subtitle}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
