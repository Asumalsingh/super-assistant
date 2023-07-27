import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";

export default function Categorize({
  compQuestionIndex,
  questionIndex,
  questions,
  setQuestions,
}) {
  // console.log("Items:", questions[questionIndex]?.categorize.items);

  // Function to add a new "categorize" category for a specific question
  const addNewCategory = (questionIndex, categoryName) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  categories: [
                    ...compQuestion?.categorize?.categories,
                    { value: "", label: "" },
                  ],
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

  // Function to update the categories
  const updateCategory = (categoryIndex, newCategoryName) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              const updatedCategories = [...compQuestion.categorize.categories];
              updatedCategories[categoryIndex] = {
                value: newCategoryName,
                label: newCategoryName,
              };
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  categories: updatedCategories,
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

  // Function to delete a category of a specific question
  const deleteCategory = (categoryIndex) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              const updatedCategories =
                compQuestion?.categorize?.categories?.filter(
                  (category, index) => index !== categoryIndex
                );
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  categories: updatedCategories,
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

  // Function to add a new empty object inside the 'items' array of a 'categorize' question
  const addNewItem = () => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              //
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  items: [
                    ...compQuestion?.categorize?.items,
                    { item: "", belongsTo: "" },
                  ],
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

  const updateItem = (itemIndex, updatedItem) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              const updatedItems = [...compQuestion.categorize.items];
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                item: updatedItem,
              };
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  items: updatedItems,
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

  // Function to update 'belongsTo' property inside the 'items' array
  const updateBelongsTo = (itemIndex, updatedBelongsTo) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              //
              const updatedItems = [...compQuestion.categorize.items];
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                belongsTo: updatedBelongsTo,
              };
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  items: updatedItems,
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

  const deleteItem = (itemIndex) => {
    const updatedQuestions = questions?.map((question, index) => {
      if (index === questionIndex) {
        const updatedComprehension = question?.comprehension?.map(
          (compQuestion, compIndex) => {
            if (compIndex === compQuestionIndex) {
              //
              const updatedItems = compQuestion?.categorize?.items?.filter(
                (category, i) => i !== itemIndex
              );
              return {
                ...compQuestion,
                categorize: {
                  ...compQuestion.categorize,
                  items: updatedItems,
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
    <div className="">
      <div className="flex items-center space-x-1 mb-2">
        <h2 className="font-medium text-md ">Caegories</h2>
      </div>
      {/* Categories */}
      <div className="mb-6">
        {questions[questionIndex]?.comprehension[
          compQuestionIndex
        ]?.categorize?.categories?.map((cat, catIndex) => {
          return (
            <div key={catIndex} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={cat.value}
                placeholder={`Category ${catIndex + 1}`}
                onChange={(e) => updateCategory(catIndex, e.target.value)}
                className="border outline-none rounded-md py-[7px] px-3"
              />
              <button
                onClick={() => deleteCategory(catIndex)}
                className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                  questions[questionIndex]?.comprehension[compQuestionIndex]
                    ?.categorize?.categories?.length === 2 && "hidden"
                }`}
              >
                <MdClose size={25} />
              </button>
            </div>
          );
        })}

        {/* Add buttons */}
        <button
          onClick={() => addNewCategory(questionIndex)}
          className="px-2 py-1 text-sm border border-blue-600 rounded-md flex items-center"
        >
          <AiOutlinePlus size={15} className="font-medium" />
          &nbsp;Add
        </button>
      </div>

      <div className="flex items-center space-x-1 mb-2">
        <h2 className="font-medium text-md ">Items</h2>
      </div>

      {/* Items */}
      <div className="mb-6">
        {questions[questionIndex]?.comprehension[
          compQuestionIndex
        ]?.categorize?.items?.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className="flex space-x-6 w-full mb-2">
              <input
                type="text"
                name="item-1"
                value={item.item}
                placeholder={`Item ${itemIndex + 1}`}
                onChange={(e) => updateItem(itemIndex, e.target.value)}
                className="border outline-none rounded-md py-[7px] px-3"
              />
              <div className="flex w-full items-center space-x-2">
                <Select
                  placeholder="Choose category"
                  defaultValue={{
                    value: item.belongsTo,
                    label: item.belongsTo,
                  }}
                  options={
                    questions[questionIndex]?.comprehension[compQuestionIndex]
                      ?.categorize.categories
                  }
                  onChange={(item) => updateBelongsTo(itemIndex, item.value)}
                />
                <button
                  onClick={() => deleteItem(itemIndex)}
                  className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                    questions[questionIndex]?.comprehension[compQuestionIndex]
                      ?.categorize?.items?.length <= 1 && "hidden"
                  }`}
                >
                  <MdClose size={25} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add buttons */}
        <button
          onClick={addNewItem}
          className="px-2 py-1 text-sm border border-blue-600 rounded-md flex items-center"
        >
          <AiOutlinePlus size={15} className="font-medium" />
          &nbsp;Add
        </button>
      </div>
    </div>
  );
}
