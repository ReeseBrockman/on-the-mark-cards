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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return Response.json({ items: [] });
    }

    const response = await client.catalog.search({
      objectTypes: ["ITEM"],
      query: {
        textQuery: {
          keywords: [query],
        },
      },
    });

    const raw = convertBigInt(response);
    const items = (raw.objects || []).map((item) => {
      const variation = item.itemData?.variations?.[0];
      const priceAmount = variation?.itemVariationData?.priceMoney?.amount;
      const price = priceAmount
        ? `$${(parseInt(priceAmount) / 100).toFixed(2)}`
        : "Price unavailable";

      return {
        id: item.id,
        name: item.itemData?.name || "Unknown Product",
        price,
        imageId: item.itemData?.imageIds?.[0] || null,
      };
    });

    return Response.json({ items });
  } catch (error) {
    console.error("Square search error:", error);
    return Response.json(
      { error: error.message || "Failed to search" },
      { status: 500 },
    );
  }
}
