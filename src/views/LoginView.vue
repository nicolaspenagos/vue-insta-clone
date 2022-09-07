<template>
  <section class="loginContent">

      <draggable
        v-model="images"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="imageName"
         class="photoGrid"
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
      <!--
      <LoginPhoto
        :imageName="imageName"
        :id="imageName"
        v-for="imageName in images"
        :key="imageName"
      />-->

    <LoginModule></LoginModule>
  </section>
</template>

<script>
import LoginPhoto from "../components/LoginPhoto.vue";
import LoginModule from "../components/LoginModule.vue";
import draggable from "vuedraggable";
export default {
  methods: {
    onEnd: function (evt) {
      console.log(evt);
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
    },
  },
  data() {
    return {
      images: [
        { name: "img1" },
        { name: "img2" },
        { name: "img3" },
        { name: "img4" },
        { name: "img5" },
        { name: "img6" },
        { name: "img7" },
        { name: "img8" },
        { name: "img9" },
      ],
    };
  },
  components: { LoginPhoto, LoginModule, draggable },
};
</script>


<style lang="scss">
.photoGrid {
  display: grid;
  grid-template-columns: auto auto auto;
  margin-right: 50px;
}

.loginContent {
  display: flex;
  flex-direction: row;
}
</style>