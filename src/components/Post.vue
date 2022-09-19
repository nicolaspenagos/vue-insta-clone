<template>
  <div class="grid-item">
    <div class="post shadow">
      <img :src="image" class="post__img" />
      <div class="row post__down">
        <div class="post-l">
          <div class="place">{{ this.post.place }}</div>
          <div class="country subtitle">{{ this.post.country }}</div>
        </div>
        <div class="post-r">
          <div class="date subtitle">{{ this.post.date }}</div>
          <div class="row">
            <img :src="heartpath" class="heart" />
            <div class="likes subtitle">{{ this.post.likes }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {},
  },
  methods: {},
  data() {
    return {
      image: "",
       heartpath:"./heart.png"
    };
  },

  computed: {
    image() {
      return this.post.image;
    },
  },
};
</script>

<style lang="scss" scoped>
.heart {
  width: 15px;
  height: 15px;

  margin-right: 3px;
  margin-left: auto;

}
.post {
  width: 200px;
  margin-top: 50px;

  &__img {
    width: 200px;
    height: 200px;
  }
  &__down {
    background-color: white;
    padding: 10px;
    justify-content: space-between;
  }
}
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle {
  font-size: 12px;
  color: gray;
  font-weight: 400;
}

.place {
  font-size: 14px;
}

.country {
  margin-top: -6px;
}
</style>