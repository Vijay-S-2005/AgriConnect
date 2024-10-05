import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import axios from 'axios';
// import authOptions from '@/lib/authOptions';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Existing Credentials-based login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Validate user and password
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        // Return user details (session will store this)
        console.log("mudichi vitanga ponnga");
        return { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` };
      },
    }),

    // New OTP-based provider
    // CredentialsProvider({
    //   name: "OTP Login",
    //   credentials: {
    //     phone: { label: "Phone", type: "text", placeholder: "Enter your phone number" },
    //     otp: { label: "OTP", type: "text", placeholder: "Enter OTP" },
    //   },
    //   async authorize(credentials) {
    //     const { phone, otp } = credentials;

    //     // Send phone and OTP to your backend to verify
    //     const response = await axios.post(`/${locale}/api/otp/verifyOTP`, {
    //       phoneNumber: `+91${phone}`,
    //       otp: otp,
    //     });

    //     // If OTP verification fails
    //     if (response.status !== 200) {
    //       throw new Error('Invalid OTP');
    //     }

    //     // Assuming you return a user object from OTP verification
    //     const { user } = response.data;

    //     // Return user object if OTP is verified successfully
    //     return { id: user.id, phone: user.phone, role: user.role, name: `${user.firstName} ${user.lastName}` };
    //   },
    // }),
  ],

  // JWT and session logic
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  // pages: {
  //   signIn: "//${locale}/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };