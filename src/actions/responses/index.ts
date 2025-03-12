/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "../../utils/supabase/client";

export const getAllResponsesByFeedbackAction = async (feedbackId: string) => {
  try {
    const supabse = await createClient();
    const { data, error } = await supabse
      .from("feedbacks")
      .select("*")
      .eq("feedback_id", feedbackId);
    if (error) {
      console.log("error in getAllResponsesByFeedbackAction : ", error);
      return {
        success: false,
        message: `error in getAllResponsesByFeedbackAction : ${error}`,
      };
    }
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.log("error in getAllResponsesByFeedbackAction : ", error);
    return {
      success: false,
      message: `error in getAllResponsesByFeedbackAction : ${error}`,
    };
  }
};

export const createNewResponseAction = async (
  response: any,
  uniqueCode: string,
  feedbackId: string
) => {
  try {
    const supabase = await createClient();
    const res = await supabase
      .from("feedback")
      .select("unique_codes")
      .eq("id", feedbackId);
    console.log({ res });
    //const ids = res[0].unique_codes;

    const { data, error } = await supabase
      .from("responses")
      .insert([response])
      .select();
    if (error) {
      return {
        success: false,
        message: `error in createNewResponseAction : ${error}`,
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `error in createNewResponseAction : ${error}`,
    };
  }
};
