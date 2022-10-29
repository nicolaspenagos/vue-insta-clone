<template>
  <main class="home">
    <Modal
   
    
      v-if="showModal1"
      @close="closeModal1"
    >
 
   
 
    </Modal>
    <HeaderModule @open="openModal1"></HeaderModule>
    <MainModule :update="update" @open="openModal1"></MainModule>
  </main>
</template>

<script>
import HeaderModule from "../components/HeaderModule.vue";
import MainModule from "../components/MainModule.vue";
import Modal from "../components/Modal.vue";
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
export default {
  components: { HeaderModule, MainModule, Modal },
  computed:{
  ...mapStores(useUsersStore)
  },

  methods: {
    openModal1() {
      document.body.style="overflow:hidden";
      document.querySelector('.main--res').style ="overflow:hidden";
      this.showModal1 = true;
      
    },
    closeModal1() {
      document.body.style="overflow:auto";
       document.querySelector('.main--res').style ="overflow:auto";
      this.usersStore.setPost(null);
      this.usersStore.setShowLikes(false);
      this.usersStore.clearShowLikes();
      this.showModal1 = false;
      this.update = this.usersStore.getCurrentUser.posts.length;
    },
  },
  data() {
    return {
      showModal1: false,
      update: []
    };
  },
};
</script>


<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  height: 100%;
}
</style>