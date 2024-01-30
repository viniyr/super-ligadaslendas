import { helpers } from "@/utils/helpers";
import mongoose from "mongoose";

export interface User {
  name: string;
  nick: string;
  password: string;
  tagline: string;
  xp: number;
}

export interface User extends mongoose.Document {
  name: string;
  nick: string;
  phone: string;
  password: string;
  tagline: string;
  xp: number;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
    },
    nick: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      select: false
    },
    tagline: {
      type: String,
    },
    xp: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: "createdAt" },
    versionKey: false,  
  }
);

UserSchema.index({ createdAt: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ email: "text", tenant: "asc" });
UserSchema.index({ usedReferralCode: "text" });

UserSchema.pre("save", async function () {
  this.password = await helpers.encryptPassword(this.password);
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
