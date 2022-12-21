import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: String,
  tests: [String],
});

export default model("categories", categorySchema);
