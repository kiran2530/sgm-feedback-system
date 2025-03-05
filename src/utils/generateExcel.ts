import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

interface Questions {
  id: number;
  question: string;
}

interface Feedback {
  id: number;
  academicYear: string;
  department: string;
  class: string;
  semester: string;
  term: string;
  title: string;
  date: string;
  faculties: Faculties[];
  questions: Questions[];
  ratingOptions: number[];
}

export const generateExcel = (selectedFeedback: Feedback) => {
  const { academicYear, department, class: className, semester, term, title, date, faculties } = selectedFeedback;

  // Header Information (Centered & Merged)
  const sheetData = [
    [`${title}`], // Title
    [`Academic Year: ${academicYear}`],
    [`Department: ${department}`],
    [`Class: ${className}`],
    [`Semester: ${semester}`],
    [`Term: ${term}`],
    [`Date: ${date}`],
    [], // Empty row for spacing
    [
      "Faculty Name",
      "Subject",
      "Q1) "+selectedFeedback.questions[0].question,
      "Q2) "+selectedFeedback.questions[1].question,
      "Q3) "+selectedFeedback.questions[2].question,
      "Q4) "+selectedFeedback.questions[3].question,
      "Q5) "+selectedFeedback.questions[4].question,
      "Q6) "+selectedFeedback.questions[5].question,
      "Q7) "+selectedFeedback.questions[6].question,
      "Q8) "+selectedFeedback.questions[7].question,
      "Q9) "+selectedFeedback.questions[8].question,
      "Q10) "+selectedFeedback.questions[9].question,
      "Total Average",
    ], // Table headers
  ];

  // Append faculty data
  faculties.forEach((faculty) => {
    sheetData.push([
      faculty.name,
      faculty.subject,
      faculty.rating.q1.toString(),
      faculty.rating.q2.toString(),
      faculty.rating.q3.toString(),
      faculty.rating.q4.toString(),
      faculty.rating.q5.toString(),
      faculty.rating.q6.toString(),
      faculty.rating.q7.toString(),
      faculty.rating.q8.toString(),
      faculty.rating.q9.toString(),
      faculty.rating.q10.toString(),
      faculty.totalAvarage.toFixed(2),
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
    { wch: 5 },  // Q1
    { wch: 5 },  // Q2
    { wch: 5 },  // Q3
    { wch: 5 },  // Q4
    { wch: 5 },  // Q5
    { wch: 5 },  // Q6
    { wch: 5 },  // Q7
    { wch: 5 },  // Q8
    { wch: 5 },  // Q9
    { wch: 5 },  // Q10
    { wch: 15 }, // Total Average
  ];

  // Save file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${selectedFeedback.academicYear + selectedFeedback.department + selectedFeedback.class + '.xlsx'}`);
};
