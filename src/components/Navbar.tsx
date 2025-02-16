"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Plus, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = () => {
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [feedbackName, setFeedbackName] = useState("");
  const [department, setDepartment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [faculties, setFaculties] = useState<
    { name: string; subject: string }[]
  >([]);
  const [questions, setQuestions] = useState<
    { text: string; options: string[] }[]
  >([]);

  // Add Faculty Handler
  const addFaculty = () => {
    setFaculties([...faculties, { name: "", subject: "" }]);
  };

  // Add Question Handler
  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: [] }]);
  };

  // Add Option to Question
  const addOptionToQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  // Handle Creating Feedback
  const createFeedback = () => {
    console.log({
      feedbackName,
      department,
      classLevel,
      faculties,
      questions,
    });
    alert("Feedback Created Successfully!");
    setFeedbackName("");
    setDepartment("")
    setClassLevel("")
    setFaculties([])
    setQuestions([])
    setIsDialogOpen(false);
  };

  return (
    <>
      <nav className="p-2 shadow-md fixed top-0 w-full flex justify-between items-center bg-white bg-opacity-30 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side: Name */}
          <h1 className="text-2xl font-bold">SGM</h1>

          {/* Right Side: Buttons */}
          {pathname == "/" ? (
            <div className="space-x-4">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Admin
              </Link>
              <Link
                href="/f"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white transition-colors bg-green-600 hover:bg-green-700"
              >
                Student
              </Link>
            </div>
          ) : pathname == "/admin" ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Feedback
              </button>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className=" text-white inline-flex items-center justify-center px-2 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <User className="w-6 h-6" />
                </button>

                {/* Dropdown - Admin Details */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2 px-4">
                    <p className="font-bold">Prof. S. S. Gurav</p>
                    <p className="text-sm">+91 9209623553</p>
                    <button className="mt-8 text-sm flex justify-center items-center hover:text-red-500">
                      <LogOut className="w-5 h-5"/>Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            "student"
          )}
        </div>
      </nav>

      {/* Create Feedback Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-black pb-3 sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-semibold">Create New Feedback</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1 bg-gray-300 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-4 max-h-[65vh] overflow-y-auto p-2 mt-4">
              <div className="">
                  <label className="block text-lg font-semibold mb-1">
                    Feedback Name
                  </label>
                  <input
                  type="text"
                  placeholder="Feedback Name"
                  required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                  >
                  </input>
                </div>
              <div className="sm:flex justify-center gap-2">
                {/* Select Department */}
                <div className="sm:w-[50%] mb-2">
                  <label className="block text-lg font-semibold mb-1">
                    Select Department
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="CSE">First Year</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics</option>
                    <option value="ME">Mechanical</option>
                  </select>
                </div>

                {/* Select Class */}
                <div className="sm:w-[50%]">
                  <label className="block text-lg font-semibold mb-1">
                    Select Class
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20"
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="FY">First Year</option>
                    <option value="SY">Second Year</option>
                    <option value="TY">Third Year</option>
                    <option value="BE">Final Year</option>
                  </select>
                </div>
              </div>

              {/* Faculty & Subject Section */}
              <h3 className="text-lg font-semibold">Faculty & Subjects</h3>
              {faculties.map((faculty, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-1/2 px-3 py-2 border rounded-md"
                    value={faculty.name}
                    onChange={(e) => {
                      const newFaculties = [...faculties];
                      newFaculties[index].name = e.target.value;
                      setFaculties(newFaculties);
                    }}
                  />
                  <select
                    className="w-1/2 px-3 py-2 border rounded-md"
                    value={faculty.subject}
                    onChange={(e) => {
                      const newFaculties = [...faculties];
                      newFaculties[index].subject = e.target.value;
                      setFaculties(newFaculties);
                    }}
                  >
                    <option value="">Select Subject</option>
                    <option value="Math">Mathematics</option>
                    <option value="DSA">Data Structures</option>
                    <option value="DBMS">Database Management</option>
                  </select>
                </div>
              ))}
              <button
                onClick={addFaculty}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                + Add Faculty
              </button>

              {/* Questions & Options Section */}
              <h3 className="text-lg font-semibold">Questions & Options</h3>
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-2 border-b pb-2">
                  <input
                    type="text"
                    placeholder="Enter Question"
                    className="w-full px-3 py-2 border rounded-md"
                    value={question.text}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].text = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />

                  {/* Options for Each Question */}
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex gap-2">
                      <span className="font-semibold">{oIndex + 1}.</span>
                      <input
                        type="text"
                        placeholder="Enter Option"
                        className="w-full px-3 py-2 border rounded-md"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].options[oIndex] = e.target.value;
                          setQuestions(newQuestions);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addOptionToQuestion(qIndex)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                  >
                    + Add Option
                  </button>
                </div>
              ))}
              <button
                onClick={addQuestion}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-400"
              >
                + Add Question
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t pt-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createFeedback}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Create Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
