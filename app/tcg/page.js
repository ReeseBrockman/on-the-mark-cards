"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
import GlitchBanner from "@/components/GlitchBanner";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";

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

const tcgBrands = [
  "All",
  "Pokemon",
  "Magic The Gathering",
  "One Piece",
  "Lorcana",
];

function TCGContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [selected, setSelected] = useState(
    urlCategory && tcgBrands.includes(urlCategory) ? urlCategory : "All",
  );

  useEffect(() => {
    if (urlCategory && tcgBrands.includes(urlCategory)) {
      setSelected(urlCategory);
    } else if (!urlCategory) {
      setSelected("All");
    }
  }, [urlCategory]);

  const viewAllHref =
    selected === "All"
      ? "/tcg"
      : `/tcg?category=${encodeURIComponent(selected)}`;

  return (
    <div className="bg-black min-h-screen">
      <GlitchBanner section="tcg" />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">TCG</h1>

          <div className="flex gap-3 mb-10 flex-wrap">
            {tcgBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelected(brand)}
                className={pillClass(selected === brand)}
              >
                {brand}
              </button>
            ))}
          </div>

          <ProductSlider
            title={selected === "All" ? "TCG Singles" : `${selected} Singles`}
            category={
              selected === "All" ? "TCG Singles" : `${selected} TCG Singles`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "TCG Sealed" : `${selected} Sealed`}
            category={
              selected === "All" ? "TCG Sealed" : `${selected} TCG Sealed`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "TCG Slabs" : `${selected} Slabs`}
            category={
              selected === "All" ? "TCG Slabs" : `${selected} TCG Slabs`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title="On Sale"
            category={
              selected === "All" ? "TCG On Sale" : `${selected} TCG On Sale`
            }
            viewAllHref={viewAllHref}
          />
        </div>
      </div>
    </div>
  );
}

export default function TCGPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
      <TCGContent />
    </Suspense>
  );
}
