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
    const gan = searchParams.get("gan");

    if (!gan) {
      return Response.json(
        { error: "No gift card number provided" },
        { status: 400 },
      );
    }

    const response = await client.giftCards.getFromGan({
      gan,
    });

    const raw = convertBigInt(response);
    const giftCard = raw.giftCard;

    if (!giftCard) {
      return Response.json({ error: "Gift card not found" }, { status: 404 });
    }

    return Response.json({
      balance: giftCard.balanceMoney?.amount || 0,
      currency: giftCard.balanceMoney?.currency || "USD",
      state: giftCard.state,
    });
  } catch (error) {
    console.error("Gift card error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch gift card" },
      { status: 500 },
    );
  }
}
