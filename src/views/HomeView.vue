<template>
  <main class="home">
    <Modal
   
    
      v-if="showModal1"
      @close="closeModal1"
    >
 
   
 
    </Modal>
    <HeaderModule @open="openModal1"></HeaderModule>
    <MainModule :update="update"></MainModule>
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
      this.showModal1 = true;
    },
    closeModal1() {
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
  height: 100%;
}
</style>