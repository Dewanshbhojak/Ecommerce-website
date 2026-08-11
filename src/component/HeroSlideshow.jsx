import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "New Arrivals 2026",
    title: "Minimalist Elegance.",
    subtitle: "Discover timeless garments crafted with organic linen and refined silhouettes.",
    ctaText: "Shop New Arrivals",
    ctaLink: "/Women",
    image: "https://images.unsplash.com/photo-1732613839533-ac54fcee9d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0NTg2fDB8MXxzZWFyY2h8NXx8ZmFzaGlvbiUyMGFjY2Vzc29yaWVzJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8MXx8fDE3ODY0NDQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    badge: "Best Sellers",
    title: "Iconic Footwear & Apparel.",
    subtitle: "Built for luxury, engineered for everyday movement and absolute comfort.",
    ctaText: "View Best Sellers",
    ctaLink: "/Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1800",
  },
  {
    id: 3,
    badge: "Trending Collection",
    title: "Urban Tailoring.",
    subtitle: "Modern men's & women's essentials designed to make a subtle statement.",
    ctaText: "Explore Collection",
    ctaLink: "/Men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1800",
  },
  {
    id: 4,
    badge: "Seasonal Offers",
    title: "Exclusive Mid-Season Sale.",
    subtitle: "Enjoy up to 50% off select handcrafted pieces and luxury accessories.",
    ctaText: "Shop The Sale",
    ctaLink: "/sale",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1800",
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play slider (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard Navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-stone-900 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Stack */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transition-transform duration-10000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* Gradient Overlay for Neutral Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-12 lg:px-20 flex items-center">
              <div className="max-w-2xl text-white">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-semibold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {slide.badge}
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-white">
                  {slide.title}
                </h1>

                <p className="mt-4 text-stone-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="px-8 py-3.5 rounded-xl bg-[#5A6B5C] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#4A584C] transition-colors shadow-lg shadow-[#5A6B5C]/20 inline-flex items-center gap-2 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all shadow-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-8 bg-[#5A6B5C]" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
