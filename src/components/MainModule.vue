<template>
  <main class="content">
    <section class="info row">
      <div class="row">
        <img
          :src="creatorImage"
          class="profilePic"
          @error="imageError = true"
        />
        <div class="info__details">
          <h3 class="username">{{ username }}</h3>
          <h4 class="tag">{{ email }}</h4>
        </div>
      </div>
      <div class="info__account row">
        <div class="row info__account__item">
          <h3 class="subtitle">{{ followers }}</h3>
          <p>followers</p>
        </div>
        <div class="row info__account__item">
          <h3 class="subtitle">{{ following }}</h3>
          <p>following</p>
        </div>
        <div class="row">
          <h3 class="subtitle">{{ posts }}</h3>
          <p>posts</p>
        </div>
      </div>
    </section>
    <div class="sepline"></div>
    <div class="posts__container">
      <section class="posts">
   
      <Post :post="post"  v-for="(post, index) in currentsPostsArray" :key="index" @open="openModal" >

      </Post>
    </section>
    </div>
  </main>
</template>


<script>
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
import Post from "./Post.vue";
export default {
    props: ["update"],
    methods: {
      openModal(){
        this.$emit("open");
      }
    },

    watch: {
        update() {
            console.log('dmsk');
            this.currentPosts = this.usersStore.getCurrentUser.posts.length;
        },
    },
    data() {
        return {
            imageError: false,
            userImagePath: "./id_user.png",
            defaultUserImagePath: "./user.png",
            currentUsername: "",
            currentUserEmail: "",
            currentFollowers: 0,
            currentFollowing: 0,
            currentPosts: 0,
            currentsPostsArray: [1, 2, 3],
        };
    },
    computed: {
        ...mapStores(useUsersStore),
        creatorImage() {
            if (this.usersStore.getCurrentUser != null &&
                this.usersStore.getCurrentUser.userPicture != null) {
                if (this.usersStore.getCurrentUser.userPicture == "")
                    return this.imageError
                        ? this.defaultUserImagePath
                        : this.userImagePath;
                else
                    return this.usersStore.getCurrentUser.userPicture;
            }
            return this.defaultUserImagePath;
        },
        username() {
            return this.currentUsername;
        },
        followers() {
            return this.currentFollowers;
        },
        following() {
            return this.currentFollowing;
        },
        posts() {
            return this.currentPosts;
        },
        email() {
            return this.currentUserEmail;
        },
        allPosts() {
            return this.usersStore.getCurrentUser.posts;
        },
    },
    mounted() {
        let currentUser = this.usersStore.getCurrentUser;
        this.currentUsername = currentUser.username;
        this.currentUserEmail = currentUser.email;
        this.currentFollowers = currentUser.followers;
        this.currentFollowing = currentUser.following;
        this.currentPosts = currentUser.posts.length;
        this.currentsPostsArray = currentUser.posts;
    },
    components: { Post }
};
</script>

<style lang="scss" scoped>
.sepline {
  height: 2px;
  width: 100%;
  background-color: #d9d9d9;
}
.profilePic {
  width: 110px !important;
  height: 110px !important;
  border-radius: 50%;
}

.content {
  margin-top: 66px;
  width: 100%;
  height: 100%;
  position: fixed;
  padding-left: 100px;
  padding-right: 100px;
}
.username {
  font-weight: 500;
}
.tag {
  font-weight: 400;
  margin-top: -5px;
}

.subtitle {
  font-weight: 500;
  margin-right: 5px;
}

.info {
  &__details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: center;
    align-items: left;
    height: 100%;
  }
  &__account__item {
    margin-right: 30px;
  }
  &__account {
    align-items: center;
    margin-top: -25px;
  }

  padding-left: 80px;
  padding-right: 80px;

  padding-top: 25px;
  padding-bottom: 25px;
  justify-content: space-between;
}
.posts{
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin: 25px;
 


}
</style>