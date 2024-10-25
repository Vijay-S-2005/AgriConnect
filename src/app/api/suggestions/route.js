import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req) {
    try {
        // Parse the JSON body of the request
        const { prefix } = await req.json();
        
        // Check if the prefix is provided
        if (!prefix) {
            return new Response(JSON.stringify({ error: 'Prefix is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Query the database for products with names starting with the provided prefix
        const products = await prisma.product.findMany({
            where: {
                productName: {
                    startsWith: prefix,
                },
            },
            select: {
                productName: true, // Select only the productName field
            },
        });

        // Map the results to extract just the product names
        const productNames = products.map(product => product.productName);

        // Return the matching product names
        return new Response(JSON.stringify(productNames), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}
