"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";

const bannerSlides = [
  {
    image: "/sports-banner-1.png",
    title: "Prizm Season Is Here",
    subtitle: "Grab Your Boxes While They Last!",
    buttonText: "Shop Now",
    buttonHref: "/sports",
    titleColor: "text-red-800",
    subtitleColor: "text-white font-semibold",
    buttonBg: "bg-red-800 hover:bg-white text-white hover:text-black",
  },
  {
    image: "/sports-banner-2.png",
    title: "2026 Topps Baseball Series 1",
    subtitle: "Available Now — Shop Baseball",
    buttonText: "Shop Now",
    buttonHref: "/sports?category=Baseball",
    titleColor: "text-green-800",
    subtitleColor: "text-black font-semibold",
    buttonBg: "bg-green-800 hover:bg-gray-200 text-white hover:text-black",
  },
];

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const autoTimer = useRef(null);
  const resumeTimer = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const slides = [...bannerSlides, bannerSlides[0]];

  const startAutoPlay = () => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      goNext();
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      clearInterval(autoTimer.current);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  const goNext = () => {
    setTransitioning(true);
    setCurrent((prev) => prev + 1);
  };

  const goPrev = () => {
    setTransitioning(true);
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (current === slides.length - 1) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setCurrent(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [current]);

  const handleDragStart = (e) => {
    dragStartX.current =
      e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    isDragging.current = true;
    clearInterval(autoTimer.current);
    clearTimeout(resumeTimer.current);
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    resumeTimer.current = setTimeout(() => startAutoPlay(), 3000);
  };

  return (
    <div
      className="relative w-full h-80 md:h-96 overflow-hidden bg-gray-900 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transitioning ? "transform 500ms ease-in-out" : "none",
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full flex-shrink-0 w-screen">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 md:px-32">
              <h2
                className={`text-2xl md:text-4xl font-bold mb-2 ${slide.titleColor}`}
              >
                {slide.title}
              </h2>
              <p className={`text-sm md:text-base mb-3 ${slide.subtitleColor}`}>
                {slide.subtitle}
              </p>
              <Link
                href={slide.buttonHref}
                className={`inline-block font-bold px-6 py-3 rounded-full transition-colors w-fit ${slide.buttonBg}`}
                draggable={false}
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ‹
      </button>

      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setTransitioning(true);
              setCurrent(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              current % bannerSlides.length === i
                ? "bg-yellow-400"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductSlider({ title, category, viewAllHref }) {
  const { products, loading } = useProducts(category);
  const visibleProducts = products.slice(0, 10);

  return (
    <section className="py-8">
      <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-400 pl-4">
        {title}
      </h2>
      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[200px] bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
            >
              <div className="bg-gray-800 h-40 mb-3 rounded"></div>
              <div className="bg-gray-800 h-4 rounded mb-2"></div>
              <div className="bg-gray-800 h-4 w-16 rounded"></div>
            </div>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-sm">No products found.</p>
      )}
      {!loading && products.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="w-48 flex-shrink-0 bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded flex flex-col items-center justify-center gap-3 min-h-[260px] group"
            >
              <span className="text-4xl text-yellow-400 group-hover:scale-110 transition-transform">
                →
              </span>
              <span className="text-white text-sm font-bold text-center px-3">
                View All {title}
              </span>
              <span className="text-yellow-400 text-xs font-bold border border-yellow-400 px-3 py-1 rounded-full group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                View All
              </span>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

const sports = ["All", "Baseball", "Basketball", "Football"];

function SportsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [selected, setSelected] = useState(
    urlCategory && sports.includes(urlCategory) ? urlCategory : "All",
  );

  useEffect(() => {
    if (urlCategory && sports.includes(urlCategory)) {
      setSelected(urlCategory);
    } else if (!urlCategory) {
      setSelected("All");
    }
  }, [urlCategory]);

  const viewAllHref =
    selected === "All"
      ? "/sports"
      : `/sports?category=${encodeURIComponent(selected)}`;

  return (
    <div className="bg-black min-h-screen">
      <BannerCarousel />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Sports Cards</h1>

          <div className="flex gap-3 mb-10 flex-wrap">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelected(sport)}
                className={pillClass(selected === sport)}
              >
                {sport}
              </button>
            ))}
          </div>

          <ProductSlider
            title={selected === "All" ? "Sports Cards" : `${selected} Cards`}
            category={
              selected === "All" ? "Sports Cards" : `${selected} Sports Cards`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "Sports Boxes" : `${selected} Boxes`}
            category={
              selected === "All" ? "Sports Boxes" : `${selected} Sports Boxes`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "Sports Slabs" : `${selected} Slabs`}
            category={
              selected === "All" ? "Sports Slabs" : `${selected} Sports Slabs`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title="On Sale"
            category={
              selected === "All"
                ? "Sports On Sale"
                : `${selected} Sports On Sale`
            }
            viewAllHref={viewAllHref}
          />
        </div>
      </div>
    </div>
  );
}

export default function SportsPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
      <SportsContent />
    </Suspense>
  );
}
