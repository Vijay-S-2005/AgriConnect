// src/app/api/cart/[userId]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle GET request to fetch cart items for the user
export async function GET(req, { params }) {
  const { userId } = params; // Get userId from URL parameters

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: {
        product: true, // Include product details
      },
    });
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Error fetching cart items" },
      { status: 500 }
    );
  }
}

// Handle POST request to add item to cart
export async function POST(req, { params }) {
  const { userId } = params; // Get userId from URL parameters
  const { productId, quantity } = await req.json(); // Parse request body

  try {
    const cartItem = await prisma.cart.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      },
    });
    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Error adding to cart" },
      { status: 500 }
    );
  }
}

// Handle PUT request to update cart item quantity
export async function PUT(req) {
  const { cartId, quantity } = await req.json(); // Parse request body

  try {
    const updatedCartItem = await prisma.cart.update({
      where: { cartId: parseInt(cartId) },
      data: { quantity: parseInt(quantity) },
    });
    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Error updating cart item" },
      { status: 500 }
    );
  }
}

// Handle DELETE request to remove item from cart
export async function DELETE(req) {
  const { cartId } = await req.json(); // Parse request body

  try {
    await prisma.cart.delete({
      where: { cartId: parseInt(cartId) },
    });
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Error removing item from cart" },
      { status: 500 }
    );
  }
}

// Fallback for unsupported methods
export function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
