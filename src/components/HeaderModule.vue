<template>
  <header class="header">
    <img :src="instaPath" class="header__logo" />
    <div class="header__menu">
      <RouterLink to="/" @click="logout" class="text text--blue logout"
        >Log out</RouterLink
      >

      <img :src="homeImagePath" class="image" />
      <img :src="addImagePath" class="image" @click="openModal" />
      <img
        :src="creatorImage"
        class="image image--user"
        @error="imageError = true"
      />
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
export default {
  data() {
    return {
      imageError: false,
      instaPath: "./instagram.png",
      addImagePath: "./add.png",
      homeImagePath: "./home.png",
      userImagePath: "./id_user.png",
      defaultUserImagePath: "./user.png",
    };
  },
  methods: {
    openModal() {
      this.$emit("open");
    },
    logout() {
      this.usersStore.logout();
    },
  },
  computed: {
    ...mapStores(useUsersStore),
    creatorImage() {
      if (this.usersStore.getCurrentUser.userPicture!=null) {
        if (this.usersStore.getCurrentUser.userPicture == "")
          return this.imageError
            ? this.defaultUserImagePath
            : this.userImagePath;
        else return this.usersStore.getCurrentUser.userPicture;
      }
      return this.defaultUserImagePath;
    },
  },
  mounted() {
    console.log(this.usersStore.getCurrentUser);
  },
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
</style>
