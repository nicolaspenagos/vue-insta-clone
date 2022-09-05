<template>
  <section>
    <div class="container container--up shadow">
      <img :src="instaPath" class="logo" />
      <input placeholder="email" class="input emailInput" />
      <input
        placeholder="password"
        class="input passwordInput"
        type="password"
      />
      <button class="button loginButton">Log in</button>
    </div>
    <div class="container container--down shadow">
      <p class="text">Don't have an account?</p>
      <p class="text text--blue">Sign up</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.loginButton {
  margin-top: 15px;
}
.emailInput {
  margin-top: 15px;
}
.passwordInput {
  margin-top: 15px;
}
.logo {
  width: 203.58px;
  height: 73.86px;
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
</style>


<script>
export default {
  data() {
    return {
      instaPath: "./instagram.png",
      singUp: false,
    };
  },
};
</script>
