import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  token: { type: String },
});

export default model("User", userSchema);
