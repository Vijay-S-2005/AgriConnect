import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req) {
  try {
    // Parse the request body to get the columns array
    const { columns } = await req.json();

    // If no columns are provided, return an error
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return new Response(JSON.stringify({ error: "No columns specified" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the specified columns from the 'product' table
    const data = await prisma.product.findMany({
      select: columns.reduce((acc, column) => {
        acc[column] = true;
        return acc;
      }, {}),
    });

    // Return the JSON response with the selected columns
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return an error response
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect(); // Close the Prisma connection
  }
}
