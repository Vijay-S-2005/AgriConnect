import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId, productId, quantity } = await request.json();

    // Validate that userId is present
    if (!userId || quantity === undefined) {
      return new Response(
        JSON.stringify({ error: "User ID and quantity are required" }),
        { status: 400 }
      );
    }

    // If productId is not provided, we assume it's a request to clear the cart
    if (!productId) {
      await prisma.cart.deleteMany({
        where: {
          userId: userId,
        },
      });
      return new Response(
        JSON.stringify({ message: "Cart cleared successfully" }),
        { status: 200 }
      );
    }

    // Find the cart item
    const cartItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (!cartItem) {
      return new Response(JSON.stringify({ error: "Cart item not found" }), {
        status: 404,
      });
    }

    // Calculate the new quantity
    const newQuantity = cartItem.quantity + quantity;

    if (newQuantity <= 0) {
      // If quantity is zero or less, remove the item
      await prisma.cart.delete({
        where: {
          cartId: cartItem.cartId,
        },
      });
      return new Response(JSON.stringify({ message: "Item removed" }), {
        status: 200,
      });
    } else {
      // Otherwise, update the quantity
      const updatedCartItem = await prisma.cart.update({
        where: {
          cartId: cartItem.cartId,
        },
        data: {
          quantity: newQuantity,
        },
      });

      return new Response(JSON.stringify(updatedCartItem), { status: 200 });
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
