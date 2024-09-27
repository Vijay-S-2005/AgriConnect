'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {  useLocale } from "next-intl";
const OTPVerification = () => {
  const router = useRouter();
  const localeActive = useLocale();

    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {   
        setOtp(e.target.value);
    };

    const verifyOtp = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Retrieve and parse formData from local storage
        const formDataString = localStorage.getItem('formData');
        const formData = formDataString ? JSON.parse(formDataString) : null;

        if (!formData) {
            setMessage('No form data found. Please try again.');
            return;
        }

        try {
            // Verify OTP
            const otpResponse = await axios.post(`/${localeActive}/api/otp/verifyOTP`, { phoneNumber: formData.phoneNumber, otp });
            
            if (otpResponse.status === 200) {
                try {
                    // Register user
                    const registerResponse = await axios.post(`/${localeActive}/api/register`, formData);
                    
                    if (registerResponse.status === 201) {
                        localStorage.removeItem('formData'); 
                        alert("User created successfully");
                        router.push(`/${localeActive}/Login/userLogin`);

                        
                    } else {
                        setMessage("User registration failed");
                    }
                } catch (registerError) {
                    setMessage("Error registering user: " + registerError.response?.data?.error || "Unknown error");
                }
            } else {
                setMessage("OTP not verified: " + otpResponse.data.message);
            }
        } catch (otpError) {
            setMessage("Error verifying OTP: " + otpError.response?.data?.error || "Unknown error");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
                <form onSubmit={verifyOtp}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Verify OTP
                    </button>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;
