import React, { useState, useEffect } from "react";
import Comprehension from "./Comprehension";
import Categorize from "./Categorize";
import Mcq from "./Mcq";
import { BiImageAdd } from "react-icons/bi";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CreateForm() {
  const params = useParams();

  const questionTypes = [
    { value: "mcq", label: "MCQ" },
    { value: "catogarize", label: "Catogarize" },
    { value: "comprehension", label: "Comprehension" },
  ];

  const compDefaultQuestion = {
    qType: questionTypes[0],
    question: null,
    image: null,
    mcq: { correctAns: "", options: ["", ""] },
    categorize: {
      categories: [
        { value: "", label: "" },
        { value: "", label: "" },
      ],
      items: [{ item: "", belongsTo: "" }],
    },
  };

  const defaultQuestion = {
    qType: questionTypes[0],
    question: null,
    image: null,
    mcq: { correctAns: "", options: ["", ""] },
    categorize: {
      categories: [
        { value: "", label: "" },
        { value: "", label: "" },
      ],
      items: [{ item: "", belongsTo: "" }],
    },
    comprehension: [compDefaultQuestion],
  };

  const [questions, setQuestions] = useState([defaultQuestion]);

  useEffect(() => {
    if (params.formId.length == 24) {
      const host = process.env.REACT_APP_API_URL;
      axios
        .get(`${host}/form/getForm/${params.formId}`)
        .then((response) => {
          setQuestions(response.data.questions);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // Function to change the question type for a specific question
  const handleQuestionTypeChange = (index, selectedType) => {
    console.log("inside change funstion");
    const updatedQuestions = questions.map((question, i) => {
      if (i === index) {
        return { ...question, qType: selectedType };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to delete a question with a given index
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((question, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === index) {
        return { ...question, question: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to handle image input
  const onImageChange = (questionIndex, e) => {
    const file = e.target.files[0];
    const reader = new FileReader(null);

    // transfort image
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // setImage(reader.result);
        const updatedQuestions = questions.map((question, i) => {
          if (i === questionIndex) {
            return { ...question, image: reader.result };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      };
    }
  };

  // funstion to send response to backend
  const handleSave = () => {
    const host = process.env.REACT_APP_API_URL;

    axios
      .post(`${host}/form/createForm`, { questions })
      .then((response) => {
        // console.log(response.data);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateFrom = () => {
    const host = process.env.REACT_APP_API_URL;

    axios
      .put(`${host}/form/updateFrom/${params.formId}`, { questions })
      .then((response) => {
        console.log(response.data);
        alert("Form updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("questions", questions);

  return (
    <div className="max-w-screen-lg mx-auto px-5 py-20">
      <div className="flex justify-between items-end">
        <h2 className=" text-xs text-gray-700"></h2>
        <div>
          {params.formId.length == 24 ? (
            <button
              onClick={handleUpdateFrom}
              className="bg-blue-600 px-4 py-1 rounded-md text-white"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-blue-600 px-4 py-1 rounded-md text-white"
            >
              Save
            </button>
          )}
        </div>
      </div>
      <hr className="mt-2 mb-6 border" />

      {questions?.map((q, index) => {
        return (
          <div key={index} className="flex space-x-2 mb-8">
            <div className="border rounded-md w-full p-6">
              {/*Question Header */}
              <div>
                <div className="flex items-center space-x-1 mb-3">
                  <h2 className="font-semibold text-lg ">
                    Question {index + 1}
                  </h2>
                </div>
                <div className="flex justify-between space-x-4 items-center mb-6">
                  <div className="w-2/3">
                    <input
                      type="text"
                      name="ques"
                      id="ques"
                      value={q?.question}
                      placeholder="Type question here"
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="border outline-none  w-full rounded-md py-[7px] px-3"
                    />
                  </div>

                  <div>
                    <label htmlFor="img" className="cursor-pointer flex">
                      <BiImageAdd
                        size={36}
                        className="text-gray-500 cursor-pointer hover:bg-gray-100 duration-150 rounded-md pl-[4px] pr-[3px]"
                      />
                    </label>
                    <input
                      hidden
                      type="file"
                      id="img"
                      accept="image/*"
                      onChange={(e) => onImageChange(index, e)}
                    />
                  </div>

                  {/* Select Question type  */}
                  <div className="w-1/3">
                    <Select
                      options={questionTypes}
                      defaultValue={q.qType}
                      onChange={(item) => handleQuestionTypeChange(index, item)}
                    />
                  </div>
                </div>
              </div>

              {/* Question ans/optoins */}
              <div className="flex space-x-6">
                <div className="w-2/3">
                  {q?.qType?.value === "mcq" && (
                    <Mcq
                      questionIndex={index}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}
                  {q?.qType?.value === "catogarize" && (
                    <Categorize
                      questionIndex={index}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}
                </div>
                {questions[index]?.image && (
                  <div className="w-1/3">
                    <img
                      className="max-h-72 mx-auto"
                      src={questions[index]?.image}
                      alt="image-preview"
                    />
                  </div>
                )}
              </div>

              {q?.qType?.value === "comprehension" && (
                <Comprehension
                  questionIndex={index}
                  questions={questions}
                  setQuestions={setQuestions}
                  compDefaultQuestion={compDefaultQuestion}
                />
              )}
            </div>
            {/* Crate, copy, delete buttons */}
            <div className="flex flex-col items-center space-y-2 text-gray-700">
              <button
                onClick={() => setQuestions([...questions, defaultQuestion])}
                className="cursor-pointer hover:bg-gray-200 p-[2px] rounded-md "
              >
                <AiFillPlusCircle size={22} />
              </button>

              <button
                onClick={() => deleteQuestion(index)}
                className="cursor-pointer hover:bg-gray-200 p-[2px] rounded-md "
              >
                <MdDeleteForever size={24} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
