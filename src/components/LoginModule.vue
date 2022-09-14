<template>
  <section class="loginModule">
    <div class="container container--up shadow">
      <img :src="instaPath" class="logo" />
      <input
        placeholder="email"
        class="input emailInput"
        name="Email"
        v-model="email"
        ref="loginForm"
      />

      <input
        placeholder="username"
        class="input usernameInput"
        v-if="singUp"
        name="Username"
        v-model="username"
      />
      <input
        placeholder="password"
        class="input passwordInput"
        type="password"
        name="Password"
        v-model="password"
      />
      <button class="button loginButton" v-on:click="auth">
        {{ text[0] }}
      </button>
      <p class="text text--red msg" v-if="wrongCredentials">
        {{ credentialsMsg }}
      </p>
    </div>
    <div class="container container--down shadow">
      <p class="text">{{ text[1] }}</p>
      <p class="text text--blue" v-on:click="changeModule">{{ text[2] }}</p>
    </div>
  </section>
</template>
<script>
import draggable from "vuedraggable";
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
import router from "@/router";

export default {
  setup() {
    //const route = useRoute()
  },
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,

      myArray: [
        { name: "Angular", id: 0 },
        { name: "React", id: 1 },
        { name: "Vue", id: 2 },
        { name: "a", id: 4 },
        { name: "b", id: 5 },
        { name: "v", id: 6 },
      ],
      oldIndex: "",
      newIndex: "",
      instaPath: "./instagram.png",
      singUp: false,
      wrongCredentials: false,
      email: "",
      name: "",
      username: "",
      userAlreadyExits: false,
    };
  },
  mounted() {
    this.usersStore.loadUsers();
    console.log(this.usersStore.getUsers);
  },
  methods: {
    onEnd: function (evt) {
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    },
    changeModule() {
      this.singUp = !this.singUp;
      this.wrongCredentials = false;
    },
    auth() {
      if (this.singUp) {
        this.usersStore.signup(this.email, this.password, this.username);
        this.validateOperation();
      } else {
        this.usersStore.login(this.email, this.password);
        this.validateOperation();
      }
    },
    validateOperation() {
  
      if (
        this.usersStore.getCurrentUser &&
        typeof this.usersStore.getCurrentUser.email != "undefined"
      ) {
        this.wrongCredentials = false;
        router.push("/home");
      } else {
        this.wrongCredentials = true;
        if (this.singUp) {
          this.userAlreadyExits = true;
        }
        this.email = "";
        this.password = "";
        this.username = "";
      }
    },
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapStores(useUsersStore),

    text() {
      return this.singUp
        ? ["Sign Up", "Already have an account?", "Log In"]
        : ["Log In", "Don't have an account?", "Sign Up"];
    },
    credentialsMsg() {
      return this.userAlreadyExits
        ? "User already exits"
        : "Wrong username, email or password";
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  margin-top: 15px;
}
.button {
  margin-top: 15px;
}
.logo {
  width: 203.58px;
  height: 73.86px;
  //margin-top: -20px;
}
.container {
  justify-content: center;
  align-items: center;

  &--up {
    height: 380px;
    width: 452px;
    display: flex;
    flex-direction: column;
  }
  &--down {
    margin-top: 16px;
    height: 58px;
  }
}

p {
  padding-left: 3px;
  padding-right: 3px;
}

.msg {
  margin-top: 15px;
}

@media (max-width: 600px) {
  .container {
    widows: 100%;
    margin: 0;
    margin-bottom: 8px;
    &--up {
      width: 100%;
    }
  }

  .input {
    width: 80%;
  }

  .button {
    width: 80%;
  }
  .loginModule {
    width: 100%;
  }
}
</style>



