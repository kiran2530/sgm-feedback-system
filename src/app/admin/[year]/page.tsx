// app/admin/[year]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const departments: Record<string, string[]> = {
  "First-Year": ["Div-A", "Div-B", "Div-C", "Div-D"],
  "Computer-Science": ["Second-Year", "Third-Year", "Final-Year"],
  Mechanical: ["Second-Year", "Third-Year", "Final-Year"],
  Electrical: ["Second-Year", "Third-Year", "Final-Year"],
  Civil: ["Second-Year", "Third-Year", "Final-Year"],
  Electronics: ["Second-Year", "Third-Year", "Final-Year"],
  MCA: ["First-Year", "Second-Year"],
};

export default function Page() {
  const router = useRouter();
  const params = useParams();

  // Normalize params (use first item if array)
  const norm = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";

  const year = norm(params?.year);

  useEffect(() => {
    if (!year) {
      // if no year provided, send user to /admin (the list of years in your main admin page)
      router.push("/admin");
    }
  }, [year, router]);

  if (!year) return null;

  return (
    <div className="container mx-auto py-6 px-4">
      <h3 className="text-xl font-bold mb-4">Departments for {year}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(departments).map((dept) => (
          <div
            key={dept}
            className="p-4 bg-green-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-green-700"
            onClick={() =>
              router.push(
                `/admin/${encodeURIComponent(year)}/${encodeURIComponent(dept)}`
              )
            }
          >
            {dept}
          </div>
        ))}
      </div>
    </div>
  );
}
