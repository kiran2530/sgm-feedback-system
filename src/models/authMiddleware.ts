import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const extractAdminId = (req: Request | NextRequest) => {
  try {
    const authHeader = (req as any).headers?.get
      ? (req as any).headers.get("authorization")
      : // fallback for server functions that pass a plain object
        (req as any).headers?.authorization;

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return payload?.adminId || null;
  } catch {
    return null;
  }
};
