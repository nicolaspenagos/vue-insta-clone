<script setup>
import { RouterLink, RouterView } from "vue-router";



</script>


<template>
  <main class="main">
    <RouterView />
  </main>
</template>



<style lang="scss">
$background-color: #F2F2F2;
.main {
  background-color: $background-color;
  width: 100%;
  height: 100%;
  position:fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.container{
  display: flex;
  //background: white;
}
</style>
