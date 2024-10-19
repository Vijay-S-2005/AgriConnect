// src/app/api/otp/getOTP/route.js
import redis from "@/lib/redis";

export default async function verifyOTP(phoneNumber, otp) {
  console.log("in verifyOTP function");
  console.log("otp", otp);
  console.log("phone number", phoneNumber);
  let result = {
    status: "",
    message: "",
  };

  try {
    // Retrieve the OTP from Redis
    const originalOtp = await redis.get(phoneNumber);
    console.log("original otp", originalOtp);

    if (!originalOtp) {
      console.log(`Invalid OTP: ${otp}`);
      result.status = "invalid";
      result.message = "OTP expired";
    }
    if (originalOtp === otp) {
      console.log("OTP verified");
      result.status = "valid";
      result.message = "OTP verified";
    } else {
      console.log("Invalid OTP");
      result.status = "invalid";
      result.message = "Invalid OTP";
    }
    return result;
  } catch (error) {
    console.error("Error retrieving OTP:", error);
    throw new Error("Error retrieving OTP", error);
  }
}
