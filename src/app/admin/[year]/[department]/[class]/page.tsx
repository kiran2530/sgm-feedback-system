// app/admin/[year]/[department]/[class]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Trash,
  X,
  StepBack,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { Feedback } from "@/types";
import {
  deleteFeedbackByIdAction,
  getFeedbackByAcademicYearAction,
} from "@/actions/feedbacks";
import { generateCodeExcel, generateExcel } from "@/utils/generateExcel";
import UpdateFeedback from "@/components/UpdateFeedback";
import { feedbackQuestions } from "@/data/feedbackQuestionsOption";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const norm = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";

  const year = norm(params?.year);
  const department = norm(params?.department);
  const classParam = norm(params?.class);

  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedResponses, setExpandedResponses] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!year) router.push("/admin");
    if (!department) router.push(`/admin/${encodeURIComponent(year)}`);
    if (!classParam)
      router.push(
        `/admin/${encodeURIComponent(year)}/${encodeURIComponent(department)}`
      );
  }, [year, department, classParam, router]);

  useEffect(() => {
    // fetch feedbacks by academic year then filter client-side by department/class
    const fetch = async () => {
      if (!year) return;
      setIsLoading(true);
      try {
        const res = await getFeedbackByAcademicYearAction(year);
        if (res.success) {
          // ensure response.data is array
          const arr = Array.isArray(res.data) ? res.data : [];
          // Filter by department and class (case-insensitive)
          const filtered = arr.filter((f: any) => {
            const deptMatch =
              !department ||
              (f.department &&
                String(f.department).toLowerCase() ===
                  department.toLowerCase());
            const classMatch =
              !classParam ||
              (f.class &&
                String(f.class).toLowerCase() === classParam.toLowerCase());
            return deptMatch && classMatch;
          });

          // Ensure each feedback is a plain object (avoid Mongoose docs). Convert dates & ids safely:
          const normalized: Feedback[] = filtered.map((f: any) => ({
            _id: f._id ? String(f._id) : f._id ? String(f._id) : "",
            academic_year: String(f.academic_year ?? ""),
            department: String(f.department ?? ""),
            class: String(f.class ?? ""),
            semester: String(f.semester ?? ""),
            term: String(f.term ?? ""),
            feedback_title: String(f.feedback_title ?? ""),
            faculty_with_subject: Array.isArray(f.faculty_with_subject)
              ? f.faculty_with_subject
              : [],
            created_at: f.created_at ? String(f.created_at) : "",
            date: f.date ? new Date(f.date) : new Date(),
            unique_codes: Array.isArray(f.unique_codes) ? f.unique_codes : [],
            weights: f.weights ?? {},
            rating: f.rating ?? {},
          }));

          setFeedbackData(normalized);
        } else {
          console.error("Failed to fetch feedbacks:", res.message);
        }
      } catch (err) {
        console.error("Fetch feedbacks error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [year, department, classParam]);

  const toggleResponse = (i: number) => {
    setExpandedResponses((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    setIsDeleting(true);
    try {
      const res = await deleteFeedbackByIdAction(id);
      if (res.success) {
        setFeedbackData((prev) => prev.filter((f) => f._id !== id));
        alert("Feedback deleted successfully");
        setSelectedFeedback(null);
      } else {
        alert(res.message || "Failed to delete");
      }
    } catch (err) {
      alert("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  // helper to calculate averages (kept same logic as your old UI)
  const calculateAverages = (obj: {
    [key: string]: number[];
  }): { [key: string]: number } => {
    const averages: { [key: string]: number } = {};
    Object.entries(obj).forEach(([key, values]) => {
      if (values.length > 0) {
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        averages[key] = parseFloat((sum / values.length).toFixed(2));
      } else {
        averages[key] = 0;
      }
    });
    return averages;
  };

  // your UI (kept largely the same)
  return (
    <div className="container mx-auto py-6 px-4">
      <h3 className="text-xl font-bold mb-4">Feedbacks for {classParam}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-gray-200 animate-pulse rounded-lg h-28"
              />
            ))
          : feedbackData.map((feedback) => (
              <div
                key={feedback._id || String(Math.random())}
                onClick={() => setSelectedFeedback(feedback)}
                className="bg-white py-2 px-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    {feedback.feedback_title}
                  </h3>
                  <span className="bg-primary/10 text-primary rounded-full text-sm">
                    {feedback.academic_year}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {feedback.date.toString()}
                  </p>
                  <p className="text-sm mt-2">Semester {feedback.semester}</p>
                </div>
              </div>
            ))}
      </div>

      {feedbackData.length === 0 && !isLoading && (
        <div className="py-2 px-4 w-full flex justify-center">
          No Feedbacks are listed...
        </div>
      )}

      {/* modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl p-3 sm:p-6 animate-scaleIn h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {selectedFeedback.feedback_title}
                </h2>
                <p className="font-semibold text-gray-500">
                  Academic Year : {selectedFeedback.academic_year}
                </p>
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full flex justify-between mb-4">
              <button
                className="px-3 py-1 bg-green-400 hover:bg-green-500 rounded-lg"
                onClick={() => setIsDialogOpen(true)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg text-white flex items-center"
                onClick={() => handleDelete(selectedFeedback._id)}
                disabled={isDeleting}
              >
                <Trash size={18} className="mr-1" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg border mb-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-gray-600">Department : </span>
                  <span>{selectedFeedback.department}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Class :</span>
                  <span>{selectedFeedback.class}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Semester :</span>
                  <span>{selectedFeedback.semester}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Date :</span>
                  <span>{selectedFeedback.date.toString()}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Total Responses :</span>
                  <span>
                    {Object.values(selectedFeedback.rating)[0]?.length ?? 0}
                  </span>
                </div>

                <button
                  onClick={() => generateCodeExcel(selectedFeedback)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download Codes
                </button>
              </div>
            </div>

            {/* responses */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Responses:</h3>
              {selectedFeedback.faculty_with_subject.map((faculty, idx) => {
                const [facultyName, facultySubject] = faculty.split(":");
                // compute averages from selectedFeedback.weights and rating (your logic)
                const totalAverageWeight = calculateAverages(
                  (selectedFeedback.weights as any) ?? {}
                );
                const totalAverageRating = calculateAverages(
                  (selectedFeedback.rating as any) ?? {}
                );

                return (
                  <div key={idx} className="border rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-2 bg-gray-200 cursor-pointer gap-1"
                      onClick={() => toggleResponse(idx)}
                    >
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">
                          {facultyName} (
                          <span className="text-xs sm:text-sm">
                            {facultySubject}
                          </span>
                          )
                        </span>
                      </div>

                      <div className="flex justify-center items-center">
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          {expandedResponses.includes(idx) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedResponses.includes(idx) && (
                      <div className="p-2 bg-white">
                        <div className="sm:flex sm:ml-12">
                          <p className="mb-1 font-bold text-black sm:w-6/12">
                            Name :{" "}
                            <span className="text-gray-500">{facultyName}</span>
                          </p>
                          <p className="mb-1 font-bold text-black">
                            Subject :{" "}
                            <span className="text-gray-500">
                              {facultySubject}
                            </span>
                          </p>
                        </div>

                        <div className="sm:flex sm:ml-12">
                          <p className="mb-1 font-bold text-black sm:w-6/12">
                            Weights Average :{" "}
                            <span className="text-gray-500">
                              {totalAverageWeight?.[faculty]}
                            </span>
                          </p>
                          <p className="mb-1 font-bold text-black">
                            Rating Average :{" "}
                            <span className="text-gray-500">
                              {totalAverageRating?.[faculty]}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col justify-between text-sm mt-6">
                          <h1 className="font-semibold text-gray-600">
                            Question Wise Average Weights and Ratings
                          </h1>
                          <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 text-sm text-gray-600 mt-2 border border-gray-400 rounded-lg p-1">
                            <div className="px-2 py-1 bg-gray-100 rounded flex text-black justify-between text-xs sm:font-semibold">
                              <div className="w-8/12 flex justify-center">
                                Question
                              </div>
                              <div className="w-2/12 flex justify-end sm:justify-center">
                                Weights
                              </div>
                              <div className="w-2/12 flex justify-start ml-1 sm:justify-center">
                                Ratings
                              </div>
                            </div>

                            {feedbackQuestions.map((q, index) => (
                              <div
                                key={index}
                                className="px-2 py-1 bg-gray-100 rounded flex"
                              >
                                <div className="w-8/12">
                                  Q{index + 1}) {q.question}
                                </div>
                                <div className="w-2/12 flex justify-center">
                                  {
                                    (selectedFeedback.weights as any)?.[
                                      faculty
                                    ]?.[index]
                                  }
                                </div>
                                <div className="w-2/12 flex justify-center">
                                  {
                                    (selectedFeedback.rating as any)?.[
                                      faculty
                                    ]?.[index]
                                  }
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => generateExcel(selectedFeedback, {}, {})}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Generate Excel
              </button>
              <button
                onClick={() => {
                  /* you had generateAnalysis previously */
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600"
              >
                Download Analysis
              </button>
            </div>
          </div>

          {isDialogOpen && (
            <UpdateFeedback
              selectedFeedback={selectedFeedback}
              onClose={() => setIsDialogOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
