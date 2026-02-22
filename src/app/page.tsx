"use client";
import LoginModal from "@/components/LoginModal";
import { APP_METADATA } from "@/data/metadata";
// import { checkLogin } from "@/utils/checkLogin";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Zap, BarChart3, Lock } from "lucide-react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("sgmAdminToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* Hero Section */}
        <section className="pt-3 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Decorative Background */}
            <div className="absolute top-20 -right-96 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-96 w-96 h-96 bg-green-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Streamline Feedback Collection
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
                  Welcome to <span className="text-blue-600">SGMCOE</span>{" "}
                  Feedback System
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed text-balance">
                  A seamless platform for students and faculty to provide and
                  receive feedback efficiently. Transform insights into
                  improvements.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/f"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                  >
                    Student Feedback
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  {!isLogin && (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-gray-900 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
                    >
                      <Lock className="w-5 h-5" />
                      Admin Access
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-gray-600 mt-1">Anonymous</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      Real-time
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Analytics</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      Secure
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Data</div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-10" />
                  <div className="absolute inset-8 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="h-3 bg-blue-200 rounded-full w-20 mb-4" />
                      <div className="h-3 bg-gray-200 rounded-full w-32 mb-2" />
                      <div className="h-3 bg-gray-200 rounded-full w-24" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-blue-600 rounded-lg" />
                      <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to collect and analyze feedback
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Easy Feedback Submission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Submit feedback effortlessly in just a few clicks with our
                  intuitive interface.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Real-time Reports
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Admins can access and analyze feedback instantly with powerful
                  analytics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Enterprise-grade security ensuring data protection and
                  authenticity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Why Choose SGMCOE Feedback System?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trusted by educational institutions worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Transparent Process
                    </h3>
                    <p className="text-gray-600">
                      Clear visibility into all feedback collected, ensuring
                      transparency and trust.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Efficient Collection
                    </h3>
                    <p className="text-gray-600">
                      Streamlined workflows make feedback collection fast and
                      effortless.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Data Security
                    </h3>
                    <p className="text-gray-600">
                      Advanced encryption protects sensitive feedback data at
                      all levels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get Started Today
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Ready to transform your institution with better feedback
                    insights?
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/f"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Submit Feedback
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    {!isLogin && (
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-gray-900 border-2 border-blue-600 hover:bg-white transition-colors font-semibold"
                      >
                        <Lock className="w-5 h-5" />
                        Admin Access
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white w-full">
          <div className="w-full mx-auto">
            <div className="border-t border-gray-200 pt-2 flex flex-col justify-between items-center text-sm text-gray-600 gap-2">
              <div>© 2025 SGMCOE Feedback System. All rights reserved.</div>
              <div className="text-xs text-gray-500 font-medium">
                {APP_METADATA.logoName} v{APP_METADATA.version}.
                {APP_METADATA.buildNumber}
              </div>
            </div>
          </div>
        </footer>
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
