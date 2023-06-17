import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonList from "../components/PersonList";
import PersonForm from "../components/PersonForm";
import LoadingSpinner from "../components/LoadingSpinner";

function Teacher({ user, persons, loading, setPersons, setUser, setLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedGuroUser");
    setUser(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl mb-4 text-center font-bold">Guro</h1>

      {user && (
        <>
          <PersonList
            persons={persons}
            setPersons={setPersons}
            setLoading={setLoading}
          />
          <PersonForm
            persons={persons}
            setPersons={setPersons}
            setLoading={setLoading}
          />
        </>
      )}

      <p className="flex justify-between items-center text-sm">
        {user?.name} is logged in{" "}
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 text-white font-bold"
        >
          Logout
        </button>
      </p>
    </div>
  );
}

export default Teacher;
