"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "../hooks/useProducts";

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

const CARD_SUPPLIES_PILLS = ["All", "Toploaders", "Card Sleeves", "Binders"];
const TCG_SUPPLIES_PILLS = ["All", "Deck Boxes", "Dice", "Playmats"];

const CARD_SUPPLIES_CATEGORY = {
  All: "Card Supplies",
  Toploaders: "Toploaders",
  "Card Sleeves": "Card Sleeves",
  Binders: "Binders",
};

const TCG_SUPPLIES_CATEGORY = {
  All: "TCG Supplies",
  "Deck Boxes": "Deck Boxes",
  Dice: "Dice",
  Playmats: "Playmats",
};

function CardSuppliesSection() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="mb-8">
      <div className="flex gap-2 flex-wrap mb-4">
        {CARD_SUPPLIES_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setSelected(pill)}
            className={pillClass(selected === pill)}
          >
            {pill}
          </button>
        ))}
      </div>
      <ProductSlider
        title={selected === "All" ? "Card Supplies" : selected}
        category={CARD_SUPPLIES_CATEGORY[selected]}
        viewAllHref={
          selected === "All"
            ? "/supplies/card-supplies"
            : `/supplies/${selected.toLowerCase().replace(" ", "-")}`
        }
      />
    </div>
  );
}

function TCGSuppliesSection() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="mb-8">
      <div className="flex gap-2 flex-wrap mb-4">
        {TCG_SUPPLIES_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setSelected(pill)}
            className={pillClass(selected === pill)}
          >
            {pill}
          </button>
        ))}
      </div>
      <ProductSlider
        title={selected === "All" ? "TCG Supplies" : selected}
        category={TCG_SUPPLIES_CATEGORY[selected]}
        viewAllHref={
          selected === "All"
            ? "/supplies/tcg-supplies"
            : `/supplies/${selected.toLowerCase()}`
        }
      />
    </div>
  );
}

function SuppliesContent() {
  return (
    <div className="bg-black min-h-screen">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Supplies</h1>
          <CardSuppliesSection />
          <TCGSuppliesSection />
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
