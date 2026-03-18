"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GlitchBanner from "@/components/GlitchBanner";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "../hooks/useProducts";

function ProductSlider({ title, category }) {
  const { products, loading } = useProducts(category);

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

const categories = [
  "All",
  "Toploaders",
  "Card Sleeves",
  "Binders",
  "Playmats",
  "Dice",
  "Deck Boxes",
];

function SuppliesContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [selected, setSelected] = useState(
    urlCategory && categories.includes(urlCategory) ? urlCategory : "All",
  );

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setSelected(urlCategory);
    } else if (!urlCategory) {
      setSelected("All");
    }
  }, [urlCategory]);

  return (
    <div className="bg-black min-h-screen">
      <GlitchBanner section="supplies" />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Supplies</h1>

          <div className="flex gap-3 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={pillClass(selected === cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {selected === "All" ? (
            <>
              <ProductSlider title="Card Supplies" category="Card Supplies" />
              <ProductSlider title="TCG Supplies" category="TCG Supplies" />
            </>
          ) : (
            <ProductSlider title={selected} category={selected} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function SuppliesPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
      <SuppliesContent />
    </Suspense>
  );
}
