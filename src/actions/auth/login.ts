"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@/utils/supabase/server";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data)
      return { success: false, message: "Invalid credentials" };

    const isValidPassword = await bcrypt.compare(password, data.password);
    if (!isValidPassword)
      return { success: false, message: "Invalid credentials" };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is missing in environment variables");
    } else {
      console.log(process.env.JWT_SECRET);
    }

    const token = jwt.sign(
      { adminId: data.id },
      process.env.JWT_SECRET as string
    );

    return { success: true, token, message: "Login Successfully" };
  } catch (error) {
    console.log("Error in loginAdmin:", error);
    return { success: false, message: "Login failed" };
  }
};
