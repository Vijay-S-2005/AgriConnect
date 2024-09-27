'use client';
import React, { useState } from 'react';

export default function Login() {
  const [isOtpLogin, setIsOtpLogin] = useState(false);

  const toggleOtpLogin = () => {
    setIsOtpLogin(!isOtpLogin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isOtpLogin ? 'Farmer Login with OTP' : 'Farmer Login'}
        </h1>
        
        {!isOtpLogin ? (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email or Phone Number
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email or phone number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
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
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </>
        )}

        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300">
          {isOtpLogin ? 'Verify OTP' : 'Continue'}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          {isOtpLogin ? (
            <a href="#" onClick={toggleOtpLogin} className="text-green-600 hover:underline">
              Back to Password Login
            </a>
          ) : (
            <>
              <span>Don't have an account? </span>
              <a href="#" className="text-green-600 hover:underline">Sign up</a>
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
