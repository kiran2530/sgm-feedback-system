/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  StepBack,
} from "lucide-react";
// import FeedbackPDF from "../../components/FeedbackPDF";
import { generateExcel } from "../../utils/generateExcel";
import { Feedback } from "@/types";
import { getFeedbackByAcademicYearAction } from "@/actions/feedbacks";
import { feedbackQuestions } from "@/data/feedbackQuestionsOption";

const departments: Record<string, string[]> = {
  "First Year": ["Div A", "Div B", "Div C"],
  "Computer Science": ["Second Year", "Third Year", "Final Year"],
  Mechanical: ["Second Year", "Third Year", "Final Year"],
  Electrical: ["Second Year", "Third Year", "Final Year"],
  Civil: ["Second Year", "Third Year", "Final Year"],
  Electronics: ["Second Year", "Third Year", "Final Year"],
};

export default function Page() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [expandedResponses, setExpandedResponses] = useState<number[]>([]);
  []; // Added state for expanded rows

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // states for enabling correct sorted data
  const [stage, setStage] = useState(0);

  // states for sorting
  const initialYears: string[] = [];
  const [years, setYears] = useState(initialYears);
  const [academicYear, setAcademicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);

  // States for calculating avarages
  interface FacultyWeightsRating {
    [facultyName: string]: number[];
  }
  const [averageWeights, setAverageWeights] = useState<FacultyWeightsRating>(
    {}
  );
  const [averageRatings, setAverageRatings] = useState<FacultyWeightsRating>(
    {}
  );

  // for fetching academic year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Adjust this as per requirement
    const yearList = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearList.push(`${year}-${year + 1}`);
    }

    setYears(yearList);
  }, []);

  // for fetching feedbcaks...
  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      if (!academicYear) return; // Prevents unnecessary calls if academicYear is empty

      try {
        const response = await getFeedbackByAcademicYearAction(academicYear);
        if (response.success) {
          setFeedbackData(response.data ?? []);
          console.log(response.data);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log("Failed to fetch feedback data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [academicYear]);

  useEffect(() => {
    if (!selectedFeedback) return;

    // set initial averages empty
    setAverageWeights({});
    setAverageRatings({});

    // Function to check if an object is empty
    const isObjectEmpty = (obj: { [x: string]: number[][] }) => {
      return Object.keys(obj).length === 0;
    };

    // Function to check if all arrays in an object are empty
    const areAllArraysEmpty = (
      obj: { [s: string]: unknown } | ArrayLike<unknown>
    ) => {
      return Object.values(obj).every(
        (arr) => Array.isArray(arr) && arr.length === 0
      );
    };

    // Check if 'weights' is non-empty and contains non-empty arrays
    if (
      !isObjectEmpty(selectedFeedback.weights) &&
      !areAllArraysEmpty(selectedFeedback.weights)
    ) {
      setAverageWeights(calculateFacultyAverages(selectedFeedback.weights));
    } else {
      console.log("No valid weights data available.");
    }

    // Check if 'rating' is non-empty and contains non-empty arrays
    if (
      !isObjectEmpty(selectedFeedback.rating) &&
      !areAllArraysEmpty(selectedFeedback.rating)
    ) {
      setAverageRatings(calculateFacultyAverages(selectedFeedback.rating));
    } else {
      console.log("No valid ratings data available.");
    }

    console.log("weights : ");

    console.log(averageWeights);
    console.log(averageRatings);
  }, [selectedFeedback]);

  // Function to calculate the faculty-wise average
  const calculateFacultyAverages = (
    data: Record<string, number[][]> | undefined
  ): Record<string, number[]> => {
    if (!data) {
      return {}; // Return an empty object if data is undefined or null
    }

    const facultyAverages: Record<string, number[]> = {};

    Object.entries(data).forEach(([faculty, values]) => {
      const numEntries = values.length;
      const sumArray = values.reduce((acc, curr) => {
        return acc.map((sum, index) => sum + curr[index]);
      }, new Array(values[0].length).fill(0));

      facultyAverages[faculty] = sumArray.map((sum) => sum / numEntries);
    });

    return facultyAverages;
  };

  const filteredData = feedbackData.filter(
    (item) =>
      (!academicYear ||
        item.academic_year.toLowerCase() === academicYear.toLowerCase()) &&
      (!department ||
        item.department.toLowerCase() === department.toLowerCase()) &&
      (!selectedClass ||
        item.class.toLowerCase() === selectedClass.toLowerCase())
  );

  const toggleResponse = (id: number) => {
    setExpandedResponses((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const calculateAverages = (obj: {
    [key: string]: number[];
  }): { [key: string]: number } => {
    const averages: { [key: string]: number } = {};

    Object.entries(obj).forEach(([key, values]) => {
      if (values.length > 0) {
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        averages[key] = sum / values.length;
      } else {
        averages[key] = 0; // Handle empty arrays by setting average to 0
      }
    });

    return averages;
  };

  return (
    <div className="container mx-auto py-6 px-4 ">
      {/* folder for year vise */}
      <div className="mt-14 flex items-center mb-6 ">
        <button
          className="bg-black text-white py-1 px-2 rounded-lg flex justify-center items-center w-20 text-sm sm:text-base"
          onClick={() => {
            if (stage == 1) {
              setAcademicYear("");
            }
            if (stage == 2) {
              setDepartment("");
            }
            if (stage == 3) {
              setSelectedClass("");
            }

            if (stage) setStage(stage - 1);
          }}
        >
          <StepBack width={20} height={20} />
          Back
        </button>
        <p className="ml-3 bg-blue-400 w-full py-1 px-2 rounded-lg text-sm sm:text-base">
          admin/{academicYear && academicYear + "/"}
          {department && department + "/"}
          {selectedClass && selectedClass}
        </p>
      </div>
      {stage == 0 && (
        <div className="">
          <div>
            <h2 className="text-2xl font-bold mb-4">Academic Years</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {years.map((year, index) => (
              <div
                key={index}
                className="p-4 bg-blue-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-blue-600"
                onClick={() => {
                  setAcademicYear(year);
                  setStage(1);
                }}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* display Departments */}
      {stage == 1 && (
        <div className="">
          <h3 className="text-xl font-bold mb-4">
            Departments for {academicYear}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
              ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-300 animate-pulse rounded-lg shadow-md h-16"
                  ></div>
                ))
              : Object.keys(departments).map((dept, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-green-700"
                    onClick={() => {
                      setDepartment(dept);
                      setStage(2);
                    }}
                  >
                    {dept}
                  </div>
                ))}
          </div>
        </div>
      )}

      {stage == 2 && (
        <div className="">
          <h3 className="text-xl font-bold mb-4">Classes for {department}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {departments[department].map((cls, index) => (
              <div
                key={index}
                className="p-4 bg-purple-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-purple-600"
                onClick={() => {
                  setSelectedClass(cls);
                  setStage(3);
                }}
              >
                {cls}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Layout for final list of feedbacks*/}
      {stage == 3 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((feedback) => (
              <div
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className="bg-white py-2 px-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    {feedback.feedback_title}
                  </h3>
                  <span className="bg-primary/10 text-primary rounded-full text-sm">
                    {feedback.academic_year}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {feedback.date.toString()}
                  </p>
                  <p className="text-sm mt-2">Semester {feedback.semester}</p>
                </div>
              </div>
            ))}
          </div>
          {filteredData.length == 0 && (
            <div className="py-2 px-4 w-full flex justify-center">
              No Feedbacks are listed...
            </div>
          )}
        </>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl p-3 sm:p-6 animate-scaleIn h-[90vh] overflow-y-auto">
            <div className="h-[90vh]">
              <div className="flex justify-between items-start mb-2 ">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedFeedback.feedback_title}
                  </h2>
                  <p className="font-semibold text-gray-500">
                    Academic Year : {selectedFeedback.academic_year}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Basic Info Section */}
              <div className="bg-gray-200 p-4 rounded-lg border">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department :</span>
                    <span>{selectedFeedback.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class :</span>
                    <span>{selectedFeedback.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Semester :</span>
                    <span>{selectedFeedback.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date :</span>
                    <span>{selectedFeedback.date.toString()}</span>
                  </div>
                </div>
              </div>

              {/* Responses Section */}
              <div className="space-y-3 mt-6">
                <h3 className="font-semibold text-lg">Responses:</h3>
                {selectedFeedback.faculty_with_subject.map((faculty, idx) => {
                  const [facultyName, facultySubject] = faculty.split(":"); // Splitting faculty name and subject

                  const totalAverageWeight = calculateAverages(averageWeights);
                  const totalAverageRating = calculateAverages(averageRatings);

                  return (
                    <div
                      key={idx}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-2 bg-gray-200 cursor-pointer gap-1"
                        onClick={() => toggleResponse(idx)}
                      >
                        {/* Faculty Name */}
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="font-semibold">
                            {facultyName} (
                            <span className="text-xs sm:text-sm">
                              {facultySubject}
                            </span>
                            )
                          </span>
                        </div>

                        {/* Total Average */}
                        {/* <div className="text-sm text-center">
                          {totalAverageWeight?.[faculty]}
                        </div>
                        <div className="text-sm text-center">
                          {totalAverageRating?.[faculty]}
                        </div> */}

                        {/* Expand/Collapse Button */}
                        <div className="flex justify-center items-center">
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            {expandedResponses.includes(idx) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {expandedResponses.includes(idx) && (
                        <div className="p-2 bg-white animate-fadeIn">
                          <div className="sm:flex sm:ml-12">
                            <p className="mb-1 font-bold text-black sm:w-6/12">
                              Name :{" "}
                              <span className="text-gray-500">
                                {facultyName}
                              </span>
                            </p>
                            <p className="mb-1 font-bold text-black">
                              Subject :{" "}
                              <span className="text-gray-500">
                                {facultySubject}
                              </span>
                            </p>
                          </div>

                          <div className="sm:flex sm:ml-12">
                            <p className="mb-1 font-bold text-black sm:w-6/12">
                              Weights Average :{" "}
                              <span className="text-gray-500">
                                {totalAverageWeight?.[faculty]}
                              </span>
                            </p>
                            <p className="mb-1 font-bold text-black">
                              Rating Average :{" "}
                              <span className="text-gray-500">
                                {totalAverageRating?.[faculty]}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col justify-between text-sm mt-6">
                            <h1 className="font-semibold text-gray-600">
                              Question Vise Avarage Weights and Ratings
                            </h1>
                            <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 text-sm text-gray-600 mt-2 border border-gray-400 rounded-lg p-1">
                              <div className="px-2 py-1 bg-gray-100 rounded flex text-black justify-between text-xs sm:font-semibold ">
                                <div className="w-8/12 flex justify-center">
                                  Question
                                </div>
                                <div className="w-2/12 flex justify-end sm:justify-center">
                                  Weights
                                </div>
                                <div className="w-2/12 flex justify-start ml-1 sm:justify-center">
                                  Ratings
                                </div>
                              </div>
                              {[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15, 16, 17, 18, 19, 20,
                              ].map((value, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 rounded flex"
                                  >
                                    <div className="w-8/12">
                                      Q{index + 1}){" "}
                                      {feedbackQuestions[index].question}
                                    </div>
                                    <div className="w-2/12 flex justify-center">
                                      {averageWeights?.[faculty]?.[index]}
                                    </div>
                                    <div className="w-2/12 flex justify-center">
                                      {averageRatings?.[faculty]?.[index]}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-14">
                {/* <PDFDownloadLink
                document={<FeedbackPDF selectedFeedback={selectedFeedback} />}
                fileName={`${
                  selectedFeedback.academicYear +
                  selectedFeedback.department +
                  selectedFeedback.class
                }`}
              >
                {({ loading }) =>
                  loading ? (
                    <button className="px-4 py-2 bg-gray-400 text-white rounded">
                      Loading...
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Generate PDF
                    </button>
                  )
                }
              </PDFDownloadLink> */}

                <button
                  onClick={() => generateExcel(selectedFeedback)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Generate Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
