import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:44301",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getUserById(id) {
    return apiClient.get("/api/Users/" + id);
  },
  getUsers() {
    return apiClient.get("/api/Users");
  },
  postUser(userId, userName) {
    return apiClient.post("/api/Users", {
      id: userId,
      userName: userName,
    });
  },
  deleteUser() {
    console.log(localStorage.getItem("userId"));
    return apiClient.delete("/api/Users/" + localStorage.getItem("userId"));
  },
};
