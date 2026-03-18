"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <div className="w-48 flex-shrink-0 bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded cursor-pointer group relative overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "100%", height: "180px", objectFit: "contain" }}
            className="rounded-t"
          />
        ) : (
          <div className="bg-gray-800 h-44 rounded-t"></div>
        )}
      </Link>

      {/* Name and price panel */}
      <div className="px-3 pt-3 pb-3 bg-gray-900 relative z-10">
        <p className="text-white text-xs font-medium leading-tight line-clamp-2 h-8 overflow-hidden">
          {product.name}
        </p>
        <p className="text-yellow-400 text-xs font-bold mt-1">
          {product.price}
        </p>
      </div>

      {/* Buttons - slide up from below the info panel */}
      <div className="absolute bottom-0 left-0 right-0 z-0 translate-y-full group-hover:-translate-y-17 transition-transform duration-300 bg-gray-900 px-3 pb-3 pt-2 flex flex-col gap-1">
        <Link
          href={`/products/${product.id}`}
          className="block w-full !bg-yellow-400 !text-black text-xs font-bold py-2 text-center rounded hover:!bg-yellow-300 transition-colors"
        >
          View Product
        </Link>
        <AddToCartButton product={product} className="w-full text-xs py-2" />
      </div>
    </div>
  );
}
