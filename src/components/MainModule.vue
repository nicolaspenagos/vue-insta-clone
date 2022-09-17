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
          <h3 class="username">{{username}}</h3>
          <h4 class="tag">{{email}}</h4>
        </div>
      </div>
      <div class="info__account row">
        <div class="row info__account__item">
          <h3 class="subtitle">12</h3>
          <p>followers</p>
        </div>
        <div class="row info__account__item">
          <h3 class="subtitle">9</h3>
          <p>following</p>
        </div>
        <div class="row">
          <h3 class="subtitle">9</h3>
          <p>posts</p>
        </div>
      </div>
    </section>
    <div class="sepline"></div>
  </main>
</template>


<script>
  import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
export default {
  data() {
    return {
      imageError: false,
      userImagePath: "./id_user.png",
      defaultUserImagePath: "./user.png",
      currentUsername:"",
      currentUserEmail:""
    };
  },
  computed: {
    ...mapStores(useUsersStore),
    creatorImage() {
      return this.imageError ? this.defaultUserImagePath : this.userImagePath;
    },
    username(){
      return this.currentUsername;
    },
    email(){
      return this.currentUserEmail;
    }
  },  mounted() {
    
    let currentUser = this.usersStore.getCurrentUser;
    this.currentUsername =  currentUser.username;
    this.currentUserEmail = currentUser.email;

  }

};
</script>

<style lang="scss" scoped>
.sepline {
  height: 2px;
  width: 100%;
  background-color: #d9d9d9;
}
.profilePic {
  width: 110px;
  width: 110px;
  opacity: 0.85;
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

  padding-top: 35px;
  padding-bottom: 35px;
  justify-content: space-between;
}
</style>