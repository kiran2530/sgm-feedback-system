/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { FeedbackForm } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { supabase } from '../../utils/supabase/client';
import { error } from "console";

// export const createNewFeedbackAction = async (feedbackForm: FeedbackForm) => {
//     try {
//         const supabase = await createClient();
//         const feedbackCodes = createFeedbackCodes(feedbackForm.feedback_count);

//         if (feedbackCodes.length === 0) {
//             return {
//                 success: false,
//                 message: "Unable to create unique feedback codes",
//             };
//         }

//         // Inserting into the Supabase table
//         const { data, error } = await supabase
//             .from("feedback_forms")
//             .insert([
//                 {
//                     department_id: feedbackForm.department_id,
//                     faculty_id: feedbackForm.faculty_id,
//                     subject_id: feedbackForm.subject_id,
//                     due_date: feedbackForm.due_date,
//                     feedback_count: feedbackForm.feedback_count,
//                     title: feedbackForm.title,
//                     feedback_creator: feedbackForm.feedback_creator,
//                     feedback_codes: feedbackCodes,
//                 },
//             ])
//             .select();

//         if (error) {
//             console.log("Supabase Insert Error:", error);
//             return {
//                 success: false,
//                 message: "Failed to insert feedback form.",
//                 error,
//             };
//         }

//         return {
//             success: true,
//             message: "Feedback form created successfully",
//             data,
//         };
//     } catch (error) {
//         console.log("Error in createNewFeedbackAction:", error);
//         return {
//             success: false,
//             message: `Error in createNewFeedbackAction: ${error}`,
//         };
//     }
// };

// export const getFeedbackFormAction = async (feedbackId: string) => {
//     try {
//         const supabase = await createClient();
//         const { data, error } = await supabase
//             .from("feedback_forms")
//             .select("*")
//             .eq("id", feedbackId);

//         if (error) {
//             console.log("error in getFeedbackFormAction : ", error)
//             return {
//                 success: false,
//                 message: `error in getFeedbackFormAction : ${error}`
//             }
//         }
//         return {
//             success: true,
//             data: data
//         }
//     } catch (error) {
//         console.log("error in getFeedbackFormAction : ", error)
//         return {
//             success: false,
//             message: `error in getFeedbackFormAction : ${error}`
//         }
//     }
// }

// export const insertFeedbackSubmissionActions = async (feedbackSubmission: FeedbackSubmission) => {
//     try {
//         const supabase = await createClient();

//         const { data, error } = await supabase
//             .from("feedbacks")
//             .insert([
//                 {
//                     faculty_id: feedbackSubmission.faculty_id,
//                     subject_id: feedbackSubmission.subject_id,
//                     feedback_code: feedbackSubmission.feedback_code,
//                     responses: feedbackSubmission.responses,
//                 }

//             ])
//             .select();
//         if (error) {
//             console.log("error in insertFeedbackSubmissionActions : ", error)
//             return {
//                 success: false,
//                 message: `error in insertFeedbackSubmissionActions : ${error}`
//             }
//         }
//         return {
//             success: true,
//             data: data
//         }

//     } catch (error) {
//         console.log("error in insertFeedbackSubmissionActions : ", error)
//         return {
//             success: false,
//             message: `error in insertFeedbackSubmissionActions : ${error}`
//         }
//     }

// }

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

export const createFeedbackFormAction = async (feedbackForm: FeedbackForm) => {
    try {
        //facult
        const supabase = await createClient();
        const feedbackCodes = createFeedbackCodes(20);
        feedbackForm.unique_codes = feedbackCodes;
        const { data, error } = await supabase
            .from("feedback_forms")
            .insert([
                feedbackForm
            ])
            .select();
        if (error) {
            return {
                success: false,
                message: `error in createFeedbackFormAction : ${error}`
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            message: `error in createFeedbackFormAction : ${error}`
        }
    }
}


export const getFeedbackByAcademicYearAction = async (academicYear: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedback_forms")
            .select("*")
            .eq("academic_year", academicYear);
        if (error) {
            return {
                success: false,
                message: `error in getFeedbackByAcademicYearAction : ${error}`
            }
        }
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            success: false,
            message: `error in getFeedbackByAcademicYearAction : ${error}`
        }
    }
}

export const getFeedbackFromsByAcademicYearAndDepartmentAction = async (academicYear: string, department: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedback_forms")
            .select("*")
            .eq("academic_year", academicYear)
            .eq("department", department)
        if (error) {
            return {
                success: false,
                message: `error in getFeedbackFromsByAcademicYearAndDepartmentAction : ${error}`
            }
        }
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            success: false,
            message: `error in getFeedbackFromsByAcademicYearAndDepartmentAction : ${error}`
        }
    }
}

export const getFeedbackFormsWithAcademicYearDepartmentClassWiseAction = async (academicYear: string, department: string, classs: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedback_forms")
            .select("*")
            .eq("academic_year", academicYear)
            .eq("department", department)
            .eq("class", classs)
        if (error) {
            return {
                success: false,
                message: `error in getFeedbackFormsWithAcademicYearDepartmentClassWiseAction : ${error}`
            }
        }
        return {
            success: true,
            data
        }

    } catch (error) {
        return {
            success: false,
            message: `error in getFeedbackFormsWithAcademicYearDepartmentClassWiseAction : ${error}`
        }
    }
}

export const getFeedbackByDepartmentAndClassAction = async (department: string, classs: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedback_forms")
            .select("*")
            .eq("department", department)
            .eq("class", classs)
        if (error) {
            return {
                success: false,
                message: `error in getFeedbackByDepartmentAndClassAction : ${error}`
            }
        }
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            success: false,
            message: `error in getFeedbackByDepartmentAndClassAction : ${error}`
        }
    }
}

export const getFeedbackByIdAction = async (feedbackId: number) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("feedbakc_form")
            .select("*")
            .eq("id", feedbackId)
        if (error) {
            return {
                success: false,
                message: `error in getFeedbackByIdAction : ${error}`
            }
        }
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            success: false,
            message: `error in getFeedbackByIdAction : ${error}`
        }
    }
}
