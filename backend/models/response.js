import { Schema, model } from "mongoose";

const responseSchema = new Schema({
  questions: { type: "array" },
});

export default model("responses", responseSchema);
