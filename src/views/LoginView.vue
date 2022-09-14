<template>
  <section class="loginContent">
  
    <div class="photoGrid">
      <draggable
        v-model="images"
        group="pics"
        item-key="imageName"
        ghost-class="ghost"
        tag="transition-group"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div>
            <LoginPhoto
              :imageName="element.name"
              :id="element.name"
              :key="imageName"
            />
          </div>
        </template>
      </draggable>
    </div>
    <LoginModule></LoginModule>
  </section>
</template>

<script>
import LoginPhoto from "../components/LoginPhoto.vue";
import LoginModule from "../components/LoginModule.vue";
import draggable from "vuedraggable";
import HeaderModule from "../components/HeaderModule.vue";

export default {
 
  data() {
    return {
      images: [
        { name: "img1" },
        { name: "img2" },
        { name: "img3" },
        { name: "xxxx" },
        { name: "img5" },
        { name: "img6" },
        { name: "xxxx" },
        { name: "xxxx" },
        { name: "img9" },
      ],
    };
  },
  components: { LoginPhoto, LoginModule, draggable, HeaderModule },
};
</script>


<style lang="scss">
.photoGrid {
  display: grid;
  grid-template-columns: auto auto auto;
  margin-right: 50px;
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.2;
}
.loginContent {
  display: flex;
  flex-direction: row;
  padding: 16px;
}

article {
  display: grid;
  grid-template-columns: auto auto auto;
}

@media (max-width:600px) {
  .photoGrid{
    display: none;
  }
  .loginContent{
    width: 100%;
  }
}


</style>