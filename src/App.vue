<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>


<template>
  <main class="main">
    <div class="decoline"></div>
    <RouterView />
  </main>
</template>



<style lang="scss">
$background-color: #f2f2f2;
$insta-blue: #3f94ef;
$insta-black: #212121;
$light-gray: #d9d9d9;
$input-background: #f6f6f6;
$border-gray: #b9b9b9;
$gradient-yellow:#FFD000;
$gradient-orange: #FF6E00;
$gradent-pink: #FF005D;
$gradient-magenta: #CD00BD;
$gradient-purple: #6A30F8;
$ultra-light-gray:#D9D9D9;

*{
  color: $insta-black;
}

.subtitle{
  font-weight: 600;
}
.main {
  background-color: $background-color;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.text {
  font-weight: 400;
  font-size: 15px;
  &--blue {
    font-weight: 500;
    color: $insta-blue;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &--red{
    color: #FD1D1D;
  }
}

.container {
  display: flex;
  background: white;
  margin: 8px;
}

.shadow {
  box-shadow: rgba(99, 99, 99, 0.08) 0px 2px 8px 0px;
}

.input {
  background-color: $input-background;
  width: 320px;
  height: 42px;
  border-radius: 5px;
  border: 1px solid $border-gray;
  outline: none;
  padding-left: 20px;
  font-size: 14px;
}

.button {
  background-color: $insta-blue;
  width: 320px;
  height: 42px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
}

.decoline{
  height: 6px;
  width: 100%;
  position: absolute;
  top: 0;
  background: repeating-linear-gradient(to right, $gradient-yellow 0%, $gradient-orange 20%, $gradent-pink 40%, $gradient-magenta 60%, $gradient-yellow 100%);
  width: 100%;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 4s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  z-index: 10;
}

.row{
  display: flex;
  flex-direction: row;
}
@keyframes gradient{
  0%   { background-position: 0 0; }
  100% { background-position: -200% 0; }
}
</style>
