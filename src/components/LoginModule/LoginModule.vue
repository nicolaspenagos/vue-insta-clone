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
        v-if="singUp && !recoverAccount"
        name="Username"
        v-model="username"
      />

      <input
        placeholder="password"
        class="input passwordInput"
        type="password"
        name="Password"
        v-model="password"
        v-if="!recoverAccount"
      />

      <div v-if="singUp && !recoverAccount" class="userPic">
        <label class="userPic--text"> Load profile picture </label>
        <input
          name="File"
          type="file"
          id="userPic"
          @change="(e) => setImage(e)"
          v-if="singUp"
          class="userPic--text"
        />
      </div>

      <button class="button loginButton" v-on:click="auth" v-if=" !recoverAccount">
        {{ text[0] }}
      </button>
      <button class="button loginButton"  v-if="recoverAccount" @click="()=>{this.authenticationStore.recoverAccount(this.email)}">
          Recover Account
      </button>
      <p v-if="recoverAccount"  class="text text--blue msg" @click="()=>{this.recoverAccount=false}" >Go to login</p>
      <p v-if="!recoverAccount && !singUp"  class="text text--blue msg" @click="()=>{this.recoverAccount=true}">Forgot password?</p>

      <p class="text text--red msg" v-if="wrongCredentials && !recoverAccount">
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
import { useUsersStore } from "../../stores/users";
import { useAuthenticationStore } from "../../stores/authentication";

import { getDatabase, ref, child, get } from "firebase/database";

import router from "@/router";

export default {
  watch: {
    currentUser() {
      console.log("Current user changed");
    },
  },

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
      file: {},
      imageString: "",
      errorMsg: "",
      file: "",
      recoverAccount: false
    };
  },
  mounted() {},
  methods: {
    setImage(evt) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageString = reader.result;
      });
      reader.readAsDataURL(evt.target.files[0]);
      this.file = evt.target.files[0];
    },
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
        let usersToCheck = this.usersStore.getUsers;

        if (usersToCheck.length <= 0) {
          const dbRef = ref(getDatabase());
          get(child(dbRef, `users/`))
            .then((snapshot) => {
              let usersToCheck = [];

              if (snapshot.val() != null) {
                 const data = snapshot.val();
                const dbUsers = Object.keys(data);

                for (let i = 0; i < dbUsers.length; i++) {
                  let key = dbUsers[i];
                  usersToCheck.push(data[key]);
                }
              }

              this.auth2(usersToCheck);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          this.auth2(usersToCheck);
        }

        //this.usersStore.signup(this.email, this.password, this.username, this.imageString);
        //this.validateOperation();
      } else {
        this.authenticationStore.signIn(this.email, this.password);
        //this.validateOperation();
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

    auth2(usersToCheck) {

      let _continue = true;

      usersToCheck.forEach((u) => {
        if (u.username == this.username) {
          this.errorMsg = "Username not available";
          this.wrongCredentials = true;
          _continue = false;
        }
      });


      if (_continue) {
  
        this.authenticationStore
          .newUser(this.email, this.password, this.username)
          .then((error) => {
            if (error === "OK") {
              //this.authenticationStore.addProfileImage();

              this.authenticationStore.addUserImage(this.file).then((user) => {
                if (user) {
                  this.usersStore.setUser(user);
                  this.usersStore.setLoggedUser(user);
                  router.push("/home");
                }
              });
            } else {
              this.errorMsg = error;
              this.wrongCredentials = true;
            }
          });
      }
    },
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapStores(useUsersStore, useAuthenticationStore),
    userIsLogged() {
      console.log(useUsersStore.getCurrentUser);
    },
    text() {
      return this.singUp
        ? ["Sign Up", "Already have an account?", "Log In"]
        : ["Log In", "Don't have an account?", "Sign Up"];
    },
    credentialsMsg() {
      return this.errorMsg;
    },
    currentUser() {
      return this.usersStore.getCurrentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.userPic {
  margin-left: -20px;
  margin-top: 5px;
  &--text {
    font-size: 14px;
  }
}

.input {
  margin-top: 15px;
}
.emailInput {
  margin-top: 0;
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



