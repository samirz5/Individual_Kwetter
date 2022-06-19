import Vue from "vue";
import Vuex from "vuex";
import * as tweet from "@/store/modules/tweet.js";
import * as user from "@/store/modules/user.js";
import * as trend from "@/store/modules/trend.js";
import * as keycloak from "@/store/modules/keycloak.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tweet,
    user,
    trend,
    keycloak,
  },
});
