/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { createNewResponseAction } from "@/actions/responses";
import {
  feedbackQuestions,
  weightsOptions,
  rattingsOptions,
} from "@/data/feedbackQuestionsOption";
import { Feedback } from "@/types";
import {
  getFeedbackByIdAction,
  updateFeedbackWeightsAndRatings,
} from "@/actions/feedbacks";

export default function FeedbackPage() {
  //  for getting feedback id
  const { feedbackId } = useParams();
  const feedbackIdStr = Array.isArray(feedbackId) ? feedbackId[0] : feedbackId;

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  const [feedbackData, setFeedbackData] = useState<Feedback>();
  const facultyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      if (!feedbackIdStr) return; // Prevents unnecessary calls if feedbackId is empty

      try {
        const response = await getFeedbackByIdAction(feedbackIdStr);
        if (response.success) {
          setFeedbackData(response.data?.[0] ?? {});
          console.log("In Feedback ID : ");
          console.log(response.data?.[0]);
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
  }, []);

  const [weights, setWeights] = useState<{ [key: string]: number[] }>({});
  const [rating, setRating] = useState<{ [key: string]: number[] }>({});
  const [submitted, setSubmitted] = useState(false);
  const [authenticationCode, setAuthenticationCode] = useState("");

  const [nextFaculty, setNextFaculty] = useState(0);

  if (!feedbackData)
    return <div className="text-center text-red-500">Feedback not found!</div>;

  const handleWeightChange = (
    facultyKey: string,
    questionId: number,
    value: number
  ) => {
    setWeights((prev) => {
      const updatedWeights = { ...prev };
      if (!updatedWeights[facultyKey]) updatedWeights[facultyKey] = [];
      updatedWeights[facultyKey][questionId] = value;
      return updatedWeights;
    });
  };
  const handleRatingChange = (
    facultyKey: string,
    questionId: number,
    value: number
  ) => {
    setRating((prev) => {
      const updatedRating = { ...prev };
      if (!updatedRating[facultyKey]) updatedRating[facultyKey] = [];
      updatedRating[facultyKey][questionId] = value;
      return updatedRating;
    });
  };

  const nextFacultySubmit = (facultyKey: string) => {
    let isValid = true;

    feedbackQuestions.forEach((_, qIndex) => {
      if (!weights[facultyKey]?.[qIndex]) {
        isValid = false;
      }
      if (!rating[facultyKey]?.[qIndex]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async () => {
    let isValid = true;

    feedbackData?.faculty_with_subject.forEach((faculty) => {
      console.log(faculty);

      feedbackQuestions.forEach((_, qIndex) => {
        if (!weights[faculty]?.[qIndex]) {
          isValid = false;
        }
        if (!rating[faculty]?.[qIndex]) {
          isValid = false;
        }
      });
    });

    if (!isValid) {
      alert("Please answer all questions before submitting.");
      return;
    }

    console.log(weights);
    console.log(rating);

    if (!feedbackIdStr) return; // Prevents unnecessary calls if feedbackId is empty

    try {
      const response = await updateFeedbackWeightsAndRatings(
        feedbackIdStr,
        weights,
        rating
      );

      if (response.success) {
        alert(response.message);
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log("Failed to fetch feedback data.");
    } finally {
    }

    setSubmitted(true);
  };

  const calculateAverages = (facultyKey: string) => {
    const facultyResponses = weights[facultyKey] || [];
    const questionAverages = facultyResponses.map((sum, i) => sum || 0);
    const overallAverage =
      questionAverages.length > 0
        ? questionAverages.reduce((a, b) => a + b, 0) / questionAverages.length
        : 0;
    return { overallAverage, questionAverages };
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-2 mt-8"
      ref={facultyRef}
    >
      {!submitted ? (
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl border border-black">
          <h1 className="text-3xl font-bold text-center p-1">
            Student Feedback about Teaching Learning
          </h1>
          <hr className="border-2 border-black" />

          <h1 className="ml-4 mt-2">
            Academic Year : {feedbackData?.academic_year}
          </h1>
          <h1 className="ml-4">Department : {feedbackData?.department}</h1>
          <h1 className="ml-4">
            Semester : {feedbackData?.semester} ({feedbackData?.term}){" "}
          </h1>

          <hr className="border-1 border-black my-1" />

          <div className="ml-4 mt-2 mb-6">
            <label className="block text-lg font-semibold mb-1">
              Authentication Code
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Authentication Code"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
              value={authenticationCode}
              onChange={(e) => setAuthenticationCode(e.target.value)}
            ></input>
          </div>

          <hr className="border-2 border-black mb-6" />

          {feedbackData?.faculty_with_subject.map((faculty, index) => {
            const [facultyName, facultySubject] = faculty.split(":"); // Splitting faculty name and subject

            return (
              <div
                key={faculty}
                className={`mb-6 p-1 sm:p-4 bg-gray-50 rounded-lg border border-gray-300 ${
                  nextFaculty !== index ? "hidden" : ""
                }`}
              >
                <h2 className="font-semibold mb-1">
                  {facultyName} -{" "}
                  <span className="text-gray-600 text-sm">
                    {facultySubject}
                  </span>
                </h2>

                <div className="border-t border-gray-600 my-4"></div>

                <div className="sm:pl-4 flex justify-between text-xs font-bold">
                  <div className="flex w-11/12 justify-center">
                    <p>Questions</p>
                  </div>
                  <div className="flex gap-1 w-6/12 sm:w-3/12">
                    <p className="w-1/2 flex justify-center">Weights</p>
                    <p className="w-1/2 flex justify-center">Rattings</p>
                  </div>
                </div>

                <div className="border-t border-gray-300 my-1"></div>

                <div className="sm:pl-4">
                  {feedbackQuestions.map((question, qIndex) => (
                    <div
                      key={question.id}
                      className="mb-3 flex justify-between"
                    >
                      <div className="flex gap-2 w-11/12">
                        <p className="text-sm font-medium">
                          {"Q"}
                          {qIndex + 1})
                        </p>
                        <p className="text-sm font-medium">
                          {question.question}{" "}
                          <span className="text-red-500">*</span>
                        </p>
                      </div>
                      <div className="flex gap-1 h-full w-6/12 sm:w-3/12">
                        <select
                          className="sm:p-1 border rounded-md text-sm border-gray-400 w-1/2 h-8"
                          value={weights[faculty]?.[qIndex] || ""}
                          onChange={(e) =>
                            handleWeightChange(
                              faculty,
                              qIndex,
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value=""></option>
                          {weightsOptions.map((option, optIndex) => (
                            <option
                              key={optIndex}
                              value={option}
                              className={`${
                                weights?.[faculty]?.includes(option)
                                  ? "hidden"
                                  : ""
                              }`}
                            >
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          className="sm:p-1 border rounded-md text-sm border-gray-400 w-1/2"
                          value={rating[faculty]?.[qIndex] || ""}
                          onChange={(e) => {
                            handleRatingChange(
                              faculty,
                              qIndex,
                              Number(e.target.value)
                            );
                          }}
                        >
                          <option value=""></option>
                          {rattingsOptions.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-between">
            <button
              onClick={() => {
                setNextFaculty(nextFaculty - 1);

                // Scroll to the faculty section smoothly
                if (facultyRef.current) {
                  facultyRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className={`text-white px-4 py-2 rounded-md  transition ${
                nextFaculty == 0
                  ? "bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-500"
              } ${nextFaculty == 0 ? "cursor-not-allowed" : "bg-blue-600"}`}
              disabled={nextFaculty == 0}
            >
              Previous Faculty
            </button>

            {nextFaculty != feedbackData?.faculty_with_subject.length - 1 ? (
              <button
                onClick={() => {
                  if (
                    nextFacultySubmit(
                      feedbackData?.faculty_with_subject[nextFaculty]
                    )
                  ) {
                    setNextFaculty((prev) => prev + 1);

                    // Scroll smoothly to the next faculty section
                    if (facultyRef.current) {
                      facultyRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  } else {
                    alert("Please answer all questions before proceeding!");
                  }
                }}
                className={`text-white px-4 py-2 rounded-md transition ${
                  nextFaculty === feedbackData?.faculty_with_subject.length - 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
                disabled={
                  nextFaculty === feedbackData?.faculty_with_subject.length - 1
                }
              >
                Next Faculty
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Feedback Summary
          </h1>

          {feedbackData?.faculty_with_subject.map((faculty) => {
            const { overallAverage, questionAverages } =
              calculateAverages(faculty);

            const [facultyName, facultySubject] = faculty.split(":"); // Splitting faculty name and subject

            return (
              <div
                key={faculty}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-600"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {facultyName} -{" "}
                  <span className="text-gray-600">{facultySubject}</span>
                </h2>
                <p className="text-sm font-medium">
                  <span className="font-bold">Overall Average:</span>{" "}
                  {overallAverage.toFixed(2)}
                </p>
                <div className="border-t border-gray-600 my-3"></div>
                <div className="mt-3">
                  <div className="text-gray-900 flex justify-between gap-3">
                    <div className="font-semibold">Questions</div>
                    <div className="font-semibold">Rating</div>
                  </div>

                  <div className="p-2">
                    {feedbackQuestions.map((question, qIndex) => (
                      <div
                        key={question.id}
                        className="text-xs text-gray-700 flex justify-between gap-3"
                      >
                        <div className="font-medium">
                          {"Q" + (qIndex + 1) + ") "}
                          {question.question}:
                        </div>{" "}
                        <div>
                          {questionAverages[qIndex]
                            ? questionAverages[qIndex].toFixed(2)
                            : "N/A"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
