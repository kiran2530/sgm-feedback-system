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
  const [isLoading, setIsLoading] = useState(false);
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

  // Sample feedback data (Replace with actual API data)
  const allFeedbacks = [
    {
      id: "101",
      academic_year: "2024-25",
      department: "Computer Science",
      class: "Final Year",
      semester: "8",
      term: "Odd",
      feedback_title: "Feb 2024",
      faculty_with_subject: [
        "Kiran:DBA",
        "John:Data Structures",
        "Emma:Operating Systems",
      ],
      createAt: "2024",
      unique_codes: ["ABC123", "XYZ789", "PQR456"],
      weights: {
        "Kiran:DBA": [
          [
            0.5, 0, 2.5, 0, 4.5, 0, 6.5, 0, 8.5, 0, 10.5, 0, 12.5, 0, 14.5, 0,
            16.5, 0, 18.5, 0,
          ],
        ],
        "John:Data Structures": [
          [
            0, 1.5, 0, 3.5, 0, 5.5, 0, 7.5, 0, 9.5, 0, 11.5, 0, 13.5, 0, 15.5,
            0, 17.5, 0, 19.5,
          ],
        ],
        "Emma:Operating Systems": [
          [
            0, 0, 2.5, 0, 0, 5.5, 0, 0, 8.5, 0, 0, 11.5, 0, 0, 14.5, 0, 0, 17.5,
            0, 19.5,
          ],
        ],
      },
      rating: {
        "Kiran:DBA": [
          [3, 4, 5, 4, 5],
          [4, 5, 3, 4, 4],
        ],
        "John:Data Structures": [
          [5, 5, 4, 3, 4],
          [4, 3, 5, 4, 5],
        ],
        "Emma:Operating Systems": [
          [4, 3, 4, 5, 5],
          [5, 4, 4, 3, 4],
        ],
      },
    },
  ];

  // Function for fetching feedbacks
  const fetchFeedback = async () => {
    setIsLoading(true);
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
      console.log("Failed to fetch feedback data.");
    } finally {
      setIsLoading(false);
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
                  <option value="Computer Science">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="ME">Mechanical</option>
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
