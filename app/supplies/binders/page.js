"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "../../hooks/useProducts";

function ProductGrid() {
  const { products, loading } = useProducts("Binders");

  return (
    <>
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
            >
              <div className="bg-gray-800 h-48 mb-3 rounded"></div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function BindersPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/supplies"
            className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
          >
            Supplies
          </Link>
          <span className="text-gray-500 text-sm mx-2">/</span>
          <Link
            href="/supplies/card-supplies"
            className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
          >
            Card Supplies
          </Link>
          <span className="text-gray-500 text-sm mx-2">/</span>
          <span className="text-white text-sm">Binders</span>
        </div>
        <h1 className="text-white text-3xl font-bold mb-8">Binders</h1>
        <ProductGrid />
      </div>
    </div>
  );
}
