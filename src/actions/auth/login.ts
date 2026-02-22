"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/utils/db";
import Admin from "@/models/Admin";

export const loginAdmin = async (email: string, password: string) => {
  try {
    await connectDB();

    const admin = await Admin.findOne({ email });
    if (!admin) return { success: false, message: "Invalid credentials" };

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return { success: false, message: "Invalid credentials" };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    const token = jwt.sign({ adminId: admin._id.toString() }, jwtSecret, {
      expiresIn: "1d",
    });

    return { success: true, token, message: "Login Successfully" };
  } catch {
    return { success: false, message: "Login failed" };
  }
};

export const getAdminInfo = async (token: string) => {
  try {
    await connectDB();

    const jwtSecret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, jwtSecret) as {
      adminId: string;
    };

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return { success: false, message: "Admin not found" };
    }

    return {
      success: true,
      message: "Admin fetched successfully",
      adminProfileInfo: JSON.parse(JSON.stringify(admin)),
    };
  } catch {
    return {
      success: false,
      message: "Invalid or expired token",
    };
  }
};
