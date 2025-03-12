import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Feedback } from "@/types";
import { feedbackQuestions } from "@/data/feedbackQuestionsOption";

interface FacultyWeightsRating {
  [facultyName: string]: number[];
}

export const generateExcel = (
  selectedFeedback: Feedback,
  averageWeights: FacultyWeightsRating,
  averageRatings: FacultyWeightsRating
) => {
  const {
    academic_year,
    department,
    class: className,
    semester,
    term,
    feedback_title,
    date,
    faculty_with_subject,
  } = selectedFeedback;

  // Header Section with Merged Rows
  const sheetData = [
    [`${feedback_title}`], // Title
    [`Academic Year: ${academic_year}`],
    [`Department: ${department}`],
    [`Class: ${className}`],
    [`Semester: ${semester}`],
    [`Term: ${term}`],
    [`Date: ${date}`],
    [], // Empty row for spacing
    [
      "Faculty Name",
      "Subject",
      "Type", // New column for Type (Rating/Weight)
      ...feedbackQuestions.map((value) => `Q${value.id}) ${value.question}`),
      "Total Average",
    ],
  ];

  // Faculty Data (Merging Rows)
  const merges: any[] = [];

  faculty_with_subject.forEach((faculty, rowIndex) => {
    const [facultyName, facultySubject] = faculty.split(":"); // Extract faculty and subject

    const weights =
      averageWeights[faculty] || Array(feedbackQuestions.length).fill("NA");
    const ratings =
      averageRatings[faculty] || Array(feedbackQuestions.length).fill("NA");

    // Calculate total averages
    const totalWeight =
      weights.reduce((sum, w) => (typeof w === "number" ? sum + w : sum), 0) /
      feedbackQuestions.length;
    const totalRating =
      ratings.reduce((sum, r) => (typeof r === "number" ? sum + r : sum), 0) /
      feedbackQuestions.length;

    // Push rows for faculty (First Row: Rating, Second Row: Weight)
    const facultyRowIndex = sheetData.length; // Current row index in the sheet
    sheetData.push([
      facultyName,
      facultySubject,
      "Rating",
      ...ratings.map((r) => (typeof r === "number" ? r.toFixed(2) : "NA")),
      totalRating.toFixed(2),
    ]);
    sheetData.push([
      "",
      "",
      "Weight",
      ...weights.map((w) => (typeof w === "number" ? w.toFixed(2) : "NA")),
      totalWeight.toFixed(2),
    ]);

    // Merge Faculty Name and Subject for two rows
    merges.push(
      { s: { r: facultyRowIndex, c: 0 }, e: { r: facultyRowIndex + 1, c: 0 } }, // Faculty Name
      { s: { r: facultyRowIndex, c: 1 }, e: { r: facultyRowIndex + 1, c: 1 } } // Subject
    );
  });

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback Report");

  // Merging title and metadata (Header spanning multiple rows)
  merges.push(
    { s: { r: 0, c: 0 }, e: { r: 0, c: sheetData[8].length - 1 } }, // Title
    { s: { r: 1, c: 0 }, e: { r: 1, c: sheetData[8].length - 1 } }, // Academic Year
    { s: { r: 2, c: 0 }, e: { r: 2, c: sheetData[8].length - 1 } }, // Department
    { s: { r: 3, c: 0 }, e: { r: 3, c: sheetData[8].length - 1 } }, // Class
    { s: { r: 4, c: 0 }, e: { r: 4, c: sheetData[8].length - 1 } }, // Semester
    { s: { r: 5, c: 0 }, e: { r: 5, c: sheetData[8].length - 1 } }, // Term
    { s: { r: 6, c: 0 }, e: { r: 6, c: sheetData[8].length - 1 } } // Date
  );

  ws["!merges"] = merges;

  // Auto adjust column widths
  ws["!cols"] = [
    { wch: 20 }, // Faculty Name
    { wch: 25 }, // Subject
    { wch: 10 }, // Type
    ...Array(feedbackQuestions.length).fill({ wch: 15 }), // Q1 - Qn
    { wch: 15 }, // Total Average
  ];

  // Save file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${academic_year}_${department}_${className}.xlsx`);
};
