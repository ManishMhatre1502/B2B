import mongoose, { Schema, type InferSchemaType } from "mongoose";

const KpiSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    type: { type: String, enum: ["currency", "number", "percentage", "text"], required: true },
    isRequired: { type: Boolean, default: false },
  },
  { _id: true },
);

const BusinessSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    websiteUrl: { type: String, trim: true, maxlength: 240 },
    industry: { type: String, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 1000 },
    headIds: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [], index: true },
    kpis: { type: [KpiSchema], default: [] },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export type BusinessRecord = InferSchemaType<typeof BusinessSchema>;
const BusinessModel = (mongoose.models.Business as mongoose.Model<BusinessRecord> | undefined)
  ?? mongoose.model<BusinessRecord>("Business", BusinessSchema);
export default BusinessModel;
