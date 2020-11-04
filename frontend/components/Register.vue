<template>
  <v-card elevation="2" class="pa-2 mb-2">
    <v-text-field
      label="User Name"
      v-model="username"
      :rules="rules"
      :autofocus="true"
    ></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      :rules="rules"
      v-model="password"
    ></v-text-field>
    <v-btn color="primary" @click="login()">Login</v-btn>
  </v-card>
</template>

<script>
import NavRouter from "./NavRouter.vue";
import auth from "../api/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginFailed: false
    };
  },
  computed: {
    rules() {
      const errors = [];
      if (this.isLoginFailed) {
        errors.push("Login username or password incorrect!");
      }
      return errors;
    }
  },
  methods: {
    login: async function() {
      try {
        const res = await auth.login(this.username, this.password);
        this.isLoginFailed = false;
        console.log(res, "loging");
      } catch (err) {
        this.isLoginFailed = true;
        console.log(err, "login failed");
      }
    }
  }
};
</script>
