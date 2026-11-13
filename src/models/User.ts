import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    roles: { type: [{ type: String, enum: ["owner", "head"] }], default: ["owner"] },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type UserRecord = InferSchemaType<typeof UserSchema>;
export default mongoose.models.User || mongoose.model("User", UserSchema);
