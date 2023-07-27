import express from "express";
const router = express.Router();
import formModel from "../models/form.js";

//add form
router.post("/createForm", async (req, res) => {
  const { questions } = req.body;
  console.log(questions);
  try {
    const form = new formModel({ questions: questions });
    await form.save();

    res.send(form);
  } catch (error) {
    console.error("Internal Server Error");
    res.send(error);
  }
});

// Update form
router.put("/updateFrom/:id", async (req, res) => {
  try {
    const form = await formModel.findByIdAndUpdate(
      req.params.id,
      {
        questions: req.body.questions,
      },
      { new: true }
    );

    res.send(form);
  } catch (error) {
    res.send(error);
  }
});

// get all form
router.get("/getForms", async (req, res) => {
  try {
    const form = await formModel.find();
    res.send(form);
  } catch (error) {
    res.send(error);
  }
});

// get form with id
router.get("/getForm/:id", async (req, res) => {
  try {
    const form = await formModel.findById(req.params.id);
    res.send(form);
  } catch (error) {
    res.send(error);
  }
});

export default router;
