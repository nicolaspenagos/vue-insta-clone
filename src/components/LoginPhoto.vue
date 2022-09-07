<template>
  <!--
    <img  data-aos="fade-right" :data-aos-duration="animDuration" class="loginImage shadow" :class="imageName" :src="path"  @error="noImageFound"  v-if="imageURLOk">
    <div  data-aos="fade-right" :data-aos-duration="animDuration" class="loginImage loginImage--div shadow" :class="imageName" v-else></div>
    -->
  <img
    class="loginImage shadow"
    :class="imageName"
    :src="path"
    v-if="imageURLOk"

    @error="noImageFound" 
  />
  <div
    class="loginImage loginImage--div shadow"
    :class="imageName"
    v-else
  ></div>
</template>

<script>
export default {
  props: {
    imageName: String,
  },
  methods: {
    noImageFound() {
      this.imageURLOk = false;
    },
  },
  data() {
    return {
      imageURLOk: true,
    };
  },
  computed: {
    path() {
      return "./" + this.imageName + ".png";
    },
    animDuration() {
      let i = this.imageName.split("g")[1];
      let duration = 500 + parseInt(1) * 200;
      console.log(duration);
      console.log(this.imageName);
      console.log("--");
      return duration;
    },
  },
};
</script>

<style lang="scss" scoped>
.loginImage {
  width: 140px;
  height: 140px;
  margin: 8px;
  &--div {
    background-color: #e1dfdf;
  }
}

.img7 {
  opacity: 50%;
}
</style>