/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFeedback } from "@/context/FeedbackContext";

export default function FeedbackPage() {
  const { feedbackId } = useParams();
  const { MOCK_DATA } = useFeedback();

  const feedback = MOCK_DATA.find((f) => f.id.toString() === feedbackId);

  const [responses, setResponses] = useState<{ [key: number]: number[] }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!feedback)
    return <div className="text-center text-red-500">Feedback not found!</div>;

  const handleResponseChange = (
    facultyId: number,
    questionId: number,
    value: number
  ) => {
    setResponses((prev) => {
      const updatedResponses = { ...prev };
      if (!updatedResponses[facultyId]) updatedResponses[facultyId] = [];
      updatedResponses[facultyId][questionId] = value; // Store ratings as numbers (1-5)
      return updatedResponses;
    });
  };

  const handleSubmit = () => {
    let isValid = true;

    feedback.faculties.forEach((faculty) => {
      feedback.questions.forEach((_, qIndex) => {
        if (!responses[faculty.id]?.[qIndex]) {
          isValid = false;
        }
      });
    });

    if (!isValid) {
      alert("Please answer all questions before submitting.");
      return;
    }

    console.log(responses);
    setSubmitted(true);
  };

  const calculateAverages = (facultyId: number) => {
    const facultyResponses = responses[facultyId] || [];
    const questionAverages = facultyResponses.map((sum, i) => sum || 0);
    const overallAverage =
      questionAverages.length > 0
        ? questionAverages.reduce((a, b) => a + b, 0) / questionAverages.length
        : 0;
    return { overallAverage, questionAverages };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-2 mt-8">
      {!submitted ? (
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            {feedback.title}
          </h1>

          {feedback.faculties.map((faculty) => (
            <div
              key={faculty.id}
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-600"
            >
              <h2 className="font-semibold mb-1">
                {faculty.name} -{" "}
                <span className="text-gray-600 text-sm">{faculty.subject}</span>
              </h2>

              <div className="border-t border-gray-600 my-4"></div>

              <div className="pl-4">
                {feedback.questions.map((question, qIndex) => (
                  <div key={question.id} className="mb-3 flex justify-between ">
                    <p className="text-sm font-medium w-4/5">
                      {"Q"}{qIndex + 1}) {question.question}{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <select
                      className=" p-1 border rounded-md"
                      value={responses[faculty.id]?.[qIndex] || ""}
                      onChange={(e) =>
                        handleResponseChange(
                          faculty.id,
                          qIndex,
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {feedback.ratingOptions.map((option, optIndex) => (
                        <option key={optIndex} value={optIndex + 1}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Feedback Summary
          </h1>

          {feedback.faculties.map((faculty) => {
            const { overallAverage, questionAverages } = calculateAverages(
              faculty.id
            );

            return (
              <div
                key={faculty.id}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-600"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {faculty.name} -{" "}
                  <span className="text-gray-600">{faculty.subject}</span>
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
                    {feedback.questions.map((question, qIndex) => (
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
