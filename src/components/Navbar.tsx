"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Plus, X, User, LogOut } from "lucide-react";
import collegeLogo from "../../public/collegeImage.png";
import Image from "next/image";
import { useFeedback } from "@/context/FeedbackContext";

const feedbackQuestions = [
  {
    id: 1,
    question:
      "How would you rate the overall teaching effectiveness of the faculty?",
  },
  { id: 2, question: "How well does the faculty explain complex topics?" },
  { id: 3, question: "Does the faculty encourage student participation?" },
  {
    id: 4,
    question: "How clear are the faculty’s explanations during lectures?",
  },
  { id: 5, question: "How responsive is the faculty to students' queries?" },
  { id: 6, question: "How well does the faculty manage class time?" },
  {
    id: 7,
    question: "Does the faculty provide relevant examples while teaching?",
  },
  {
    id: 8,
    question: "How effective are the faculty's assessment and grading methods?",
  },
  {
    id: 9,
    question:
      "Does the faculty provide sufficient study materials and references?",
  },
  {
    id: 10,
    question: "How well does the faculty encourage critical thinking?",
  },
  {
    id: 11,
    question: "How approachable is the faculty outside of class hours?",
  },
  {
    id: 12,
    question: "Does the faculty use modern teaching methods effectively?",
  },
  {
    id: 13,
    question: "How satisfied are you with the faculty's subject knowledge?",
  },
  {
    id: 14,
    question: "Does the faculty provide constructive feedback on assignments?",
  },
  {
    id: 15,
    question:
      "How well does the faculty connect theoretical concepts to practical applications?",
  },
  {
    id: 16,
    question: "Does the faculty create an engaging learning environment?",
  },
  { id: 17, question: "How effective are the faculty’s communication skills?" },
  {
    id: 18,
    question: "How satisfied are you with the faculty's classroom management?",
  },
  {
    id: 19,
    question: "Does the faculty encourage teamwork and collaboration?",
  },
  { id: 20, question: "Would you recommend this faculty to other students?" },
];

// const ratingOptions: number[] = [
//   0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5,
//   14.5, 15.5, 16.5, 17.5, 18.5, 19.5,
// ];

const Navbar = () => {
  const { MOCK_DATA, setMOCK_DATA } = useFeedback();

  const pathname = usePathname();

  const initialYears: string[] = [];
  const [years, setYears] = useState(initialYears);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [dId, setDId] = useState(6);
  const [fId, setFId] = useState(14);
  const [academicYear, setAcademicYear] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [department, setDepartment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [faculties, setFaculties] = useState<
    { name: string; subject: string }[]
  >([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Adjust this as per requirement
    const yearList = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearList.push(`${year}-${year + 1}`);
    }

    setYears(yearList);
  }, []);

  // Add Faculty Handler
  const addFaculty = () => {
    setFaculties([...faculties, { name: "", subject: "" }]);
  };

  // Handle Creating Feedback
  const createFeedback = () => {
    setDId(dId + 1);
    const date = new Date().toISOString().split("T")[0]; // Get formatted date (YYYY-MM-DD)
    let id = fId;

    const newFeedback = {
      id: dId,
      academicYear,
      department,
      class: classLevel, // Ensure key matches existing structure
      semester,
      term,
      title: feedbackName, // Assuming title corresponds to feedbackName
      date,
      faculties: faculties.map((faculty) => ({
        ...faculty,
        id: ++id,
        totalAvarage: 0.0,
        rating: {
          q1: 0.0,
          q2: 0.0,
          q3: 0.0,
          q4: 0.0,
          q5: 0.0,
          q6: 0.0,
          q7: 0.0,
          q8: 0.0,
          q9: 0.0,
          q10: 0.0,
        },
      })),
      questions: [
        {
          id: 1,
          question:
            "How would you rate the overall teaching effectiveness of the faculty?",
        },
        {
          id: 2,
          question: "How well does the faculty explain complex topics?",
        },
        {
          id: 3,
          question: "Does the faculty encourage student participation?",
        },
        {
          id: 4,
          question: "How clear are the faculty’s explanations during lectures?",
        },
        {
          id: 5,
          question: "How responsive is the faculty to students' queries?",
        },
        { id: 6, question: "How well does the faculty manage class time?" },
        {
          id: 7,
          question:
            "Does the faculty provide relevant examples while teaching?",
        },
        {
          id: 8,
          question:
            "How effective are the faculty's assessment and grading methods?",
        },
        {
          id: 9,
          question:
            "Does the faculty provide sufficient study materials and references?",
        },
        {
          id: 10,
          question: "How well does the faculty encourage critical thinking?",
        },
        {
          id: 11,
          question: "How approachable is the faculty outside of class hours?",
        },
        {
          id: 12,
          question: "Does the faculty use modern teaching methods effectively?",
        },
        {
          id: 13,
          question:
            "How satisfied are you with the faculty's subject knowledge?",
        },
        {
          id: 14,
          question:
            "Does the faculty provide constructive feedback on assignments?",
        },
        {
          id: 15,
          question:
            "How well does the faculty connect theoretical concepts to practical applications?",
        },
        {
          id: 16,
          question: "Does the faculty create an engaging learning environment?",
        },
        {
          id: 17,
          question: "How effective are the faculty’s communication skills?",
        },
        {
          id: 18,
          question:
            "How satisfied are you with the faculty's classroom management?",
        },
        {
          id: 19,
          question: "Does the faculty encourage teamwork and collaboration?",
        },
        {
          id: 20,
          question: "Would you recommend this faculty to other students?",
        },
      ],
      ratingOptions: [
        0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5,
        13.5, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5,
      ],
    };

    // Update MOCK_DATA by adding the new feedback
    setMOCK_DATA([...MOCK_DATA, newFeedback]);

    setFId(id);

    alert("Feedback Created Successfully!");

    console.log(MOCK_DATA);

    // Reset form fields
    setAcademicYear("");
    setDepartment("");
    setClassLevel("");
    setSemester("");
    setFeedbackName("");
    setFaculties([]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <nav className="p-2 shadow-md fixed top-0 w-full flex justify-between items-center bg-white bg-opacity-30 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side: Name */}
          {/* <h1 className="text-2xl font-bold">SGM</h1> */}

          <Image src={collegeLogo} alt="SGM" height={60} width={60}></Image>

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
                      <LogOut className="w-5 h-5" />
                      Logout
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
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                ></input>
              </div>
              <div className="sm:flex justify-center gap-2">
                {/* Select Academic Year */}
                <div className="sm:w-[50%] mb-2">
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
                {/* Select Department */}
                <div className="sm:w-[50%] mb-2">
                  <label className="block text-lg font-semibold mb-1">
                    Select Department
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
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
                  </select>
                </div>

                {/* Select Class */}
                <div className="sm:w-[50%]">
                  <label className="block text-lg font-semibold mb-1">
                    Select Class
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {department == "First Year" ? (
                      <option value="First Year">First Year</option>
                    ) : (
                      <>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Final Year">Final Year</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Select semester */}
              <div className="sm:w-[50%]">
                <label className="block text-lg font-semibold mb-1">
                  Select Semester
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                    (year, index) => (
                      <option key={index} className="">
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Select Term */}
              <div className="sm:w-[50%]">
                <label className="block text-lg font-semibold mb-1">
                  Select Term
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Mid Term">Mid Term</option>
                  <option value="End Term">End Term</option>
                </select>
              </div>

              {/* Faculty & Subject Section */}
              <h3 className="text-lg font-semibold">Faculty & Subjects</h3>
              {faculties.map((faculty, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Faculty Name"
                    className="w-1/2 px-3 py-2 border rounded-md border-gray-300"
                    value={faculty.name}
                    onChange={(e) => {
                      const newFaculties = [...faculties];
                      newFaculties[index].name = e.target.value;
                      setFaculties(newFaculties);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter Subject Name"
                    className="w-1/2 px-3 py-2 border rounded-md border-gray-300"
                    value={faculty.subject}
                    onChange={(e) => {
                      const newFaculties = [...faculties];
                      newFaculties[index].subject = e.target.value;
                      setFaculties(newFaculties);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={addFaculty}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                + Add Faculty
              </button>

              {/* feedback questions */}
              <h3 className="text-lg font-semibold">Questions</h3>
              {feedbackQuestions.map((ques) => (
                <div key={ques.id}>
                  {ques.id} {") "}
                  {ques.question}
                </div>
              ))}
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
