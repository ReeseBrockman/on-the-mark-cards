"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "./hooks/useProducts";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";

function ProductSlider({ title, category, viewAllHref }) {
  const { products, loading } = useProducts(category);
  const visibleProducts = products.slice(0, 10);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
          {title}
        </h2>
      </div>

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

const SPORTS_PILLS = ["All", "Baseball", "Basketball", "Football"];
const TCG_PILLS = [
  "All",
  "Pokemon",
  "Magic The Gathering",
  "One Piece",
  "Lorcana",
];

const SPORTS_SLABS_CATEGORY = {
  All: "Sports Slabs",
  Baseball: "Baseball Sports Slabs",
  Basketball: "Basketball Sports Slabs",
  Football: "Football Sports Slabs",
};

const SPORTS_BOXES_CATEGORY = {
  All: "Sports Boxes",
  Baseball: "Baseball Sports Boxes",
  Basketball: "Basketball Sports Boxes",
  Football: "Football Sports Boxes",
};

const TCG_SLABS_CATEGORY = {
  All: "TCG Slabs",
  Pokemon: "Pokemon TCG Slabs",
  "Magic The Gathering": "Magic The Gathering TCG Slabs",
  "One Piece": "One Piece TCG Slabs",
  Lorcana: "Lorcana TCG Slabs",
};

const TCG_SEALED_CATEGORY = {
  All: "TCG Sealed",
  Pokemon: "Pokemon TCG Sealed",
  "Magic The Gathering": "Magic The Gathering TCG Sealed",
  "One Piece": "One Piece TCG Sealed",
  Lorcana: "Lorcana TCG Sealed",
};

function SportsSection() {
  const [selected, setSelected] = useState("All");

  return (
    <div>
      <div className="px-4 max-w-7xl mx-auto pt-10 flex gap-2 flex-wrap">
        {SPORTS_PILLS.map((pill) => (
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
        title={selected === "All" ? "Sports Slabs" : `${selected} Slabs`}
        category={SPORTS_SLABS_CATEGORY[selected]}
        viewAllHref="/sports"
      />
      <ProductSlider
        title={selected === "All" ? "Sports Boxes" : `${selected} Boxes`}
        category={SPORTS_BOXES_CATEGORY[selected]}
        viewAllHref="/sports"
      />
      <ProductSlider
        title="Sports On Sale"
        category="Sports On Sale"
        viewAllHref="/sports"
      />
    </div>
  );
}

function TCGSection() {
  const [selected, setSelected] = useState("All");

  return (
    <div>
      <div className="px-4 max-w-7xl mx-auto pt-10 flex gap-2 flex-wrap">
        {TCG_PILLS.map((pill) => (
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
        title={selected === "All" ? "TCG Slabs" : `${selected} Slabs`}
        category={TCG_SLABS_CATEGORY[selected]}
        viewAllHref="/tcg"
      />
      <ProductSlider
        title={selected === "All" ? "TCG Sealed" : `${selected} Sealed`}
        category={TCG_SEALED_CATEGORY[selected]}
        viewAllHref="/tcg"
      />
      <ProductSlider
        title="TCG On Sale"
        category="TCG On Sale"
        viewAllHref="/tcg"
      />
    </div>
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

  return (
    <div className="bg-black">
      <section className="grid grid-cols-2 gap-4 px-4 py-4">
        <Link
          href="/sports"
          onClick={() => handlePreference("sports")}
          className="relative h-96 flex items-center justify-center overflow-hidden group rounded-2xl"
          style={{
            backgroundImage: "url('/sports-banner.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              SPORTS
            </h2>
            <p className="text-yellow-400 text-sm md:text-lg mb-6">
              Shop Our Unbeatable Prices!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap rounded-full">
              Shop Sports →
            </span>
          </div>
        </Link>

        <Link
          href="/tcg"
          onClick={() => handlePreference("tcg")}
          className="relative h-96 flex items-center justify-center overflow-hidden group rounded-2xl"
          style={{
            backgroundImage: "url('/tcg-banner.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
              TCG
            </h2>
            <p className="text-yellow-400 text-sm md:text-lg mb-6">
              Unleash Your Ultimate Deck!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap rounded-full">
              Shop TCG →
            </span>
          </div>
        </Link>
      </section>

      <JustArrived />

      {preference === "sports" ? (
        <>
          <SportsSection />
          <TCGSection />
        </>
      ) : (
        <>
          <TCGSection />
          <SportsSection />
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
