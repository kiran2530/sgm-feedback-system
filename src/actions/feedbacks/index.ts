"use server"

import { FeedbackForm } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const createNewFeedbackAction = async (feedbackForm: FeedbackForm) => {
    try {
        const supabase = await createClient();
        const feedbackCodes = createFeedbackCodes(feedbackForm.feedback_count);

        if (feedbackCodes.length === 0) {
            return {
                success: false,
                message: "Unable to create unique feedback codes",
            };
        }

        // Inserting into the Supabase table
        const { data, error } = await supabase
            .from("feedback_forms")
            .insert([
                {
                    department_id: feedbackForm.department_id,
                    faculty_id: feedbackForm.faculty_id,
                    subject_id: feedbackForm.subject_id,
                    due_date: feedbackForm.due_date,
                    feedback_count: feedbackForm.feedback_count,
                    title: feedbackForm.title,
                    feedback_creator: feedbackForm.feedback_creator,
                    feedback_codes: feedbackCodes,
                },
            ])
            .select();

        if (error) {
            console.log("Supabase Insert Error:", error);
            return {
                success: false,
                message: "Failed to insert feedback form.",
                error,
            };
        }

        return {
            success: true,
            message: "Feedback form created successfully",
            data,
        };
    } catch (error) {
        console.log("Error in createNewFeedbackAction:", error);
        return {
            success: false,
            message: `Error in createNewFeedbackAction: ${error}`,
        };
    }
};

export const getFeedbackFormAction = async (feedbackId: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedback_forms")
            .select("*")
            .eq("id", feedbackId);

        if (error) {
            console.log("error in getFeedbackFormAction : ", error)
            return {
                success: false,
                message: `error in getFeedbackFormAction : ${error}`
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log("error in getFeedbackFormAction : ", error)
        return {
            success: false,
            message: `error in getFeedbackFormAction : ${error}`
        }
    }
}

export const insertFeedbackSubmission = async () => {

}

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
        console.log('Error in createFeedbackCodes:', error);
        return [];
    }
};
