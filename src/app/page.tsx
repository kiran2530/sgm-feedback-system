"use client";
import LoginModal from "@/components/LoginModal";
import { checkLogin } from "@/utils/checkLogin";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // const [isLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* Hero Section */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to SGM Feedback System
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            A seamless platform for students and faculty to provide and receive
            feedback efficiently.
          </p>
          <div className="flex justify-center space-x-4">
            {checkLogin() ? (
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-1 sm:px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Admin Dashboard
              </Link>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-3 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg sm:text-lg font-medium  transition"
                >
                  Admin Login
                </button>
              </div>
            )}
            <Link
              href="/f"
              className="px-3 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:text-lg font-medium  transition"
            >
              Student Feedback
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-center">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Easy Feedback Submission
            </h3>
            <p className="text-gray-600 mt-2">
              Submit feedback effortlessly in just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Real-time Reports
            </h3>
            <p className="text-gray-600 mt-2">
              Admins can access and analyze feedback instantly.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Secure & Reliable
            </h3>
            <p className="text-gray-600 mt-2">
              Ensuring data security and authenticity at all levels.
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onBackToLogin={() => setIsLoginModalOpen(true)}
      />
    </div>
  );
}
