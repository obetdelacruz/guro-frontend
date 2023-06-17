import axios from "axios";

const baseUrl = "http://localhost:8080/api/users";

function register(credentials) {
  return axios.post(baseUrl, credentials).then((res) => res.data);
}

export default {
  register,
};
