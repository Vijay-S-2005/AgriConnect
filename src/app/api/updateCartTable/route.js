import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId, productId, quantity } = await request.json();
    console.log("userId", userId);
    console.log("productId", productId);
    console.log("quantity", quantity);

    // Validate that all fields are present
    if (!userId || !productId || !quantity) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create a new cart entry
    const newCart = await prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });

    // Respond with the newly created cart object
    return new Response(JSON.stringify(newCart), { status: 201 });
  } catch (error) {
    console.error("Error creating cart entry:", error);
    return new Response(
      JSON.stringify({ error: "Error creating cart entry" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Close the Prisma connection
  }
}
