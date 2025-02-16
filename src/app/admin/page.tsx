/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, X, Check } from "lucide-react";

interface Rating {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
}

interface Faculties {
  name: string;
  rating: Rating;
}

interface Feedback {
  id: number;
  subject: string;
  rating: string;
  date: string;
  faculties: Faculties[];
}

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [expandedResponses, setExpandedResponses] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Added state for expanded rows

  // Mock data
  const MOCK_DATA: Feedback[] = [
    {
      id: 1,
      subject: "Product Quality",
      rating: "4.5",
      date: "2024-02-15",
      faculties: [
        {
          name: "S. S. Gurav",
          rating: {
            q1: 4,
            q2: 5,
            q3: 3,
            q4: 4,
            q5: 5,
            q6: 2,
            q7: 3,
            q8: 4,
            q9: 5,
            q10: 4,
          },
        },
        {
          name: "S. G. Swami",
          rating: {
            q1: 4,
            q2: 5,
            q3: 3,
            q4: 4,
            q5: 5,
            q6: 2,
            q7: 3,
            q8: 4,
            q9: 5,
            q10: 4,
          },
        },
      ],
    },
    {
      id: 2,
      subject: "Customer Service",
      rating: "3.5",
      date: "2024-02-14",
      faculties: [
        {
          name: "S. S. Gurav",
          rating: {
            q1: 4,
            q2: 5,
            q3: 3,
            q4: 4,
            q5: 5,
            q6: 2,
            q7: 3,
            q8: 4,
            q9: 5,
            q10: 4,
          },
        },
      ],
    },
    // Add more mock data for grid view
    {
      id: 3,
      subject: "Website Experience",
      rating: "4.0",
      date: "2024-02-13",
      faculties: [
        {
          name: "S. S. Gurav",
          rating: {
            q1: 4,
            q2: 5,
            q3: 3,
            q4: 4,
            q5: 5,
            q6: 2,
            q7: 3,
            q8: 4,
            q9: 5,
            q10: 4,
          },
        },
      ],
    },
    {
      id: 4,
      subject: "Delivery Speed",
      rating: "5.0",
      date: "2024-02-12",
      faculties: [
        {
          name: "S. S. Gurav",
          rating: {
            q1: 4,
            q2: 5,
            q3: 3,
            q4: 4,
            q5: 5,
            q6: 2,
            q7: 3,
            q8: 4,
            q9: 5,
            q10: 4,
          },
        },
      ],
    },
  ];

  const toggleResponse = (id: number) => {
    setExpandedResponses((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Search Bar */}
      <div className="mt-14 flex justify-center items-center gap-2">
        {/* Sort Dropdown */}
        <div className="flex">
          <div className="relative">
            <button
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              className="inline-flex items-center justify-between w-[80px] px-2 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              {sortBy == "" ? "Sort" : sortBy === "date" ? "Date" : "A-Z"}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isSelectOpen && (
              <div className="absolute top-100 right-100 mt-1 w-[180px] bg-white border rounded-md shadow-lg py-1 ">
                <button
                  onClick={() => {
                    setSortBy("");
                    setIsSelectOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                >
                  Sort
                </button>
                <button
                  onClick={() => {
                    setSortBy("date");
                    setIsSelectOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                >
                  Sort By Date
                </button>
                <button
                  onClick={() => {
                    setSortBy("alpha");
                    setIsSelectOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                >
                  Sort Alphabetically
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm justify-center w-[70vw]">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search feedback..."
            className="flex-1 bg-transparent border-none focus:outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_DATA.map((feedback) => (
          <div
            key={feedback.id}
            onClick={() => setSelectedFeedback(feedback)}
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{feedback.subject}</h3>
              {/* <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                {feedback.rating}
              </span> */}
            </div>
            <p className="text-sm text-gray-500">{feedback.date}</p>
            {/* <p className="text-sm mt-2">
              {feedback.faculties.length} faculties
            </p> */}
          </div>
        ))}
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl p-6 space-y-4 animate-scaleIn h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {selectedFeedback.subject}
                </h2>
                <p className="text-sm text-gray-500">Feedback Form</p>
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info Section */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-3">Basic Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{selectedFeedback.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span>{selectedFeedback.rating}</span>
                </div>
              </div>
            </div>

            {/* Responses Section */}
            <div className="space-y-3">
              <h3 className="font-semibold">Responses:</h3>
              {selectedFeedback.faculties.map((faculty, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                    onClick={() => toggleResponse(idx)}
                  >
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{faculty.name}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      {expandedResponses.includes(idx) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {expandedResponses.includes(idx) && (
                    <div className="p-3 bg-white animate-fadeIn">
                      <p className="mb-2">{faculty.name}</p>
                      <div className="flex flex-col justify-between text-sm text-gray-500">
                        <h1 >Question Vise Avarage Rating</h1>
                        <div className="grid grid-cols-5 gap-2 text-sm text-gray-500">
                          {Object.entries(faculty.rating).map(
                            ([question, value]) => (
                              <span
                                key={question}
                                className="px-2 py-1 bg-gray-100 rounded text-center"
                              >
                                {question.toUpperCase()}: {value}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
