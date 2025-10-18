import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AuthLayout from "../../components/Layouts/AuthLayout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  // Timer for resend OTP
  React.useEffect(() => {
    let timer;
    if (resendDisabled && counter > 0) {
      timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    } else if (counter === 0) {
      setResendDisabled(false);
      setCounter(60);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, counter]);

  const handleSendOtp = async () => {
    try {
      setError("");
      setSuccess("");
      await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
      setShowOtpInput(true);
      setResendDisabled(true);
      setSuccess("OTP sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, {
        email,
        type: "reset",
      });
      setResendDisabled(true);
      setCounter(60);
      setSuccess("New OTP sent");
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      setError("");
      setSuccess("");
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        email,
        otp,
        newPassword,
      });
      setSuccess("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto mt-20 p-6 border rounded">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <Input
          label="Email"
          placeholder="abc@example.com"
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        {!showOtpInput ? (
          <button className="btn-primary mt-3" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <>
            <Input
              label="OTP"
              placeholder="Enter OTP"
              type="text"
              value={otp}
              onChange={({ target }) => setOtp(target.value)}
            />
            <Input
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
            <button className="btn-primary mt-3" onClick={handleResetPassword}>
              Reset Password
            </button>
            <button
              className="mt-2 text-sm text-[#895bfc] underline"
              disabled={resendDisabled}
              onClick={handleResendOtp}
            >
              {resendDisabled ? `Resend in ${counter}s` : "Resend OTP"}
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
