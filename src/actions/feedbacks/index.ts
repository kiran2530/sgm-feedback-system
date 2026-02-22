"use server";

import { connectDB } from "@/utils/db";
import Feedback from "@/models/Feedback";

/* ===================== TYPES ===================== */

interface FeedbackType {
  academic_year: string;
  department: string;
  class: string;
  semester: string;
  term: string;
  feedback_title: string;
  date: Date;
  faculty_with_subject: string[];
  unique_codes: string[];
  weights: Record<string, number[][]>;
  rating: Record<string, number[][]>;
}

/* ===================== UTILS ===================== */

const createFeedbackCodes = (feedbackCount: number): string[] => {
  const codes = new Set<string>();

  while (codes.size < feedbackCount) {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = Math.floor(Math.random() * 90) + 10;
    codes.add(`${letter}${number}`);
  }

  return Array.from(codes);
};

/* ===================== CREATE ===================== */

export const createFeedbackFormAction = async (
  feedbackForm: Omit<FeedbackType, "unique_codes" | "weights" | "rating">,
  totalToken: number,
) => {
  try {
    await connectDB();

    const data = await Feedback.create({
      ...feedbackForm,
      unique_codes: createFeedbackCodes(totalToken),
      weights: {},
      rating: {},
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error in createFeedbackFormAction",
    };
  }
};

/* ===================== UPDATE FORM ===================== */

export const updateFeedbackFormAction = async (
  feedbackId: string,
  updatedFeedback: Partial<
    Omit<FeedbackType, "weights" | "rating" | "unique_codes">
  >,
  totalToken: number,
) => {
  try {
    await connectDB();

    const data = await Feedback.findByIdAndUpdate(
      feedbackId,
      {
        ...updatedFeedback,
        unique_codes: createFeedbackCodes(totalToken),
      },
      { new: true, runValidators: true },
    );

    if (!data) {
      return { success: false, message: "Feedback not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error in updateFeedbackFormAction",
    };
  }
};

/* ===================== GET BY ACADEMIC YEAR ===================== */

export const getFeedbackByAcademicYearAction = async (academicYear: string) => {
  try {
    await connectDB();

    const data = await Feedback.find({ academic_year: academicYear });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error in getFeedbackByAcademicYearAction",
    };
  }
};

/* ===================== GET BY YEAR + DEPT + CLASS ===================== */

export const getFeedbackFormsWithAcademicYearDepartmentClassWiseAction = async (
  academicYear: string,
  department: string,
  classs: string,
) => {
  try {
    await connectDB();

    const data = await Feedback.find({
      academic_year: academicYear,
      department,
      class: classs,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error fetching feedback forms",
    };
  }
};

/* ===================== GET BY ID ===================== */

export const getFeedbackByIdAction = async (feedbackId: string) => {
  try {
    await connectDB();

    const data = await Feedback.findById(feedbackId);
    console.log("data", data);
    if (!data) {
      return { success: false, message: "Feedback not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error in getFeedbackByIdAction",
    };
  }
};

/* ===================== UPDATE WEIGHTS & RATINGS ===================== */

export const updateFeedbackWeightsAndRatings = async (
  feedbackId: string,
  code: string,
  facultyNameWithWeights: Record<string, number[]>,
  facultyNameWithRating: Record<string, number[]>,
) => {
  try {
    await connectDB();

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return { success: false, message: "Feedback not found" };
    }

    if (!feedback.unique_codes.includes(code)) {
      return { success: false, message: "Invalid feedback code" };
    }

    const weights = feedback.weights || {};
    const rating = feedback.rating || {};

    for (const faculty in facultyNameWithWeights) {
      weights[faculty] = weights[faculty]
        ? [...weights[faculty], facultyNameWithWeights[faculty]]
        : [facultyNameWithWeights[faculty]];
    }

    for (const faculty in facultyNameWithRating) {
      rating[faculty] = rating[faculty]
        ? [...rating[faculty], facultyNameWithRating[faculty]]
        : [facultyNameWithRating[faculty]];
    }

    feedback.weights = weights;
    feedback.rating = rating;
    feedback.unique_codes = feedback.unique_codes.filter(
      (c: string) => c !== code,
    );

    await feedback.save();

    return {
      success: true,
      message: "Feedback submitted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error submitting feedback",
    };
  }
};

/* ===================== DELETE ===================== */

export const deleteFeedbackByIdAction = async (feedbackId: string) => {
  try {
    await connectDB();

    await Feedback.findByIdAndDelete(feedbackId);

    return {
      success: true,
      message: "Feedback deleted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error deleting feedback",
    };
  }
};
