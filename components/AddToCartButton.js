"use client";

import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({ product, className = "" }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl || product.images?.[0] || null,
        });
      }}
      className={`!bg-red-600 !text-white border border-red-600 font-bold rounded hover:!bg-white hover:!text-red-600 transition-colors ${className}`}
    >
      Add to Cart
    </button>
  );
}
