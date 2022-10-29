<template>
    <div class="likedPost">
        Hola
    </div>
 
</template>
<script>

import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
export default {
  props: {
    likedPost: {},
  },


  computed: {
    ...mapStores(useUsersStore),
  

  


  },
};
</script>
<style scoped lang="scss">
.likedPost{
    height: 30px;
    width: 200px;
    background-color: purple;
}

</style>

