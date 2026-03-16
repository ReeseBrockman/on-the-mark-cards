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

async function findOrCreateCustomer(email, firstName, lastName) {
  try {
    const searchResponse = await client.customers.search({
      query: {
        filter: {
          emailAddress: {
            exact: email,
          },
        },
      },
    });

    const searchRaw = convertBigInt(searchResponse);
    if (searchRaw.customers?.[0]) {
      return searchRaw.customers[0].id;
    }

    const createResponse = await client.customers.create({
      emailAddress: email,
      givenName: firstName,
      familyName: lastName,
      idempotencyKey: randomUUID(),
    });

    const createRaw = convertBigInt(createResponse);
    return createRaw.customer?.id || null;
  } catch (err) {
    console.error("Customer error:", err);
    return null;
  }
}

export async function POST(request) {
  try {
    const { sourceId, amount, cart, customer } = await request.json();

    const customerId = await findOrCreateCustomer(
      customer.email,
      customer.firstName,
      customer.lastName,
    );

    const paymentBody = {
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
    };

    if (customerId) {
      paymentBody.customerId = customerId;
    }

    const response = await client.payments.create(paymentBody);
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
