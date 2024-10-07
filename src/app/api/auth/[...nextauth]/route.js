import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Existing Credentials-based login
    Credentials({
      name: "Credentials",
      async authorize(credentials) {        
        console.log("inside authorize (login) credentials", credentials);
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email , type: credentials.type}
        });

        // Validate user and password
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        // Return user details (session will store this)
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
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour session duration in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      let id = user?.id || token?.id
      // Use the user ID from the session to fetch full user data
      const fullUser = await prisma.user.findUnique({
        where: {id}
      });

      if (fullUser) {
        token.id = fullUser.id
        token.email = fullUser.email; // Store email in the session
        token.firstName = fullUser.firstName; // Store first name in the session
        token.lastName = fullUser.lastName; // Store last name in the session
        token.type = fullUser.type; // Store type in the session
        token.phoneNumber = fullUser.phoneNumber; // Store phone number in the session
      }

      return token; // Return updated session
    },

    async session({ session, token }) {

        console.log("In session", session)
      // Populate session with token data
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.type = token.type;
      session.user.firstName = token.firstName; // Add this
      session.user.lastName = token.lastName;   // Add this
      session.user.phoneNumber = token.phoneNumber; // Optional

      return session;
    },
  },
  // pages: {
  //   signIn: "//${locale}/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handlers = NextAuth(authOptions);
export {handlers as GET, handlers as POST}