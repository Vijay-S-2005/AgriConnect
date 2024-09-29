'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from "next-intl";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const localeActive = useLocale();
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const toggleOtpLogin = () => {
    setIsOtpLogin(!isOtpLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setPhone('');
    setOtp('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isOtpLogin) {
      // Email/password login validation
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      }
    } else {
      // OTP login validation
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Invalid phone number';
      }
      // if (!otp) {
      //   newErrors.otp = 'OTP is required';
      // }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Proceed with form submission (API call or further processing)
      console.log('Form submitted', { email, password, phone, otp });
      if(isOtpLogin){
        console.log("OTP login",isOtpLogin);
        try {
          const response = await axios.post(`/${localeActive}/api/otp/createOTP`, { phoneNumber: '+91'+phone });
          console.log(response);
          if(response.status == 200) {
            console.log("OTP sent successfully");
            router.push(`/${localeActive}/register/otpVerification`);
          }
        } catch (error) {
          console.error(error);
        }
      }else{
        console.log("Email login",isOtpLogin);
        try {
          const response = await axios.post(`/${localeActive}/api/otp/`, { });
          console.log(response);
          if(response.status == 200) {
            console.log("log in  successfully");
            router.push(`/${localeActive}/home`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isOtpLogin ? 'User Login with OTP' : 'User Login'}
        </h1>

        <form onSubmit={handleSubmit}>
          {!isOtpLogin ? (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`mt-1 w-full px-4 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`mt-1 w-full px-4 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

              </div>

              
              <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            continue
          </button>

            </>
          ) : (
            <>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className={`mt-1 w-full px-4 py-2 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP"
                  className={`mt-1 w-full px-4 py-2 border ${
                    errors.otp ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                />
                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}

              </div> */}
              
              <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
           Verify OTP
          </button>

            </>
          )}

          {/* <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            {isOtpLogin ? 'Verify OTP' : 'Continue'}
          </button> */}
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {isOtpLogin ? (
            <a href="#" onClick={toggleOtpLogin} className="text-green-600 hover:underline">
              Back to Password Login
            </a>
          ) : (
            <>
              <span>Don't have an account? </span>
              <Link href={`/${localeActive}/register/userRegister`} className="text-green-600 hover:underline">
                Sign up
              </Link>
              <br />
              <a href="#" onClick={toggleOtpLogin} className="text-green-600 hover:underline mt-2 block">
                Sign in with OTP
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
