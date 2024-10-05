import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }

    // Check for existing user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // If the user does not exist, return an error
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password doesn't match, return an error
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // You can create a session or return a token here for authentication purposes
    // For now, let's just return a success message
    // Set role in local storage
    // localStorage.setItem('role', 'user');
    return new Response(JSON.stringify({ message: 'Login successful', user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
