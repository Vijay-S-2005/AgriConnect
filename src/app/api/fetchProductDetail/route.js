import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req) {
  try {
    // Parse the request body to get the columns array
    const { columns, where } = await req.json();
    console.log("columns:", columns);
    let prismaConditions = where?.conditions?.map((condition) => {
      return {
        [condition.field]: {
          [condition.operator]: condition.value,
        },
      };
    });
    // condition = {
    //   field: "id",
    //   operator : "=",
    //   value : "1"
    // };

    // If no columns are provided, return an error
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return new Response(JSON.stringify({ error: "No columns specified" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the specified columns from the 'product' table
    let data = null;
    console.log("where:", prismaConditions, where);
    if (where == null) {
      console.log("where is null");
      data = await prisma.product.findMany({
        select: columns.reduce((acc, column) => {
          acc[column] = true;
          return acc;
        }, {}),
      });
    } else if (where.noOfConditions > 1) {
      console.log("where has multiple conditions");
      data = await prisma.product.findMany({
        select: columns.reduce((acc, column) => {
          acc[column] = true;
          return acc;
        }, {}),
        where: {
          [where.linkage]: prismaConditions,
        },
      });
    } else {
      console.log("where has single condition");
      data = await prisma.product.findMany({
        select: columns.reduce((acc, column) => {
          acc[column] = true;
          return acc;
        }, {}),
        where: prismaConditions[0],
      });
    }

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
