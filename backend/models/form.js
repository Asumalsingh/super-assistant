import { Schema, model } from "mongoose";

const formSchema = new Schema({
  questions: [
    {
      qType: { value: String, label: String },
      question: String,
      image: String,
      mcq: { correctAns: String, options: [String] },
      categorize: {
        categories: [{ value: String, label: String }],
        items: [{ item: String, belongsTo: String }],
      },
      comprehension: [
        {
          qType: { value: String, label: String },
          question: String,
          image: String,
          mcq: { correctAns: String, options: [String] },
          categorize: {
            categories: [{ value: String, label: String }],
            items: [{ item: String, belongsTo: String }],
          },
        },
      ],
    },
  ],
});

const formModel = model("forms", formSchema);
export default formModel;
