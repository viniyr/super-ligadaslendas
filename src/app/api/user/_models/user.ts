import mongoose from "mongoose";

export interface User {
  name: string,
  nick: string,
  tagline: string,
  xp: number,
}

export interface User extends mongoose.Document {
  name: string;
  nick: string,
  tagline: string,
  xp: number,
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
  },
  nick: {
    type: String,
  },
  tagline: {
    type: String,
  },
  xp: {
    type: Number,
  },
  
});

export default mongoose.models.User ||
  mongoose.model<User>("User", UserSchema);
