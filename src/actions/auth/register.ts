"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Admin from "@/models/Admin";

export const registerAdmin = async (
  name: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Admin registered successfully",
      data: JSON.parse(JSON.stringify(admin)),
    };
  } catch (error: any) {
    console.log("Error in registerAdmin:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }
};
