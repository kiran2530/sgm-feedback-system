"use server";

import { connectDB } from "@/utils/db";
import Feedback from "@/models/Feedback";
import Response from "@/models/Response";

export const getAllResponsesByFeedbackAction = async (feedbackId: string) => {
  try {
    await connectDB();

    const data = await Response.find({ feedback_id: feedbackId });

    return {
      success: true,
      data, // Returns array of responses
    };
  } catch (error: any) {
    console.log("error in getAllResponsesByFeedbackAction : ", error);
    return {
      success: false,
      message: `error in getAllResponsesByFeedbackAction : ${error.message}`,
    };
  }
};

export const createNewResponseAction = async (
  response: any,
  uniqueCode: string,
  feedbackId: string,
) => {
  try {
    await connectDB();

    // Fetch feedback & unique codes
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return {
        success: false,
        message: "Feedback not found",
      };
    }

    // Validate unique code
    if (!feedback.unique_codes.includes(uniqueCode)) {
      return {
        success: false,
        message: "Invalid unique code",
      };
    }

    // Save response document
    const newResponse = await Response.create(response);

    return {
      success: true,
      data: newResponse,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `error in createNewResponseAction : ${error.message}`,
    };
  }
};
