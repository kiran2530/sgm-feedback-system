"use server";

import { Feedback } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "../../utils/supabase/client";
import { error } from "console";

const createFeedbackCodes = (feedbackCount: number): string[] => {
  try {
    const codes = new Set<string>();

    while (codes.size < feedbackCount) {
      const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const number = Math.floor(Math.random() * 90) + 10;
      const code = `${letter}${number}`;

      codes.add(code);
    }

    return Array.from(codes);
  } catch (error) {
    console.log("Error in createFeedbackCodes:", error);
    return [];
  }
};

export const createFeedbackFormAction = async (
  feedbackForm: Omit<Feedback, "id">,
  totalToken: number
) => {
  try {
    //facult
    const supabase = await createClient();
    const feedbackCodes = createFeedbackCodes(totalToken);
    feedbackForm.unique_codes = feedbackCodes;
    const { data, error } = await supabase
      .from("feedback")
      .insert([feedbackForm])
      .select();
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: `error in createFeedbackFormAction : ${error}`,
    };
  }
};

export const updateFeedbackFormAction = async (
  feedbackId: string,
  updatedFeedback: Partial<
    Pick<
      Feedback,
      | "academic_year"
      | "department"
      | "class"
      | "semester"
      | "term"
      | "feedback_title"
      | "faculty_with_subject"
      | "unique_codes"
    >
  >,
  totalToken: number
) => {
  try {
    const supabase = await createClient();

    const feedbackCodes = createFeedbackCodes(totalToken);
    updatedFeedback.unique_codes = feedbackCodes;
    const { data, error } = await supabase
      .from("feedback")
      .update(updatedFeedback)
      .eq("id", feedbackId)
      .select();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error in updateFeedbackFormAction: ${error}`,
    };
  }
};

export const getFeedbackByAcademicYearAction = async (academicYear: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("academic_year", academicYear);
    if (error) {
      return {
        success: false,
        message: `error in getFeedbackByAcademicYearAction : ${error}`,
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `error in getFeedbackByAcademicYearAction : ${error}`,
    };
  }
};

export const getFeedbackFormsWithAcademicYearDepartmentClassWiseAction = async (
  academicYear: string,
  department: string,
  classs: string
) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("academic_year", academicYear)
      .eq("department", department)
      .eq("class", classs);
    if (error) {
      return {
        success: false,
        message: `error in getFeedbackFormsWithAcademicYearDepartmentClassWiseAction : ${error}`,
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `error in getFeedbackFormsWithAcademicYearDepartmentClassWiseAction : ${error}`,
    };
  }
};

// get Feedbacks
export const getFeedbackByIdAction = async (feedbackId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("id", feedbackId);
    if (error) {
      return {
        success: false,
        message: `error in getFeedbackByIdAction : ${error}`,
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `error in getFeedbackByIdAction : ${error}`,
    };
  }
};

// For updating the response of students.
export const updateFeedbackWeightsAndRatings = async (
  feedbackId: string,
  code: string,
  facultyNameWithWeights: { [facultyName: string]: number[] },
  facultyNameWithRating: { [facultyName: string]: number[] }
) => {
  try {
    const supabase = await createClient();

    // Fetch existing feedback data
    const { data, error } = await supabase
      .from("feedback")
      .select("weights, rating, unique_codes")
      .eq("id", feedbackId)
      .single();

    if (error) {
      return {
        success: false,
        message: `Error fetching feedback: ${error.message}`,
      };
    }

    if (!data) {
      return {
        success: false,
        message: "Feedback not found",
      };
    }

    const unique_codes = data.unique_codes;

    // Check if the code exists
    if (!unique_codes.includes(code)) {
      return {
        success: false,
        message: "Code not found in unique_codes",
      };
    }

    // Parse existing weights and ratings, ensuring they are structured as number[][] (2D arrays)
    const updatedWeights: { [faculty_name: string]: number[][] } =
      data.weights || {};
    const updatedRatings: { [faculty_name: string]: number[][] } =
      data.rating || {};

    // Update or add faculty data
    for (const facultyName in facultyNameWithWeights) {
      updatedWeights[facultyName] = updatedWeights[facultyName]
        ? [...updatedWeights[facultyName], facultyNameWithWeights[facultyName]] // Append as a new row
        : [facultyNameWithWeights[facultyName]]; // Initialize with the new array
    }

    for (const facultyName in facultyNameWithRating) {
      updatedRatings[facultyName] = updatedRatings[facultyName]
        ? [...updatedRatings[facultyName], facultyNameWithRating[facultyName]] // Append as a new row
        : [facultyNameWithRating[facultyName]]; // Initialize with the new array
    }

    // Remove the code from the array
    const updatedCodes = unique_codes.filter((c: string) => c !== code);

    // Update the feedback entry in Supabase
    const { error: updateError } = await supabase
      .from("feedback")
      .update({
        weights: updatedWeights,
        rating: updatedRatings,
        unique_codes: updatedCodes,
      })
      .eq("id", feedbackId);

    if (updateError) {
      return {
        success: false,
        message: `Error updating feedback: ${updateError.message}`,
      };
    }

    return {
      success: true,
      message: "Feedback Submited successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error}`,
    };
  }
};

// delete feedback form
export const deleteFeedbackByIdAction = async (feedbackId: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", feedbackId);

    if (error) {
      return {
        success: false,
        message: `error in deleteFeedbackByIdAction : ${error.message}`,
      };
    }

    return {
      success: true,
      message: "Feedback deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `error in deleteFeedbackByIdAction : ${error}`,
    };
  }
};
