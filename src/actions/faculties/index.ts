import { createClient } from "@/utils/supabase/server";

export const getFacultiesByDepartmentAction = async (departmentId: string) => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("faculties")
            .select("*")
            .eq("department_id", departmentId);

        if (error) {
            console.log('error in getFacultiesByDepartmentAction : ', error);
            return {
                success: false,
                message: `error in getFacultiesByDepartmentAction  :${error}`
            }
        }

        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log('error in getFacultiesByDepartmentAction : ', error);
        return {
            success: false,
            message: `error in getFacultiesByDepartmentAction  :${error}`
        }
    }
}