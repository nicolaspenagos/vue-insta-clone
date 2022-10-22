<template>
  <main class="content">
    <section class="info row">
      <div class="row r1">
        <img
          :src="creatorImage"
          class="profilePic"
          @error="imageError = true"
        />
        <div class="info__details">
          <h3 class="username">{{ username }}</h3>
          <h4 class="tag">{{ email }}</h4>
        </div>
      </div>
      <div class="info__account row">
        <div class="row info__account__item">
          <h3 class="subtitle">{{ followers }}</h3>
          <p>followers</p>
        </div>
        <div class="row info__account__item">
          <h3 class="subtitle">{{ following }}</h3>
          <p>following</p>
        </div>
        <div class="row">
          <h3 class="subtitle">{{ posts }}</h3>
          <p>posts</p>
        </div>
      </div>
    </section>
    <div class="sepline"></div>
    <div class="posts__container">
      <div class="row search__row">
        <label>Search</label>
        <input class="input search" v-model="searchValue" @change="search"/>
      </div>

      <div class="filters row">
        <div class="row filter">
          <label class="label">Filter by:</label>
          <select class="input filter--input" v-model="filterKey">
            <option value="" selected disabled hidden>Choose here</option>
            <option>Tag</option>
            <option>Title</option>
          </select>
          <input
            class="input filter--input"
            @change="filter"
            v-model="filterValue"
          />
        </div>
        <div class="row sort">
          <label class="label">Sort by:</label>
          <select class="input filter--input" v-model="sortKey" @change="sort">
            <option value="" selected disabled hidden>Choose here</option>
            <option>Likes</option>
            <option>Date</option>
          </select>
        </div>
      </div>
      <section class="posts">
        <Post
          :post="post"
          v-for="(post, index) in arrayToShow"
          :key="index"
          @open="openModal"
        >
        </Post>
      </section>
    </div>
  </main>
</template>


<script>
import { mapStores } from "pinia";
import { useUsersStore } from "../stores/users";
import Post from "./Post.vue";
export default {
  props: ["update"],
  methods: {
    search(){
      if(this.searchValue!="")
        this.usersStore.search(this.searchValue)
    },
    openModal() {
      this.$emit("open");
    },
    filter() {
      this.reloadToShow();
      if (this.filterKey == "Tag" && this.filterValue != "")
        this.filterByCountry(this.filterValue);
      if (this.filterKey == "Title" && this.filterValue != "")
        this.filterByPlace(this.filterValue);
    },
    sort() {
      if (this.sortKey == "Likes") this.sortByLikes();

      if (this.sortKey == "Date") this.sortByDate();
    },
    sortByLikes() {
      this.arrayToShow.sort((a, b) =>
        a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
      );
    },
    sortByDate() {
      this.arrayToShow.sort(function (a, b) {
        let dateA = a.date.split(".");
        let dayA = parseInt(dateA[0]);
        let monthA = parseInt(dateA[1]);
        let yearA = parseInt(dateA[2]);

        let dateB = b.date.split(".");
        let dayB = parseInt(dateB[0]);
        let monthB = parseInt(dateB[1]);
        let yearB = parseInt(dateB[2]);

        if (yearA > yearB) {
          return -1;
        } else if (yearA == yearB) {
          if (monthA > monthB) {
            return -1;
          } else if (monthA == monthB) {
            if (dayA > dayB) {
              return -1;
            } else {
              if (dayA == dateB) {
                return 0;
              }
            }
          }
        } else {
          return 1;
        }
      });
    },
    filterByCountry(country) {
      this.arrayToShow = this.arrayToShow.filter((e) => {
        return e.country == country;
      });
    },
    filterByPlace(place) {
      this.arrayToShow = this.arrayToShow.filter((e) => {
        return e.place == place;
      });
    },
    reloadToShow() {
      this.sortKey = "";
      this.arrayToShow = JSON.parse(JSON.stringify(this.currentsPostsArray));
    },
  },

  watch: {
    update() {
      this.currentPosts = this.usersStore.getCurrentUser.posts.length;
      this.reloadToShow();
      this.filterValue = "";
    },
    currentUser() {
      let currentUser = this.usersStore.getCurrentUser;
      this.currentUsername = currentUser.username;
      this.currentUserEmail = currentUser.email;
      this.currentFollowers = currentUser.followers;
      this.currentFollowing = currentUser.following;
      this.currentPosts =
        currentUser.posts != null && currentUser.posts != null
          ? currentUser.posts.length
          : 0;

      this.currentPosts =
        currentUser.posts != null && currentUser.posts != null
          ? currentUser.posts.length
          : 0;
      // this.currentsPostsArray = currentUser.posts;
      //this.arrayToShow = JSON.parse(JSON.stringify(this.currentsPostsArray));
      let arr = currentUser.posts;
      this.currentsPostsArray = arr;
      this.arrayToShow = arr;
      
      console.log(this.usersStore.getCurrentUser.email == this.usersStore.getLoggedUser.email);
      console.log(this.usersStore.getLoggedUser.email);
      if(this.usersStore.getCurrentUser.email == this.usersStore.getLoggedUser.email){
    
        this.searchValue=""
      }
      

     
    },
  },
  data() {
    return {
      imageError: false,
      userImagePath: "./id_user.png",
      defaultUserImagePath: "./user.png",
      currentUsername: "",
      currentUserEmail: "",
      currentFollowers: 0,
      currentFollowing: 0,
      currentPosts: 0,
      currentsPostsArray: [],
      arrayToShow: [],
      filterKey: "",
      filterValue: "",
      sortKey: "",
      searchValue:""
    };
  },
  computed: {
    ...mapStores(useUsersStore),
    creatorImage() {
      const url = this.usersStore.getCurrentUser.url;
      if (url == "NoImage") return this.defaultUserImagePath;
      if (url != undefined && url != null) {
        return this.usersStore.getCurrentUser.url;
      }
      /*
      if (
        this.usersStore.getCurrentUser != null &&
        this.usersStore.getCurrentUser.userPicture != null
      ) {
        if (this.usersStore.getCurrentUser.userPicture == "")
          return this.imageError
            ? this.defaultUserImagePath
            : this.userImagePath;
        else return this.usersStore.getCurrentUser.userPicture;
      }
      return this.defaultUserImagePath;*/
    },
    currentUser() {
      return this.usersStore.getCurrentUser;
    },
    username() {
      return this.currentUsername;
    },
    followers() {
      return this.currentFollowers;
    },
    following() {
      return this.currentFollowing;
    },
    posts() {
      return this.currentPosts;
    },
    email() {
      return this.currentUserEmail;
    },
    allPosts() {
      return this.usersStore.getCurrentUser.posts;
    },
  },
  mounted() {
    let currentUser = this.usersStore.getCurrentUser;
    this.currentUsername = currentUser.username;
    this.currentUserEmail = currentUser.email;
    this.currentFollowers = currentUser.followers;
    this.currentFollowing = currentUser.following;
    this.currentPosts =
      currentUser.posts != null && currentUser.posts != null
        ? currentUser.posts.length
        : 0;
    // this.currentsPostsArray = currentUser.posts;
    //this.arrayToShow = JSON.parse(JSON.stringify(this.currentsPostsArray));
    let arr = currentUser.posts;
    this.currentsPostsArray = [];
    this.arrayToShow = [];

    if (arr) {
      arr.forEach((p) => {
        this.currentsPostsArray.push({ ...p });

        this.arrayToShow.push({
          country: p.country,
          date: p.date,
          description: p.description,
          image: p.image,
          likes: p.likes,
          place: p.place,
        });
      });
    }
  },
  components: { Post },
};
</script>

<style lang="scss" scoped>
.sepline {
  height: 2px;
  width: 100%;
  background-color: #d9d9d9;
}
.profilePic {
  width: 110px !important;
  height: 110px !important;
  border-radius: 50%;
}

.content {
  margin-top: 66px;
  width: 100%;
  //height: 100vh;
  //position: fixed;
  padding-left: 100px;
  padding-right: 100px;
}
.username {
  font-weight: 500;
}

.msg {
  text-align: center;
}
.tag {
  font-weight: 400;
  margin-top: -5px;
}

.subtitle {
  font-weight: 500;
  margin-right: 5px;
}

.search {
  width: 370px;
  margin-left: 18px;
  &__row {
    padding-left: 30px;
    padding-top: 30px;
    align-items: center;
  }
}

.info {
  &__details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: center;
    align-items: left;
    height: 100%;
  }
  &__account__item {
    margin-right: 30px;
  }
  &__account {
    align-items: center;
    margin-top: -25px;
  }

  padding-left: 80px;
  padding-right: 80px;

  padding-top: 25px;
  padding-bottom: 25px;
  justify-content: space-between;
}
.posts {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin: 25px;
  margin-top: -50px;
  &__container {
    padding-bottom: 75px;
  }
}

.filters {
  justify-content: space-between;
  padding: 30px;
  padding-top: 15px;
}

.filter {
  align-items: center;
  &--input {
    margin-left: 10px;
    width: 180px;
  }
}

.sort {
  align-items: center;
}

@media (max-width: 600px) {
  .content {
    padding: 0;
  }
  .info {
    padding: 20px;
    flex-direction: column;
    &__account {
      margin: 15px;
      font-size: 16px;
    }
  }
  .profilePic {
    width: 60px !important;
    height: 60px !important;
  }
  .username {
    font-size: 16px;
  }
  .tag {
    font-size: 14px;
  }

  .row {
    //flex-direction: column;
  }

  .r1 {
    align-items: center;
  }

  .filters {
    flex-direction: column;
    font-size: 12px;
  }
  .input {
    font-size: 12px;
  }

  .filter {
    margin-bottom: 10px;
    &--input {
      width: 125px;
    }
  }

  .posts {
    grid-template-columns: auto;
  }

  .sepline {
    margin-left: 20px;
    margin-right: 20px;
  }

  .label {
    width: 50px;
  }
}
</style>