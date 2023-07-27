import React from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

export default function Mcq({
  compQuestionIndex,
  questionIndex,
  questions,
  setQuestions,
}) {
  // console.log(
  //   questions[questionIndex]?.comprehension[compQuestionIndex]?.mcq?.options
  // );

  // Function to add new Option
  const addNewOption = () => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question.comprehension.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              return {
                ...compQuestion,
                mcq: {
                  ...compQuestion.mcq,
                  options: [...compQuestion.mcq.options, ""],
                },
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

  // Function to update options
  const updateOption = (optionIndex, optionName) => {
    const updatedQuestions = questions.map((question, queIndex) => {
      if (queIndex === questionIndex) {
        const updatedComprehension = question.comprehension.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              const updatedOptions = [...compQuestion?.mcq?.options];
              updatedOptions[optionIndex] = optionName;
              return {
                ...compQuestion,
                mcq: {
                  ...compQuestion.mcq,
                  options: updatedOptions,
                },
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
  
  // Function to delete option
  const deleteOption = (optIndex) => {
    const updatedQuestions = questions.map((question, queIndex) => {
      if (queIndex === questionIndex) {
        const updatedComprehension = question.comprehension.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              const updatedOptions = compQuestion?.mcq?.options.filter(
                (option, index) => index !== optIndex
              );
              return {
                ...compQuestion,
                mcq: {
                  ...compQuestion.mcq,
                  options: updatedOptions,
                },
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
    <div>
      {/* Options */}

      {questions[questionIndex]?.comprehension[
        compQuestionIndex
      ]?.mcq?.options?.map((option, optIndex) => {
        return (
          <div key={optIndex} className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name={compQuestionIndex}
              id="option-check"
              value = {option}
              // onChange={handleSelectCorrectOption(optIndex)}
              className="w-6 h-6 cursor-pointer"
            />
            <input
              type="text"
              name="option"
              id="option"
              value={option}
              placeholder={`Option ${optIndex + 1}`}
              onChange={(e) => updateOption(optIndex, e.target.value)}
              className="border outline-none rounded-md py-[7px] px-3"
            />
            <button
              onClick={() => deleteOption(optIndex)}
              className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                questions[questionIndex]?.comprehension[compQuestionIndex]?.mcq
                  ?.options?.length === 2 && "hidden"
              }`}
            >
              <MdClose size={25} />
            </button>
          </div>
        );
      })}

      <button
        onClick={addNewOption}
        className="px-2 py-1 text-sm border border-blue-600 rounded-md flex items-center mb-6"
      >
        <AiOutlinePlus size={15} className="font-medium" />
        &nbsp;Add
      </button>
    </div>
  );
}
