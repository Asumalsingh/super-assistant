import express, { json } from "express";
const app = express();
import cors from "cors";
import connectDb from "./db.js";

import formRoute from "./routes/form.js";

app.use(json({ limit: "10mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey! We are live");
});

app.use("/form", formRoute);

connectDb().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000. . .");
  });
});
