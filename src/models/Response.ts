import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    feedback_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: true,
    },
    // store the student's responses; keep it flexible
    responses: { type: mongoose.Schema.Types.Mixed },
    unique_code: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Response ||
  mongoose.model("Response", ResponseSchema);
