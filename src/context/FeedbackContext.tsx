"use client"; // Ensures it's used in client-side components

import { createContext, useContext, ReactNode, useState } from "react";

// Define types
interface Rating {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
}

interface Faculties {
  name: string;
  totalAvarage: number;
  subject: string;
  rating: Rating;
}

interface Feedback {
  id: number;
  academicYear: string;
  department: string;
  class: string;
  semester: string;
  title: string;
  date: string;
  faculties: Faculties[];
}

// Mock Data
const MOCK_DATA_Initial: Feedback[] = [
  {
    id: 1,
    academicYear: "2024-2025",
    department: "Computer Science",
    class: "Final Year",
    semester: "8",
    title: "Semester 8 Feedback",
    date: "2024-02-15",
    faculties: [
      {
        name: "S. S. Gurav",
        subject: "Software Engineering",
        totalAvarage: 3.9,
        rating: {
          q1: 4,
          q2: 5,
          q3: 3,
          q4: 4,
          q5: 5,
          q6: 2,
          q7: 3,
          q8: 4,
          q9: 5,
          q10: 4,
        },
      },
      {
        name: "S. G. Swami",
        subject: "Machine Learning",
        totalAvarage: 4.1,
        rating: {
          q1: 5,
          q2: 4,
          q3: 4,
          q4: 5,
          q5: 4,
          q6: 3,
          q7: 5,
          q8: 4,
          q9: 4,
          q10: 5,
        },
      },
      {
        name: "A. B. Patil",
        subject: "Cloud Computing",
        totalAvarage: 4.0,
        rating: {
          q1: 4,
          q2: 4,
          q3: 5,
          q4: 4,
          q5: 4,
          q6: 4,
          q7: 5,
          q8: 4,
          q9: 3,
          q10: 4,
        },
      },
      {
        name: "P. R. Desai",
        subject: "Cyber Security",
        totalAvarage: 4.2,
        rating: {
          q1: 5,
          q2: 4,
          q3: 4,
          q4: 5,
          q5: 5,
          q6: 4,
          q7: 5,
          q8: 4,
          q9: 4,
          q10: 5,
        },
      },
    ],
  },
  {
    id: 2,
    academicYear: "2023-2024",
    department: "Computer Science",
    class: "Third Year",
    semester: "6",
    title: "Semester 6 Feedback",
    date: "2024-02-14",
    faculties: [
      {
        name: "M. T. Kulkarni",
        subject: "Data Structures",
        totalAvarage: 3.8,
        rating: {
          q1: 4,
          q2: 4,
          q3: 3,
          q4: 3,
          q5: 5,
          q6: 4,
          q7: 3,
          q8: 4,
          q9: 4,
          q10: 3,
        },
      },
      {
        name: "D. S. Pawar",
        subject: "Database Management Systems",
        totalAvarage: 3.9,
        rating: {
          q1: 4,
          q2: 4,
          q3: 4,
          q4: 4,
          q5: 4,
          q6: 4,
          q7: 3,
          q8: 5,
          q9: 4,
          q10: 4,
        },
      },
      {
        name: "V. K. Joshi",
        subject: "Computer Networks",
        totalAvarage: 4.0,
        rating: {
          q1: 4,
          q2: 5,
          q3: 4,
          q4: 4,
          q5: 5,
          q6: 3,
          q7: 4,
          q8: 4,
          q9: 4,
          q10: 4,
        },
      },
    ],
  },
  {
    id: 3,
    academicYear: "2024-2025",
    department: "Mechanical",
    class: "Final Year",
    semester: "8",
    title: "Semester 8 Feedback",
    date: "2024-02-13",
    faculties: [
      {
        name: "N. P. Sawant",
        subject: "Thermodynamics",
        totalAvarage: 3.7,
        rating: {
          q1: 3,
          q2: 4,
          q3: 3,
          q4: 3,
          q5: 4,
          q6: 3,
          q7: 4,
          q8: 4,
          q9: 3,
          q10: 4,
        },
      },
      {
        name: "A. K. Jadhav",
        subject: "Manufacturing Processes",
        totalAvarage: 3.9,
        rating: {
          q1: 4,
          q2: 3,
          q3: 5,
          q4: 4,
          q5: 4,
          q6: 4,
          q7: 4,
          q8: 3,
          q9: 5,
          q10: 4,
        },
      },
    ],
  },
  {
    id: 4,
    academicYear: "2024-2025",
    department: "Electrical",
    class: "Third Year",
    semester: "6",
    title: "Semester 6 Feedback",
    date: "2024-02-12",
    faculties: [
      {
        name: "K. R. Patil",
        subject: "Power Systems",
        totalAvarage: 4.1,
        rating: {
          q1: 5,
          q2: 4,
          q3: 4,
          q4: 4,
          q5: 4,
          q6: 4,
          q7: 3,
          q8: 5,
          q9: 4,
          q10: 4,
        },
      },
      {
        name: "P. S. More",
        subject: "Control Systems",
        totalAvarage: 3.8,
        rating: {
          q1: 4,
          q2: 4,
          q3: 3,
          q4: 3,
          q5: 4,
          q6: 3,
          q7: 4,
          q8: 4,
          q9: 3,
          q10: 4,
        },
      },
    ],
  },
  {
    id: 5,
    academicYear: "2024-2025",
    department: "Civil",
    class: "Second Year",
    semester: "4",
    title: "Semester 4 Feedback",
    date: "2024-02-11",
    faculties: [
      {
        name: "R. B. Naik",
        subject: "Structural Analysis",
        totalAvarage: 4.0,
        rating: {
          q1: 4,
          q2: 4,
          q3: 5,
          q4: 4,
          q5: 4,
          q6: 4,
          q7: 5,
          q8: 4,
          q9: 3,
          q10: 4,
        },
      },
      {
        name: "S. T. Patil",
        subject: "Concrete Technology",
        totalAvarage: 3.7,
        rating: {
          q1: 3,
          q2: 4,
          q3: 3,
          q4: 3,
          q5: 4,
          q6: 3,
          q7: 4,
          q8: 4,
          q9: 3,
          q10: 4,
        },
      },
    ],
  },
];

// Define Context Type
interface FeedbackContextType {
  MOCK_DATA: Feedback[];
  setMOCK_DATA: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

// Create Context
const FeedbackContext = createContext<FeedbackContextType | null>(null);

// Provider Component
export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [MOCK_DATA, setMOCK_DATA] = useState<Feedback[]>(MOCK_DATA_Initial);

  return (
    <FeedbackContext.Provider value={{ MOCK_DATA, setMOCK_DATA }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Hook to use FeedbackContext
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
