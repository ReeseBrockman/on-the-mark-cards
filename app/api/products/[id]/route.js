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
    const response = await client.catalog.object.get({ objectId: imageId });
    const raw = convertBigInt(response);
    return raw.object?.imageData?.url || null;
  } catch {
    return null;
  }
}

async function getCategoryName(categoryId) {
  try {
    const response = await client.catalog.object.get({ objectId: categoryId });
    const raw = convertBigInt(response);
    return raw.object?.categoryData?.name || null;
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const response = await client.catalog.object.get({ objectId: id });
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

    const isSimpleProduct = regularVariation || saleVariation;

    let price, originalPrice, parsedVariations;

    if (isSimpleProduct) {
      const regularPrice =
        regularVariation?.itemVariationData?.priceMoney?.amount ??
        variations[0]?.itemVariationData?.priceMoney?.amount;
      const salePrice = saleVariation?.itemVariationData?.priceMoney?.amount;

      price = salePrice
        ? `$${(parseInt(salePrice) / 100).toFixed(2)}`
        : regularPrice
          ? `$${(parseInt(regularPrice) / 100).toFixed(2)}`
          : "Price unavailable";

      originalPrice =
        salePrice && regularPrice
          ? `$${(parseInt(regularPrice) / 100).toFixed(2)}`
          : null;

      parsedVariations = [];
    } else {
      parsedVariations = variations.map((v) => ({
        id: v.id,
        name: v.itemVariationData?.name || "Unknown",
        price: v.itemVariationData?.priceMoney?.amount
          ? `$${(parseInt(v.itemVariationData.priceMoney.amount) / 100).toFixed(2)}`
          : "Price unavailable",
      }));

      price = parsedVariations[0]?.price || "Price unavailable";
      originalPrice = null;
    }

    const product = {
      id: item.id,
      name: item.itemData?.name || "Unknown Product",
      description: item.itemData?.description || null,
      price,
      originalPrice,
      images: images.filter(Boolean),
      category,
      variations: parsedVariations,
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
