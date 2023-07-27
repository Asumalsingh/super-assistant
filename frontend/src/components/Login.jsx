import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [warning, setWarning] = useState(false);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  console.log(userInput);

  return (
    <div className="w-screen h-screen flex items-center px-0">
      <div className="bg-white px-5 py-7 shadow-md border rounded-lg mx-auto w-96">
        <div className="flex justify-center mb-5">
          <h1 className="font-bold text-2xl">LOGIN</h1>
        </div>

        <form action="" onSubmit={handleSignUp}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="w-full my-2  p-3 rounded-md border outline-none border-gray-200 bg-gray-50 focus:border-gray-300 focus:ring-0 "
            onChange={onChangeInput}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            className="w-full my-2  p-3 rounded-md border outline-none border-gray-200 bg-gray-50 focus:border-gray-300 focus:ring-0 "
            onChange={onChangeInput}
          />

          {/* <p className={` ${warning ? "" : "hidden"} text-sm text-red-500`}>
            Password doesn&apos;t match
          </p> */}

          <input
            type="submit"
            value="Login"
            className="bg-blue-500 cursor-pointer text-white rounded-lg w-full px-4 py-3 my-4"
          />
        </form>

        <div className="flex justify-end">
          <p>
            Not have an account,{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
