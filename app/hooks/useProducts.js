import { useState, useEffect } from "react";

export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = category
          ? `/api/products?category=${encodeURIComponent(category)}`
          : "/api/products";
        const res = await fetch(url);
        const data = await res.json();

        const productsWithImages = await Promise.all(
          data.items.map(async (item) => {
            let imageUrl = null;

            if (item.imageId) {
              const imgRes = await fetch(`/api/images?imageId=${item.imageId}`);
              const imgData = await imgRes.json();
              imageUrl = imgData.imageUrl;
            }

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              originalPrice: item.originalPrice || null,
              onSale: item.onSale || false,
              imageUrl,
            };
          }),
        );

        setProducts(productsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}
