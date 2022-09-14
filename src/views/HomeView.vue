<template>
  <main class="home">
  
    <HeaderModule></HeaderModule>
    <MainModule></MainModule>
  </main>
</template>

<script>

import HeaderModule from "../components/HeaderModule.vue";
import MainModule from "../components/MainModule.vue";
export default {
  
  components: { HeaderModule, MainModule },
};
</script>


<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        
    }

</style>