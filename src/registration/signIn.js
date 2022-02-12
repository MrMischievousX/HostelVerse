import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="bg-landing-background bg-cover h-screen grid grid-cols-2 font-roboto">
      <div></div>
      <div className="flex flex-col items-center my-auto text-center">
        <p className="font-bold text-4xl mb-4">HOSTELVERSE 😇</p>
        <p className="text-xl font-medium">Sign In</p>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl my-4"
            placeholder="Email"
          />
          <input
            type="text"
            className="bg-white w-80 px-4 py-2 rounded-xl mb-4"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-2 bg-black text-white font-medium rounded-lg"
          onClick={() => navigate("/student/dashboard")}
        >
          Submit
        </button>
        <p className="mt-2 ">
          Don't have an Account ?
          <p
            className="cursor-pointer underline text-blue-700"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </p>
        </p>
      </div>
    </div>
  );
}
