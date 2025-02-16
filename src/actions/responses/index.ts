import { createClient } from "@/utils/supabase/server";

export const getAllResponsesByFeedbackAction = async (feedbackId: string) => {
    try {
        const supabse = await createClient();
        const { data, error } = await supabse
            .from('feedbacks')
            .select("*")
            .eq("feedback_id", feedbackId)
        if (error) {
            console.log('error in getAllResponsesByFeedbackAction : ', error);
            return {
                success: false,
                message: `error in getAllResponsesByFeedbackAction : ${error}`
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log('error in getAllResponsesByFeedbackAction : ', error);
        return {
            success: false,
            message: `error in getAllResponsesByFeedbackAction : ${error}`
        }
    }
}