"use server";

import { connectDB } from "@/utils/db";
import Feedback from "@/models/Feedback";

const createFeedbackCodes = (feedbackCount: number): string[] => {
  const codes = new Set<string>();
  while (codes.size < feedbackCount) {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = Math.floor(Math.random() * 90) + 10;
    codes.add(`${letter}${number}`);
  }
  return Array.from(codes);
};

export const createFeedbackFormAction = async (
  feedbackForm: any,
  totalToken: number
) => {
  try {
    await connectDB();
    const feedbackCodes = createFeedbackCodes(totalToken);
    feedbackForm.unique_codes = feedbackCodes;

    const data = await Feedback.create(feedbackForm);
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || `error in createFeedbackFormAction : ${error}`,
    };
  }
};

export const updateFeedbackFormAction = async (
  feedbackId: string,
  updatedFeedback: any,
  totalToken: number
) => {
  try {
    await connectDB();
    updatedFeedback.unique_codes = createFeedbackCodes(totalToken);

    const data = await Feedback.findByIdAndUpdate(feedbackId, updatedFeedback, {
      new: true,
      runValidators: true,
    });
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || `error in updateFeedbackFormAction : ${error}`,
    };
  }
};

export const getFeedbackByAcademicYearAction = async (academicYear: string) => {
  try {
    await connectDB();
    const data = await Feedback.find({ academic_year: academicYear });
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || `error in getFeedbackByAcademicYearAction : ${error}`,
    };
  }
};

export const getFeedbackFormsWithAcademicYearDepartmentClassWiseAction = async (
  academicYear: string,
  department: string,
  classs: string
) => {
  try {
    await connectDB();
    const data = await Feedback.find({
      academic_year: academicYear,
      department,
      class: classs,
    });
    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || `error in getFeedbackFor`,
    };
  }
};

export const deleteFeedbackByIdAction = async (feedbackId: string) => {
  try {
    await connectDB();
    await Feedback.findByIdAndDelete(feedbackId);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || `error in deleteFeedbackByIdAction : ${error}`,
    };
  }
};
