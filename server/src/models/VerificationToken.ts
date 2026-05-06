// --- Libraries
import mongoose, { type InferSchemaType } from "mongoose";

// --- Schema
const VerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type VerificationTokenType = InferSchemaType<typeof VerificationTokenSchema>;

const VerificationToken = mongoose.model("VerificationToken", VerificationTokenSchema);
export default VerificationToken;
