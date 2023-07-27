import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function Modal({ setModal }) {
  const [name, setName] = useState();
  return (
    <>
      <div className="fixed h-screen w-screen inset-0 bg-black opacity-30"></div>
      <div className="fixed max-w-lg mx-auto inset-0 flex h-screen w-screen justify-center items-center">
        <div className="bg-white w-full rounded-md p-6 relative">
          <button
            onClick={() => setModal(false)}
            className="cursor-pointer absolute top-2 right-2 hover:bg-gray-200 rounded-md "
          >
            <MdClose size={27} />
          </button>

          <h2 className="text-xl font-semibold text-black">
            Give name to your form
          </h2>
          <p className="mb-6">Do not use space in name</p>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your form name"
              className="border border-gray-300 outline-none w-full rounded-md py-[7px] px-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Link
            to={`/${name}`}
            className="bg-blue-500 cursor-pointer text-white rounded-lg w-full px-4 py-2"
          >
            Create
          </Link>
        </div>
      </div>
    </>
  );
}
