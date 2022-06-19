<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <b-card-text style="margin-top: 55px">
            Name: {{ user.user.userName }}
          </b-card-text>
          <b-card-text> Location: {{ user.user.location }}</b-card-text>
          <b-card-text> Web: {{ user.user.website }}</b-card-text>
          <b-card-text> Bio: {{ user.user.bio }} </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mb-3;">
          <b-card-text> Tweets </b-card-text>
          <b-list-group style="max-height: 300px">
            <b-list-group-item
              v-for="x in tweet.userTweetList"
              :key="x.id"
              class="rounded-0"
            >
              <b-row>
                <b-col>{{ x.description }}</b-col>
                <b-col>{{ x.date_Created }}</b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
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
                {{ tweet.userTweetList.length }}
              </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card-text> Followers: </b-card-text>
            </b-col>
            <b-col>
              <b-card-text> amount followers </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card-text> Following: </b-card-text>
            </b-col>
            <b-col>
              <b-card-text> amount following </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row style="margin-top: 40px">
      <b-col>
        <b-card class="mb-3">
          <b-card-text> Following </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["user", "tweet"]),
  },
  created() {
    this.$store.dispatch(
      "tweet/getTweetByUserId",
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    );
  },
  methods: {},
};
</script>

<style scoped>
.list-group {
  overflow: scroll;
}
</style>
