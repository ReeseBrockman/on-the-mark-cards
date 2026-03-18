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
      className={`!bg-black !text-yellow-400 border border-yellow-400 font-bold rounded hover:!bg-yellow-400 hover:!text-black transition-colors ${className}`}
    >
      Add to Cart
    </button>
  );
}
