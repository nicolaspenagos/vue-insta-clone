<template>
    <img  class="loginImage " :class="imageName" :src="path"  @error="noImageFound"  v-if="imageURLOk">
    <div class="loginImage loginImage--div" v-else>

    </div>
</template>

<script>
    export default{
        props:{
            imageName:String
        },
        methods:{
            
            noImageFound(){
                this.imageURLOk=false;
            }

        },
        data(){
            return{
                imageURLOk: true
            }
        },
        computed:{
            path(){
                return './'+this.imageName+'.png';
            }
        }
    }
</script>
<style lang="scss" scoped>
.loginImage{
    width: 140px;
    height: 140px;
    margin: 8px;
    &--div{
        background-color: lightgray;
    }
   // background-color: black;

}
</style>