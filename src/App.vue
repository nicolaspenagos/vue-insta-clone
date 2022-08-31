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
$insta-blue: #3F94EF;
$insta-black: #212121;
$light-gray: #D9D9D9;

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

.text{
  &--blue{
    color: $insta-blue;
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.container{
  display: flex;
  background: white;
  margin: 8px;
}

.shadow{
   box-shadow: rgba(99, 99, 99, 0.08) 0px 2px 8px 0px;
}

</style>
