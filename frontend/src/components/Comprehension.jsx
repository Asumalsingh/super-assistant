import React, { useState } from "react";
import Select from "react-select";
import Mcq from "./comprehension/Mcq";
import Categorize from "./comprehension/Categorize";
import { BiImageAdd } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

export default function Comprehension({
  questionIndex,
  questions,
  setQuestions,
  compDefaultQuestion,
}) {
  const compQuestionTypes = [
    { value: "mcq", label: "MCQ" },
    { value: "catogarize", label: "Catogarize" },
  ];

  // Function to change question type in comprehension for specific question
  const changeQTypeInComprehension = (compQuestionIndex, newQType) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question.comprehension.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              return {
                ...compQuestion,
                qType: newQType,
              };
            }
            return compQuestion;
          }
        );

        return {
          ...question,
          comprehension: updatedComprehension,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to add new Question in comprehension
  const addNewwQuestion = () => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          comprehension: [...question.comprehension, compDefaultQuestion],
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);
  };

  // Function to delete a question in comprehension with a given index
  const deleteQuestionFromComprehension = (compQuestionIndex) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question.comprehension.filter(
          (compQuestion, compIndex) => {
            return compIndex !== compQuestionIndex;
          }
        );

        return {
          ...question,
          comprehension: updatedComprehension,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleCompQuesionText = (compQuestionIndex, value) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              return {
                ...compQuestion,
                question: value,
              };
            }
            return compQuestion;
          }
        );

        return {
          ...question,
          comprehension: updatedComprehension,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="mt-12">
      {questions[questionIndex]?.comprehension?.map((q, index) => {
        return (
          <div key={index} className="flex space-x-2 mb-8">
            <div className="border rounded-md w-full p-6">
              {/*Question Header */}
              <div>
                <div className="flex items-center space-x-1 mb-3">
                  <h2 className="font-semibold text-lg ">
                    Question {questionIndex + 1}.{index + 1}
                  </h2>
                </div>
                <div className="flex justify-between space-x-6 items-center mb-6">
                  <div className="w-2/3">
                    <input
                      type="text"
                      value = {q.question}
                      placeholder="Type question here"
                      onChange={(e) =>
                        handleCompQuesionText(index, e.target.value)
                      }
                      className="border outline-none  w-full rounded-md py-[7px] px-3"
                    />
                  </div>

                  {/* Select Question type  */}
                  <div className="w-1/3">
                    <Select
                      options={compQuestionTypes}
                      defaultValue={q.qType}
                      onChange={(item) =>
                        changeQTypeInComprehension(index, item)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Question ans/optoins */}
              <div className="flex space-x-6">
                <div className="w-2/3">
                  {q?.qType?.value === "mcq" && (
                    <Mcq
                      compQuestionIndex={index}
                      questionIndex={questionIndex}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}
                  {q?.qType?.value === "catogarize" && (
                    <Categorize
                      compQuestionIndex={index}
                      questionIndex={questionIndex}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Crate, delete buttons */}
            <div className="flex flex-col items-center space-y-2 text-gray-700">
              <button
                onClick={addNewwQuestion}
                className="cursor-pointer hover:bg-gray-200 p-[2px] rounded-md "
              >
                <AiFillPlusCircle size={22} />
              </button>

              <button
                onClick={() => deleteQuestionFromComprehension(index)}
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
