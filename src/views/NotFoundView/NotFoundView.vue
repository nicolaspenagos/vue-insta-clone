<template>
    <main class="home">
        <div class="notfoundcontainer">
          <img  :src="this.path" class="img"/>
          <div class="textcontainer">
            <h1 class="title">404</h1>
            <h3 class="subtitle">LOOKS LIKE YOU'RE LOST</h3>

            <p class="text">You will be redirected to the home page</p>
          </div>
        </div>
    </main>
  </template>
  
  <script>

 
  export default {
    data(){
      return {
        
      path :'./notfound.png'
    
      }
    }
   
  };
  </script>
  
  
  <style lang="scss" scoped>

  .text{
    font-size: 14px;
    margin-top: 20px;
  }

  .img{
    width: 400px;
  }
  .home {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title{
    font-size: 130px;
    margin: 0;
    color: rgb(54, 53, 53);
  }

  .subtitle{
    margin-top: -40px;
    font-style: normal;
    color: rgb(156, 155, 155);

    
  }

  .textcontainer{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  .notfoundcontainer{
    display: flex;
    flex-direction: row;
    
  }
  </style>