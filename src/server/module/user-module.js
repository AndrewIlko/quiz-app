import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  image: { type: String, require: true },
});

export default model("User", userSchema);
