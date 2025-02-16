import { createClient } from "@/utils/supabase/server";

export const getAllSubjectsByFacultyAction = async (facultyId: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("subjects")
            .select("*")
            .eq("faculty_id", facultyId)
        if (error) {
            console.log('error in getAllSubjectsByFacultyAction : ', error);
            return {
                success: false,
                message: `error in getAllSubjectsByFacultyAction : ${error}`
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log('error in getAllSubjectsByFacultyAction : ', error);
        return {
            success: false,
            message: `error in getAllSubjectsByFacultyAction : ${error}`
        }
    }
}