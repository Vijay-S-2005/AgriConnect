import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
  return handlePost(req);
}

export async function GET(req) {
  return handleGet(req);
}

// Handle POST requests to create a new review
async function handlePost(req) {
  try {
    // Parse the request body
    const { userId, productId, content, rating } = await req.json();

    // Validate required fields
    if (!userId || !productId || !content || typeof rating !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!userExists) {
      return new Response(
        JSON.stringify({ error: `User with userId ${userId} does not exist` }),
        { status: 400 }
      );
    }

    // Check if the product exists
    const productExists = await prisma.product.findUnique({
      where: { productId: productId },
    });
    if (!productExists) {
      return new Response(
        JSON.stringify({
          error: `Product with productId ${productId} does not exist`,
        }),
        { status: 400 }
      );
    }

    // Create a new review in the database
    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        content,
        rating,
      },
    });

    // Respond with the created review
    return new Response(JSON.stringify(review), { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return new Response(JSON.stringify({ error: "Error creating review" }), {
      status: 500,
    });
  }
}

// Handle GET requests to retrieve all reviews
async function handleGet(req) {
  try {
    // Extract the productId from the query parameters
    const url = new URL(req.url);
    const productId = parseInt(url.searchParams.get("productId"), 10);

    // Fetch reviews for the specified productId
    const reviews = await prisma.review.findMany({
      where: { productId: productId }, // Filter reviews by productId
      include: { user: true }, // Include user data if needed
    });

    // Respond with the fetched reviews
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Error fetching reviews" }), {
      status: 500,
    });
  }
}
