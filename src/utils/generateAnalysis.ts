import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Feedback } from "@/types";
import { feedbackQuestions } from "@/data/feedbackQuestionsOption";

interface FacultyWeightsRating {
  [facultyName: string]: number[];
}

export const generateAnalysis = (
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

  const sheetData: (string | number)[][] = [
    [`${feedback_title}`],
    [`Academic Year: ${academic_year}`],
    [`Department: ${department}`],
    [`Class: ${className}`],
    [`Semester: ${semester}`],
    [`Term: ${term}`],
    [`Date: ${date}`],
    [], // Spacer
  ];

  const merges: XLSX.Range[] = [];

  faculty_with_subject.forEach((faculty) => {
    const [facultyName, facultySubject] = faculty.split(":");
    const weights =
      averageWeights[faculty] || Array(feedbackQuestions.length).fill("NA");
    const ratings =
      averageRatings[faculty] || Array(feedbackQuestions.length).fill("NA");

    // Get top 10 question indexes by weights
    const questionWithWeights = weights
      .map((weight, index) => ({
        index,
        weight: typeof weight === "number" ? weight : -1,
      }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10);

    // Faculty section header
    sheetData.push([
      `Faculty: ${facultyName}` + "    " + `Subject: ${facultySubject}`,
    ]);
    merges.push({
      s: { r: sheetData.length - 1, c: 0 },
      e: { r: sheetData.length - 1, c: 4 },
    });

    sheetData.push(["Q No.", "Question", "Weight", "Rating"]);

    let totalWeight = 0;
    let totalRating = 0;
    let validCount = 0;

    questionWithWeights.forEach(({ index, weight }) => {
      const questionText =
        feedbackQuestions[index]?.question || `Q${index + 1}`;
      const ratingValue = ratings[index];
      const weightVal = typeof weight === "number" ? weight : "NA";
      const ratingVal = typeof ratingValue === "number" ? ratingValue : "NA";

      if (typeof weight === "number" && typeof ratingValue === "number") {
        totalWeight += weight;
        totalRating += ratingValue;
        validCount++;
      }

      sheetData.push([
        `Q${index + 1}`,
        questionText,
        typeof weight === "number" ? weight.toFixed(2) : "NA",
        typeof ratingValue === "number" ? ratingValue.toFixed(2) : "NA",
      ]);
    });

    // Average row
    const avgWeight =
      validCount > 0 ? (totalWeight / validCount).toFixed(2) : "NA";
    const avgRating =
      validCount > 0 ? (totalRating / validCount).toFixed(2) : "NA";
    sheetData.push(["", "Average", avgWeight, avgRating]);

    sheetData.push([]); // Spacer between faculties
  });

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback Report");

  // Merge header rows
  merges.push(
    { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: 4 } },
    { s: { r: 4, c: 0 }, e: { r: 4, c: 4 } },
    { s: { r: 5, c: 0 }, e: { r: 5, c: 4 } },
    { s: { r: 6, c: 0 }, e: { r: 6, c: 4 } }
  );

  ws["!merges"] = merges;

  // Auto column widths
  ws["!cols"] = [
    { wch: 15 }, // Question No.
    { wch: 70 }, // Question Text
    { wch: 10 }, // Weight
    { wch: 10 }, // Rating
  ];

  // Save Excel file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(
    data,
    `feedback_Top10_${academic_year}_${department}_${className}_sem-${semester}_${term}.xlsx`
  );
};
