"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, Check } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

type Step = "email" | "otp" | "password" | "success";

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onBackToLogin,
}: ForgotPasswordModalProps) {
  // Form states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation states
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // Current step in the forgot password flow
  const [currentStep, setCurrentStep] = useState<Step>("email");

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Reset all form fields and steps when modal is closed
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setCurrentStep("email");
      setIsEmailValid(true);
      setIsOtpValid(true);
      setIsPasswordValid(true);
      setIsPasswordMatch(true);
    }
  }, [isOpen]);

  // Handle email submission and OTP generation
  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    setIsEmailValid(validEmail);

    if (!validEmail) return;

    setIsLoading(true);

    try {
      // Simulate API call to generate OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("OTP generated for:", email);
      // Move to OTP verification step
      setCurrentStep("otp");
    } catch (error) {
      console.error("Error generating OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate OTP (simple 6-digit validation)
    const validOtp = /^\d{6}$/.test(otp);
    setIsOtpValid(validOtp);

    if (!validOtp) return;

    setIsLoading(true);

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("OTP verified:", otp);
      // Move to password reset step
      setCurrentStep("password");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password (at least 8 characters with one number and one special character)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegex.test(password);
    setIsPasswordValid(validPassword);

    // Check if passwords match
    const passwordsMatch = password === confirmPassword;
    setIsPasswordMatch(passwordsMatch);

    if (!validPassword || !passwordsMatch) return;

    setIsLoading(true);

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Password reset for:", email);
      // Move to success step
      setCurrentStep("success");
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep === "otp") {
      setCurrentStep("email");
    } else if (currentStep === "password") {
      setCurrentStep("otp");
    }
  };

  // Handle return to login
  const handleReturnToLogin = () => {
    onBackToLogin();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X
            className="hover:bg-gray-200 p-1 rounded-full hover:text-red-600"
            size={30}
          />
          <span className="sr-only">Close</span>
        </button>

        {/* Back button (only show on OTP and password steps) */}
        {(currentStep === "otp" || currentStep === "password") && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back</span>
          </button>
        )}

        {/* Modal header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentStep === "success" ? "Success!" : "Reset Password"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {currentStep === "email" &&
              "Enter your email to receive a verification code"}
            {currentStep === "otp" &&
              "Enter the 6-digit code sent to your email"}
            {currentStep === "password" && "Create a new password"}
            {currentStep === "success" &&
              "Your password has been reset successfully"}
          </p>
        </div>

        {/* Email Step */}
        {currentStep === "email" && (
          <form onSubmit={handleGenerateOtp}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isEmailValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="you@example.com"
                  required
                />
                {!isEmailValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Generate OTP"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Back to login
                </button>
              </div>
            </div>
          </form>
        )}

        {/* OTP Verification Step */}
        {currentStep === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isOtpValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
                {!isOtpValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid 6-digit code
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() =>
                    handleGenerateOtp({
                      preventDefault: () => {},
                    } as React.FormEvent)
                  }
                  className="text-sm text-blue-500 hover:underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </div>
          </form>
        )}

        {/* New Password Step */}
        {currentStep === "password" && (
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isPasswordValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                  required
                />
                {!isPasswordValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Password must be at least 8 characters with at least one
                    letter, one number, and one special character
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isPasswordMatch ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="••••••••"
                  required
                />
                {!isPasswordMatch && (
                  <p className="mt-1 text-sm text-red-600">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        {/* Success Step */}
        {currentStep === "success" && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>
            <button
              onClick={handleReturnToLogin}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
