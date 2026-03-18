"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./context/CartContext";

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
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-yellow-400 pl-4">
        {title}
      </h2>
      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[200px] bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
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
        <div className="flex gap-4 overflow-x-auto pb-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function JustArrived() {
  const { products, loading } = useProducts();
  const [paused, setPaused] = useState(false);

  if (loading) return null;

  return (
    <section className="py-10 bg-black border-t border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
          Just Arrived
        </h2>
      </div>
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex gap-4 px-4 animate-marquee ${paused ? "paused" : ""}`}
          style={{ width: "max-content" }}
        >
          {[...products, ...products, ...products].map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-16 px-4 bg-gray-900 border-t border-yellow-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
            Follow Us on Instagram
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors"
          >
            Follow Us
          </a>
        </div>
        <behold-widget feed-id="1xH5TwqzAbDU0aCmjbXh"></behold-widget>
      </div>
    </section>
  );
}

export default function Home() {
  const [preference, setPreference] = useState("sports");

  useEffect(() => {
    const saved = localStorage.getItem("tcc-preference");
    if (saved) setPreference(saved);
  }, []);

  const handlePreference = (pref) => {
    localStorage.setItem("tcc-preference", pref);
    setPreference(pref);
  };

  const sportsSections = (
    <>
      <ProductSlider title="Sports Cards" category="Sports" />
      <ProductSlider title="Sports Boxes" category="Sports" />
      <ProductSlider title="Sports On Sale" category="On Sale Sports" />
    </>
  );

  const tcgSections = (
    <>
      <ProductSlider title="TCG Singles" category="TCG" />
      <ProductSlider title="TCG Sealed" category="TCG" />
      <ProductSlider title="TCG On Sale" category="On Sale TCG" />
    </>
  );

  return (
    <div className="bg-black">
      <section className="grid grid-cols-2 gap-0">
        <Link
          href="/sports"
          onClick={() => handlePreference("sports")}
          className="relative h-96 bg-gray-900 flex items-center justify-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              Sports
            </h2>
            <p className="text-yellow-400 text-sm md:text-lg mb-6">
              Shop Our Unbeatable Prices!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-4 py-2 md:px-6 md:py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap">
              Shop Sports
            </span>
          </div>
        </Link>

        <Link
          href="/tcg"
          onClick={() => handlePreference("tcg")}
          className="relative h-96 bg-gray-800 flex items-center justify-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              TCG
            </h2>
            <p className="text-yellow-400 text-sm md:text-lg mb-6">
              Unleash Your Ultimate Deck!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-4 py-2 md:px-6 md:py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap">
              Shop TCG
            </span>
          </div>
        </Link>
      </section>

      <JustArrived />

      {preference === "sports" ? (
        <>
          {sportsSections}
          {tcgSections}
        </>
      ) : (
        <>
          {tcgSections}
          {sportsSections}
        </>
      )}

      <InstagramSection />

      <section className="bg-gray-900 border-t border-yellow-400 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-3xl font-bold mb-6">
              Want to shop in person?
            </h2>
            <p className="text-gray-400 mb-2">
              2527 W Kennewick Ave, Kennewick, WA 99336
            </p>
            <div className="mt-4">
              <p className="text-yellow-400 font-bold mb-2">Store Hours</p>
              <p className="text-gray-400 text-sm">
                Monday - Saturday: 11:00 AM - 6:00 PM
              </p>
              <p className="text-gray-400 text-sm">
                Sunday: 12:00 PM - 4:00 PM
              </p>
            </div>
          </div>
          <Link
            href="/shop-info/location"
            className="bg-yellow-400 text-black font-bold px-8 py-4 hover:bg-yellow-300 transition-colors whitespace-nowrap"
          >
            Location and Directions
          </Link>
        </div>
      </section>
    </div>
  );
}
