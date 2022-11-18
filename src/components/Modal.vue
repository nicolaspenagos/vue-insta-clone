<template>
  <div class="backdrop" @click.self="cerrarModal">
    <div v-if="this.usersStore.getShowLikes">
      <div class="modal">
        <div class="modal-container modal-container--post">
          <h3>Posts you've liked:</h3>
          <p v-if="likesArray.length == 0">You haven't liked any post yet</p>
          <div
            v-for="(item, index) of likesArray"
            :key="index"
            class="likedPost row"
          >
            <div class="row">
              <img :src="item.userImg" class="likedPost__userImg" />
              <div>
                <strong>{{ item.username }}</strong
                ><br />
                {{ item.title }}
              </div>
            </div>

            <img :src="item.postImg" class="likedPost__postImg" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="modal" v-if="selectedPost">
        <aside class="modal-container modal-container--left">
          <img :src="this.seletecImage" class="imageDetail" />
        </aside>
        <div>
          <aside class="modal-container modal-container--right">
            <div class="row imageDetail__userrow">
              <div class="row imageDetail__userrow">
                <img :src="userPic" class="userPic userPic--detail" />
                <h3 class="text text--black text--username">
                  {{ this.usersStore.getCurrentUser.username }}
                </h3>
              </div>
              <button class="text x text--blue" @click="cerrarModal">
                Close
              </button>
            </div>
            <div class="input--place s-title">{{ this.selectedPlace }}</div>
            <div class="s-subtitle input--country">
              {{ this.selectedCountry }}
            </div>
            <div class="input--description s-des">
              {{ this.des }}
            </div>
            <div class="row row--button">
              <div class="s-subtitle input--date">{{ this.date }}</div>
              <div class="row">
                <button
                  class="text x text--blue showLikesBtn"
                  @click="showLikes"
                  v-if="likesCount() > 0"
                >
                  See likes
                </button>
                <div class="div--likes s-likes">{{ likesCount() }}</div>
                <img
                  :src="heartPath()"
                  class="heart heart--likes"
                  @click="addLike"
                />
              </div>
            </div>
          </aside>
          <div class="comments modal-container">
            <div class="row">
              <input
                v-model="newComment"
                placeholder="Add comment"
                class="input input--comment"
              />
              <button class="button button--modal" @click="postComment">
                Post
              </button>
            </div>
            <div class="commentList">
              <div v-for="(comment, index) in comments" :key="index" class="row comment">
                <img class="comment__pic" :src="comment.pic"/>
                <p v-if="comment.commentId!=this.editId" class="comment__text">{{comment.text}}</p>
                <input v-if="edit  && comment.commentId==this.editId" class="input comment__input" placeholder="New comment"/>
                <div>
                  <div v-if="comment.authorId==this.usersStore.getLoggedUser.uid && !edit && comment.commentId!=this.editId" class="comment__btn comment__x" @click="deleteComment(comment.commentId)">X</div>
                  <div v-if="comment.authorId==this.usersStore.getLoggedUser.uid && !edit && comment.commentId!=this.editId" class="comment__btn comment__edit" @click="toEdit(comment.commentId)">Edit</div>
                  <div v-if="comment.authorId==this.usersStore.getLoggedUser.uid&& edit && comment.commentId==this.editId" class="comment__btn comment__save">Save</div>
                  <div v-if="comment.authorId==this.usersStore.getLoggedUser.uid&& edit && comment.commentId==this.editId" class="comment__btn comment__cancel" @click="toCancel">Cancel</div>
                  <div  class="comment__username">{{comment.authorName}}</div>
             
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" v-else>
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
            <div class="row imageDetail__userrow">
              <img :src="userPic" class="userPic userPic--detail" />
              <h3 class="text text--black text--username">
                {{ this.usersStore.getCurrentUser.username }}
              </h3>
            </div>
            <div class="row"></div>
          </div>
          <input
            placeholder="Title"
            class="input input--place"
            v-model="place"
          />
          <input
            placeholder="Tag"
            class="input input--country"
            v-model="country"
          />
          <textarea
            placeholder="Description"
            class="input input--description"
            v-model="description"
          ></textarea>
          <div class="row row--button">
            <input
              placeholder="Date"
              class="input input--date"
              v-model="date"
            />
            <button class="button button--modal" @click="post">Post</button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
import LikedPost from "./LikedPost.vue";
import { Comment } from "vue";
import {
  getStorage,
  ref as ref_st,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  props: {
    title: String,
    showButton: Boolean,
    titleColor: String,
  },
  methods: {
    toCancel(){
      this.edit=false;
      this.editId = "";

    },
    toEdit(id){
      this.edit=true;
      this.editId = id;

    },
    deleteComment(id){

      this.usersStore.deleteComment(id);
    },
    showLikes() {
      let msgTemplate = "";
      this.usersStore.getSelectedPost.likes.forEach((id) => {
        for (let i = 0; i < this.usersStore.users.length; i++) {
          let user_i = this.usersStore.users[i];
          if (user_i.uid == id) {
            msgTemplate += user_i.username + "\n";
          }
        }
      });
      alert(msgTemplate);
    },
    heartPath() {
      if (
        this.usersStore.getSelectedPost.likes &&
        this.usersStore.getSelectedPost.likes.includes(
          this.usersStore.loggedUser.uid
        )
      ) {
        return "./heart.png";
      }
      return "./white_heart.png";
    },
    addLike() {
      let loggedUserUid = this.usersStore.getLoggedUser.uid;
      let postId = this.usersStore.getSelectedPost.postId;

      if (
        this.usersStore.getSelectedPost.likes &&
        this.usersStore.getSelectedPost.likes.includes(
          this.usersStore.loggedUser.uid
        )
      ) {
        this.usersStore.setLike(loggedUserUid, postId);
      } else {
        this.usersStore.setLike(loggedUserUid, postId);
      }
    },
    likesCount() {
      return this.usersStore.getSelectedPost.likes
        ? this.usersStore.getSelectedPost.likes.length
        : 0;
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
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
      this.file = evt.target.files[0];
    },
    post() {
      if (
        this.place != "" &&
        this.country != "" &&
        this.description != "" &&
        this.date != null &&
        this.imageDetail != ""
      ) {
        let currentLikes = 0;

        if (this.usersStore.getCurrentUser.posts == null) {
          this.usersStore.getCurrentUser.posts = [];
        }

        const storage = getStorage();
        let rand = this.uuidv4();
        const fileRef = ref_st(
          storage,
          "images/" + this.usersStore.getCurrentUser.uid + "/" + rand
        );

        uploadBytes(fileRef, this.file).then((snapshot) => {
          getDownloadURL(
            ref_st(
              storage,
              "images/" + this.usersStore.getCurrentUser.uid + "/" + rand
            )
          ).then((url) => {
            this.usersStore.getCurrentUser.posts.push({
              place: this.place,
              country: this.country,
              description: this.description,
              date: this.date,
              image: url,
              likes: [],
              postId: rand,
            });

            this.usersStore.save();

            this.$emit("close");
          });
        });
      } else {
        alert("Please fill all the data.");
      }
    },
    postComment() {
      if(this.newComment.trim()!=""){
        this.usersStore.addComment(this.newComment, this.selectedPostId, this.uuidv4());
      this.newComment = "";
      }


    },
  },
  computed: {
    ...mapStores(useUsersStore),
    titleClass() {
      return `title--${this.titleColor}`;
    },
    likesArray() {
      console.log(this.usersStore.getShowLikes);
      return this.usersStore.getShowLikes;
    },
    image() {
      return this.imageDetail;
    },
    userPic() {
      const url = this.usersStore.getCurrentUser.url;

      if (url != undefined && url != null) {
        if (url == "NoImage") {
          console.log(url == "NoImage");
          console.log(url + this.defaultUserImagePath);
          return "./user.png";
        } else {
          return this.usersStore.getCurrentUser.url;
        }
      }

      return "./user.png";
    },
    likesArray() {
      return this.usersStore.getLikesArray;
    },comments(){
      return this.usersStore.getSelectedPost.comments;
    }
  },
  data() {
    return {
      addImage: true,
      addImagePath: "./add_image.png",
      addImageLoaded: false,
      heartpath: "./heart.png",
      imageDetail: "",
      place: "",
      country: "",
      description: "",
      date: "",
      likes: "",
      selectedPost: false,
      seletecImage: "",
      selectedLikes: "",
      selectedPlace: "",
      selectedCountry: "",
      des: "",
      date: "",
      file: "",
      newComment: "",
      selectedPostId: "",
      edit:false,
      editId:""
    };
  },
  mounted() {
    this.selectedPost = this.usersStore.getSelectedPost != null;
    // console.log(this.usersStore.getLikesArray);
    if (this.selectedPost) {
      this.seletecImage = this.usersStore.getSelectedPost.image;
      this.selectedLikes = this.usersStore.getSelectedPost.likes;
      this.selectedCountry = this.usersStore.getSelectedPost.country;
      this.selectedPlace = this.usersStore.getSelectedPost.place;
      this.des = this.usersStore.getSelectedPost.description;
      this.date = this.usersStore.getSelectedPost.date;
      this.selectedPostId = this.usersStore.getSelectedPost.postId;

    }
  },
  watch: {
    likesArray() {
      console.log(this.usersStore.getLikesArray);
    },
  },
};
</script> 
<style scoped lang="scss">
.s-des {
  margin-top: 20px;
  min-height: 80px;
}
.input {
  margin-top: 5px;
  height: 30px;
  font-size: 13px;
  padding: 10px;
  &--place {
    width: 250px;
  }
  &--country {
    width: 150px;
  }
  &--description {
    width: 100%;
    height: 60px;
  }
  &--date {
    width: 150px;
  }
  &--likes {
    width: 50px;
    margin-bottom: 20px;
  }
  &--comment {
    margin-right: 5px;
  }
}
.text--username {
  font-weight: 600;
}
.userPic {
  &--detail {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}

.imageDetail {
  width: 400px;
  height: 400px;
  &__userrow {
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
  }
}

.s-title {
  font-weight: bold;
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

.likedPost {
  background-color: white;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;

  &__userImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__postImg {
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }
}
.modal-container--post {
  padding: 20px;
  background-color: rgb(242, 242, 242) !important;
  height: 500px;
  overflow-y: scroll;
  min-width: 364px;
}
.title--blue {
  color: darkblue;
}
.heart {
  width: 15px;
  height: 15px;
  margin-top: 13px;
  margin-left: 3px;
  &--likes {
    margin-top: 0;
    margin-bottom: 12px;
  }
}

.comments {
  width: 390px;
  padding: 15px;
}

.comment{
  margin-bottom: 10px;
  margin-top:10px;
  display: flex;
  align-items: center;
  position: relative;
  max-height: 250px;
  overflow-y: scroll;
  &__username{
    position: absolute;
    top:0;
    left: 50px;
    font-size: 9px;
    color: gray;
  }
  &__pic{
    width: 40px;
    border-radius: 50%;
  }
  &__text{
    margin-left: 10px;
  }

  &__btn{
    position: absolute;
    top: 0;
    right: 0;
    color:#3f94ef ;
    font-size: 11px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
  &__edit{
    right: 15px;
  }  
  &__cancel{
    right:35px;
  }
  &__input{
    width: 230px;
    height: 25px;
    margin-left: 7px;
    margin-top: 10px;
    font-size: 10px;
  }

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

.s-likes {
  margin-top: -4px;
}
.modal-container {
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

.showLikesBtn {
  margin-bottom: 35px;
  margin-right: 10px;
}
.modal {
  display: flex;
  flex-direction: row;
}

.s-subtitle {
  color: gray;
  font-size: 12px;
}

.row {
  &--button {
    justify-content: space-between;
  }
}
.div--likes {
  height: 20px;
  margin-bottom: 15px;
}

.x {
  margin-bottom: 10px;
  font-size: 12px;
}
@media (max-width: 600px) {
  .modal {
    flex-direction: column;
    &-container {
      &--left {
        width: 350px;
        height: 350px;
        margin-bottom: 20px;
      }
      &--right {
        width: 350px;
        height: 300px;
      }
    }

    .imageDetail {
      width: 350px;
      height: 350px;
    }

    .backdrop {
      overflow: hidden;
    }

    .main {
      overflow: hidden;
    }
  }
}
</style>
