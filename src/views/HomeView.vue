<template>
  <main class="home">
    <Modal
      titleColor="blue"
      :showButton="true"
      title="Hola soy un modal 1"
      v-if="showModal1"
      @close="closeModal1"
    >
      <h2>Un subtitulo</h2>
   
      <template v-slot:links>
        <a class="link1" href="">twitter</a><br /><a class="link2" href=""
          >facebook</a
        ><br /><a class="link1" href="">linkedin</a>
      </template>
    </Modal>
    <HeaderModule @open="openModal1"></HeaderModule>
    <MainModule></MainModule>
  </main>
</template>

<script>
import HeaderModule from "../components/HeaderModule.vue";
import MainModule from "../components/MainModule.vue";
import Modal from "../components/Modal.vue";
export default {
  components: { HeaderModule, MainModule, Modal },
  methods: {
    openModal1() {
      this.showModal1 = true;
    },
    closeModal1() {
      this.showModal1 = false;
    },
  },
  data() {
    return {
      showModal1: false,
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