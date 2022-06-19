<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      style="margin-bottom: 50px"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/startpage">Startpage</b-nav-item>
          <b-nav-item href="/myprofile">Profile</b-nav-item>
          <b-nav-item href="#" disabled>Moderator</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.user.userName }}</em>
            </template>
            <b-dropdown-item>
              <b-row style="margin-bottom: 10px">
                <b-button pill @click="logout"> Log Out </b-button>
              </b-row>
              <b-row>
                <b-button pill @click="deleteme"> Forget me </b-button>
              </b-row>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  margin-left: 75%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.$store.dispatch("user/fetchAllUsers");
  },
  methods: {
    logout() {
      this.$keycloak.logout();
    },
    deleteme() {
      this.$store.dispatch("user/deleteUser");
      window.location.href =
        "http://localhost:8081/auth/realms/myrealm/account/#/personal-info";
    },
  },
};
</script>
