// components/FeedbackPDF.tsx
"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  section: { marginBottom: 10 },
  facultyContainer: { marginBottom: 10, borderBottom: "1px solid #000" },
  facultyTitle: { fontSize: 14, fontWeight: "bold" },
  question: { marginBottom: 2 },
});

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
  id: number;
  name: string;
  totalAvarage: number;
  subject: string;
  rating: Rating;
}
interface Questions {
  id: number;
  question: string;
}

interface Feedback {
  id: number;
  academicYear: string;
  department: string;
  class: string;
  semester: string;
  term: string;
  title: string;
  date: string;
  faculties: Faculties[];
  questions: Questions[];
  ratingOptions: number[];
}

interface FeedbackProps {
  selectedFeedback: Feedback;
}

const FeedbackPDF: React.FC<FeedbackProps> = ({ selectedFeedback }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>{selectedFeedback.title}</Text>
        <Text>Academic Year: {selectedFeedback.academicYear}</Text>
        <Text>Department: {selectedFeedback.department}</Text>
        <Text>Class: {selectedFeedback.class}</Text>
        <Text>Semester: {selectedFeedback.semester}</Text>
        <Text>Term: {selectedFeedback.term}</Text>
        <Text>Date: {selectedFeedback.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Faculties Feedback</Text>
        {selectedFeedback.faculties.map((faculty) => (
          <View key={faculty.name} style={styles.facultyContainer}>
            <Text style={styles.facultyTitle}>
              {faculty.id} ({faculty.subject})
            </Text>
            <Text>Total Average: {faculty.totalAvarage}</Text>
            {Object.entries(faculty.rating).map(([key, value]) => (
              <Text key={key}>
                {
                  selectedFeedback.questions[parseInt(key.replace("q", "")) - 1]
                    ?.question
                }
                : {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default FeedbackPDF;
