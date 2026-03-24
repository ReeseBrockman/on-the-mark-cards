"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <div className="w-48 flex-shrink-0 bg-white border border-gray-200 hover:border-red-600 transition-colors rounded cursor-pointer group relative overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden rounded-t">
        <Link href={`/products/${product.id}`}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", height: "180px", objectFit: "fill" }}
              className="rounded-t group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="bg-gray-100 h-44 rounded-t"></div>
          )}
        </Link>
      </div>

      {/* Name and price panel */}
      <div className="px-3 pt-3 pb-6 bg-white relative z-10 overflow-hidden">
        <p className="text-black text-xs font-medium leading-tight line-clamp-2 h-8 overflow-hidden">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-red-600 text-xs font-bold">{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-500 text-xs line-through">
              {product.originalPrice}
            </p>
          )}
        </div>
      </div>

      {/* Buttons - slide up from below the info panel */}
      <div className="absolute bottom-0 left-0 right-0 z-0 translate-y-full group-hover:-translate-y-20 transition-transform duration-300 bg-white px-3 pb-3 pt-2 flex flex-col gap-1">
        <Link
          href={`/products/${product.id}`}
          className="block w-full !bg-red-600 !text-white text-xs font-bold py-2 text-center rounded border border-red-600 hover:!bg-white hover:!text-red-600 transition-colors"
        >
          View Product
        </Link>
        <AddToCartButton product={product} className="w-full text-xs py-2" />
      </div>
    </div>
  );
}
