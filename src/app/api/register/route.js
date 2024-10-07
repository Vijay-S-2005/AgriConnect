import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {

  try {
    const { formData, type } = await request.json();
    const { firstName, lastName, phoneNumber, email, password, id } = formData;

    if (!firstName || !lastName || !phoneNumber || !email || (!password && type !== "profile") || (type === "profile" && !id)) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    if (type === "profile") {
      const updatedUser = await prisma.user.update({
        where: { id }, // Specify the user to update
        data: { firstName, lastName, phoneNumber, email }, // Update only the name field
      });
      console.log("Updated profile data in backend is", firstName, lastName, phoneNumber, email);
      return new Response(JSON.stringify({ message: 'User updated successfully', updatedUser }), { status: 200 });
    } else {
      // Check for existing user
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password: hashedPassword,
          type,
        },
      });

      return new Response(JSON.stringify({ message: 'User created successfully', user }), { status: 201 });
    }

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
