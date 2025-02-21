"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFeedback } from "@/context/FeedbackContext";

export default function Page() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { MOCK_DATA } = useFeedback();
  // Sample feedback data (Replace with actual API data)
  const allFeedbacks = MOCK_DATA;

  // Filter active feedbacks based on selected department & class
  const filteredFeedbacks = allFeedbacks.filter(
    (fb) => fb.department === department && fb.class === classLevel
  );

  // Handle Submit
  const handleSubmit = () => {
    if (!department || !classLevel) {
      alert("Please select both department and class.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-16">
      {!submitted ? (
        <>
          <div className="flex justify-center items-center h-[80vh] w-[100vw] px-3">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-center mb-4">
                Student Feedback
              </h1>

              {/* Department Selection */}
              <label className="block font-semibold">Select Department</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Computer Science">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
              </select>

              {/* Class Selection */}
              <label className="block font-semibold">Select Class</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              >
                <option value="">Select</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
              </select>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition mt-10"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full ">
          {/* Selected Class & Department Heading */}
          <h2 className="text-2xl font-bold text-center mb-6">
            {classLevel} - {department} Feedbacks
          </h2>

          {filteredFeedbacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/f/${fb.id}`)}
                >
                  <h3 className="text-lg font-semibold">{fb.title}</h3>
                  <p className="text-sm text-gray-500">Expires: {fb.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No active feedbacks available for this class.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
