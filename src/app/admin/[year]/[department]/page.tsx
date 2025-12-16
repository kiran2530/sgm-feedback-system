// app/admin/[year]/[department]/page.tsx
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

  const norm = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";

  const year = norm(params?.year);
  const department = norm(params?.department);

  useEffect(() => {
    if (!year) router.push("/admin");
    if (!department && year) router.push(`/admin/${encodeURIComponent(year)}`);
  }, [year, department, router]);

  // safe class list lookup
  const classList = departments[department] ?? [];

  return (
    <div className="container mx-auto py-6 px-4">
      <h3 className="text-xl font-bold mb-4">Classes for {department}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classList.map((cls) => (
          <div
            key={cls}
            className="p-4 bg-purple-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-purple-600"
            onClick={() =>
              router.push(
                `/admin/${encodeURIComponent(year)}/${encodeURIComponent(
                  department
                )}/${encodeURIComponent(cls)}`
              )
            }
          >
            {cls}
          </div>
        ))}
        {classList.length === 0 && (
          <div className="p-4 bg-gray-100 rounded-lg">No classes available</div>
        )}
      </div>
    </div>
  );
}
