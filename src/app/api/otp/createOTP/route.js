// import otpGenerator from 'otp-generator';
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import twilio from "twilio";
// // // import { withSession } from '@/lib/session';
// // import { cache } from "../../../../config/cache";
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = twilio(accountSid, authToken);
//   export async function POST(req,res) {
//     // const {phoneNumber} =req.body;
//     const phoneNumber="+917395963411";
//     // let phoneNumber = "+917395963411";
//     console.log("phone number pa",phoneNumber);
//     const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
//     const response = NextResponse.json({ message: `OTP ${otp} set for 5 minutes` });

// //     // const expiryTime = Date.now() + 300000;

// //     // Store OTP and expiry in the session
// //     // req.session.otpExpiry = expiryTime;
// response.cookies.set(phoneNumber, otp, {
//   httpOnly: true, // Prevent client-side access
//   sameSite: "strict", // Enhance security
//   maxAge: 5 * 60, // 5 minutes in seconds
// });
// console.log("OTP session la store aiduchi");

//     try {
//      // Send OTP via Twilio
//       await client.messages.create({
//         body: `Your OTP code is ${otp}`,
//         from: twilioPhoneNumber,
//         to: phoneNumber
//       });

//       console.log(`OTP ${otp} sent to ${phoneNumber}`);
// //       // return res.status(200).json({ message: 'OTP sent successfully!' });
//     } catch (error) {
//       console.error('Error sending OTP:', error);
// //       // return res.status(500).json({ message: 'Failed to send OTP' });
//     }

//     return response;

// //   // res.status(405).json({ message: 'Method not allowed' });
// }

// src/app/api/otp/createOTP/route.js
import redis from "@/lib/redis";

import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  const { phoneNumber } = await req.json();
  console.log("phone number pa", phoneNumber);
  // const phoneNumber = "+917395963411";
  if (!phoneNumber) {
    return new Response(
      JSON.stringify({ message: "Phone number is required" }),
      { status: 400 }
    );
  }
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    // Set key-value in Redis with 5 minutes expiry
    await redis.set(phoneNumber, otp, "EX", 300);
    console.log("OTP stored in Redis");

    try {
      // await client.messages.create({
      //   body: `Your OTP code is ${otp}`,
      //   from: twilioPhoneNumber,
      //   to: phoneNumber
      // });

      console.log(`OTP ${otp} sent to ${phoneNumber}`);
      return new Response(
        JSON.stringify({ message: "OTP sent successfully!" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
      return new Response(JSON.stringify({ message: "Failed to send OTP" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error storing OTP:", error);
    return new Response(JSON.stringify({ message: "Error storing OTP" }), {
      status: 500,
    });
  }
}
