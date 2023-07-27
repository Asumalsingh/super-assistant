import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FromPreview() {
  const params = useParams();
  const [formData, setFormData] = useState();
  const [formInput, setFormInput] = useState();

  const ans = {
    mcq: "",
    categorize: [],
    comprehension: {
      mcq: "",
    },
  };
  //   console.log(formData);
  useEffect(() => {
    const host = process.env.REACT_APP_API_URL;

    axios
      .get(`${host}/form/getForm/${params.formId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const length = formData?.questions?.length ?? 0;
    console.log(length);
    if (length > 0) {
      const newFormInputs = [];
      for (let i = 0; i < length; i++) {
        newFormInputs.push({
          mcq: "",
          categorize: [],
          comprehension: [{ mcq: "", categorize: [] }],
        });
      }

      setFormInput(newFormInputs);
    }
  }, [formData]);

  console.log("FormInput", formInput);
  // console.log(formData.questions);

  return (
    <div className="max-w-screen-lg mx-auto px-5 py-20">
      <p className="text-gray-700 mb-6">
        <span className="font-semibold">_id:</span> {params.formId}
      </p>

      {formData?.questions?.map((question, index) => {
        return (
          <div key={question._id} className="border rounded-md px-4 py-2 mb-6">
            <div className="flex space-x-2 items-center mb-4">
              <h2 className="font-semibold text-lg ">Q.{index + 1}</h2>
              <p>{question.question}</p>
            </div>

            {/* For mcq */}
            {question.qType.value === "mcq" && (
              <div>
                {question?.mcq?.options.map((option) => (
                  <div key={option._id}>
                    <label>
                      <input
                        type="radio"
                        name={question._id}
                        value={option}
                        className="w-3 h-3 cursor-pointer mr-1"
                        //   checked={selectedOption === option}
                        //   onChange={handleOptionChange}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {/* For catogarize */}
            {question.qType.value === "catogarize" && (
              <div className="">
                {question?.categorize?.items?.map((item, i) => {
                  return (
                    <div key={item._id} className="flex space-x-2 mb-2">
                      <p>{item.item}</p>
                      <div className="border rounded p-1 flex space-x-3 text-sm">
                        {question?.categorize?.categories?.map((category) => {
                          return (
                            <div className="">
                              <label>
                                <input
                                  type="radio"
                                  name={item._id}
                                  value={category.value}
                                  className="w-3 h-3 cursor-pointer mr-1"
                                  //   checked={selectedOption === option}
                                  //   onChange={handleOptionChange}
                                />
                                {category.value}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* For comprehension */}
            {question.qType.value === "comprehension" && (
              <div className="">
                {question?.comprehension?.map((comp, i) => {
                  return (
                    <div key={comp._id} className="rounded border p-4 mb-4">
                      <div className="flex space-x-2 items-center mb-4">
                        <h2 className="">
                          Q.{index + 1}.{i + 1}
                        </h2>
                        <p>{comp.question}</p>
                      </div>
                      {/*  */}
                      {comp?.qType?.value === "mcq" && (
                        <div className="">
                          {comp?.mcq?.options.map((option, i) => (
                            <div key={i}>
                              <label>
                                <input
                                  type="radio"
                                  name={comp._id}
                                  value={option}
                                  className="w-3 h-3 cursor-pointer mr-1"
                                  //   checked={selectedOption === option}
                                  //   onChange={handleOptionChange}
                                />
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                      {comp?.qType?.value === "catogarize" && (
                        <div className="">
                          {comp?.categorize?.items?.map((item, i) => {
                            return (
                              <div
                                key={item._id}
                                className="flex space-x-2 mb-2"
                              >
                                <p>{item.item}</p>
                                <div className="border rounded p-1 flex space-x-3 text-sm">
                                  {comp?.categorize?.categories?.map(
                                    (category) => {
                                      return (
                                        <div className="">
                                          <label>
                                            <input
                                              type="radio"
                                              name={item._id}
                                              value={category.value}
                                              className="w-3 h-3 cursor-pointer mr-1"
                                              //   checked={selectedOption === option}
                                              //   onChange={handleOptionChange}
                                            />
                                            {category.value}
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center my-6">
        <button
          onClick={() => {
            alert("Form submited!");
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
