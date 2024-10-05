// // import { getIronSession } from "iron-session";
// import { cache } from "../../../../config/cache";

// // import { sessionOptions } from "./send"; 

// export async function POST(req,res) {

//     // const { otp } = req.body;
//     let otp="k1KPVe"

//     let phoneNumber = "7395963411";
//     let str="vijay" 
//     console.log(cache.get(str));

//     // Retrieve OTP from session
//     // const session = await getIronSession(req, res, sessionOptions);
//     // const storedOtp = session.otp;

//     if (cachedOtp === otp) {
//       // Clear the OTP from session after successful verification
//       // session.destroy();
//       console.log("OTP verified");
//       // res.status(200).json({ message: "OTP verified" });
//     } else {
//         console.log("Invalid OTP");
//       // res.status(400).json({ error: "Invalid OTP" });
//     }

// }


// src/app/api/otp/getOTP/route.js
import redis from "@/lib/redis";
export async function POST(req) {
  const { phoneNumber,otp } = await req.json();
  console.log("otp",otp); 
  console.log("phone number",phoneNumber);

  if (!phoneNumber && !otp) {
    return new Response(JSON.stringify({ message: 'Phone number is required' }), { status: 400 });
  }

  try {
    // Retrieve the OTP from Redis
    const originalOtp = await redis.get(phoneNumber);
    console.log("original otp",originalOtp);

    if (!originalOtp) {
      console.log(`No OTP found for phone number ${phoneNumber}`);
      return new Response(JSON.stringify({ message: 'OTP not found' }), { status: 404 });
    }
    if(originalOtp === otp) {
      console.log("OTP verified");
      return new Response(JSON.stringify({ message: 'OTP verified' }), { status: 200 });
    } else {
      console.log("Invalid OTP");
      return new Response(JSON.stringify({ message: 'Invalid OTP' }), { status: 400 });
    }
  } catch (error) {
    console.error('Error retrieving OTP:', error);
    return new Response(JSON.stringify({ message: 'Error retrieving OTP' }), { status: 500 });
  }
}
