"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        const productsWithImages = await Promise.all(
          data.items.map(async (item) => {
            let imageUrl = null;
            if (item.imageId) {
              const imgRes = await fetch(`/api/images?imageId=${item.imageId}`);
              const imgData = await imgRes.json();
              imageUrl = imgData.imageUrl;
            }
            return { ...item, imageUrl };
          }),
        );

        setProducts(productsWithImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-400 text-sm">
            Showing results for <span className="text-red-600">"{query}"</span>
          </p>
        )}
      </div>

      {loading && (
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-48 bg-gray-100 border border-gray-200 p-4 rounded animate-pulse flex-shrink-0"
            >
              <div className="bg-gray-200 h-48 mb-3 rounded"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-16 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            No products found for "{query}"
          </p>
          <Link href="/" className="text-red-600 hover:underline text-sm">
            Return to Homepage
          </Link>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-200 h-8 w-48 rounded mb-8 animate-pulse"></div>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-48 bg-gray-100 border border-gray-200 p-4 rounded animate-pulse flex-shrink-0"
                >
                  <div className="bg-gray-200 h-48 mb-3 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-16 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
