import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extracting userId from the request body (assuming it's sent in the body)
    const { userId } = await request.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
      });
    }

    // Query the database to get cart items and product details for the given userId
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      select: {
        product: {
          select: {
            productId: true,
            productName: true,
            imageURL: true,
            price: true,
            type: true,
          },
        },
        quantity: true,
      },
    });

    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
