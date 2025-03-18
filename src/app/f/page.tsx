"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFeedbackFormsWithAcademicYearDepartmentClassWiseAction } from "@/actions/feedbacks";
import { Feedback } from "@/types";

export default function Page() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const initialYears: string[] = [];
  const [years, setYears] = useState(initialYears);
  const [academicYear, setAcademicYear] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);

  // useEffcet for fetching years
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Adjust this as per requirement
    const yearList = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearList.push(`${year}-${year + 1}`);
    }

    setYears(yearList);
  }, []);

  // Function for fetching feedbacks
  const fetchFeedback = async () => {
    // setIsLoading(true);
    if (!academicYear) return; // Prevents unnecessary calls if academicYear is empty

    try {
      const response =
        await getFeedbackFormsWithAcademicYearDepartmentClassWiseAction(
          academicYear,
          department,
          classLevel
        );
      if (response.success) {
        setFeedbackData(response.data ?? []);
        console.log(response.data);
        setSubmitted(true);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log("Failed to fetch feedback data." + err);
    } finally {
      // setIsLoading(false);
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!department || !classLevel || !academicYear) {
      alert("Please select both department and class.");
      return;
    }

    fetchFeedback();
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

              {/* Select Academic Year */}
              <div className="w-full mb-2">
                <label className="block text-lg font-semibold mb-1">
                  Academic Year
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {years.map((year, index) => (
                    <option key={index} className="">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Selection */}
              <div className="w-full mb-2">
                <label className="block text-lg font-semibold mb-1">
                  Select Department
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="First Year">First Year</option>
                  <option value="Computer Science">
                    Computer Science & Engineering
                  </option>
                  <option value="Electronics">
                    Electronics and Telecommunication
                  </option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Civil">Civil</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              {/* Class Selection */}
              <div className="w-full mb-2">
                <label className="block text-lg font-semibold mb-1">
                  Select Class
                </label>
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
              </div>

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

          {feedbackData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {feedbackData.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/f/${fb.id}`)}
                >
                  <h3 className="text-lg font-semibold">{fb.feedback_title}</h3>
                  <p className="text-sm text-gray-500">
                    Expires: {fb.created_at}
                  </p>
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
