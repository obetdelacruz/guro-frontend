import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";

function RegisterForm({ user }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Added role state
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();

    userService
      .register({ name, username, password, role })
      .then((_res) => {
        navigate("/login");
        setName("");
        setUsername("");
        setPassword("");
        setRole("");
      })
      .catch((error) => console.log(error));
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {role === "" ? (
        <div className="text-center">
          <h3 className="text-2xl mb-4">Please select your role:</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded m-2"
            onClick={() => handleRoleSelection("parent")}
          >
            Parent
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded m-2"
            onClick={() => handleRoleSelection("teacher")}
          >
            Teacher
          </button>
        </div>
      ) : (
        <div className="bg-orange-700 rounded-lg p-4">
          <h1 className="text-4xl mb-4 text-center font-bold">
            Register an account
          </h1>
          <form
            onSubmit={handleRegistration}
            className="p-4 flex flex-col gap-2 border-solid border-2 border-slate-500 md:mx-auto md:w-full lg:w-full"
          >
            <div className="flex flex-col">
              Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-solid border-2 border-slate-500 p-2"
              />
            </div>
            <div className="flex flex-col">
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-solid border-2 border-slate-500 p-2"
              />
            </div>
            <div className="flex flex-col">
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-solid border-2 border-slate-500 p-2"
              />
            </div>
            <p>Selected Role: {role}</p> {}
            <button
              type="submit"
              className="bg-slate-500 p-2 mt-2 text-white font-bold"
            >
              Register
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
