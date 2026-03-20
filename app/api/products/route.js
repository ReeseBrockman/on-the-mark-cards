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

async function getCategoryId(categoryName) {
  const response = await client.catalog.list({
    types: ["CATEGORY"],
  });
  const raw = convertBigInt(response);
  const categories = raw.data || [];

  const match = categories.find(
    (cat) =>
      cat.categoryData?.name?.toLowerCase() === categoryName.toLowerCase(),
  );
  return match ? match.id : null;
}

function parseProduct(item) {
  const variations = item.itemData?.variations || [];

  const regularVariation = variations.find(
    (v) => v.itemVariationData?.name?.toLowerCase() === "regular",
  );
  const saleVariation = variations.find(
    (v) => v.itemVariationData?.name?.toLowerCase() === "sale",
  );

  const regularPrice =
    regularVariation?.itemVariationData?.priceMoney?.amount ??
    variations[0]?.itemVariationData?.priceMoney?.amount;
  const salePrice = saleVariation?.itemVariationData?.priceMoney?.amount;

  const price = salePrice
    ? `$${(parseInt(salePrice) / 100).toFixed(2)}`
    : regularPrice
      ? `$${(parseInt(regularPrice) / 100).toFixed(2)}`
      : "Price unavailable";

  const originalPrice =
    salePrice && regularPrice
      ? `$${(parseInt(regularPrice) / 100).toFixed(2)}`
      : null;

  return {
    id: item.id,
    name: item.itemData?.name || "Unknown Product",
    price,
    originalPrice,
    onSale: !!salePrice,
    imageId: item.itemData?.imageIds?.[0] || null,
    categories: item.itemData?.categories?.map((c) => c.id) || [],
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const response = await client.catalog.list({
      types: ["ITEM"],
    });

    const raw = convertBigInt(response);
    let items = raw.data || [];

    if (category) {
      const categoryId = await getCategoryId(category);
      if (categoryId) {
        items = items.filter((item) =>
          item.itemData?.categories?.some((cat) => cat.id === categoryId),
        );
      } else {
        items = [];
      }
    }

    const products = items.map(parseProduct);

    return Response.json({ items: products });
  } catch (error) {
    console.error("Square API error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}
