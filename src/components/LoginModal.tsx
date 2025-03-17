"use client";

import type React from "react";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { loginAdmin } from "@/actions/auth/login";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onBackToLogin,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    setIsEmailValid(validEmail);

    // Validate password (at least 6 characters)
    const validPassword = password.length >= 6;
    setIsPasswordValid(validPassword);

    if (validEmail && validPassword) {
      // Handle login logic here
      const data = await loginAdmin(email, password);

      console.log("Login with:", data);
      if (data.success) {
        localStorage.setItem("sgmAdminToken", data.token ?? "");
        // Reset form
        setEmail("");
        setPassword("");
        // Close modal
        onClose();
        console.log("Token : ", localStorage.getItem("sgmAdminToken"));
        window.location.reload();
      }
      alert(data.message);
    }
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

        {/* Modal header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isEmailValid ? "border-gray-300" : "border-red-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="you@example.com"
                required
              />
              {!isEmailValid && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  isPasswordValid ? "border-gray-300" : "border-red-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="••••••••"
                required
              />
              {!isPasswordValid && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex items-center justify-end">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsForgotPasswordOpen(true);
                }}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onBackToLogin={onBackToLogin}
      />
    </div>
  );
}
