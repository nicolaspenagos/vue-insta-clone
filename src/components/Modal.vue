<template>
  <div class="backdrop" @click.self="cerrarModal">
    <div class="modal ">
      <aside class="modal-container modal-container--left">
        <div v-if="addImage" class="addImage">
          <div class="imageDetail" v-if="addImageLoaded">
            <img :src="image" class="imageDetail" />
          </div>
          <div class="row" v-else>
            <div class="row">
              <label for="addImg" class="addImage__btn text--gray"
                >Add photo</label
              >
              <input
                id="addImg"
                type="file"
                class="addImage__input"
                @change="(e) => setImage(e)"
              />
            </div>
            <img :src="addImagePath" class="addImage__img" />
          </div>
        </div>
        <div v-else></div>
      </aside>
      <aside class="modal-container modal-container--right">
        <div class="row imageDetail__userrow">
          <img :src="userPic" class="userPic userPic--detail" />
          <h3 class="text text--black text--username">{{this.usersStore.getCurrentUser.username}}</h3>
        </div>
        <input placeholder = "Place" class="input input--place" v-model="place"/>
        <input placeholder = "Country" class="input input--country" v-model="country"/>
        <textarea placeholder = "Description" class="input input--description" v-model="description"></textarea>
        <div class="row row--button">
          <input placeholder = "Date" class="input input--date" v-model="date"/>
          <button class="button button--modal" @click="post">Post</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
export default {
  props: {
    title: String,
    showButton: Boolean,
    titleColor: String,
  },
  methods: {
    cerrarModal() {
      this.$emit("close");
    },
    setImage(evt) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageDetail = reader.result;
      });
      reader.readAsDataURL(evt.target.files[0]);
      this.addImageLoaded = true;
    },post(){
      console.log(this.place+" "+this.country+" "+this.description+" "+this.date+" "+this.imageDetail);
    }
  },
  computed: {
    ...mapStores(useUsersStore),
    titleClass() {
      return `title--${this.titleColor}`;
    },
    image() {
      return this.imageDetail;
    },
    userPic() {
      return this.usersStore.getCurrentUser.userPicture;
    },
  },
  data() {
    return {
      addImage: true,
      addImagePath: "./add_image.png",
      addImageLoaded: false,
      imageDetail: "",
      place:"",
      country:"",
      description:"",
      date:""
    };
  },
};
</script> 
<style scoped lang="scss">

  .input{
    margin-top: 5px;
    height: 30px;
    font-size: 13px;
    padding: 10px;
    &--place{
      width: 250px;

    }
    &--country{
      width: 150px;
    }
    &--description{
      width: 100%;
      height: 60px;
    }
    &--date{
      width: 150px;
    }
  }
.text--username{
  font-weight: 600;
}
.userPic{
  &--detail{
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}
.imageDetail {
  width: 400px;
  height: 400px;
    &__userrow{
   align-items: center;
    margin-bottom: 10px
;
  }
}
.addImage {

  &__btn {
    cursor: pointer;
  }

  &__img {
    width: 50px;
    height: 50px;
    margin-top: -13px;
  }
  &__input {
    visibility: hidden;
    width: 10px;
  }

}
.title--purple {
  color: purple;
}

.title--blue {
  color: darkblue;
}



.backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}

.modal-container {
  //width: 50%;
  //padding: 50px;
  background-color: white;
  z-index: 30;
  margin: 5px;
  &--left {
    height: 400px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--right {
    height: 300px;
    width: 390px;
    padding: 30px;
  }
}
.modal {
  //width: 800px;
  display: flex;
  flex-direction: row;
}

.row{
  &--button{
    justify-content: space-between;
  }
}
</style>
