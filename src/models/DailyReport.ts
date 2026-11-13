import mongoose, { Schema, type InferSchemaType } from "mongoose";

const DailyReportSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    submittedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    metricsData: { type: Map, of: Schema.Types.Mixed, default: {} },
    additionalNotes: { type: String, trim: true, maxlength: 3000, default: "" },
  },
  { timestamps: true },
);

DailyReportSchema.index({ businessId: 1, reportDate: 1 }, { unique: true });

export type DailyReportRecord = InferSchemaType<typeof DailyReportSchema>;
export default mongoose.models.DailyReport || mongoose.model("DailyReport", DailyReportSchema);
