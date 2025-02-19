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
  totalAvarage: number;
  subject: string;
  rating: Rating;
}

interface Feedback {
  id: number;
  academicYear: string;
  department: string;
  class: string;
  semester: string;
  title: string;
  date: string;
  faculties: Faculties[];
}

const departments = {
  "First Year": ["Div A", "Div B", "Div C"],
  "Computer Science": ["Second Year", "Third Year", "Final Year"],
  Mechanical: ["Second Year", "Third Year", "Final Year"],
  Electrical: ["Second Year", "Third Year", "Final Year"],
  Civil: ["Second Year", "Third Year", "Final Year"],
  Electronics: ["Second Year", "Third Year", "Final Year"],
};

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [expandedResponses, setExpandedResponses] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Added state for expanded rows

  // states for enabling correct sorted data
  const [stage, setStage] = useState(0);

  // states for sorting
  const [years, setYears] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Adjust this as per requirement
    const yearList = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearList.push(`${year}-${year + 1}`);
    }

    console.log(yearList);

    setYears(yearList);
  }, []);

  // Mock data
  const MOCK_DATA: Feedback[] = [
    {
      id: 1,
      academicYear: "2024-25",
      department: "Computer Science",
      class: "Final Year",
      semester: "8",
      title: "Semester 8 Feedback",
      date: "2024-02-15",
      faculties: [
        {
          name: "S. S. Gurav",
          subject: "Software Engineering",
          totalAvarage: 3.9,
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
          subject: "Machine Learning",
          totalAvarage: 4.1,
          rating: {
            q1: 5,
            q2: 4,
            q3: 4,
            q4: 5,
            q5: 4,
            q6: 3,
            q7: 5,
            q8: 4,
            q9: 4,
            q10: 5,
          },
        },
        {
          name: "A. B. Patil",
          subject: "Cloud Computing",
          totalAvarage: 4.0,
          rating: {
            q1: 4,
            q2: 4,
            q3: 5,
            q4: 4,
            q5: 4,
            q6: 4,
            q7: 5,
            q8: 4,
            q9: 3,
            q10: 4,
          },
        },
        {
          name: "P. R. Desai",
          subject: "Cyber Security",
          totalAvarage: 4.2,
          rating: {
            q1: 5,
            q2: 4,
            q3: 4,
            q4: 5,
            q5: 5,
            q6: 4,
            q7: 5,
            q8: 4,
            q9: 4,
            q10: 5,
          },
        },
      ],
    },
    {
      id: 2,
      academicYear: "2024-25",
      department: "Computer Science",
      class: "Third Year",
      semester: "6",
      title: "Semester 6 Feedback",
      date: "2024-02-14",
      faculties: [
        {
          name: "M. T. Kulkarni",
          subject: "Data Structures",
          totalAvarage: 3.8,
          rating: {
            q1: 4,
            q2: 4,
            q3: 3,
            q4: 3,
            q5: 5,
            q6: 4,
            q7: 3,
            q8: 4,
            q9: 4,
            q10: 3,
          },
        },
        {
          name: "D. S. Pawar",
          subject: "Database Management Systems",
          totalAvarage: 3.9,
          rating: {
            q1: 4,
            q2: 4,
            q3: 4,
            q4: 4,
            q5: 4,
            q6: 4,
            q7: 3,
            q8: 5,
            q9: 4,
            q10: 4,
          },
        },
        {
          name: "V. K. Joshi",
          subject: "Computer Networks",
          totalAvarage: 4.0,
          rating: {
            q1: 4,
            q2: 5,
            q3: 4,
            q4: 4,
            q5: 5,
            q6: 3,
            q7: 4,
            q8: 4,
            q9: 4,
            q10: 4,
          },
        },
      ],
    },
    {
      id: 3,
      academicYear: "2024-25",
      department: "Mechanical",
      class: "Final Year",
      semester: "8",
      title: "Semester 8 Feedback",
      date: "2024-02-13",
      faculties: [
        {
          name: "N. P. Sawant",
          subject: "Thermodynamics",
          totalAvarage: 3.7,
          rating: {
            q1: 3,
            q2: 4,
            q3: 3,
            q4: 3,
            q5: 4,
            q6: 3,
            q7: 4,
            q8: 4,
            q9: 3,
            q10: 4,
          },
        },
        {
          name: "A. K. Jadhav",
          subject: "Manufacturing Processes",
          totalAvarage: 3.9,
          rating: {
            q1: 4,
            q2: 3,
            q3: 5,
            q4: 4,
            q5: 4,
            q6: 4,
            q7: 4,
            q8: 3,
            q9: 5,
            q10: 4,
          },
        },
      ],
    },
    {
      id: 4,
      academicYear: "2024-25",
      department: "Electrical",
      class: "Third Year",
      semester: "6",
      title: "Semester 6 Feedback",
      date: "2024-02-12",
      faculties: [
        {
          name: "K. R. Patil",
          subject: "Power Systems",
          totalAvarage: 4.1,
          rating: {
            q1: 5,
            q2: 4,
            q3: 4,
            q4: 4,
            q5: 4,
            q6: 4,
            q7: 3,
            q8: 5,
            q9: 4,
            q10: 4,
          },
        },
        {
          name: "P. S. More",
          subject: "Control Systems",
          totalAvarage: 3.8,
          rating: {
            q1: 4,
            q2: 4,
            q3: 3,
            q4: 3,
            q5: 4,
            q6: 3,
            q7: 4,
            q8: 4,
            q9: 3,
            q10: 4,
          },
        },
      ],
    },
    {
      id: 5,
      academicYear: "2024-25",
      department: "Civil",
      class: "Second Year",
      semester: "4",
      title: "Semester 4 Feedback",
      date: "2024-02-11",
      faculties: [
        {
          name: "R. B. Naik",
          subject: "Structural Analysis",
          totalAvarage: 4.0,
          rating: {
            q1: 4,
            q2: 4,
            q3: 5,
            q4: 4,
            q5: 4,
            q6: 4,
            q7: 5,
            q8: 4,
            q9: 3,
            q10: 4,
          },
        },
        {
          name: "S. T. Patil",
          subject: "Concrete Technology",
          totalAvarage: 3.7,
          rating: {
            q1: 3,
            q2: 4,
            q3: 3,
            q4: 3,
            q5: 4,
            q6: 3,
            q7: 4,
            q8: 4,
            q9: 3,
            q10: 4,
          },
        },
      ],
    },
  ];

  const filteredData = MOCK_DATA.filter(
    (item) =>
      (!academicYear ||
        item.academicYear.toLowerCase() === academicYear.toLowerCase()) &&
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

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      {/* folder for year vise */}
      <div className="mt-14 flex justify-between mb-6">
        <p className="">
          admin/{academicYear && academicYear + "/"}
          {department && department + "/"}
          {selectedClass && selectedClass}
        </p>
        {stage != 0 && (
          <button
            className="bg-black text-white py-1 px-2 rounded-lg flex justify-center items-center"
            onClick={() => {
              if (stage) setStage(stage - 1);
            }}
          >
            <StepBack width={20} height={20} />
            Back
          </button>
        )}
      </div>
      {stage == 0 && (
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold mb-4">Academic Year Folders</h2>
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
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Departments for {academicYear}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(departments).map((dept, index) => (
              <div
                key={index}
                className={`p-4 bg-green-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-green-700 `}
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
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Classes for {department}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {departments[department].map((cls, index) => (
              <div
                key={index}
                className="p-4 bg-purple-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-purple-600"
                onClick={() => {
                  setSelectedClass(cls);
                  setStage(3);
                  console.log(academicYear, department, selectedClass);
                  console.log("MOCK_DATA: ", MOCK_DATA);
                  console.log("filtered :" + filteredData);
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
          {/* Search Bar */}
          <div className="flex justify-center items-center gap-2">
            {/* <div className="flex">
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

            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm justify-center w-[70vw]">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search feedback..."
                className="flex-1 bg-transparent border-none focus:outline-none placeholder:text-gray-500"
              />
            </div> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((feedback) => (
              <div
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className="bg-white py-2 px-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{feedback.title}</h3>
                  <span className="bg-primary/10 text-primary rounded-full text-sm">
                    {feedback.academicYear}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{feedback.date}</p>
                  <p className="text-sm mt-2">Semester {feedback.semester}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl p-6 space-y-4 animate-scaleIn h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {selectedFeedback.title}
                </h2>
                <p className="font-semibold text-gray-500">
                  Academic Year : {selectedFeedback.academicYear}
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
                  <span>{selectedFeedback.date}</span>
                </div>
              </div>
            </div>

            {/* Responses Section */}
            <div className="space-y-3">
              <h3 className="font-semibold">Responses:</h3>
              {selectedFeedback.faculties.map((faculty, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div
                    className="grid grid-cols-[2fr_auto] items-center p-2 bg-gray-200 cursor-pointer gap-1"
                    onClick={() => toggleResponse(idx)}
                  >
                    {/* Faculty Name */}
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">
                        {faculty.name} (
                        <span className="text-xs sm:text-sm">
                          {faculty.subject}
                        </span>
                        )
                      </span>
                    </div>

                    {/* Expand/Collapse Button */}
                    <div className="flex justify-center items-center">
                      {/* Total Average */}
                      <div className="text-sm text-center">
                        {faculty.totalAvarage.toFixed(1)}
                      </div>
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
                    <div className="p-3 bg-white animate-fadeIn">
                      <p className="mb-2">{faculty.name}</p>
                      <div className="flex flex-col justify-between text-sm text-gray-500">
                        <h1>Question Vise Avarage Rating</h1>
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
