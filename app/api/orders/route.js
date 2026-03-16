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
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ error: "No email provided" }, { status: 400 });
    }

    // First find the customer by email
    const customerResponse = await client.customers.search({
      query: {
        filter: {
          emailAddress: {
            exact: email,
          },
        },
      },
    });

    const customerRaw = convertBigInt(customerResponse);
    const customer = customerRaw.customers?.[0];

    if (!customer) {
      return Response.json({ orders: [] });
    }

    // Then fetch their orders
    const ordersResponse = await client.orders.search({
      locationIds: [process.env.SQUARE_LOCATION_ID],
      query: {
        filter: {
          customerFilter: {
            customerIds: [customer.id],
          },
        },
      },
    });

    const ordersRaw = convertBigInt(ordersResponse);
    const orders = (ordersRaw.orders || []).map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      totalMoney: order.totalMoney,
      lineItems: order.lineItems || [],
      status: order.state,
    }));

    return Response.json({ orders });
  } catch (error) {
    console.error("Orders error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
