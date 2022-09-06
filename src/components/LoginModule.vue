<template>
  <section>
    <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
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
<script>
import draggable from "vuedraggable";

export default {
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
    };
  },
  methods: {
    onEnd: function (evt) {
      console.log(evt);
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    },
  },
  props: {
    msg: String,
  },
};
</script>

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



