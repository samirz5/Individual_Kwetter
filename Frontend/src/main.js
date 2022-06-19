import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import Keycloak from "keycloak-js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// let initOptions = {
//   url: "http://localhost:8081/auth/",
//   realm: "myrealm",
//   clientId: "s65-individual",
//   onLoad: "login-required",
// };

// let keycloak = Keycloak(initOptions);
// Vue.prototype.$keycloak = keycloak;

// keycloak
//   .init({ onLoad: initOptions.onLoad })
//   .success((auth) => {
//     console.log("vanaf hier " + localStorage.getItem("userId"));
//     store.dispatch("user/fetchUserById", localStorage.getItem("userId"));

//     if (!auth) {
//       window.location.reload();
//     } else {
//       console.log(auth, "EUTHENTICAION");
//       // Vue.$log.info("Authenticated");
//     }

//     new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount("#app");

//     localStorage.setItem("vue-token", keycloak.token);
//     localStorage.setItem("userId", keycloak.idTokenParsed.sub);
//     localStorage.setItem("userName", keycloak.idTokenParsed.preferred_username);
//     console.log(keycloak, "KEYCLOAK");
//     // console.log(keycloak.loadUserInfo);
//     // console.log(keycloak.endpoints.userinfo);
//     localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

//     setInterval(() => {
//       keycloak
//         .updateToken(70)
//         .success((refreshed) => {
//           if (refreshed) {
//             Vue.$log.debug("Token refreshed" + refreshed);
//           } else {
//             Vue.$log.warn(
//               "Token not refreshed, valid for " +
//                 Math.round(
//                   keycloak.tokenParsed.exp +
//                     keycloak.timeSkew -
//                     new Date().getTime() / 1000
//                 ) +
//                 " seconds"
//             );
//           }
//         })
//         .error(() => {
//           Vue.$log.error("Failed to refresh token");
//         });
//     }, 60000);
//   })
//   .error(() => {
//     Vue.$log.error("Authenticated Failed");
//   });
