import { useEffect } from "react";
import personService from "../services/personService";
import { FaTrashAlt } from "react-icons/fa";

function PersonList({ persons, setPersons, setLoading }) {
  useEffect(() => {
    personService
      .getPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletePerson = (id) => {
    setLoading(true);
    personService
      .deletePerson(id)
      .then((_response) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <ul className="border-solid border-2 border-slate-500 p-4">
      {persons.map((person) => (
        <li key={person.id} className="flex items-center justify-between">
          <span className="w-10">
            <img src={person.photoInfo.url} alt="Contact photo" />
          </span>
          {person.name} ({person.number})
          <FaTrashAlt
            className="hover: cursor-pointer"
            onClick={() => deletePerson(person.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default PersonList;
