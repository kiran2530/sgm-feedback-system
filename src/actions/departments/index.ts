import { createClient } from "@/utils/supabase/server";

export const getAllDepartmentsAction = async () => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("departments")
            .select("*");
        if (error) {
            console.log('error in getAllDepartmentsAction : ', error);
            return {
                success: false,
                message: `error in getAllDepartmentsAction :  ${error}`
            }
        }

        return {
            success: true,
            data: data
        }


    } catch (error) {
        console.log('error in getAllDepartmentsAction : ', error);
        return {
            success: false,
            message: `error in getAllDepartmentsAction :  ${error}`
        }
    }
}



