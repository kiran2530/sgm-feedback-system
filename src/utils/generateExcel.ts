import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Feedback } from "@/types";
import { feedbackQuestions } from "@/data/feedbackQuestionsOption";

export const generateExcel = (selectedFeedback: Feedback) => {
  const {
    academic_year,
    department,
    class: className,
    semester,
    term,
    feedback_title,
    date,
    faculty_with_subject,
    weights,
  } = selectedFeedback;

  // Header Information (Centered & Merged)
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
      "Q1) " + feedbackQuestions[0].question,
      "Q2) " + feedbackQuestions[1].question,
      "Q3) " + feedbackQuestions[2].question,
      "Q4) " + feedbackQuestions[3].question,
      "Q5) " + feedbackQuestions[4].question,
      "Q6) " + feedbackQuestions[5].question,
      "Q7) " + feedbackQuestions[6].question,
      "Q8) " + feedbackQuestions[7].question,
      "Q9) " + feedbackQuestions[8].question,
      "Q10) " + feedbackQuestions[9].question,
      "Total Average",
    ], // Table headers
  ];

  // Append faculty data
  faculty_with_subject.forEach((faculty) => {
    const [facultyName, facultySubject] = faculty.split(":"); // Splitting faculty name and subject

    sheetData.push([
      facultyName,
      facultySubject,
      (weights?.[0]?.[0] ?? "NA").toString(),
      (weights?.[0]?.[1] ?? "NA").toString(),
      (weights?.[0]?.[2] ?? "NA").toString(),
      (weights?.[0]?.[3] ?? "NA").toString(),
      (weights?.[0]?.[4] ?? "NA").toString(),
      (weights?.[0]?.[5] ?? "NA").toString(),
      (weights?.[0]?.[6] ?? "NA").toString(),
      (weights?.[0]?.[7] ?? "NA").toString(),
      (weights?.[0]?.[8] ?? "NA").toString(),
      (weights?.[0]?.[9] ?? "NA").toString(),
      "NA",
    ]);
  });

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback Report");

  // Merging cells for header info (title, academic year, etc.)
  const mergeRanges = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } }, // Title
    { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } }, // Academic Year
    { s: { r: 2, c: 0 }, e: { r: 2, c: 12 } }, // Department
    { s: { r: 3, c: 0 }, e: { r: 3, c: 12 } }, // Class
    { s: { r: 4, c: 0 }, e: { r: 4, c: 12 } }, // Semester
    { s: { r: 5, c: 0 }, e: { r: 5, c: 12 } }, // Term
    { s: { r: 6, c: 0 }, e: { r: 6, c: 12 } }, // Date
  ];

  ws["!merges"] = mergeRanges;

  // Auto adjust column widths
  ws["!cols"] = [
    { wch: 20 }, // Faculty Name
    { wch: 25 }, // Subject
    { wch: 5 }, // Q1
    { wch: 5 }, // Q2
    { wch: 5 }, // Q3
    { wch: 5 }, // Q4
    { wch: 5 }, // Q5
    { wch: 5 }, // Q6
    { wch: 5 }, // Q7
    { wch: 5 }, // Q8
    { wch: 5 }, // Q9
    { wch: 5 }, // Q10
    { wch: 15 }, // Total Average
  ];

  // Save file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(
    data,
    `${
      selectedFeedback.academic_year +
      selectedFeedback.department +
      selectedFeedback.class +
      ".xlsx"
    }`
  );
};
