import TrendService from "@/services/TrendService.js";

export const namespaced = true;

export const state = {
  trendList: [],
};

export const mutations = {
  SET_TRENDLIST(state, trend) {
    state.trendList = trend;
  },
};

export const actions = {
  fetchTrend({ commit }) {
    return TrendService.getTrend().then((response) => {
      let list = [];
      var i;
      for (i = 0; i < response.data.length; i++) {
        list.push(response.data[i].hashtag);
      }
      commit("SET_TRENDLIST", list);
    });
  },
};

export const getters = {};
