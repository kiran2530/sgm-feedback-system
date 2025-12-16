// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const yearList: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearList.push(`${year}-${year + 1}`);
    }
    setYears(yearList);
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mt-14 mb-6">
        <h2 className="text-2xl font-bold mb-4">Academic Years</h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {years.map((year) => (
          <div
            key={year}
            className="p-4 bg-blue-500 text-white font-semibold text-center rounded-lg shadow-md cursor-pointer hover:bg-blue-600"
            onClick={() => router.push(`/admin/${encodeURIComponent(year)}`)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}
