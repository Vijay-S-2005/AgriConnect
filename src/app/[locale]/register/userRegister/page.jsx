"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correct import for app directory
import { useLocale } from "next-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";

export default function RegisterDialog({ Open, onClose }) {
  const localeActive = useLocale();
  const router = useRouter();
  const { data: session, status } = useSession();

  let initialValue = session?.user
    ? session.user
    : {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        type: "",
        password: "",
        confirmPassword: "",
        otp: "", // Add an OTP field to formData for future use
      };
  const [formData, setFormData] = useState(initialValue);
  const [otpSent, setOtpSent] = useState(false); // New state to track if OTP is sent
  const [errors, setErrors] = useState({});

  const trimCountryCode = (phoneNumber) => {
    const countryCodePattern = /^\+\d{1,2}/;
    return phoneNumber?.replace(countryCodePattern, "");
  };

  useEffect(() => {
    if (session?.user) {
      setFormData({
        ...session.user,
        phoneNumber: trimCountryCode(session?.user?.phoneNumber),
        id: session?.user?.id,
      });
    }
  }, [session]);

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6789]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must be 10 digits and start with 6, 7, 8, or 9";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!session?.user) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.type) {
        newErrors.type = "Type is required";
      }
    }

    if (otpSent && !formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    signOut({ redirect: false });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // formData.phoneNumber = "+91" + formData.phoneNumber;

      // Check if OTP has not been sent yet
      if (!otpSent) {
        try {
          const response = await axios.post(`/api/otp/createOTP`, {
            phoneNumber: "+91" + formData.phoneNumber,
          });
          if (response.status === 200) {
            setOtpSent(true); // Set OTP sent status to true
            localStorage.setItem("formData", JSON.stringify(formData));
          }
        } catch (error) {
          console.error("Error in OTP request:", error);
        }
      } else {
        // Verify OTP first
        try {
          const otpResponse = await axios.post(
            `/api/otp/verifyOTPForRegister`,
            {
              phoneNumber: formData.phoneNumber,
              otp: formData.otp,
            }
          );
          console.log("OTP response is", otpResponse.data.status);
          if (otpResponse.data.status === "valid") {
            // OTP verification successful, now register the user
            try {
              const registerResponse = await axios.post(`/api/register`, {
                formData: formData,
                type: "user",
              });

              if (registerResponse.status === 201) {
                // Registration successful, navigate to the desired page
                router.push(`/${localeActive}`);
              } else {
                console.error("Registration failed", registerResponse);
              }
            } catch (error) {
              console.error("Error in registration:", error);
            }
          } else {
            console.error("OTP verification failed");
          }
        } catch (error) {
          console.error("Error in OTP verification:", error);
        }
      }
    }
  };

  return (
    <Dialog open={Open} maxWidth="xs" fullWidth>
      <DialogContent className="p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {!session?.user ? "User Register" : "Profile"}{" "}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 pl-16 border rounded-lg ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your number"
              />
              <span className="absolute left-0 top-0 h-full px-4 py-2 text-gray-500 bg-gray-100 border-r border-gray-300 rounded-l-lg">
                +91
              </span>
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {!session?.user && (
            <>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-600">
                  Type
                </span>
                <div className="mt-1 flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="user"
                      checked={formData.type === "user"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    User
                  </label>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </>
          )}

          {otpSent && (
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-600"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
            >
              {!otpSent ? "Send OTP" : "Verify OTP"}
            </button>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {session?.user && <Button onClick={handleLogout}>Log Out</Button>}
      </DialogActions>
    </Dialog>
  );
}
