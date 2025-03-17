"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, UserPlus } from "lucide-react";
import { registerAdmin } from "@/actions/auth/register";

interface AdminRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminRegistrationModal({
  isOpen,
  onClose,
}: AdminRegistrationModalProps) {
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Validation states
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Reset all form fields when modal is closed
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setPhone("");
      setIsEmailValid(true);
      setIsPasswordValid(true);
      setIsPasswordMatch(true);
      setIsPhoneValid(true);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    setIsEmailValid(validEmail);

    // Validate password (at least 8 characters with one number and one special character)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegex.test(password);
    setIsPasswordValid(validPassword);

    // Check if passwords match
    const passwordsMatch = password === confirmPassword;
    setIsPasswordMatch(passwordsMatch);

    // Validate phone number (10 digits)
    const phoneRegex = /^\+?\d{10,12}$/;
    const validPhone = phoneRegex.test(phone);
    setIsPhoneValid(validPhone);

    if (!validEmail || !validPassword || !passwordsMatch || !validPhone) return;

    setIsLoading(true);

    try {
      // Simulate API call to register new admin
      const data = await registerAdmin(name, email, phone, password);

      console.log("New admin registered:", data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error registering admin:", error);
    } finally {
      setIsLoading(false);
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
          <X size={20} />
          <span className="sr-only">Close</span>
        </button>

        {/* Modal header */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Register New Admin
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a new administrator account
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Registration Successful
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              The new administrator has been successfully registered.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor="admin-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="admin-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Prof. John Doe"
                  required
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isEmailValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="admin@example.com"
                  required
                />
                {!isEmailValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Phone field */}
              <div>
                <label
                  htmlFor="admin-phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="admin-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    isPhoneValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="+91 9876543210"
                  required
                />
                {!isPhoneValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid phone number
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="admin-password"
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

              {/* Confirm Password field */}
              <div>
                <label
                  htmlFor="admin-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="admin-confirm-password"
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
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register New Admin"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
