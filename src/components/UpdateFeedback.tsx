import { updateFeedbackFormAction } from "@/actions/feedbacks";
import { Feedback } from "@/types";
import { X, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

type MyComponentProps = {
  selectedFeedback: Feedback;
  onClose: () => void;
};

const UpdateFeedback = ({ selectedFeedback, onClose }: MyComponentProps) => {
  const formattedFaculties = selectedFeedback.faculty_with_subject.map(
    (faculty) => {
      const [name, subject] = faculty.split(":");
      return { name, subject };
    }
  );

  const initialYears: string[] = [];
  const [years, setYears] = useState(initialYears);
  const [academicYear, setAcademicYear] = useState(
    selectedFeedback.academic_year
  );
  const [feedbackName, setFeedbackName] = useState(
    selectedFeedback.feedback_title
  );
  const [department, setDepartment] = useState(selectedFeedback.department);
  const [classLevel, setClassLevel] = useState(selectedFeedback.class);
  const [semester, setSemester] = useState(selectedFeedback.semester);
  const [faculties, setFaculties] =
    useState<{ name: string; subject: string }[]>(formattedFaculties);
  const [term, setTerm] = useState(selectedFeedback.term);

  const [isUpdating, setIsUpdating] = useState(false);
  const [totalToken, setTotalToken] = useState(
    selectedFeedback.unique_codes.length + ""
  );
  const [dueDate, setDueDate] = useState(selectedFeedback.date);

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

  const removeFaculty = (index: number) => {
    setFaculties(faculties.filter((_, i) => i !== index));
  };

  const updateFeedback = async (feedbackId: string) => {
    setIsUpdating(true);
    // Construct faculty_with_subject array
    const facultyWithSubjects = faculties.map((f) => `${f.name}:${f.subject}`);

    // Create updated feedback data
    const updatedFeedback = {
      academic_year: academicYear,
      department,
      class: classLevel,
      semester,
      term,
      feedback_title: feedbackName,
      faculty_with_subject: facultyWithSubjects,
      date: dueDate,
    };

    try {
      const data = await updateFeedbackFormAction(
        feedbackId,
        updatedFeedback,
        parseInt(totalToken)
      );
      console.log("successfull");

      if (data.success) {
        onClose();
        window.location.reload();
        alert("Updated Feedback");
      }
    } catch (error) {
      console.log("Error updating feedback:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-black pb-3 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold">Update Feedback</h2>
          <button
            onClick={onClose}
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

          <div className="sm:flex">
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
                {["1", "2", "3", "4", "5", "6", "7", "8"].map((year, index) => (
                  <option key={index} className="">
                    {year}
                  </option>
                ))}
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

          <div className="sm:flex gap-3">
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

            {/* select due/exprire date */}
            <div className="sm:w-[50%]">
              <label className="block text-lg font-semibold mb-1">
                Due date
              </label>
              <input
                type="date"
                placeholder="Enter Total Numbers of Token"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 border-gray-300"
                value={
                  dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""
                } // Convert Date -> "YYYY-MM-DD"
                onChange={(e) => setDueDate(new Date(e.target.value))}
              ></input>
            </div>
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
              <button
                onClick={() => {
                  removeFaculty(index);
                }}
              >
                <Trash className="text-red-500" />
              </button>
            </div>
          ))}
          <button
            onClick={addFaculty}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400"
          >
            + Add Faculty
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t pt-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              updateFeedback(selectedFeedback.id);
            }}
            className={`px-4 py-2 text-white rounded-md ${
              isUpdating
                ? "cursor-wait bg-blue-400 "
                : "bg-blue-600 hover:bg-blue-500 "
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedback;
