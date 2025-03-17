"use server";

import bcrypt from "bcryptjs";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { extractAdminId } from "@/utils/authMiddleware";

export const updateAdminCredentials = async (req: NextRequest) => {
  try {
    const adminId = extractAdminId(req);
    if (!adminId) {
      return { success: false, message: "Unauthorized" };
    }

    // Parse request body manually
    const { name, email, phone, password } = await req.json();
    if (!name && !email && !phone && !password)
      return { success: false, message: "Nothing to update" };

    const supabase = await createClient();
    const updates: Partial<{
      name: string;
      email: string;
      phone: string;
      password: string;
    }> = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("admins")
      .update(updates)
      .eq("id", adminId);
    if (error) throw new Error(error.message);

    return { success: true, message: "Admin credentials updated successfully" };
  } catch (error) {
    console.error("Error in updateAdminCredentials:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
