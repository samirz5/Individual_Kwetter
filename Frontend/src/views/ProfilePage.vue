<template>
  <b-container class="containerWidth">
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

          <b-button v-b-modal.modal-1
            ><b-icon icon="pencil-square" aria-hidden="true"> </b-icon> edit
            profile
          </b-button>

          <b-modal id="modal-1" title="BootstrapVue" hide-header>
            <b-input-group class="mt-3">
              <b-container>
                <b-row>
                  <b-form-input
                    placeholder="Change your username"
                    v-model="UserName"
                  ></b-form-input>
                </b-row>
                <b-row>
                  <b-form-input
                    placeholder="Change your location"
                    v-model="Location"
                  ></b-form-input>
                </b-row>
                <b-row>
                  <b-form-input
                    placeholder="Change your website"
                    v-model="Website"
                  ></b-form-input>
                </b-row>
                <b-row>
                  <b-form-input
                    placeholder="Change your bio"
                    v-model="Bio"
                  ></b-form-input>
                </b-row>
              </b-container>
            </b-input-group>
          </b-modal>
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
  data() {
    return {
      Bio: "",
      Website: "",
      Location: "",
      UserName: "",
    };
  },
  computed: {
    ...mapState(["user", "tweet"]),
  },
  created() {
    this.$store.dispatch(
      "tweet/getTweetByUserId",
      localStorage.getItem("userId")
    );
  },
  methods: {},
};
</script>

<style scoped>
.list-group {
  overflow: scroll;
}
.containerWidth {
  max-width: 1500px;
}
</style>
