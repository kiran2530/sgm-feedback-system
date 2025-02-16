"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

// Sample Feedback Data
const sampleFeedbackData = [
  {
    id: "1",
    feedbackName: "DSA Feedback",
    department: "CSE",
    classLevel: "TY",
    expires: "20th Feb 2025",
    faculties: [
      { id: 1, name: "Dr. Alice Johnson", subject: "Data Structures" },
      { id: 2, name: "Prof. Bob Williams", subject: "Algorithms" },
      { id: 3, name: "Dr. Carol Miller", subject: "Graph Theory" },
    ],
    questions: [
      {
        id: 1,
        text: "How clear were the explanations of DSA concepts?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 2,
        text: "Was the pace of teaching appropriate?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 3,
        text: "Were the provided coding exercises useful?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 4,
        text: "Did the faculty address doubts effectively?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: "2",
    feedbackName: "Software Engineering",
    department: "CSE",
    classLevel: "SY",
    expires: "25th Feb 2025",
    faculties: [
      { id: 4, name: "Dr. Emily Brown", subject: "Software Development" },
      { id: 5, name: "Prof. Michael Green", subject: "Agile Methodologies" },
      { id: 6, name: "Dr. Kevin Smith", subject: "Software Testing" },
    ],
    questions: [
      {
        id: 5,
        text: "Was the software development process well explained?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 6,
        text: "Did the faculty provide real-world examples?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 7,
        text: "How engaging were the classroom discussions?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 8,
        text: "Were project-based assignments helpful?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: "3",
    feedbackName: "Machine Learning",
    department: "CSE",
    classLevel: "BE",
    expires: "1st Mar 2025",
    faculties: [
      { id: 7, name: "Dr. Olivia Smith", subject: "Deep Learning" },
      { id: 8, name: "Prof. Daniel White", subject: "Supervised Learning" },
      { id: 9, name: "Dr. Eric Carter", subject: "Unsupervised Learning" },
      { id: 10, name: "Prof. Sarah Collins", subject: "Feature Engineering" },
    ],
    questions: [
      {
        id: 9,
        text: "Were ML algorithms explained in detail?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 10,
        text: "Did the faculty provide hands-on projects?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 11,
        text: "Was dataset preprocessing covered adequately?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 12,
        text: "How interactive were the ML lab sessions?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 13,
        text: "Were practical case studies provided?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: "4",
    feedbackName: "VLSI Feedback",
    department: "ECE",
    classLevel: "TY",
    expires: "18th Feb 2025",
    faculties: [
      { id: 11, name: "Dr. Sarah Lee", subject: "VLSI Design" },
      { id: 12, name: "Prof. David Brown", subject: "Chip Design" },
      { id: 13, name: "Dr. Robert Johnson", subject: "ASIC Design" },
    ],
    questions: [
      {
        id: 14,
        text: "How well were the VLSI concepts explained?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 15,
        text: "Did the faculty use practical examples?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 16,
        text: "Was the simulation software training adequate?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 17,
        text: "Were industry trends discussed in the class?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: "5",
    feedbackName: "Fluid Mechanics",
    department: "ME",
    classLevel: "SY",
    expires: "28th Feb 2025",
    faculties: [
      { id: 14, name: "Dr. Henry Thomas", subject: "Hydraulics" },
      { id: 15, name: "Prof. Anna Scott", subject: "Turbulence" },
    ],
    questions: [
      {
        id: 18,
        text: "Was the faculty able to clarify fluid dynamics concepts?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 19,
        text: "Were the numerical problems well explained?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 20,
        text: "How effective were the practical demonstrations?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: "6",
    feedbackName: "Cybersecurity",
    department: "CSE",
    classLevel: "BE",
    expires: "20th Mar 2025",
    faculties: [
      { id: 16, name: "Dr. Logan Kent", subject: "Ethical Hacking" },
      { id: 17, name: "Prof. Bruce Wayne", subject: "Cryptography" },
      { id: 18, name: "Dr. Diana Prince", subject: "Network Security" },
      { id: 19, name: "Prof. Clark Kent", subject: "Cyber Threats" },
      { id: 20, name: "Dr. Barry Allen", subject: "Incident Response" },
    ],
    questions: [
      {
        id: 21,
        text: "Did the faculty explain cybersecurity threats well?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 22,
        text: "Were hands-on security labs provided?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 23,
        text: "How useful was the ethical hacking practical session?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 24,
        text: "Was encryption explained with real-world examples?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 25,
        text: "Did the faculty discuss the latest cybersecurity trends?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 26,
        text: "Were students encouraged to participate in security competitions?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
];

export default function FeedbackPage() {
  const { feedbackId } = useParams();
  const feedback = sampleFeedbackData.find((f) => f.id === feedbackId);

  const [responses, setResponses] = useState<{ [key: number]: number[] }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!feedback)
    return <div className="text-center text-red-500">Feedback not found!</div>;

  // Handle response selection
  const handleResponseChange = (
    facultyId: number,
    questionId: number,
    optionIndex: number
  ) => {
    setResponses((prev) => {
      const updatedResponses = { ...prev };
      if (!updatedResponses[facultyId]) updatedResponses[facultyId] = [];
      updatedResponses[facultyId][questionId] = optionIndex + 1; // Store ratings as numbers (1-5)
      return updatedResponses;
    });
  };

  // Handle Submit
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
      // setSubmitted(true); // Show validation messages
      return;
    }

    console.log(responses);

    setSubmitted(true);
  };

  // Calculate faculty-wise and question-wise averages
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-2">
      {!submitted ? (
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            {feedback.feedbackName}
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
                  <div key={question.id} className="mb-3">
                    <p className="text-sm font-medium">
                      {qIndex + 1}
                      {") "}
                      {question.text} <span className="text-red-500">*</span>
                    </p>
                    <div className="flex gap-2 mt-1">
                      {question.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className={`px-3 py-1 text-sm rounded-md border ${
                            responses[faculty.id]?.[qIndex] === optIndex + 1
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-600 hover:bg-blue-100"
                          }`}
                          onClick={() =>
                            handleResponseChange(faculty.id, qIndex, optIndex)
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {/* Show warning if unanswered */}
                    {submitted && !responses[faculty.id]?.[qIndex] && (
                      <p className="text-xs text-red-500 mt-1">
                        Please select an option for this question.
                      </p>
                    )}
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
                          {question.text}:
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
