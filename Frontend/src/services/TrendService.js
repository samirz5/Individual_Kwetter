import axios from "axios";

const apiClient = axios.create({
  //gateway url moet hier nog in, even vervangen door localhost url van de service voor makkelijk testen.
  //https://localhost:44317/tweetservice/tweetlist
  baseURL: "https://localhost:44325",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTrend() {
    return apiClient.get("/api/Trend");
  },
};
