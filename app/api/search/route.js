const { SquareClient, SquareEnvironment } = require("square");

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

function parseItem(item) {
  const variations = item.itemData?.variations || [];
  const regularVariation = variations.find(
    (v) => v.itemVariationData?.name?.toLowerCase() === "regular",
  );
  const saleVariation = variations.find(
    (v) => v.itemVariationData?.name?.toLowerCase() === "sale",
  );
  const regularPrice = regularVariation?.itemVariationData?.priceMoney?.amount;
  const salePrice = saleVariation?.itemVariationData?.priceMoney?.amount;

  const price = salePrice
    ? `$${(parseInt(salePrice) / 100).toFixed(2)}`
    : regularPrice
      ? `$${(parseInt(regularPrice) / 100).toFixed(2)}`
      : "Price unavailable";

  return {
    id: item.id,
    name: item.itemData?.name || "Unknown Product",
    price,
    imageId: item.itemData?.imageIds?.[0] || null,
  };
}

async function getCategoryIdsForQuery(query, allCategories) {
  const words = query.trim().toLowerCase().split(/\s+/);
  return allCategories
    .filter((cat) => {
      const catName = cat.categoryData?.name?.toLowerCase() || "";
      return words.some((word) => catName.includes(word));
    })
    .map((cat) => cat.id);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return Response.json({ items: [] });
    }

    const seenIds = new Set();
    const allItems = [];

    // Step 1: Search by product name keywords
    const words = query
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 1);

    for (const word of words) {
      const response = await client.catalog.search({
        objectTypes: ["ITEM"],
        query: {
          textQuery: {
            keywords: [word],
          },
        },
      });

      const raw = convertBigInt(response);
      for (const item of raw.objects || []) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          allItems.push(parseItem(item));
        }
      }
    }

    // Step 2: Search by category match
    const catResponse = await client.catalog.list({ types: ["CATEGORY"] });
    const catRaw = convertBigInt(catResponse);
    const allCategories = catRaw.data || [];

    const matchingCategoryIds = await getCategoryIdsForQuery(
      query,
      allCategories,
    );

    if (matchingCategoryIds.length > 0) {
      const itemResponse = await client.catalog.list({ types: ["ITEM"] });
      const itemRaw = convertBigInt(itemResponse);
      const allSquareItems = itemRaw.data || [];

      for (const item of allSquareItems) {
        const itemCategoryIds =
          item.itemData?.categories?.map((c) => c.id) || [];
        const matches = itemCategoryIds.some((id) =>
          matchingCategoryIds.includes(id),
        );
        if (matches && !seenIds.has(item.id)) {
          seenIds.add(item.id);
          allItems.push(parseItem(item));
        }
      }
    }

    return Response.json({ items: allItems });
  } catch (error) {
    console.error("Square search error:", error);
    return Response.json(
      { error: error.message || "Failed to search" },
      { status: 500 },
    );
  }
}
