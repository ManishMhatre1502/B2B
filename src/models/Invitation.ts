import mongoose, { Schema, type InferSchemaType } from "mongoose";

const InvitationSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invitedEmail: { type: String, required: true, lowercase: true, trim: true },
    token: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ["pending", "accepted", "expired", "revoked"], default: "pending" },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type InvitationRecord = InferSchemaType<typeof InvitationSchema>;
export default mongoose.models.Invitation || mongoose.model("Invitation", InvitationSchema);
