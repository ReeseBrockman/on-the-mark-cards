"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import GlitchBanner from "@/components/GlitchBanner";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="w-48 flex-shrink-0 bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded cursor-pointer group">
      <Link href={`/products/${product.id}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "100%", height: "160px", objectFit: "contain" }}
            className="rounded-t"
          />
        ) : (
          <div className="bg-gray-800 h-40 rounded-t"></div>
        )}
        <div className="p-3">
          <p className="text-white text-xs font-medium">{product.name}</p>
          <p className="text-yellow-400 text-xs font-bold mt-1">
            {product.price}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            })
          }
          className="w-full bg-yellow-400 text-black text-xs font-bold py-2 hover:bg-yellow-300 transition-colors rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

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

  const category = selected === "All" ? "Sports" : selected;

  return (
    <div className="bg-black min-h-screen">
      <GlitchBanner section="sports" />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Sports Cards</h1>

          <div className="flex gap-3 mb-10 flex-wrap">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelected(sport)}
                className={`px-6 py-2 text-sm font-bold transition-colors border ${
                  selected === sport
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-transparent text-white border-gray-700 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          <ProductSlider title="Sports Cards" category={category} />
          <ProductSlider title="Sports Boxes" category={category} />
          <ProductSlider title="Sports Slabs" category={category} />
          <ProductSlider
            title="On Sale"
            category={selected === "All" ? "On Sale Sports" : category}
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
