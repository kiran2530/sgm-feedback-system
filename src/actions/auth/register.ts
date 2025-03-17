"use server";

import bcrypt from "bcryptjs";
import { createClient } from "@/utils/supabase/server";

export const registerAdmin = async (
  name: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const supabase = await createClient();
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("admin")
      .insert([{ name, email, phone, password: hashedPassword }]);

    if (error) throw new Error(error.message);

    return { success: true, message: "Admin registered successfully", data };
  } catch (error) {
    console.log("Error in registerAdmin:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
