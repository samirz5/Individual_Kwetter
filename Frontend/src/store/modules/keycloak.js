import KeycloakService from "@/services/KeycloakService.js";

export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
  deleteUser() {
    return KeycloakService.deleteUser();
  },
};

export const getters = {};
