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

async function getImageUrl(imageId) {
  try {
    const response = await client.catalog.object.get({
      objectId: imageId,
    });
    const raw = convertBigInt(response);
    return raw.object?.imageData?.url || null;
  } catch {
    return null;
  }
}

async function getCategoryName(categoryId) {
  try {
    const response = await client.catalog.object.get({
      objectId: categoryId,
    });
    const raw = convertBigInt(response);
    return raw.object?.categoryData?.name || null;
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const response = await client.catalog.object.get({
      objectId: id,
    });

    const raw = convertBigInt(response);
    const item = raw.object;

    if (!item || item.type !== "ITEM") {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const imageIds = item.itemData?.imageIds || [];
    const images = await Promise.all(
      imageIds.map((imgId) => getImageUrl(imgId)),
    );

    const categoryId = item.itemData?.categories?.[0]?.id;
    const category = categoryId ? await getCategoryName(categoryId) : null;

    const variations = item.itemData?.variations || [];

    const regularVariation = variations.find(
      (v) => v.itemVariationData?.name?.toLowerCase() === "regular",
    );
    const saleVariation = variations.find(
      (v) => v.itemVariationData?.name?.toLowerCase() === "sale",
    );

    const regularPrice =
      regularVariation?.itemVariationData?.priceMoney?.amount;
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

    const product = {
      id: item.id,
      name: item.itemData?.name || "Unknown Product",
      description: item.itemData?.description || null,
      price,
      originalPrice,
      images: images.filter(Boolean),
      category,
    };

    return Response.json({ product });
  } catch (error) {
    console.error("Square product error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 },
    );
  }
}
