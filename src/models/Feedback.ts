import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    academic_year: { type: String, required: true },
    department: { type: String, required: true },
    class: { type: String, required: true },
    semester: { type: String, required: true },
    term: { type: String, required: true },
    feedback_title: { type: String, required: true },
    date: { type: Date, required: true },
    faculty_with_subject: [{ type: String }],
    unique_codes: [{ type: String }],
    weights: { type: mongoose.Schema.Types.Mixed, default: {} },
    rating: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
