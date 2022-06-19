import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import ProfilePage from "../views/ProfilePage.vue";
import Login from "../views/Login.vue";
import StartPage from "../views/StartPage.vue";
import ProfilePageOtherUser from "../views/ProfilePageOtherUser.vue";
import store from "../store";
import HelloWorld from "../components/HelloWorld.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/myprofile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/userprofile/:userId",
    name: "ProfilePageOtherUser",
    component: ProfilePageOtherUser,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("", routeTo.params.userId)
        .then(() => {
          next();
        })
        .catch((error) => {
          alert(error.response.statusText);
        });
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/startpage",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/hello",
    name: "StartPage",
    component: HelloWorld,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
