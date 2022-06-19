import TweetService from "@/services/TweetService.js";

export const namespaced = true;

export const state = {
  tweet: {},
  tweetList: [],
  userTweetList: [],
  mentionedTweetList: [],
  timeline: [],
  tweetOfHashtag: [],
};

export const mutations = {
  SET_TWEET(state, tweet) {
    state.tweet = tweet;
  },
  SET_TWEETS(state, tweets) {
    state.tweetList = tweets;
  },
  UPDATE_USER_TWEET_LIST(state, tweet) {
    state.userTweetList.push(tweet);
  },
  SET_USER_TWEET_LIST(state, tweetList) {
    state.userTweetList = tweetList;
  },
  SET_MENTIONED_TWEETS(state, tweetList) {
    state.mentionedTweetList = tweetList;
  },
  SET_TIMELINE(state, timeline) {
    state.timeline = timeline;
  },
  SET_TWEET_HASHTAG(state, tweetList) {
    state.tweetOfHashtag = tweetList;
  },
};

export const actions = {
  fetchTweets({ commit }) {
    return TweetService.getTweets().then((response) => {
      commit("SET_TWEETS", response.data);
    });
  },
  fetchTweet({ commit }, id) {
    return TweetService.getTweetById(id).then((response) => {
      commit("SET_TWEET", response.data);
    });
  },
  postTweet({ commit }, { tweet }) {
    return TweetService.postTweet(tweet).then((response) => {
      console.log(response);
      commit("UPDATE_USER_TWEET_LIST", tweet);
    });
  },
  getTweetByUserId({ commit }, userId) {
    return TweetService.getTweetByUserId(userId).then((response) => {
      commit("SET_USER_TWEET_LIST", response.data);
    });
  },
  getMentionedTweetsById({ commit }, userId) {
    return TweetService.getMentionedTweets(userId).then((response) => {
      commit("SET_MENTIONED_TWEETS", response.data);
    });
  },
  getTimeline({ commit }, userId) {
    return TweetService.getTimeline(userId).then((response) => {
      commit("SET_TIMELINE", response.data);
    });
  },
  getTweetByHashtag({ commit }, hashtag) {
    return TweetService.getTweetsFromTrend(hashtag).then((response) => {
      console.log("HIERO");
      console.log(response.data);
      commit("SET_TWEET_HASHTAG", response.data);
    });
  },
};

export const getters = {};
