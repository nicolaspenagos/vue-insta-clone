<template>
  <header class="header">
    <img :src="instaPath" class="header__logo" />

    <div class="header__menu">
      <RouterLink to="/" @click="logout" class="text text--blue logout"
        >Log out</RouterLink
      >

      <img :src="hearPath" class="image heart" @click="goToLikes" v-if="showHome"/>
      <img :src="homeImagePath" class="image" @click="goToHome" />
      <img :src="addImagePath" class="image" @click="openModal" v-if="showHome"/>
      <img
        :src="creatorImage"
        class="image image--user"
        @error="imageError = true"
        @click="logout"
      />
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { useUsersStore } from "../../stores/users";
import { useAuthenticationStore } from "../../stores/authentication";
export default {
  watch:{
    currentUser(){
      this.showHome =this.usersStore.getCurrentUser.email==this.usersStore.getLoggedUser.email;
    }
  },
  data() {
    return {
      imageError: false,
      instaPath: "./instagram.png",
      addImagePath: "./add.png",
      homeImagePath: "./home.png",
      userImagePath: "./id_user.png",
      defaultUserImagePath: "./user.png",
      showHome:true,
      hearPath:"./heart.png"
    };
  },
  methods: {
    openModal() {
      this.usersStore.setPost(null);
      this.$emit("open");
    },
    logout() {
      // this.usersStore.logout();
      this.usersStore.saveComment();
      this.usersStore.updateUserChanged();


   
        
      this.authenticationStore.logOut();
              
     
      
    },
    goToHome() {
      this.usersStore.setUser(this.usersStore.getLoggedUser);
      this.$emit("cleanSearch");
      this.usersStore.updateUserChanged();
      this.usersStore.saveComment();
    },
    goToLikes(){
      this.usersStore.updateLoggedUserLikesArray();
      this.usersStore.setShowLikes(true);
      this.$emit("open");

    }
  },

  computed: {
    ...mapStores(useUsersStore, useAuthenticationStore),

    creatorImage() {
      const url = this.usersStore.getLoggedUser.url;
      if (url == "NoImage") return this.defaultUserImagePath;

      return url;
    },currentUser(){
        //return this.usersStore.getCurrentUser.email==this.usersStore.getLoggedUser.email;
        return this.usersStore.getCurrentUser;
    }
    
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.logout {
  font-size: small;
  margin-right: 20px;
}
.header {
  background-color: white;
  width: 100%;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: absolute;
  top: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  &__logo {
    width: 115.76px;
    height: 42px;
    margin-left: 100px;
  }
  &__menu {
    display: flex;
    flex-direction: row;
    margin-right: 100px;
    align-items: center;
    justify-content: center;
  }
}
.heart{
  width: 20px !important;
  height: 20px !important;
  opacity: 0.87;
}

.image {
  width: 18px;
  height: 18px;

  cursor: pointer;
  margin-right: 7px;
  &--user {
    width: 26px;
    height: 26px;
    opacity: 1;
    border-radius: 50%;
  }
}

@media (max-width: 600px) {
  .header {
    width: 100vw;
    &__logo {
      margin-left: 30px;
    }
    &__menu {
      margin-right: 30px;
    }
  }
}
</style>
