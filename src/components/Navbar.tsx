"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Plus, X, User, LogOut, Settings } from "lucide-react";
import collegeLogo from "../../public/collegeImage.png";
import Image from "next/image";
import { Feedback } from "@/types";
import { createFeedbackFormAction } from "@/actions/feedbacks";
import LoginModal from "./LoginModal";
import AdminRegistrationModal from "./AdminRegistrationModal";
// import { checkLogin } from "@/utils/checkLogin";

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
  const pathname = usePathname();

  const initialYears: string[] = [];
  const [years, setYears] = useState(initialYears);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [academicYear, setAcademicYear] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [totalToken, setTotalToken] = useState("");
  const [department, setDepartment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [faculties, setFaculties] = useState<
    { name: string; subject: string }[]
  >([]);
  const [term, setTerm] = useState("");

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // checking login or not
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sgmAdminToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [router]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024; // Adjust this as per requirement
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
  const createFeedback = async () => {
    if (
      !academicYear ||
      !department ||
      !classLevel ||
      !semester ||
      !term ||
      !feedbackName ||
      !faculties ||
      !totalToken
    ) {
      alert("Please Fill all the information");
      return;
    }
    // Construct faculty_with_subject array
    const facultyWithSubjects = faculties.map((f) => `${f.name}:${f.subject}`);

    // Initialize weights and rating as empty arrays for each faculty
    const weights: Record<string, number[][]> = {};
    const rating: Record<string, number[][]> = {};

    facultyWithSubjects.forEach((faculty) => {
      weights[faculty] = [];
      rating[faculty] = [];
    });

    // Create feedback data
    const newFeedback: Omit<Feedback, "id"> = {
      academic_year: academicYear,
      department,
      class: classLevel,
      semester,
      term,
      feedback_title: feedbackName,
      faculty_with_subject: facultyWithSubjects,
      created_at: new Date().toISOString(),
      date: new Date(),
      unique_codes: [],
      weights: weights,
      rating: rating,
    };

    const data = await createFeedbackFormAction(
      newFeedback,
      parseInt(totalToken)
    );

    console.log("Created Feedback Data:", data);

    // Reset form fields
    setAcademicYear("");
    setDepartment("");
    setClassLevel("");
    setSemester("");
    setFeedbackName("");
    setFaculties([]);
    setIsDialogOpen(false);

    // TODO: Pass `newFeedback` to API or store state
  };

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md p-2 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side: Name */}
          {/* <h1 className="text-2xl font-bold">SGM</h1> */}

          <Image src={collegeLogo} alt="SGM" height={60} width={60}></Image>

          {/* Right Side: Buttons */}
          {pathname == "/" ? (
            <div className="space-x-4 flex">
              {isLogin ? (
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center px-1 sm:px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-flex items-center justify-center px-1 sm:px-4 py-2 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-sm sm:text-base"
                  >
                    Admin Login
                  </button>
                </div>
              )}

              <Link
                href="/f"
                className="inline-flex items-center justify-center px-2 sm:px-4 py-2 rounded-md text-white transition-colors bg-green-600 hover:bg-green-700 text-sm sm:text-base"
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
                  <div>
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2">
                      <p className="font-bold px-4">Prof. S. S. Gurav</p>
                      <p className="text-sm px-4">+91 9209623553</p>

                      <hr className="border-gray-500 mt-1" />
                      <button
                        onClick={() => {
                          setIsAdminModalOpen(true);
                        }}
                        className="mt-4 px-4 text-sm flex justify-center items-center text-blue-600 hover:text-gray-400 font-semibold"
                      >
                        <Settings className="w-5 h-5 mr-1" />
                        Add Admin
                      </button>

                      <button
                        className="mt-2 px-4 text-sm flex justify-center items-center text-red-600 hover:text-gray-400 font-semibold"
                        onClick={() => {
                          localStorage.removeItem("sgmAdminToken");
                          router.push("/");
                        }}
                      >
                        <LogOut className="w-5 h-5 mr-1" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            "student"
          )}
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onBackToLogin={() => setIsLoginModalOpen(true)}
        />

        {/* Admin Registration Modal */}
        <AdminRegistrationModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
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
                    <option value="MCA">MCA</option>
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
                    disabled={!department}
                  >
                    <option value="" disabled>
                      {department ? "Select" : "First Select Department"}
                    </option>
                    {department == "First Year" ? (
                      <>
                        <option value="Div A">Div A</option>
                        <option value="Div B">Div B</option>
                        <option value="Div C">Div C</option>
                        <option value="Div D">Div D</option>
                      </>
                    ) : department == "MCA" ? (
                      <>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                      </>
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

              <div className="sm:flex gap-3">
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
              </div>

              {/* Total Number of tokens */}
              <div className="sm:w-[50%]">
                <label className="block text-lg font-semibold mb-1">
                  Total Numbers of Token
                </label>
                <input
                  type="text"
                  placeholder="Enter Total Numbers of Token"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                  value={totalToken}
                  onChange={(e) => setTotalToken(e.target.value)}
                ></input>
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
