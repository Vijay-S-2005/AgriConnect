"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors
  const [successMessage, setSuccessMessage] = useState(""); // To show success
  const router = useRouter();

  const isPhoneNumberValid = phoneNumber.length === 10;
  const isOtpValid = otp.trim() !== "";
  const isPasswordValid =
    password.trim() !== "" && confirmPassword.trim() !== "";
  const isPasswordMatch = password === confirmPassword;

  const sendOtp = async () => {
    if (!isPhoneNumberValid) return;

    try {
      const response = await axios.post("/api/otp/createOTP", {
        phoneNumber: `+91${phoneNumber}`,
      });
      if (response.status === 200) {
        setIsOtpSent(true);
        setResendTimeout(true);
        setErrorMessage(""); // Clear error message on success
        setTimeout(() => setResendTimeout(false), 60000); // Resend OTP after 1 minute
      }
    } catch (error) {
      setErrorMessage("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!isOtpValid) return;

    try {
      const response = await axios.post("/api/otp/verifyOTPForRegister", {
        phoneNumber: `+91${phoneNumber}`,
        otp: otp,
      });
      if (response.status === 200) {
        setIsOtpVerified(true);
        setErrorMessage(""); // Clear error message on success
      } else {
        setErrorMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP. Please try again.");
    }
  };

  const changePassword = async () => {
    if (!isPasswordValid || !isPasswordMatch) {
      setErrorMessage("Passwords do not match or are empty.");
      return;
    }

    try {
      const response = await axios.post("/api/forgotPassword", {
        phoneNumber: `+91${phoneNumber}`, // or email depending on your logic
        password: password, // new password
      });
      if (response.status === 200) {
        setSuccessMessage("Password updated successfully.");
        setErrorMessage(""); // Clear any error message
        setTimeout(() => {
          router.push("/"); // Redirect to homepage after success
        }, 2000);
      } else {
        setErrorMessage("Failed to update password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error updating password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      {!isOtpVerified ? (
        <>
          <input
            type="text"
            className="border border-gray-300 p-2 mb-4 w-64"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isOtpSent}
          />
          <p className="text-red-500 text-sm mb-2">
            {isPhoneNumberValid || phoneNumber === ""
              ? ""
              : "Please enter a valid 10-digit phone number."}
          </p>

          {!isOtpSent ? (
            <button
              className={`${
                isPhoneNumberValid ? "bg-blue-500" : "bg-gray-400"
              } text-white p-2 w-64`}
              onClick={sendOtp}
              disabled={!isPhoneNumberValid}
            >
              Send OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                className="border border-gray-300 p-2 mb-4 w-64"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-red-500 text-sm mb-2">
                {isOtpValid || otp === "" ? "" : "Please enter the OTP."}
              </p>

              <button
                className={`${
                  isOtpValid ? "bg-blue-500" : "bg-gray-400"
                } text-white p-2 w-64 mb-4`}
                onClick={verifyOtp}
                disabled={!isOtpValid}
              >
                Verify OTP
              </button>

              <button
                className="bg-gray-500 text-white p-2 w-64"
                onClick={sendOtp}
                disabled={resendTimeout}
              >
                {resendTimeout ? "Resend OTP (1 min)" : "Resend OTP"}
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <input
            type="password"
            className="border border-gray-300 p-2 mb-4 w-64"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 p-2 mb-4 w-64"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-red-500 text-sm mb-2">
            {isPasswordValid || password === "" || confirmPassword === ""
              ? ""
              : "Both password fields are required."}
          </p>
          <p className="text-red-500 text-sm mb-2">
            {isPasswordMatch || confirmPassword === ""
              ? ""
              : "Passwords do not match."}
          </p>

          <button
            className={`${
              isPasswordValid && isPasswordMatch ? "bg-blue-500" : "bg-gray-400"
            } text-white p-2 w-64`}
            onClick={changePassword}
            disabled={!isPasswordValid || !isPasswordMatch}
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
