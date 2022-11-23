<template>
  <div class="grid-item">
    <div class="post shadow" @click="selectPost">
      <img :src="image" class="post__img" />
      <div class="row post__down">
        <div class="post-l">
          <div class="place">{{ this.post.place }}</div>
          <div class="country subtitle">{{ this.post.country }}</div>
        </div>
        <div class="post-r">
          <div class="date subtitle">{{ this.post.date }}</div>
          <div class="row">
           <!-- <img :src="heartpath" class="heart" />-->
            <div class="likes subtitle">{{"Likes:"+ this.likesCount() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUsersStore } from "../../stores/users";
export default {
  props: {
    post: {},
  },
  methods: {
    selectPost() {
      this.usersStore.setPost(this.post);
      this.$emit("open");
    },
    likesCount(){
     
      return this.post.likes?this.post.likes.length:0;
    }
  },
  data() {
    return {
      image: "",
    
      likesLenght:this.post.likes?this.post.likes.length:0
    };
  },

  computed: {
    ...mapStores(useUsersStore),
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
  transition: 0.5s ease;

  &__img {
    width: 200px;
    height: 200px;
  }
  &__down {
    background-color: white;
    padding: 10px;
    justify-content: space-between;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 40px 19px -30px rgba(50, 50, 50, 0.2);
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
@media (max-width: 600px) {
  .post {
    width: 300px;


    &__img {
      width: 300px;
      height: auto;
    }
  }
}
</style>