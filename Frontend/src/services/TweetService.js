import axios from "axios";

const apiClient = axios.create({
  //gateway url moet hier nog in, even vervangen door localhost url van de service voor makkelijk testen.
  //https://localhost:44317/tweetservice/tweetlist
  baseURL: "https://localhost:44318",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTweets() {
    return apiClient.get("/api/Tweets");
  },
  getTweetById(id) {
    return apiClient.get("/api/Tweets/" + id);
  },
  postTweet(tweet) {
    return apiClient.post("/api/Tweets", tweet);
  },
  getTweetByUserId(userId) {
    // console.log(userId);
    return apiClient.get("/api/Tweets/TweetsByUserId/" + userId);
  },
  getMentionedTweets(userId) {
    return apiClient.get("/api/Tweets/mentionedTweets/" + userId);
  },
  getTimeline(userId) {
    return apiClient.get("/api/Tweets/tweetsFollowing/" + userId);
  },
  getTweetsFromTrend(hashtag) {
    return apiClient.get(
      "/api/Tweets/getTweetsFromTrend/" + hashtag.substring(1)
    );
  },
};
