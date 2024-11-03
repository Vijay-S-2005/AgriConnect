import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    let { userId, productId, quantity } = await request.json();

    // Convert productId to integer if it's not already
    productId = parseInt(productId, 10);

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

    // Check if the product already exists in the user's cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      // If the product exists in the cart, update the quantity
      const updatedCart = await prisma.cart.update({
        where: {
          cartId: existingCartItem.cartId,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return new Response(JSON.stringify(updatedCart), { status: 200 });
    } else {
      // If the product does not exist, create a new cart entry
      const newCart = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });

      return new Response(JSON.stringify(newCart), { status: 201 });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return new Response(JSON.stringify({ error: "Error updating cart" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
