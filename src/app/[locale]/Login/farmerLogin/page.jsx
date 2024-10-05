'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from "next-intl";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { signIn, useSession } from "next-auth/react";

export default function LoginDialog({ open, onClose }) {
  const localeActive = useLocale();
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const router = useRouter();

  const toggleOtpLogin = () => {
    setIsOtpLogin(!isOtpLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setVerifyEnabled(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isOtpLogin) {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      }
    } else {
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }
    return newErrors;
  };

  // Email and Password Login
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // const response = await axios.post(`/api/login/user`, { email, password });
        // const response = await axios.post(`/${localeActive}/api/login/user`, { email, password });
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (!result.error) {
          router.push(`/${localeActive}`);
          console.log("Login successful");
        }
      } catch (error) {
        console.error(error);

        // Optionally handle login failure
      }
    }
  };

  const handleSendOtp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(`/api/otp/createOTP`, { phoneNumber: '+91' + phone });
        if (response.status === 200) {
          setOtpSent(true);
          setErrors({});
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        const response = await axios.post(`/api/otp/verifyOTP`, { phoneNumber: '+91' + phone, otp });
        if (response.status === 200) {
          router.push(`/${localeActive}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOtpInputChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    if (value.length === 6) {
      setVerifyEnabled(true);
    } else {
      setVerifyEnabled(false);
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>{isOtpLogin ? 'Farmer Login with OTP' : 'Farmer Login'}</DialogTitle>
      <DialogContent>
        <form onSubmit={isOtpLogin ? handleVerifyOtp : handleEmailPasswordLogin}>
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
                  className={`mt-1 w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm`}
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
                  className={`mt-1 w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4 flex">
                <div className="w-full">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className={`mt-1 px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm w-full`}
                  />
                </div>
                <div className="ml-2 mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendOtp}
                    disabled={!phone || !/^\d{10}$/.test(phone)}
                  >
                    Send OTP
                  </Button>
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

              {otpSent && (
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpInputChange}
                    placeholder="Enter OTP"
                    className={`mt-1 px-4 py-2 border ${errors.otp ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm w-full`}
                  />
                </div>
              )}
            </>
          )}

          {otpSent && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
              disabled={!verifyEnabled}
            >
              Verify OTP
            </Button>
          )}
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          {isOtpLogin ? (
            <a href="#" onClick={toggleOtpLogin} className="text-green-600 hover:underline">
              Back to Password Login
            </a>
          ) : (
            <a href="#" onClick={toggleOtpLogin} className="text-green-600 hover:underline mt-2 block">
              Sign in with OTP
            </a>
          )}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
