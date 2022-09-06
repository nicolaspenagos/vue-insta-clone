<template>
  <section class="loginContent">
    <aside class="photoGrid">
      <LoginPhoto
        :imageName="imageName"
        :id="imageName"
        v-for="imageName in images"
        :key="imageName"
      />
    </aside>
    <LoginModule></LoginModule>
  </section>
</template>

<script>
import LoginPhoto from "../components/LoginPhoto.vue";
import LoginModule from "../components/LoginModule.vue";


export default {
 
    methods:{
        onEnd: function(evt){
            console.log(evt);
            this.oldIndex = evt.oldIndex;
            this.newIndex = evt.newIndex;
        }
    }
  ,
  data() {
    return {
      images: [
        "img1",
        "img2",
        "img3",
        "img4",
        "img5",
        "img6",
        "img7",
        "img8",
        "img9",
      ]
      
    };
  },
  components: { LoginPhoto, LoginModule},
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