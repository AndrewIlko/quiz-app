import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  image: { type: String, require: true },
  bestResult: { type: Number, require: true },
  quizes: [{ name: String, id: String, result: String }],
});

export default model("User", userSchema);
