import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const extractAdminId = (req: NextRequest): string | null => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      adminId: string;
    };

    return decoded.adminId ?? null; // Ensure returning a string or null
  } catch (error) {
    console.error("Error in extractAdminId:", error);
    return null;
  }
};
