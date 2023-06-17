import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import personService from "./services/personService";
import Teacher from "./pages/Teacher";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [persons, setPersons] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(""); // Added role state

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedGuroUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personService.setToken(user.token);
    }
  }, []);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {role === "" ? ( // If role is not selected, render role selection
        <div>
          <h3>Please select your role:</h3>
          <button onClick={() => handleRoleSelection("parent")}>Parent</button>
          <button onClick={() => handleRoleSelection("teacher")}>
            Teacher
          </button>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Teacher
                user={user}
                persons={persons}
                loading={loading}
                setPersons={setPersons}
                setUser={setUser}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                user={user}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setUser={setUser}
              />
            }
          />
          <Route path="/register" element={<RegisterForm user={user} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
