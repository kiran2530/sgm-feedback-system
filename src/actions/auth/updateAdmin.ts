"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Admin from "@/models/Admin";
import { extractAdminId } from "@/utils/authMiddleware";
import { NextRequest } from "next/server";

export const updateAdminCredentials = async (req: NextRequest) => {
  try {
    await connectDB();

    const adminId = extractAdminId(req);
    if (!adminId) return { success: false, message: "Unauthorized" };

    const { name, email, phone, password } = await req.json();
    if (!name && !email && !phone && !password)
      return { success: false, message: "Nothing to update" };

    const updates: any = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (password) updates.password = await bcrypt.hash(password, 10);

    await Admin.findByIdAndUpdate(adminId, updates);

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { success: false, message: `Error: ${error}` };
  }
};
