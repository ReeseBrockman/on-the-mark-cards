const { SquareClient, SquareEnvironment } = require("square");
const { randomUUID } = require("crypto");

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

export async function POST(request) {
  try {
    const { sourceId, amount, cart, customer } = await request.json();

    const response = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: "USD",
      },
      buyerEmailAddress: customer.email,
      billingAddress: {
        addressLine1: customer.address,
        locality: customer.city,
        administrativeDistrictLevel1: customer.state,
        postalCode: customer.zip,
        country: "US",
      },
    });

    const raw = convertBigInt(response);

    if (raw.payment?.status === "COMPLETED") {
      return Response.json({ success: true, paymentId: raw.payment.id });
    } else {
      return Response.json(
        { error: "Payment was not completed" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: error.message || "Payment failed" },
      { status: 500 },
    );
  }
}
