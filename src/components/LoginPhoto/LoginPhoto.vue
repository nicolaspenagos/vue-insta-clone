<template>
  <img class="loginImage shadow" :class="imageName" :src="path" />
</template>

<script>
export default {
  props: {
    imageName: String,
  },
  methods: {},
  data() {
    return {
      imageURLOk: true,
    };
  },

  computed: {
    path() {
      return "./" + this.imageName + ".png";
    },
  }
};
</script>

<style lang="scss" scoped>
.loginImage {
  width: 140px;
  height: 140px;
  margin: 8px;
  cursor: move;
  &--div {
    background-color: #e1dfdf;
  }
}

.img7 {
  opacity: 50%;
}
</style>