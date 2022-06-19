import axios from "axios";

const apiClient = axios.create({
  //gateway url moet hier nog in, even vervangen door localhost url van de service voor makkelijk testen.
  //https://localhost:44317/tweetservice/tweetlist
  baseURL: "http://localhost:8081/auth",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  deleteUser() {
    return apiClient.delete(
      "/realms/myrealm/account/" + localStorage.getItem("userId")
    );
  },
};
