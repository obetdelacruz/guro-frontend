import axios from "axios";

const baseUrl = "http://localhost:8080/api/persons";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

function getPersons() {
  const config = {
    headers: { Authorization: token },
  };

  return axios.get(baseUrl, config).then((res) => res.data);
}

function createPerson(person) {
  const config = {
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
  };

  return axios.post(baseUrl, person, config).then((res) => res.data);
}

function deletePerson(id) {
  const config = {
    headers: { Authorization: token },
  };

  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.status);
}

export default {
  getPersons,
  createPerson,
  deletePerson,
  setToken,
};
