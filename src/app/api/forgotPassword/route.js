import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { phoneNumber, password } = await request.json();
    console.log("phoneNumber is", phoneNumber);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user password using phoneNumber (now unique)
    const user = await prisma.user.update({
      where: { phoneNumber }, // Now phoneNumber is unique
      data: {
        password: hashedPassword, // Update the password with the hashed version
      },
    });

    // Send a success response
    return new Response(
      JSON.stringify({ message: "Password updated successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update password" }),
      {
        status: 500,
      }
    );
  }
}
