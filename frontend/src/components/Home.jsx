import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  const [forms, setForms] = useState();

  useEffect(() => {
    const host = process.env.REACT_APP_API_URL;

    axios
      .get(`${host}/form/getForms`)
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      {/* Create forms button */}
      <div className="w-44">
        <Link
          to={`/${uuidv4()}`}
          className="bg-blue-600 text-white mb-8 px-5 py-2 rounded-full hover:bg-blue-500 duration-200 font-medium flex items-center"
        >
          <AiOutlinePlus size={30} className="font-medium" />
          &nbsp;Create Form
        </Link>
      </div>

      {forms?.map((form) => {
        return (
          <div className="border py-3 px-4 rounded-md mb-4 flex justify-between items-center shadow-sm">
            <p className="text-gray-700">
              <span className="font-semibold">_id:</span> {form._id}
            </p>

            <div className="flex space-x-3">
              <Link
                to={`/preview/${form._id}`}
                className="border text-sm text-blue-600 border-blue-600 px-4 py-1 rounded-md"
              >
                Preview
              </Link>
              <Link to={`/${form._id}`} className="border text-sm px-4 py-1 rounded-md">
                Edit
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
