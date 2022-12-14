import { defineStore } from "pinia";
import { getDatabase, set, ref, get } from "firebase/database";
import { useAuthenticationStore } from "./authentication";

///// OPTIONS STORE
export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [


        ],
        localStorageUsers: [],
        currentUser: null,
        selectedPost: null,
        loggedUser: null,
        lastestUserChanged: null,
        showLikes: false,
        loggedUserLikesArray: [],
        commentId: '',
        commentuser: null
    }),
    getters: {
        getUsers: (state) => [...state.users],
        getCurrentUser: (state) => state.currentUser,
        getSelectedPost: (state) => state.selectedPost,
        getLoggedUser: (state) => state.loggedUser,
        getShowLikes: (state) => state.showLikes,
        getLikesArray: (state) => state.loggedUserLikesArray,
    },
    actions: {

        editComment(commentId, newtext) {

            console.log(commentId + " " + newtext);

            let index = -1;
            for (let i = 0; i < this.currentUser.posts.length && index == -1; i++) {
                let currentPost = this.currentUser.posts[i];

                if (currentPost.comments) {

                    for (let j = 0; j < currentPost.comments.length && index == -1; j++) {

                        if (currentPost.comments[j].commentId == commentId) {
                            currentPost.comments[j].text = newtext;
                            this.selectedPost.comments[j].text = newtext;
                            index = 1;
                        }
                    }
                }


            }

            if (this.currentUser.uid == this.loggedUser.uid) {
                this.save();
            } else {
                this.commentuser = this.currentUser;
            }

        },
        updateLoggedUserLikesArray() {

            let arr = [];
            this.users.forEach(u => {
                if (u.posts) {
                    u.posts.forEach(p => {
                        if (p.likes) {
                            p.likes.forEach(id => {
                                if (id == this.loggedUser.uid) {
                                    let likedPost = {
                                        username: u.username,
                                        title: p.place,
                                        userImg: u.url,
                                        postImg: p.image
                                    };
                                    arr.push(likedPost);
                                }
                            });
                        }

                    })
                }
            });


            this.loggedUserLikesArray = arr;

        },
        save() {
            const db = getDatabase();

            set(ref(db, 'users/' + this.currentUser.uid), {
                ...this.currentUser
            });

        },
        logout() {
            this.currentUser = null;
        },
        loadUsers() {
            this.users = JSON.parse(localStorage.getItem('users'));

        },
        getUserByEmail(email) {

            if (this.users == null) {
                this.users = [];
                return null;
            }

            const filteredUsers = this.users.filter((user) => email === user.email);
            return filteredUsers ? {...filteredUsers[0] } : null
        },
        login(email, password) {
            let user = this.getUserByEmail(email);

            if (user != null && user.password == password) {
                this.currentUser = user;
            }
        },
        signup(email, password, username, userPicture) {

            let newUser = null;
            let user = this.getUserByEmail(username);

            if (user == null || typeof(user.email) == "undefined") {

                newUser = { "username": username, "email": email, "password": password, "followers": 0, "following": 0, "posts": 0, "userPicture": userPicture, "posts": [] };
                this.users.push(newUser);
                localStorage.setItem('users', JSON.stringify(this.users));
                this.currentUser = newUser;

            }



        },
        getUserByUsername(username) {

            if (this.users == null) {
                this.users = [];
                return null;
            }

            const filteredUsers = this.users.filter((user) => username === user.username);
            return filteredUsers ? {...filteredUsers[0] } : null
        },
        setPost(post) {
            this.selectedPost = post;


        },
        setUser(user) {

            this.currentUser = user;

        },
        setUsers(u) {
            this.users = u;
        },
        search(username) {

            let founded = false;
            this.users.forEach(u => {
                if (u.username == username) {
                    this.currentUser = u;
                    founded = true;
                }


            });
            if (!founded)
                alert('User not found');


        },
        setLoggedUser(user) {
            this.loggedUser = user;

        },
        setLike(loggUserId, idPost) {
            console.log("1.: loggedUserId:" + loggUserId + " idPost:" + idPost);

            let stop = false;
            for (let i = 0; i < this.users.length && !false; i++) {
                let posts_user_i = this.users[i].posts;


                if (posts_user_i) {
                    for (let j = 0; j < posts_user_i.length && !stop; j++) {
                        if (posts_user_i[j].postId == idPost) {
                            stop = true;

                            if (this.users[i].posts[j].likes) {
                                if (!this.users[i].posts[j].likes.includes(loggUserId)) {
                                    this.users[i].posts[j].likes.push(loggUserId);
                                } else {
                                    //let indexToRemove = 0;
                                    //For te get index to remove
                                    //const elementos3 = [...elementos.slice(0, indiceAEliminar), ...elementos.slice(indiceAEliminar += 1, elementos.lenght)]
                                    let secondStop = false;
                                    console.log();
                                    for (let k = 0; k < this.users[i].posts[j].likes.length && !secondStop; k++) {

                                        if (this.users[i].posts[j].likes[k] == loggUserId) {



                                            secondStop = true;
                                            let temp = this.users[i].posts[j].likes.pop();


                                            if (temp != loggUserId)
                                                this.users[i].posts[j].likes[k] = temp;
                                        }
                                    }
                                    //this.users[i].posts[j].likes.push(loggUserId);
                                }

                            } else {
                                this.users[i].posts[j] = {...this.users[i].posts[j], likes: [loggUserId] }
                            }

                            this.selectedPost = this.users[i].posts[j];
                            this.lastestUserChanged = this.users[i];

                            if (this.loggedUser.uid == this.currentUser.uid) {
                                this.updateUserChanged();
                            }





                        }
                    }
                }
            }
        },
        updateUserChanged() {

            if (this.lastestUserChanged != null) {
                const db = getDatabase();
                return set(ref(db, 'users/' + this.lastestUserChanged.uid), {
                    ...this.lastestUserChanged
                }).then(() => {
                    this.lastestUserChanged = null;

                    return
                });
            }
        },
        setShowLikes(show) {
            this.showLikes = show;
        },
        clearShowLikes() {
            this.loggedUserLikesArray = [];
        },
        deleteUserInfo() {



            console.log('1');
            useAuthenticationStore().goToLogin();
            set(ref(getDatabase(), 'users/' + this.loggedUser.uid), null).then(() => {


                useAuthenticationStore().deleteAccount();



            });

        },
        addComment(comment, postId, commentId) {

            comment = comment.trim();

            let index = -1;
            for (let i = 0; i < this.currentUser.posts.length && index == -1; i++) {
                let currentPost = this.currentUser.posts[i];
                if (currentPost.postId == postId) {
                    index = i;
                }
            }

            let newComment = { authorId: this.loggedUser.uid, text: comment, authorName: this.loggedUser.username, pic: this.loggedUser.url, commentId };

            let comments = this.currentUser.posts[index].comments;
            if (this.currentUser.posts[index].comments) {
                this.currentUser.posts[index].comments.push(newComment);

            } else {
                comments = [];
                comments.push(newComment)
                let newPost = this.currentUser.posts[index];
                this.currentUser.posts[index] = {...newPost, comments }

            }

            this.selectedPost.comments = this.currentUser.posts[index].comments;
            if (this.currentUser.uid == this.loggedUser.uid)
                this.save();
            else {
                this.commentuser = this.currentUser;
            }

            console.log(this.commentuser);

        },
        saveComment() {


            if (this.commentuser != null) {
                const db = getDatabase();

                set(ref(db, 'users/' + this.commentuser.uid), {
                    ...this.commentuser
                }).then(() => {
                    this.commentuser = null;
                    return
                });

            }

        },
        deleteComment(idToDelete) {

            console.log(idToDelete);
            let index = -1;
            for (let i = 0; i < this.currentUser.posts.length && index == -1; i++) {
                let currentPost = this.currentUser.posts[i];
                console.log("1");
                if (currentPost.comments) {

                    for (let j = 0; j < currentPost.comments.length && index == -1; j++) {
                        console.log("3");
                        if (currentPost.comments[j].commentId == idToDelete) {
                            console.log(idToDelete);

                            if (j > -1) { // only splice array when item is found
                                currentPost.comments.splice(j, 1); // 2nd parameter means remove one item only
                            }
                            this.selectedPost.comments = currentPost.comments;
                            index = 1;
                        }
                    }
                }


            }



            if (this.currentUser.uid == this.loggedUser.uid) {
                this.save();
            } else {
                this.commentuser = this.currentUser;
            }








        }




    },

});