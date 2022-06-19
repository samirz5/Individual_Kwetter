import UserService from "@/services/UserService.js";

export const namespaced = true;

export const state = {
  user: {},
  userId: "",
  userList: [],
};

export const mutations = {
  SET_USERS(state, users) {
    state.userList = users;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

export const actions = {
  fetchUserById({ commit }, id) {
    return UserService.getUserById(id)
      .then((response) => {
        console.log(response, id);
        commit("SET_USER", response.data);
      })
      .catch((error) => {
        console.log(error.response, "hier zijn we nu");
        if (error.response.status == "404") {
          UserService.postUser(
            localStorage.getItem("userId"),
            localStorage.getItem("userName")
          ).then((response) => {
            commit("SET_USER", response.data);
            console.log(response.data, "wat krijgen we terug?");
          });
        }
      });
  },
  fetchAllUsers({ commit }) {
    return UserService.getUsers().then((response) => {
      commit("SET_USERS", response.data);
    });
  },
  deleteUser() {
    return UserService.deleteUser();
  },
};

export const getters = {};
