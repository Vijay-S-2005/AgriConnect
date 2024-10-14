// src/app/api/verify-otp/route.js
import verifyOTP from "@/app/api/otp/verifyOTPForLogin/route";

export async function POST(req) {
  try {
    const { phoneNumber, otp } = await req.json(); // Parse the JSON body

    // Validate request payload
    if (!phoneNumber || !otp) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Call the verifyOTP function
    const result = await verifyOTP(phoneNumber, otp);

    // Return the result as a response
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);

    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
