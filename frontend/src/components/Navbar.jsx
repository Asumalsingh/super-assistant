import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="w-full backdrop-blur-md shadow-sm fixed top-0 z-40">
        <div className="max-w-screen-lg mx-auto px-5">
          {/* For laptop view */}
          <div className="flex h-16 justify-between items-center">
            {/* Left side navbar */}
            <h1 className="text-2xl font-bold  cursor-pointer z-50">
              <Link to="/" className="">
                <span className="text-blue-600">My </span>Forms
              </Link>
            </h1>
            {/* Right side navbar
            <Link 
              to="/login"
              className="bg-blue-600 text-white text-sm rounded-full  px-4 py-[4px]"
            >
              LOGIN
            </Link> */}
          </div>
        </div>
      </nav>
    </>
  );
}
