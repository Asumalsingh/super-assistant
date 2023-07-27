import React, { useState } from "react";
import { BsArrowRightSquare } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";

export default function Categorize({ questionIndex, questions, setQuestions }) {
  const [belongsToOptions, setBelongsToOptions] = useState([
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]);

  // console.log("Items:", questions[questionIndex]?.categorize.items);

  // Function to add a new "categorize" category for a specific question
  const addNewCategory = (questionIndex, categoryName) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        return {
          ...question,
          categorize: {
            ...question.categorize,
            categories: [
              ...question.categorize.categories,
              { value: "", label: "" },
            ],
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to update the categories
  const updateCategory = (questionIndex, categoryIndex, newCategoryName) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedCategories = [...question.categorize.categories];
        updatedCategories[categoryIndex] = {
          value: newCategoryName,
          label: newCategoryName,
        };
        return {
          ...question,
          categorize: {
            ...question.categorize,
            categories: updatedCategories,
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to delete a category of a specific question
  const deleteCategory = (questionIndex, categoryIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedCategories = question.categorize.categories.filter(
          (category, index) => index !== categoryIndex
        );
        return {
          ...question,
          categorize: {
            ...question.categorize,
            categories: updatedCategories,
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to add a new empty object inside the 'items' array of a 'categorize' question
  const addNewItem = (questionIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const newItem = { item: "", belongsTo: "" };
        return {
          ...question,
          categorize: {
            ...question.categorize,
            items: [...question.categorize.items, newItem],
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const updateItem = (questionIndex, itemIndex, updatedItem) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedItems = [...question.categorize.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          item: updatedItem,
        };
        return {
          ...question,
          categorize: {
            ...question.categorize,
            items: updatedItems,
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Function to update 'belongsTo' property inside the 'items' array
  const updateBelongsTo = (questionIndex, itemIndex, updatedBelongsTo) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedItems = [...question.categorize.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          belongsTo: updatedBelongsTo,
        };
        return {
          ...question,
          categorize: {
            ...question.categorize,
            items: updatedItems,
          },
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const deleteItem = (questionIndex, itemIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedItems = question.categorize.items.filter(
          (item, index) => index !== itemIndex
        );
        return {
          ...question,
          categorize: {
            ...question.categorize,
            items: updatedItems,
          },
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
        {questions[questionIndex]?.categorize?.categories?.map(
          (cat, catIndex) => {
            return (
              <div key={catIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={cat.value}
                  placeholder={`Category ${catIndex + 1}`}
                  onChange={(e) =>
                    updateCategory(questionIndex, catIndex, e.target.value)
                  }
                  className="border outline-none rounded-md py-[7px] px-3"
                />
                <button
                  onClick={() => deleteCategory(questionIndex, catIndex)}
                  className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                    questions[questionIndex]?.categorize?.categories.length ===
                      2 && "hidden"
                  }`}
                >
                  <MdClose size={25} />
                </button>
              </div>
            );
          }
        )}

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
        {questions[questionIndex]?.categorize?.items?.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className="flex space-x-6 w-full mb-2">
              <input
                type="text"
                name="item-1"
                id="item-1"
                value={item.item}
                placeholder={`Item ${itemIndex + 1}`}
                onChange={(e) =>
                  updateItem(questionIndex, itemIndex, e.target.value)
                }
                className="border outline-none rounded-md py-[7px] px-3"
              />
              <div className="flex w-full items-center space-x-2">
                <Select
                  placeholder="Choose category"
                  defaultValue={{
                    value: item.belongsTo,
                    label: item.belongsTo,
                  }}
                  options={questions[questionIndex]?.categorize.categories}
                  onChange={(item) =>
                    updateBelongsTo(questionIndex, itemIndex, item.value)
                  }
                />

                <button
                  onClick={() => deleteItem(questionIndex, itemIndex)}
                  className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                    questions[questionIndex]?.categorize?.items?.length <= 1 &&
                    "hidden"
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
          onClick={() => addNewItem(questionIndex)}
          className="px-2 py-1 text-sm border border-blue-600 rounded-md flex items-center"
        >
          <AiOutlinePlus size={15} className="font-medium" />
          &nbsp;Add
        </button>
      </div>
    </div>
  );
}
