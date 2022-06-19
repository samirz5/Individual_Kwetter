<template>
  <b-container fluid class="containerWidth">
    <b-row>
      <b-col>
        <b-card style="width: 100%" title="What's happening?">
          <b-card-text
            ><b-input-group class="mt-3">
              <b-form-input
                placeholder="What are we going to tweet about?"
                v-model="tweetInput"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="info" v-on:click="postTweet"
                  >Publish</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card style="width: 100%">
          <b-row>
            <b-col>
              <b-card-text> Your tweets: </b-card-text>
            </b-col>
            <b-col>
              <b-card-text>
                <!-- {{ tweet.userTweetList.length }} -->
              </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card-text> latest tweet: </b-card-text>
            </b-col>
            <b-col>
              <b-card-text>
                <!-- {{
                  tweet.userTweetList[tweet.userTweetList.length - 1]
                    .description
                }} -->
              </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card-text> following </b-card-text>
            </b-col>
            <b-col>
              <b-card-text> followers </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-tabs content-class="mt-3">
          <b-tab title="Timeline" active style="height: 300px" class="timeline">
            <!-- <b-row
              v-for="tweetInTimeline in tweet.timeline"
              :key="tweetInTimeline.id"
            >
              <b-col cols="1"
                ><a>{{ userNameTimeline(tweetInTimeline.userId) }}</a></b-col
              >
              <b-col cols="8">{{ tweetInTimeline.description }}</b-col>
              <b-col cols="3">{{ tweetInTimeline.date_Created }}</b-col>
            </b-row> -->
          </b-tab>
          <b-tab
            title="@Mentions"
            v-on:click="getMentions"
            style="height: 300px"
            class="timeline"
          >
            <b-row
              v-for="mentionedTweet in tweet.mentionedTweetList"
              :key="mentionedTweet.tweet.tweetId"
            >
              <b-col cols="1">{{
                userNameMentionedUser(mentionedTweet.tweet.userId)
              }}</b-col>
              <b-col cols="8">{{ mentionedTweet.tweet.description }}</b-col>
              <b-col cols="3">{{ mentionedTweet.tweet.date_Created }}</b-col>
            </b-row></b-tab
          >
        </b-tabs>
      </b-col>
      <b-col style="margin-top: 30px">
        <b-card style="width: 100%">
          <b-card-text> Trend </b-card-text>
          <b-card-text>
            <b-list-group>
              <!-- <b-button
                v-for="hashtag in trend.trendList"
                :key="hashtag"
                style="margin-bottom: 2px"
                v-on:click="getTweetHashtag(hashtag)"
              >
                {{ hashtag }}
              </b-button> -->

              <b-button
                v-b-modal.modal-1
                v-for="hashtag in trend.trendList"
                :key="hashtag"
                style="margin-bottom: 2px"
                v-on:click="getTweetHashtag(hashtag)"
                >{{ hashtag }}</b-button
              >

              <b-modal id="modal-1" hide-header hide-footer size="lg">
                <b-row
                  class="my-4"
                  v-for="tweet in tweet.tweetOfHashtag"
                  :key="tweet.id"
                >
                  <b-col cols="2"
                    ><b-button>{{
                      userNameMentionedUser(tweet.userId)
                    }}</b-button></b-col
                  >
                  <b-col cols="7">{{ tweet.description }}</b-col>
                  <b-col cols="3">{{ tweet.date_Created }}</b-col>
                </b-row>
              </b-modal>
            </b-list-group>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StartPage",
  props: {},
  data() {
    return {
      tweets: [],
      tweetInput: "",
    };
  },
  computed: {
    ...mapState(["tweet", "user", "trend"]),
  },
  beforeCreate() {
    this.$store.dispatch("tweet/fetchTweets");
    this.$store.dispatch("trend/fetchTrend");
    this.$store.dispatch(
      "tweet/getTweetByUserId",
      localStorage.getItem("userId")
    );
    this.$store.dispatch("tweet/getTimeline", localStorage.getItem("userId"));
  },
  methods: {
    postTweet() {
      this.$store.dispatch("tweet/postTweet", {
        tweet: {
          userId: this.user.user.id,
          description: this.tweetInput,
        },
      });
    },
    userNameMentionedUser(userId) {
      var x = "";
      this.user.userList.forEach((user) => {
        if (user.id == userId) {
          x = user.userName;
        }
      });
      return x;
    },
    userNameTimeline(userId) {
      var x = "";
      this.user.userList.forEach((user) => {
        if (user.id == userId) {
          x = user.userName;
        }
      });
      return x;
    },
    getMentions() {
      this.$store.dispatch("tweet/getMentionedTweetsById", this.user.user.id);
    },
    getTweetHashtag(hashtag) {
      this.$store.dispatch("tweet/getTweetByHashtag", hashtag);
    },
  },
};
</script>

<style scoped>
.timeline {
  overflow: scroll;
}
.containerWidth {
  max-width: 1500px;
}
</style>
